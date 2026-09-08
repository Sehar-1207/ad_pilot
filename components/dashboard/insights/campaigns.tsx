'use client';

import { ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface Campaign {
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
      return health || 'Unknown';
  }
}

function healthClass(health: string) {
  switch (health) {
    case 'PROFITABLE':
      return 'border-teal-500/30 bg-teal-500/10 text-teal-400';

    case 'FATIGUED':
      return 'border-rose-500/30 bg-rose-500/10 text-rose-400';

    case 'NEEDS_ATTENTION':
      return 'border-red-500/30 bg-red-500/10 text-red-400';

    case 'NORMAL':
      return 'border-amber-500/30 bg-amber-500/10 text-amber-400';

    default:
      return 'border-[var(--border-color)] bg-transparent text-[var(--text-secondary)]';
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
          style={{
            color: 'var(--text-secondary)',
            borderColor: 'var(--border-color)',
          }}
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>

        <button
          type="button"
          onClick={onReAnalyze}
          disabled={loadingInsights}
          style={{
            color: 'var(--primary)',
            borderColor: 'var(--primary)',
          }}
          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${
              loadingInsights ? 'animate-spin' : ''
            }`}
          />

          {loadingInsights ? 'Analyzing...' : 'Re-Analyze Insights'}
        </button>
      </div>

      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        className="flex flex-col justify-between gap-4 rounded-xl border p-6 md:flex-row md:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                campaign.status.toLowerCase() === 'active'
                  ? 'border-teal-500/30 bg-teal-500/10 text-teal-400'
                  : 'border-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
            >
              {campaign.status}
            </span>

            <span
              className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${healthClass(
                campaign.health
              )}`}
            >
              {healthLabel(campaign.health)}
            </span>

            <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400">
              PRO
            </span>
          </div>

          <h1
            style={{ color: 'var(--text-primary)' }}
            className="mt-2 text-2xl font-bold"
          >
            {campaign.name}
          </h1>

          <p
            style={{ color: 'var(--text-secondary)' }}
            className="mt-1 text-xs"
          >
            AI-powered diagnostic breakdown and actionable optimization
            suggestions.
          </p>
        </div>

        <div
          style={{ borderColor: 'var(--border-color)' }}
          className="grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-4 md:border-l md:border-t-0 md:pl-6 md:pt-0"
        >
          <div>
            <span
              style={{ color: 'var(--text-secondary)' }}
              className="block text-[11px] font-medium"
            >
              Ad Spend
            </span>

            <span
              style={{ color: 'var(--text-primary)' }}
              className="text-sm font-bold"
            >
              $
              {Number(campaign.spend || 0).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div>
            <span
              style={{ color: 'var(--text-secondary)' }}
              className="block text-[11px] font-medium"
            >
              Return (ROAS)
            </span>

            <span className="text-sm font-bold text-teal-400">
              {Number(campaign.roas || 0).toFixed(2)}x
            </span>
          </div>

          <div>
            <span
              style={{ color: 'var(--text-secondary)' }}
              className="block text-[11px] font-medium"
            >
              Conversions
            </span>

            <span
              style={{ color: 'var(--text-primary)' }}
              className="text-sm font-bold"
            >
              {Number(campaign.conversions || 0).toLocaleString()}
            </span>
          </div>

          <div>
            <span
              style={{ color: 'var(--text-secondary)' }}
              className="block text-[11px] font-medium"
            >
              Click Rate
            </span>

            <span
              style={{ color: 'var(--text-primary)' }}
              className="text-sm font-bold"
            >
              {Number(campaign.ctr || 0).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </>
  );
}