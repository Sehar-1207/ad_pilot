
"use client";

import {
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ProUpgradeCardProps {
  onUpgrade: () => void;
}

export default function ProUpgradeCard({
  onUpgrade,
}: ProUpgradeCardProps) {
  const features = [
    "AI-powered campaign insights",
    "Campaign fatigue detection",
    "Smart performance recommendations",
    "Advanced campaign analytics",
  ];

  return (
    <div className="flex min-h-[500px] items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
        <div className="relative px-6 pb-6 pt-8 text-center sm:px-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
            <Lock className="h-7 w-7 text-indigo-500" />
          </div>

          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-500">
            <Sparkles className="h-3.5 w-3.5" />
            PRO FEATURE
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            Unlock AI-Powered Insights
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-secondary)]">
            Upgrade to Pro to unlock intelligent campaign analysis,
            identify ad fatigue, and get actionable recommendations
            to improve your advertising performance.
          </p>
        </div>

        <div className="border-t border-[var(--border-color)] px-6 py-6 sm:px-8">
          <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">
            What you get with Pro
          </h3>

          <div className="space-y-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500" />

                <span className="text-sm text-[var(--text-secondary)]">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onUpgrade}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
          >
            Upgrade to Pro
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-3 text-center text-xs text-[var(--text-secondary)]">
            Unlock advanced analytics and AI features.
          </p>
        </div>
      </div>
    </div>
  );
}