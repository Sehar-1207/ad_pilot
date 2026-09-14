'use client';

import { useCallback, useEffect, useState } from 'react';

import { HeaderBanner } from '@/components/dashboard/HeaderBanner';
import { ConnectionAlert } from '@/components/dashboard/ConnectionAlert';
import { MetricsGrid } from '@/components/dashboard/MetricGrid';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticalCharts';
import { GeminiAiCard } from '@/components/dashboard/GeminieCard';
import { CampaignsTable } from '@/components/dashboard/CampaignTable';

import {
  getDashboardOverview,
  getDashboardPerformance,
  getCampaigns,
  syncDashboard,
} from '@/api/dashboad';

import apiClient from '@/api/client';

interface DashboardOverview {
  totalActiveCampaigns: number;
  totalCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  averageRoas: number;
  averageCtr: number;
  totalClicks: number;
  totalImpressions: number;
  totalConversions: number;
  needsAttention: number;
}

interface BackendCampaign {
  id: string;
  name: string;
  status: string;
  health: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: number;
  roas?: number;
  reach?: number;
  cpc?: number;
  cpm?: number;
  conversions?: number;
  costPerConversion?: number;
  revenue?: number;
  adAccountId?: string;
  adAccountName?: string;
  lastSyncedAt?: string;
}

interface DashboardProfile {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'USER' | 'ADMIN';
  avatarUrl?: string | null;
  plan: 'FREE' | 'PRO';
  isMetaConnected: boolean;
  memberSince?: string;
}

interface CampaignTableItem {
  id: string;
  name: string;
  spend: string;
  clicks: string;
  ctr: string;
  roas: string;
  status: string;
  health?: string;
}

export default function DashboardPage() {
  const [overview, setOverview] =
    useState<DashboardOverview | null>(null);

  const [performance, setPerformance] =
    useState<unknown>(null);

  const [campaigns, setCampaigns] =
    useState<CampaignTableItem[]>([]);

  const [userPlan, setUserPlan] =
    useState<'free' | 'pro'>('free');

  const [isMetaConnected, setIsMetaConnected] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [syncing, setSyncing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        overviewResponse,
        performanceResponse,
        campaignsResponse,
        profileResponse,
      ] = await Promise.all([
        getDashboardOverview(),
        getDashboardPerformance('7d'),
        getCampaigns({
          page: 1,
          limit: 20,
        }),
        apiClient.get('/dashboard/profile'),
      ]);

      const overviewData =
        overviewResponse?.data ?? null;

      const performanceData =
        performanceResponse?.data ?? null;

      const campaignsPayload =
        campaignsResponse?.data ?? campaignsResponse ?? {};

      let backendCampaigns: BackendCampaign[] = [];

      if (Array.isArray(campaignsPayload)) {
        backendCampaigns = campaignsPayload;
      } else if (
        Array.isArray(campaignsPayload?.campaigns)
      ) {
        backendCampaigns =
          campaignsPayload.campaigns;
      } else if (
        Array.isArray(campaignsPayload?.data)
      ) {
        backendCampaigns =
          campaignsPayload.data;
      } else if (
        Array.isArray(campaignsPayload?.data?.campaigns)
      ) {
        backendCampaigns =
          campaignsPayload.data.campaigns;
      }

      const profile: DashboardProfile | null =
        profileResponse?.data?.data ??
        profileResponse?.data ??
        null;

      setOverview(overviewData);
      setPerformance(performanceData);

      const tableCampaigns: CampaignTableItem[] =
        backendCampaigns.map((campaign) => ({
          id: campaign.id,
          name: campaign.name,

          spend: `$${Number(
            campaign.spend ?? 0
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,

          clicks: Number(
            campaign.clicks ?? 0
          ).toLocaleString(),

          ctr: `${Number(
            campaign.ctr ?? 0
          ).toFixed(2)}%`,

          roas:
            campaign.roas !== undefined &&
              campaign.roas !== null
              ? `${Number(
                campaign.roas
              ).toFixed(2)}x`
              : '-',

          status: campaign.status,

          health: campaign.health,
        }));

      setCampaigns(tableCampaigns);

      if (profile) {
        setUserPlan(
          profile.plan === 'PRO'
            ? 'pro'
            : 'free'
        );

        setIsMetaConnected(
          Boolean(profile.isMetaConnected)
        );
      } else if (
        campaignsPayload?.plan === 'PRO'
      ) {
        setUserPlan('pro');
      } else {
        setUserPlan('free');
      }
    } catch (err) {
      console.error(
        'Dashboard loading error:',
        err
      );

      setError(
        'Failed to load dashboard data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      const response = await syncDashboard();
      console.log('Dashboard sync response:', response);
      await loadDashboard();
    } catch (err: any) {
      console.error('Dashboard sync error:', err);
      const message = err?.response?.data?.message || err?.response?.data?.error || err?.message || 'Failed to sync dashboard data. Please try again.';
      setError(message);
    } finally { setSyncing(false); }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-[var(--text-secondary)]">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[var(--text-primary)]">

      <HeaderBanner
        userPlan={userPlan}
        onSync={handleSync}
      />

      {syncing && (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-3 text-sm">
          Syncing your dashboard data...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <ConnectionAlert
        isConnected={isMetaConnected}
      />

      <MetricsGrid
        totalSpend={
          overview?.totalSpend ?? 0
        }
        impressions={
          overview?.totalImpressions ?? 0
        }
        clicks={
          overview?.totalClicks ?? 0
        }
        roas={
          overview?.averageRoas ?? 0
        }
      />

      <AnalyticsCharts />

      <GeminiAiCard
        userPlan={userPlan}
      />

      <CampaignsTable
        campaigns={campaigns}
        userPlan={userPlan}
      />

    </div>
  );
}