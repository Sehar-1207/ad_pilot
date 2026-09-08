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

interface CampaignPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hiddenCount: number;
  hasMore: boolean;
}

interface CampaignAccess {
  isPro: boolean;
  visible: number;
  total: number;
  hidden: number;
}

interface CampaignApiResponse {
  success: boolean;
  data?: {
    campaigns?: CampaignData[];
    pagination?: CampaignPagination;
    range?: string;
    access?: CampaignAccess;
  };
  message?: string;
}

interface SummaryApiResponse {
  success: boolean;
  data?: {
    totalActiveCampaigns?: number;
    totalSpend?: number;
    averageRoas?: number;
    needsAttention?: number;
    fatigued?: number;
  };
  message?: string;
}

interface MeResponse {
  success: boolean;
  data?: {
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

const EMPTY_PAGINATION: CampaignPagination = {
  page: 1,
  limit: 20,
  total: 0,
  pages: 0,
  hiddenCount: 0,
  hasMore: false,
};

const EMPTY_SUMMARY = {
  totalActiveCampaigns: 0,
  totalSpend: 0,
  averageRoas: 0,
  fatigued: 0,
  needsAttention: 0,
};

export default function CampaignsPage() {
  const router = useRouter();

  const [userTier, setUserTier] = useState<UserTier>('free');
  const [userLoading, setUserLoading] = useState(true);

  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [campaignLoading, setCampaignLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [healthFilter, setHealthFilter] = useState('all');

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState<CampaignPagination>(EMPTY_PAGINATION);

  const [summary, setSummary] =
    useState(EMPTY_SUMMARY);

  const [upgradeLoading, setUpgradeLoading] =
    useState(false);

  const isPro = userTier === 'pro';

  const hiddenCount = useMemo(() => {
    if (isPro) {
      return 0;
    }

    if (pagination.hiddenCount > 0) {
      return pagination.hiddenCount;
    }

    return Math.max(
      pagination.total - campaigns.length,
      0
    );
  }, [
    isPro,
    pagination.hiddenCount,
    pagination.total,
    campaigns.length,
  ]);

  const loadCurrentUser = useCallback(async () => {
    try {
      setUserLoading(true);

      const response =
        await apiClient.get<MeResponse>('/auth/me');

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

  const loadCampaigns = useCallback(async () => {
    try {
      setCampaignLoading(true);

      const response =
        await apiClient.get<CampaignApiResponse>(
          '/dashboard/campaigns',
          {
            params: {
              search:
                searchQuery.trim() || undefined,

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

      const responseData = response.data;

      if (!responseData?.success) {
        throw new Error(
          responseData?.message ||
            'Failed to load campaigns'
        );
      }

      const data = responseData.data;

      const nextCampaigns =
        Array.isArray(data?.campaigns)
          ? data.campaigns
          : [];

      const nextPagination =
        data?.pagination
          ? {
              page:
                Number(data.pagination.page) || 1,

              limit:
                Number(data.pagination.limit) || 20,

              total:
                Number(data.pagination.total) || 0,

              pages:
                Number(data.pagination.pages) || 0,

              hiddenCount:
                Number(
                  data.pagination.hiddenCount
                ) || 0,

              hasMore:
                Boolean(
                  data.pagination.hasMore
                ),
            }
          : EMPTY_PAGINATION;

      setCampaigns(nextCampaigns);
      setPagination(nextPagination);

      if (data?.access) {
        setUserTier(
          data.access.isPro
            ? 'pro'
            : 'free'
        );
      }
    } catch (error: any) {
      console.error(
        'Failed to load campaigns:',
        error?.response?.data || error
      );

      setCampaigns([]);
      setPagination(EMPTY_PAGINATION);
    } finally {
      setCampaignLoading(false);
    }
  }, [
    searchQuery,
    statusFilter,
    healthFilter,
    page,
  ]);

  const loadSummary = useCallback(async () => {
    try {
      const response =
        await apiClient.get<SummaryApiResponse>(
          '/dashboard/campaigns/summary'
        );

      const responseData = response.data;

      if (!responseData?.success) {
        throw new Error(
          responseData?.message ||
            'Failed to load campaign summary'
        );
      }

      const data = responseData.data;

      setSummary({
        totalActiveCampaigns:
          Number(
            data?.totalActiveCampaigns
          ) || 0,

        totalSpend:
          Number(data?.totalSpend) || 0,

        averageRoas:
          Number(data?.averageRoas) || 0,

        fatigued:
          Number(data?.fatigued) || 0,

        needsAttention:
          Number(data?.needsAttention) || 0,
      });
    } catch (error: any) {
      console.error(
        'Failed to load campaign summary:',
        error?.response?.data || error
      );

      setSummary(EMPTY_SUMMARY);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
    loadSummary();
  }, [
    loadCurrentUser,
    loadSummary,
  ]);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  useEffect(() => {
    setPage(1);
  }, [
    searchQuery,
    statusFilter,
    healthFilter,
  ]);

  const handleViewInsights = (
    campaignId: string
  ) => {
    if (!isPro) {
      router.push('/pricing');
      return;
    }

    router.push(
      `/dashboard/insights?id=${encodeURIComponent(
        campaignId
      )}`
    );
  };

  const handleUpgrade = async () => {
    if (upgradeLoading) {
      return;
    }

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

  return (
    <div className="w-full space-y-6 bg-transparent p-4 md:p-6">

      <CampaignHeader
        userTier={userTier}
      />

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

        {!isPro && hiddenCount > 0 && (
          <ProUpgradeBanner
            hiddenCount={hiddenCount}
            onUpgrade={handleUpgrade}
          />
        )}
      </div>

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
                  Math.max(
                    current - 1,
                    1
                  )
                )
              }
              className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-accent)] disabled:cursor-not-allowed disabled:opacity-40"
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
              className="rounded-lg border border-[var(--border-color)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-accent)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

          </div>
        )}
    </div>
  );
}