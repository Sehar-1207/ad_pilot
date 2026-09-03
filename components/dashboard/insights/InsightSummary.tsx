'use client';

import { Sparkles } from 'lucide-react';

interface InsightsSummaryProps {
  summary: string;
  healthScore: number;
}

export function InsightsSummary({ summary, healthScore }: InsightsSummaryProps) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-2 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          Performance Summary
        </div>

        <p className="text-sm md:text-base leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="border border-[var(--border-color)] rounded-xl p-4 text-center min-w-[140px]">
        <span className="text-xs text-[var(--text-secondary)] font-medium block">
          Health Score
        </span>

        <span
          className={`text-3xl font-extrabold ${
            healthScore >= 80
              ? 'text-[var(--accent-teal)]'
              : healthScore >= 60
              ? 'text-amber-500'
              : 'text-rose-500'
          }`}
        >
          {healthScore}/100
        </span>
      </div>
    </div>
  );
}