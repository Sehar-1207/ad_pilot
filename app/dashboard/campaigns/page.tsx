'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CampaignHeader from '@/components/dashboard/campaign/CampaignHeader';
import CampaignMetrics from '@/components/dashboard/campaign/CompaignMetrics';
import CampaignFilters from '@/components/dashboard/campaign/CompaignFilter';
import CampaignTable, { CampaignData } from '@/components/dashboard/campaign/CompaignTable';
import ProUpgradeBanner from '@/components/dashboard/campaign/ProBanner';

type UserTier = 'free' | 'pro';

const MOCK_CAMPAIGNS: CampaignData[] = [
  {
    id: 'cmp_1',
    name: 'Summer Retargeting - Conversions',
    status: 'active',
    healthStatus: 'Profitable',
    spend: 1240.0,
    clicks: 3420,
    ctr: 2.8,
    cpc: 0.36,
    roas: 3.4,
    conversions: 142,
    impressions: 122140,
    frequency: 2.1,
  },
  {
    id: 'cmp_2',
    name: 'Lookalike Audience - Creative B',
    status: 'active',
    healthStatus: 'Profitable',
    spend: 850.5,
    clicks: 1910,
    ctr: 1.9,
    cpc: 0.44,
    roas: 2.1,
    conversions: 68,
    impressions: 100520,
    frequency: 1.8,
  },
  {
    id: 'cmp_3',
    name: 'Brand Awareness - Top of Funnel',
    status: 'paused',
    healthStatus: 'Fatigued',
    spend: 410.0,
    clicks: 980,
    ctr: 1.2,
    cpc: 0.41,
    roas: 1.4,
    conversions: 19,
    impressions: 81660,
    frequency: 4.2,
  },
  {
    id: 'cmp_4',
    name: 'Holiday Promo - Video Reels',
    status: 'active',
    healthStatus: 'Learning',
    spend: 620.0,
    clicks: 1450,
    ctr: 2.1,
    cpc: 0.42,
    roas: 2.9,
    conversions: 54,
    impressions: 69040,
    frequency: 1.4,
  },
  {
    id: 'cmp_5',
    name: 'VIP Customer Retention',
    status: 'active',
    healthStatus: 'Profitable',
    spend: 1150.0,
    clicks: 2800,
    ctr: 3.1,
    cpc: 0.41,
    roas: 4.2,
    conversions: 110,
    impressions: 90320,
    frequency: 2.3,
  },
];

export default function CampaignsPage() {
  const router = useRouter();
  const [userTier, setUserTier] = useState<UserTier>('free');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [healthFilter, setHealthFilter] = useState<string>('all');

  const isPro = userTier === 'pro';
  const MAX_FREE_VISIBLE = 3;

  const handleViewInsights = (campaignId: string) => {
    router.push(`/dashboard/insights?id=${campaignId}`);
  };

  const filteredCampaigns = MOCK_CAMPAIGNS.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesHealth = healthFilter === 'all' || campaign.healthStatus === healthFilter;
    return matchesSearch && matchesStatus && matchesHealth;
  });

  const visibleCampaigns = isPro ? filteredCampaigns : filteredCampaigns.slice(0, MAX_FREE_VISIBLE);
  const hiddenCount = filteredCampaigns.length - MAX_FREE_VISIBLE;

  const activeCount = MOCK_CAMPAIGNS.filter((c) => c.status === 'active').length;
  const totalSpend = MOCK_CAMPAIGNS.reduce((acc, curr) => acc + curr.spend, 0);
  const avgRoas = (
    MOCK_CAMPAIGNS.reduce((acc, curr) => acc + curr.roas, 0) / MOCK_CAMPAIGNS.length
  ).toFixed(1);
  const fatiguedCount = MOCK_CAMPAIGNS.filter((c) => c.healthStatus === 'Fatigued').length;

  return (
    <div className="w-full space-y-6 bg-transparent p-4 md:p-6">
      <CampaignHeader
        userTier={userTier}
        onToggleTier={() => setUserTier(isPro ? 'free' : 'pro')}
      />

      <CampaignMetrics
        activeCount={activeCount}
        totalSpend={totalSpend}
        avgRoas={avgRoas}
        fatiguedCount={fatiguedCount}
        isPro={isPro}
      />

      <CampaignFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        healthFilter={healthFilter}
        onHealthChange={setHealthFilter}
      />

      <div
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        className="relative overflow-hidden rounded-xl border shadow-sm"
      >
        <CampaignTable
          campaigns={visibleCampaigns}
          isPro={isPro}
          onViewInsights={handleViewInsights}
          onUnlockPro={() => setUserTier('pro')}
        />

        {!isPro && hiddenCount > 0 && (
          <ProUpgradeBanner
            hiddenCount={hiddenCount}
            onUpgrade={() => setUserTier('pro')}
          />
        )}
      </div>
    </div>
  );
}