'use client';

import { Lock, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react';

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused';
  healthStatus: 'Profitable' | 'Fatigued' | 'Learning';
  spend: number;
  clicks: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversions: number;
  impressions: number;
  frequency: number;
}

interface CampaignTableProps {
  campaigns: CampaignData[];
  isPro: boolean;
  onViewInsights: (id: string) => void;
  onUnlockPro: () => void;
}

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
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">CAMPAIGN NAME</th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">STATUS</th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">HEALTH DIAGNOSTIC</th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">SPEND</th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">CLICKS</th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">
              <div className="flex items-center gap-1">
                <span>CTR</span>
                {!isPro && <Lock className="h-3 w-3 text-amber-500" />}
              </div>
            </th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">
              <div className="flex items-center gap-1">
                <span>ROAS</span>
                {!isPro && <Lock className="h-3 w-3 text-amber-500" />}
              </div>
            </th>
            <th style={{ color: 'var(--text-primary)' }} className="p-4 font-semibold opacity-70">ACTIONS</th>
          </tr>
        </thead>
        <tbody style={{ borderColor: 'var(--border-color)' }} className="divide-y">
          {campaigns.map((cmp) => (
            <tr
              key={cmp.id}
              style={{ borderColor: 'var(--border-color)' }}
              className="hover:bg-white/5 transition-colors"
            >
              <td style={{ color: 'var(--text-primary)' }} className="p-4 font-medium">{cmp.name}</td>

              <td className="p-4">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${
                    cmp.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                      : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                  }`}
                >
                  {cmp.status}
                </span>
              </td>

              <td className="p-4">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    cmp.healthStatus === 'Profitable'
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30'
                      : cmp.healthStatus === 'Fatigued'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {cmp.healthStatus}
                </span>
              </td>

              <td style={{ color: 'var(--text-primary)' }} className="p-4 font-medium">
                ${cmp.spend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
              <td style={{ color: 'var(--text-primary)' }} className="p-4 font-medium">{cmp.clicks.toLocaleString()}</td>

              <td style={{ color: 'var(--text-primary)' }} className="p-4">
                {isPro ? (
                  `${cmp.ctr}%`
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="opacity-30 blur-sm select-none">2.4%</span>
                    <Lock className="h-3 w-3 text-amber-500 shrink-0" />
                  </div>
                )}
              </td>

              <td className="p-4">
                {isPro ? (
                  <div className="flex items-center gap-1.5 font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-2 py-1 rounded-lg w-fit">
                    <span>{cmp.roas}x</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-teal-400" />
                  </div>
                ) : (
                  <button
                    onClick={onUnlockPro}
                    className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-lg hover:bg-amber-500/20 transition-colors"
                  >
                    <Lock className="h-3 w-3 text-amber-400" />
                    <span>Unlock ROAS</span>
                  </button>
                )}
              </td>

              <td className="p-4">
                <button
                  onClick={() => onViewInsights(cmp.id)}
                  className="rounded bg-teal-500/10 px-2.5 py-1 text-[11px] font-semibold text-teal-400 hover:bg-teal-500/20 transition-colors flex items-center gap-1 border border-teal-500/30"
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
    </div>
  );
}