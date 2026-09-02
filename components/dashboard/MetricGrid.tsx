'use client';

import {
  DollarSign,
  Eye,
  MousePointer,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';

interface MetricsGridProps {
  totalSpend?: number;
  impressions?: number;
  clicks?: number;
  roas?: number;
  spendChange?: number;
  impressionsChange?: number;
  clicksChange?: number;
}

export function MetricsGrid({
  totalSpend = 0,
  impressions = 0,
  clicks = 0,
  roas = 0,
  spendChange = 0,
  impressionsChange = 0,
  clicksChange = 0,
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      {/* Total Spend */}
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Total Spend
          </span>

          <div className="p-2.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-xl">
            <DollarSign size={20} />
          </div>
        </div>

        <p className="text-3xl font-black text-[var(--text-primary)] mt-3">
          ${totalSpend.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[var(--accent-teal)]">
          <ArrowUpRight size={14} />
          <span>
            {spendChange >= 0 ? '+' : ''}
            {spendChange}% vs last week
          </span>
        </div>
      </div>

      {/* Impressions */}
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Impressions
          </span>

          <div className="p-2.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-xl">
            <Eye size={20} />
          </div>
        </div>

        <p className="text-3xl font-black text-[var(--text-primary)] mt-3">
          {impressions.toLocaleString()}
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[var(--accent-teal)]">
          <ArrowUpRight size={14} />
          <span>
            {impressionsChange >= 0 ? '+' : ''}
            {impressionsChange}% vs last week
          </span>
        </div>
      </div>

      {/* Total Clicks */}
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Total Clicks
          </span>

          <div className="p-2.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-xl">
            <MousePointer size={20} />
          </div>
        </div>

        <p className="text-3xl font-black text-[var(--text-primary)] mt-3">
          {clicks.toLocaleString()}
        </p>

        <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[var(--accent-teal)]">
          <ArrowUpRight size={14} />
          <span>
            {clicksChange >= 0 ? '+' : ''}
            {clicksChange}% CTR Avg
          </span>
        </div>
      </div>

      {/* Average ROAS */}
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--brand-blue)]/30 shadow-md relative overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Average ROAS
          </span>

          <div className="p-2.5 bg-[var(--accent-teal)]/15 text-[var(--accent-teal)] rounded-xl font-bold">
            <TrendingUp size={20} />
          </div>
        </div>

        <p className="text-3xl font-black text-[var(--brand-teal)] mt-3">
          {roas.toFixed(1)}x
        </p>

        <span className="inline-block mt-2 text-xs font-bold text-[var(--accent-teal)]">
          High Efficiency
        </span>
      </div>

    </div>
  );
}