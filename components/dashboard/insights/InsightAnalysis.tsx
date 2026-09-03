'use client';

import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface InsightsAnalysisGridProps {
  whatIsWorking: string[];
  whatNeedsFixing: string[];
}

export function InsightsAnalysisGrid({
  whatIsWorking,
  whatNeedsFixing,
}: InsightsAnalysisGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-xl border border-[var(--border-color)] p-5 space-y-3">
        <div className="flex items-center gap-2 text-[var(--accent-teal)] font-bold text-sm">
          <CheckCircle2 className="h-5 w-5" />
          What's Working Well
        </div>

        <ul className="space-y-2.5">
          {whatIsWorking.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 p-2.5 rounded-lg border border-[var(--border-color)] text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-teal)] mt-1.5 shrink-0" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
          <AlertTriangle className="h-5 w-5" />
          What Needs Attention
        </div>

        <ul className="space-y-2.5">
          {whatNeedsFixing.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 p-2.5 rounded-lg border border-[var(--border-color)] text-xs"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}