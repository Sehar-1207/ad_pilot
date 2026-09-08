'use client';

import { Lock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ProUpgradeCard() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        className="w-full max-w-md rounded-xl border p-8 text-center"
      >
        <div
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--card-bg)',
          }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border"
        >
          <Lock className="h-5 w-5 text-amber-500" />
        </div>

        <h2
          style={{ color: 'var(--text-primary)' }}
          className="text-lg font-bold"
        >
          Pro Insights Required
        </h2>

        <p
          style={{ color: 'var(--text-secondary)' }}
          className="mt-2 text-sm leading-relaxed"
        >
          AI-powered campaign diagnostics and optimization recommendations
          are available on the Pro plan.
        </p>

        <button
          type="button"
          onClick={() => router.push('/pricing')}
          style={{
            backgroundColor: 'var(--primary)',
          }}
          className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Sparkles className="h-4 w-4" />
          Upgrade to Pro
        </button>
      </div>
    </div>
  );
}