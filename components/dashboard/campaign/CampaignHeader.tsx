'use client';

import { Sparkles, Crown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CampaignHeaderProps {
  userTier: 'free' | 'pro';
}

export default function CampaignHeader({
  userTier,
}: CampaignHeaderProps) {
  const router = useRouter();

  const isPro = userTier === 'pro';

  const handleUpgrade = () => {
    router.push('/pricing');
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1
          style={{ color: 'var(--text-primary)' }}
          className="text-2xl font-bold tracking-tight"
        >
          Campaign Analytics
        </h1>

        <p
          style={{ color: 'var(--text-primary)' }}
          className="mt-1 text-xs opacity-70"
        >
          Monitor performance metrics, ad health, and Gemini AI insights
          across your connected Meta accounts.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--card-bg)',
          }}
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm"
        >
          <Crown
            className={`h-3.5 w-3.5 ${
              isPro
                ? 'text-amber-400'
                : 'opacity-50'
            }`}
          />

          <span>
            Tier: {isPro ? 'Pro Active' : 'Free Plan'}
          </span>
        </div>

        {!isPro && (
          <button
            type="button"
            onClick={handleUpgrade}
            className="flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[var(--primary-hover)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
}