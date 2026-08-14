'use client';

import { Sparkles, Crown } from 'lucide-react';

interface CampaignHeaderProps {
  userTier: 'free' | 'pro';
  onToggleTier: () => void;
}

export default function CampaignHeader({ userTier, onToggleTier }: CampaignHeaderProps) {
  const isPro = userTier === 'pro';

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 style={{ color: 'var(--text-primary)' }} className="text-2xl font-bold tracking-tight">
          Campaign Analytics
        </h1>
        <p style={{ color: 'var(--text-primary)' }} className="text-xs opacity-70 mt-1">
          Monitor performance metrics, ad health, and Gemini AI insights across your connected Meta accounts.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTier}
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm hover:opacity-80 transition-opacity bg-transparent"
        >
          <Crown className={`h-3.5 w-3.5 ${isPro ? 'text-amber-400' : 'opacity-50'}`} />
          <span>Tier: {isPro ? 'Pro Active' : 'Free Plan'}</span>
        </button>

        {!isPro && (
          <button
            onClick={onToggleTier}
            className="flex items-center gap-1.5 rounded-lg bg-teal-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-600 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
}