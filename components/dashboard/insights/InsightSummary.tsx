'use client';

import { Sparkles } from 'lucide-react';

interface InsightsSummaryProps {
  summary: string;
  healthScore: number;
}

export function InsightsSummary({
  summary,
  healthScore,
}: InsightsSummaryProps) {
  const score = Math.min(100, Math.max(0, Number(healthScore) || 0));

  const scoreColor =
    score >= 80
      ? 'var(--accent-teal)'
      : score >= 60
      ? '#f59e0b'
      : '#f43f5e';

  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
      className="flex flex-col items-start justify-between gap-6 rounded-xl border p-6 md:flex-row md:items-center"
    >
      <div className="max-w-2xl space-y-2">
        <div
          style={{ color: 'var(--primary)' }}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="h-4 w-4" />
          Performance Summary
        </div>

        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-sm leading-relaxed md:text-base"
        >
          {summary || 'No performance summary is available yet.'}
        </p>
      </div>

      <div
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: 'var(--card-bg)',
        }}
        className="min-w-[140px] rounded-xl border p-4 text-center"
      >
        <span
          style={{ color: 'var(--text-secondary)' }}
          className="block text-xs font-medium"
        >
          Health Score
        </span>

        <span
          style={{ color: scoreColor }}
          className="text-3xl font-extrabold"
        >
          {score}/100
        </span>
      </div>
    </div>
  );
}