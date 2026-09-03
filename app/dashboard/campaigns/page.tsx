
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import CampaignHeader from '@/components/dashboard/campaign/CampaignHeader';
import CampaignMetrics from '@/components/dashboard/campaign/CompaignMetrics';
import CampaignFilters from '@/components/dashboard/campaign/CompaignFilter';
import CampaignTable, {
  CampaignData,
} from '@/components/dashboard/campaign/CompaignTable';
import ProUpgradeBanner from '@/components/dashboard/campaign/ProBanner';

import apiClient from '@/api/client';

type UserTier = 'free' | 'pro';

interface CampaignApiResponse {
  success: boolean;
  data: {
    campaigns: CampaignData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    range: string;
    access?: {
      isPro: boolean;
      visible: number;
      total: number;
      hidden: number;
    };
  };
}

interface SummaryApiResponse {
  success: boolean;
  data: {
    totalActiveCampaigns: number;
    totalSpend: number;
    averageRoas: number;
    needsAttention: number;
    fatigued: number;
  };
}

interface MeResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    plan: 'FREE' | 'PRO';
    isMetaConnected?: boolean;
  };
}

interface CheckoutResponse {
  success?: boolean;
  checkoutUrl?: string;
  url?: string;
  message?: string;
}

export default function CampaignsPage() {
  const router = useRouter();

  // ============================================================
  // USER
  // ============================================================

  const [userTier, setUserTier] = useState<UserTier>('free');
  const [userLoading, setUserLoading] = useState(true);

  // ============================================================
  // CAMPAIGNS
  // ============================================================

  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [campaignLoading, setCampaignLoading] = useState(true);

  // ============================================================
  // FILTERS
  // ============================================================

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');

  // ============================================================
  // PAGINATION
  // ============================================================

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  // ============================================================
  // SUMMARY
  // ============================================================

  const [summary, setSummary] = useState({
    totalActiveCampaigns: 0,
    totalSpend: 0,
    averageRoas: 0,
    fatigued: 0,
    needsAttention: 0,
  });

  // ============================================================
  // UPGRADE
  // ============================================================

  const [upgradeLoading, setUpgradeLoading] = useState(false);

  // ============================================================
  // DERIVED VALUES
  // ============================================================

  const isPro = userTier === 'pro';

  const hiddenCount = useMemo(() => {
    if (isPro) return 0;

    return Math.max(
      pagination.total - campaigns.length,
      0
    );
  }, [isPro, pagination.total, campaigns.length]);

  // ============================================================
  // LOAD CURRENT USER
  // ============================================================

  const loadCurrentUser = useCallback(async () => {
    try {
      setUserLoading(true);

      const response = await apiClient.get<MeResponse>(
        '/auth/me'
      );

      const plan = response.data?.data?.plan;

      setUserTier(
        plan === 'PRO'
          ? 'pro'
          : 'free'
      );
    } catch (error: any) {
      console.error(
        'Failed to load current user:',
        error?.response?.data || error
      );

      setUserTier('free');
    } finally {
      setUserLoading(false);
    }
  }, []);

  // ============================================================
  // LOAD CAMPAIGNS
  // ============================================================

  const loadCampaigns = useCallback(async () => {
    try {
      setCampaignLoading(true);

      const response =
        await apiClient.get<CampaignApiResponse>(
          '/dashboard/campaigns',
          {
            params: {
              search: searchQuery || undefined,
              status:
                statusFilter !== 'all'
                  ? statusFilter
                  : undefined,
              health:
                healthFilter !== 'all'
                  ? healthFilter
                  : undefined,
              range: '7d',
              page,
              limit: 20,
            },
          }
        );

      if (response.data?.success) {
        setCampaigns(
          response.data.data.campaigns || []
        );

        setPagination(
          response.data.data.pagination
        );


        if (response.data.data.access) {
          setUserTier(
            response.data.data.access.isPro
              ? 'pro'
              : 'free'
          );
        }
      }
    } catch (error: any) {
      console.error(
        'Failed to load campaigns:',
        error?.response?.data || error
      );

      setCampaigns([]);
    } finally {
      setCampaignLoading(false);
    }
  }, [
    searchQuery,
    statusFilter,
    healthFilter,
    page,
  ]);

  // ============================================================
  // LOAD SUMMARY
  // ============================================================

  const loadSummary = useCallback(async () => {
    try {
      const response =
        await apiClient.get<SummaryApiResponse>(
          '/dashboard/campaigns/summary'
        );

      if (response.data?.success) {
        setSummary(response.data.data);
      }
    } catch (error: any) {
      console.error(
        'Failed to load campaign summary:',
        error?.response?.data || error
      );
    }
  }, []);

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadCurrentUser();
    loadSummary();
  }, [
    loadCurrentUser,
    loadSummary,
  ]);

  // ============================================================
  // LOAD CAMPAIGNS WHEN FILTERS CHANGE
  // ============================================================

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  // ============================================================
  // RESET PAGE WHEN FILTER CHANGES
  // ============================================================

  useEffect(() => {
    setPage(1);
  }, [
    searchQuery,
    statusFilter,
    healthFilter,
  ]);

  // ============================================================
  // VIEW AI INSIGHTS
  // ============================================================

  const handleViewInsights = async (
    campaignId: string
  ) => {

    if (!isPro) {
      await handleUpgrade();
      return;
    }

    try {

      await apiClient.get(
        `/dashboard/campaigns/${campaignId}/ai-insights`
      );

      router.push(
        `/dashboard/insights?id=${encodeURIComponent(
          campaignId
        )}`
      );
    } catch (error: any) {
      const status =
        error?.response?.status;

      const code =
        error?.response?.data?.code;

      if (
        status === 403 ||
        code === 'PRO_REQUIRED'
      ) {
        await handleUpgrade();
        return;
      }

      console.error(
        'Failed to load AI insights:',
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          'Unable to load AI insights.'
      );
    }
  };

  // ============================================================
  // STRIPE UPGRADE
  // ============================================================

  const handleUpgrade = async () => {
    if (upgradeLoading) return;

    try {
      setUpgradeLoading(true);
      const response =
        await apiClient.post<CheckoutResponse>(
          '/subscriptions/checkout'
        );

      const checkoutUrl =
        response.data?.checkoutUrl ||
        response.data?.url;

      if (!checkoutUrl) {
        throw new Error(
          'Stripe checkout URL was not returned.'
        );
      }

      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error(
        'Upgrade failed:',
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          'Unable to start Pro upgrade.'
      );

      setUpgradeLoading(false);
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (userLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-sm opacity-60"
        >
          Loading campaigns...
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="w-full space-y-6 bg-transparent p-4 md:p-6">
      {/* ======================================================
          HEADER
      ======================================================= */}

      <CampaignHeader
        userTier={userTier}
        // onToggleTier={handleUpgrade}
      />

      {/* ======================================================
          METRICS
      ======================================================= */}

      <CampaignMetrics
        activeCount={
          summary.totalActiveCampaigns
        }
        totalSpend={
          summary.totalSpend
        }
        avgRoas={
          summary.averageRoas.toFixed(1)
        }
        fatiguedCount={
          summary.fatigued
        }
        isPro={isPro}
      />

      {/* ======================================================
          FILTERS
      ======================================================= */}

      <CampaignFilters
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
        }}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
        }}
        healthFilter={healthFilter}
        onHealthChange={(value) => {
          setHealthFilter(value);
        }}
      />

      {/* ======================================================
          CAMPAIGN TABLE
      ======================================================= */}

      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        className="relative overflow-hidden rounded-xl border shadow-sm"
      >
        {campaignLoading ? (
          <div
            style={{
              color: 'var(--text-primary)',
            }}
            className="p-12 text-center text-sm opacity-60"
          >
            Loading campaigns...
          </div>
        ) : (
          <CampaignTable
            campaigns={campaigns}
            isPro={isPro}
            onViewInsights={
              handleViewInsights
            }
            onUnlockPro={
              handleUpgrade
            }
          />
        )}

        {/* ====================================================
            PRO BANNER
        ===================================================== */}

        {!isPro && hiddenCount > 0 && (
          <ProUpgradeBanner
            hiddenCount={hiddenCount}
            onUpgrade={handleUpgrade}
          />
        )}
      </div>

      {/* ======================================================
          PAGINATION
      ======================================================= */}

      {isPro &&
        pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={
                page <= 1 ||
                campaignLoading
              }
              onClick={() =>
                setPage((current) =>
                  Math.max(current - 1, 1)
                )
              }
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            <span
              style={{
                color:
                  'var(--text-primary)',
              }}
              className="text-xs opacity-70"
            >
              Page {pagination.page} of{' '}
              {pagination.pages}
            </span>

            <button
              type="button"
              disabled={
                page >= pagination.pages ||
                campaignLoading
              }
              onClick={() =>
                setPage((current) =>
                  Math.min(
                    current + 1,
                    pagination.pages
                  )
                )
              }
              className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
    </div>
  );
}

