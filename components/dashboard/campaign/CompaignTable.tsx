'use client';

import {
  Lock,
  Sparkles,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused';

  // Backend sends: PROFITABLE, FATIGUED, NEEDS_ATTENTION, NORMAL
  health: string;

  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversions: number;
  impressions: number;
  frequency?: number;
  reach?: number;
  cpm?: number;
  costPerConversion?: number;
  revenue?: number;
  lastSyncedAt?: string;
}

interface CampaignTableProps {
  campaigns: CampaignData[];
  isPro: boolean;
  onViewInsights: (id: string) => void;
  onUnlockPro: () => void;
}

const formatHealth = (health: string) => {
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
};

const getHealthClasses = (health: string) => {
  switch (health) {
    case 'PROFITABLE':
      return 'bg-teal-500/10 text-teal-400 border border-teal-500/30';

    case 'FATIGUED':
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';

    case 'NEEDS_ATTENTION':
      return 'bg-red-500/10 text-red-400 border border-red-500/30';

    case 'NORMAL':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';

    default:
      return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
  }
};

export default function CampaignTable({
  campaigns,
  isPro,
  onViewInsights,
  onUnlockPro,
}: CampaignTableProps) {
  return (
    <div className="w-full overflow-x-auto bg-transparent">
      <table className="w-full text-left text-xs whitespace-nowrap">
        <thead
          style={{ borderColor: 'var(--border-color)' }}
          className="border-b bg-transparent"
        >
          <tr>
            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              CAMPAIGN NAME
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              STATUS
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              HEALTH DIAGNOSTIC
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              SPEND
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              CLICKS
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              <div className="flex items-center gap-1">
                <span>CTR</span>

                {!isPro && (
                  <Lock className="h-3 w-3 text-amber-500" />
                )}
              </div>
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              <div className="flex items-center gap-1">
                <span>ROAS</span>

                {!isPro && (
                  <Lock className="h-3 w-3 text-amber-500" />
                )}
              </div>
            </th>

            <th
              style={{ color: 'var(--text-primary)' }}
              className="p-4 font-semibold opacity-70"
            >
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody
          style={{ borderColor: 'var(--border-color)' }}
          className="divide-y"
        >
          {campaigns.map((cmp) => (
            <tr
              key={cmp.id}
              style={{ borderColor: 'var(--border-color)' }}
              className="transition-colors hover:bg-white/5"
            >
              {/* Campaign */}
              <td
                style={{ color: 'var(--text-primary)' }}
                className="p-4 font-medium"
              >
                {cmp.name}
              </td>

              {/* Status */}
              <td className="p-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                    cmp.status === 'active'
                      ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                      : 'border border-slate-500/30 bg-slate-500/10 text-slate-400'
                  }`}
                >
                  {cmp.status}
                </span>
              </td>

              {/* Health */}
              <td className="p-4">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${getHealthClasses(
                    cmp.health
                  )}`}
                >
                  {formatHealth(cmp.health)}
                </span>
              </td>

              {/* Spend */}
              <td
                style={{ color: 'var(--text-primary)' }}
                className="p-4 font-medium"
              >
                $
                {Number(cmp.spend || 0).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </td>

              {/* Clicks */}
              <td
                style={{ color: 'var(--text-primary)' }}
                className="p-4 font-medium"
              >
                {Number(cmp.clicks || 0).toLocaleString()}
              </td>

              {/* CTR */}
              <td
                style={{ color: 'var(--text-primary)' }}
                className="p-4"
              >
                {isPro ? (
                  `${Number(cmp.ctr || 0).toFixed(2)}%`
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="select-none opacity-30 blur-sm">
                      2.40%
                    </span>

                    <Lock className="h-3 w-3 shrink-0 text-amber-500" />
                  </div>
                )}
              </td>

              {/* ROAS */}
              <td className="p-4">
                {isPro ? (
                  <div className="flex w-fit items-center gap-1.5 rounded-lg border border-teal-500/30 bg-teal-500/10 px-2 py-1 font-bold text-teal-400">
                    <span>
                      {Number(cmp.roas || 0).toFixed(2)}x
                    </span>

                    <ArrowUpRight className="h-3.5 w-3.5 text-teal-400" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={onUnlockPro}
                    className="flex items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[11px] font-bold text-amber-400 transition-colors hover:bg-amber-500/20"
                  >
                    <Lock className="h-3 w-3 text-amber-400" />
                    <span>Unlock ROAS</span>
                  </button>
                )}
              </td>

              {/* AI Insights */}
              <td className="p-4">
                <button
                  type="button"
                  onClick={() => onViewInsights(cmp.id)}
                  className="flex items-center gap-1 rounded border border-teal-500/30 bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-400 transition-colors hover:bg-teal-500/20"
                >
                  <Sparkles className="h-3 w-3 text-teal-400" />

                  View AI Insights

                  <ChevronRight className="h-3 w-3" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {campaigns.length === 0 && (
        <div
          style={{ color: 'var(--text-primary)' }}
          className="p-10 text-center text-sm opacity-60"
        >
          No campaigns found.
        </div>
      )}
    </div>
  );
}

