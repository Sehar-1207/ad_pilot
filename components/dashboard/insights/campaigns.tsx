'use client';

import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Campaign {
  id: string;
  name: string;
  status: string;
  health: string;
  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversions: number;
  impressions?: number;
  frequency?: number;
}

interface CampaignHeaderProps {
  campaign: Campaign;
  loadingInsights: boolean;
  onReAnalyze: () => void;
}

function healthLabel(health: string) {
  switch (health) {
    case 'PROFITABLE':
      return 'Profitable';
    case 'FATIGUED':
      return 'Fatigued';
    case 'NEEDS_ATTENTION':
      return 'Needs Attention';
    case 'NORMAL':
      return 'Learning';
    default:
      return health;
  }
}

function healthClass(health: string) {
  switch (health) {
    case 'PROFITABLE':
      return 'border-[var(--accent-teal)] text-[var(--accent-teal)]';
    case 'FATIGUED':
    case 'NEEDS_ATTENTION':
      return 'border-rose-500 text-rose-500';
    case 'NORMAL':
      return 'border-amber-500 text-amber-500';
    default:
      return 'border-[var(--border-color)] text-[var(--text-secondary)]';
  }
}

export function CampaignHeader({
  campaign,
  loadingInsights,
  onReAnalyze,
}: CampaignHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push('/dashboard/campaigns')}
          className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] px-3 py-1.5 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>

        <button
          type="button"
          onClick={onReAnalyze}
          disabled={loadingInsights}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] border border-[var(--primary)] px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${
              loadingInsights ? 'animate-spin' : ''
            }`}
          />

          {loadingInsights ? 'Analyzing...' : 'Re-Analyze Insights'}
        </button>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase border ${
                campaign.status === 'active'
                  ? 'border-[var(--accent-teal)] text-[var(--accent-teal)]'
                  : 'border-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
            >
              {campaign.status}
            </span>

            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-bold border ${healthClass(
                campaign.health
              )}`}
            >
              {healthLabel(campaign.health)}
            </span>

            <span className="rounded-md px-2 py-0.5 text-[10px] font-bold border border-amber-500 text-amber-500">
              PRO
            </span>
          </div>

          <h1 className="text-2xl font-bold mt-2">
            {campaign.name}
          </h1>

          <p className="text-xs text-[var(--text-secondary)] mt-1">
            AI-powered diagnostic breakdown and actionable optimization suggestions.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t md:border-t-0 md:border-l border-[var(--border-color)] pt-4 md:pt-0 md:pl-6">
          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">
              Ad Spend
            </span>

            <span className="text-sm font-bold">
              $
              {campaign.spend.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">
              Return (ROAS)
            </span>

            <span className="text-sm font-bold text-[var(--accent-teal)]">
              {campaign.roas.toFixed(1)}x
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">
              Conversions
            </span>

            <span className="text-sm font-bold">
              {campaign.conversions.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[var(--text-secondary)] block font-medium">
              Click Rate
            </span>

            <span className="text-sm font-bold">
              {campaign.ctr.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}