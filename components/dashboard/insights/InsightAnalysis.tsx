'use client';

import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface InsightsAnalysisGridProps {
  whatIsWorking?: string[];
  whatNeedsFixing?: string[];
}

export function InsightsAnalysisGrid({
  whatIsWorking = [],
  whatNeedsFixing = [],
}: InsightsAnalysisGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        className="space-y-3 rounded-xl border p-5"
      >
        <div
          style={{ color: 'var(--accent-teal)' }}
          className="flex items-center gap-2 text-sm font-bold"
        >
          <CheckCircle2 className="h-5 w-5" />
          What's Working Well
        </div>

        {whatIsWorking.length > 0 ? (
          <ul className="space-y-2.5">
            {whatIsWorking.map((item, index) => (
              <li
                key={`${item}-${index}`}
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                className="flex items-start gap-2.5 rounded-lg border p-2.5 text-xs"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: 'var(--accent-teal)' }}
                />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            style={{ color: 'var(--text-secondary)' }}
            className="rounded-lg border border-[var(--border-color)] p-3 text-xs"
          >
            No positive findings are available yet.
          </p>
        )}
      </div>

      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        className="space-y-3 rounded-xl border p-5"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-rose-500">
          <AlertTriangle className="h-5 w-5" />
          What Needs Attention
        </div>

        {whatNeedsFixing.length > 0 ? (
          <ul className="space-y-2.5">
            {whatNeedsFixing.map((item, index) => (
              <li
                key={`${item}-${index}`}
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                className="flex items-start gap-2.5 rounded-lg border p-2.5 text-xs"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />

                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            style={{ color: 'var(--text-secondary)' }}
            className="rounded-lg border border-[var(--border-color)] p-3 text-xs"
          >
            No issues have been identified.
          </p>
        )}
      </div>
    </div>
  );
}