'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  RefreshCw,
  Lock,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Layers,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

type UserTier = 'free' | 'pro';

interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  healthStatus: 'Profitable' | 'Learning' | 'Fatigued';
  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversions: number;
  impressions?: number;
  frequency?: number;
}

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

  const totalSpend = MOCK_CAMPAIGNS.reduce((acc, curr) => acc + curr.spend, 0);
  const avgRoas = (
    MOCK_CAMPAIGNS.reduce((acc, curr) => acc + curr.roas, 0) / MOCK_CAMPAIGNS.length
  ).toFixed(1);
  const fatiguedCount = MOCK_CAMPAIGNS.filter((c) => c.healthStatus === 'Fatigued').length;

  return (
    <div className="space-y-6 p-4 md:p-6 bg-slate-50/50 text-slate-800 min-h-screen">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Campaign Performance</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time Meta advertising analytics and campaign health diagnostics.
          </p>
        </div>

        <button
          onClick={() => setUserTier(isPro ? 'free' : 'pro')}
          className="self-start sm:self-auto rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
        >
          Preview Mode: <span className="font-bold text-teal-600 uppercase">{userTier} Tier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Active Campaigns</span>
            <Layers className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {MOCK_CAMPAIGNS.filter((c) => c.status === 'active').length}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Ad Spend</span>
            <DollarSign className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            ${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Average ROAS</span>
            <TrendingUp className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-teal-600">
            {isPro ? `${avgRoas}x` : <span className="text-slate-300 blur-sm select-none">3.2x</span>}
          </div>
          {!isPro && (
            <span className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-200 px-1.5 py-0.5 rounded">
              <Lock className="h-2.5 w-2.5" /> PRO
            </span>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Needs Attention</span>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-600">{fatiguedCount} Fatigued</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-teal-500 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>

          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setHealthFilter('all')}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                healthFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setHealthFilter('Profitable')}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                healthFilter === 'Profitable'
                  ? 'bg-teal-50 text-teal-700 border border-teal-200 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Profitable
            </button>
            <button
              onClick={() => setHealthFilter('Fatigued')}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                healthFilter === 'Fatigued'
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Fatigued
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>Last 7 Days</span>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600 transition-colors shadow-sm">
            <RefreshCw className="h-3.5 w-3.5" />
            Sync Meta Data
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-slate-500">
              <tr>
                <th className="p-4 font-semibold">CAMPAIGN NAME</th>
                <th className="p-4 font-semibold">STATUS</th>
                <th className="p-4 font-semibold">HEALTH DIAGNOSTIC</th>
                <th className="p-4 font-semibold">SPEND</th>
                <th className="p-4 font-semibold">CLICKS</th>
                <th className="p-4 font-semibold">
                  <div className="flex items-center gap-1">
                    <span>CTR</span>
                    {!isPro && <Lock className="h-3 w-3 text-amber-500" />}
                  </div>
                </th>
                <th className="p-4 font-semibold">
                  <div className="flex items-center gap-1">
                    <span>ROAS</span>
                    {!isPro && <Lock className="h-3 w-3 text-amber-500" />}
                  </div>
                </th>
                <th className="p-4 font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleCampaigns.map((cmp) => (
                <tr key={cmp.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{cmp.name}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                        cmp.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {cmp.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        cmp.healthStatus === 'Profitable'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200'
                          : cmp.healthStatus === 'Fatigued'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {cmp.healthStatus}
                    </span>
                  </td>

                  <td className="p-4 text-slate-700">
                    ${cmp.spend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-4 text-slate-700">{cmp.clicks.toLocaleString()}</td>

                  <td className="p-4 text-slate-700">
                    {isPro ? (
                      `${cmp.ctr}%`
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-300 blur-sm select-none">2.4%</span>
                        <Lock className="h-3 w-3 text-amber-500 shrink-0" />
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {isPro ? (
                      <div className="flex items-center gap-1.5 font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2 py-1 rounded-lg w-fit">
                        <span>{cmp.roas}x</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-teal-500" />
                      </div>
                    ) : (
                      <button
                        onClick={() => setUserTier('pro')}
                        className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <Lock className="h-3 w-3 text-amber-600" />
                        <span>Unlock ROAS</span>
                      </button>
                    )}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleViewInsights(cmp.id)}
                      className="rounded bg-teal-50 px-2.5 py-1 text-[11px] font-semibold text-teal-700 hover:bg-teal-100 transition-colors flex items-center gap-1 border border-teal-200"
                    >
                      <Sparkles className="h-3 w-3 text-teal-600" />
                      View AI Insights
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isPro && hiddenCount > 0 && (
          <div className="relative border-t border-slate-200 bg-gradient-to-b from-white/90 to-slate-50/90 p-8 text-center backdrop-blur-md">
            <div className="mx-auto max-w-md space-y-3">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 border border-teal-200 text-teal-600">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {hiddenCount} More Campaigns Locked
              </h3>
              <p className="text-xs text-slate-500">
                Free plan users can view up to 3 synced Meta campaigns. Upgrade to Pro to analyze
                all your campaigns and unlock real-time Gemini AI recommendations.
              </p>
              <button
                onClick={() => setUserTier('pro')}
                className="rounded-xl bg-teal-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-all active:scale-95"
              >
                Upgrade to Pro ($29/mo)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}