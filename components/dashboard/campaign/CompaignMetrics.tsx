'use client';

import { Layers, DollarSign, TrendingUp, AlertTriangle, Lock } from 'lucide-react';

interface CampaignMetricsProps {
  activeCount: number;
  totalSpend: number;
  avgRoas: string;
  fatiguedCount: number;
  isPro: boolean;
}

export default function CampaignMetrics({
  activeCount,
  totalSpend,
  avgRoas,
  fatiguedCount,
  isPro,
}: CampaignMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        className="rounded-xl border p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--text-primary)' }} className="text-xs font-medium opacity-70">
            Total Active Campaigns
          </span>
          <Layers className="h-4 w-4 text-teal-400" />
        </div>
        <div style={{ color: 'var(--text-primary)' }} className="mt-2 text-2xl font-bold">
          {activeCount}
        </div>
      </div>
      <div
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        className="rounded-xl border p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--text-primary)' }} className="text-xs font-medium opacity-70">
            Total Ad Spend
          </span>
          <DollarSign className="h-4 w-4 text-teal-400" />
        </div>
        <div style={{ color: 'var(--text-primary)' }} className="mt-2 text-2xl font-bold">
          ${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        className="rounded-xl border p-4 shadow-sm relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--text-primary)' }} className="text-xs font-medium opacity-70">
            Average ROAS
          </span>
          <TrendingUp className="h-4 w-4 text-teal-400" />
        </div>
        <div className="mt-2 text-2xl font-bold text-teal-400">
          {isPro ? `${avgRoas}x` : <span className="opacity-30 blur-sm select-none">3.2x</span>}
        </div>
        {!isPro && (
          <span className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded">
            <Lock className="h-2.5 w-2.5" /> PRO
          </span>
        )}
      </div>

      <div
        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
        className="rounded-xl border p-4 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--text-primary)' }} className="text-xs font-medium opacity-70">
            Needs Attention
          </span>
          <AlertTriangle className="h-4 w-4 text-rose-500" />
        </div>
        <div className="mt-2 text-2xl font-bold text-rose-400">{fatiguedCount} Fatigued</div>
      </div>
    </div>
  );
}