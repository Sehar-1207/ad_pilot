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
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
      className="space-y-4 rounded-xl border p-6"
    >
      <div
        style={{ color: 'var(--text-primary)' }}
        className="flex items-center gap-2 text-base font-bold"
      >
        <Lightbulb className="h-5 w-5 text-amber-500" />
        Suggested Changes to Make Right Now
      </div>

      <p
        style={{ color: 'var(--text-secondary)' }}
        className="text-xs"
      >
        Clear, non-technical steps recommended to improve campaign performance.
      </p>

      {actions.length === 0 ? (
        <div
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
          }}
          className="rounded-lg border p-4 text-sm"
        >
          No recommended actions are available for this campaign.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
          {actions.map((action) => (
            <div
              key={action.id}
              style={{
                borderColor: action.applied
                  ? 'var(--accent-teal)'
                  : 'var(--border-color)',
              }}
              className="rounded-xl border p-4 transition-all hover:border-[var(--primary)]"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <h4
                  style={{ color: 'var(--text-primary)' }}
                  className="text-sm font-bold"
                >
                  {action.title}
                </h4>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-bold ${
                      action.impact.toLowerCase() === 'high'
                        ? 'border-rose-500 text-rose-500'
                        : action.impact.toLowerCase() === 'medium'
                          ? 'border-amber-500 text-amber-500'
                          : 'border-[var(--primary)] text-[var(--primary)]'
                    }`}
                  >
                    {action.impact} Impact
                  </span>

                  <span
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-secondary)',
                    }}
                    className="rounded border px-2 py-0.5 text-[10px] font-semibold"
                  >
                    {action.effort}
                  </span>
                </div>
              </div>

              <p
                style={{ color: 'var(--text-secondary)' }}
                className="text-xs leading-relaxed"
              >
                {action.description}
              </p>

              {action.applied !== undefined && (
                <div
                  style={{ borderColor: 'var(--border-color)' }}
                  className="mt-3 border-t pt-3"
                >
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
      )}
    </div>
  );
}