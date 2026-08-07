'use client';

import { DollarSign, Eye, MousePointer, TrendingUp, ArrowUpRight } from 'lucide-react';

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Total Spend</span>
          <div className="p-2.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-xl">
            <DollarSign size={20} />
          </div>
        </div>
        <p className="text-3xl font-black text-[var(--text-primary)] mt-3">$2,500.50</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[var(--accent-teal)]">
          <ArrowUpRight size={14} />
          <span>+12.4% vs last week</span>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Impressions</span>
          <div className="p-2.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-xl">
            <Eye size={20} />
          </div>
        </div>
        <p className="text-3xl font-black text-[var(--text-primary)] mt-3">142,800</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[var(--accent-teal)]">
          <ArrowUpRight size={14} />
          <span>+8.1% vs last week</span>
        </div>
      </div>
      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-color)] shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Total Clicks</span>
          <div className="p-2.5 bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] rounded-xl">
            <MousePointer size={20} />
          </div>
        </div>
        <p className="text-3xl font-black text-[var(--text-primary)] mt-3">6,310</p>
        <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[var(--accent-teal)]">
          <ArrowUpRight size={14} />
          <span>+5.2% CTR Avg</span>
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--brand-blue)]/30 shadow-md relative overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">Average ROAS</span>
          <div className="p-2.5 bg-[var(--accent-teal)]/15 text-[var(--accent-teal)] rounded-xl font-bold">
            <TrendingUp size={20} />
          </div>
        </div>
        <p className="text-3xl font-black text-[var(--brand-teal)] mt-3">2.8x</p>
        <span className="inline-block mt-2 text-xs font-bold text-[var(--accent-teal)]">
          High Efficiency
        </span>
      </div>
    </div>
  );
}