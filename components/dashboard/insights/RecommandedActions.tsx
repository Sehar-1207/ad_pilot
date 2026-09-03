'use client';

import { Lightbulb } from 'lucide-react';

interface RecommendedAction {
  id: string;
  title: string;
  impact: string;
  effort: string;
  description: string;
  applied?: boolean;
}

interface RecommendedActionsListProps {
  actions: RecommendedAction[];
}

export function RecommendedActionsList({
  actions,
}: RecommendedActionsListProps) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] p-6 space-y-4">
      <div className="flex items-center gap-2 font-bold text-base">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Suggested Changes to Make Right Now
      </div>

      <p className="text-xs text-[var(--text-secondary)]">
        Clear, non-technical steps recommended to improve campaign performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`rounded-xl border p-4 transition-all ${
              action.applied
                ? 'border-[var(--accent-teal)]'
                : 'border-[var(--border-color)] hover:border-[var(--primary)]'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="text-sm font-bold">
                {action.title}
              </h4>

              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    action.impact === 'High'
                      ? 'border-rose-500 text-rose-500'
                      : 'border-[var(--primary)] text-[var(--primary)]'
                  }`}
                >
                  {action.impact} Impact
                </span>

                <span className="text-[10px] font-semibold border border-[var(--border-color)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                  {action.effort}
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {action.description}
            </p>

            {action.applied !== undefined && (
              <div className="pt-3 mt-3 border-t border-[var(--border-color)]">
                <span
                  className={`text-xs font-semibold ${
                    action.applied
                      ? 'text-[var(--accent-teal)]'
                      : 'text-[var(--text-secondary)]'
                  }`}
                >
                  {action.applied
                    ? 'Marked as Applied'
                    : 'Recommended Action'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}