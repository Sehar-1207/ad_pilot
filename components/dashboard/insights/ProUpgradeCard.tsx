'use client';

import { Lock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProUpgradeCard() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-md w-full rounded-xl border border-[var(--border-color)] p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-color)]">
          <Lock className="h-5 w-5 text-amber-500" />
        </div>

        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Pro Insights Required
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
          AI-powered campaign diagnostics and optimization recommendations
          are available on the Pro plan.
        </p>

        <button
          type="button"
          onClick={() => router.push('/pricing')}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}