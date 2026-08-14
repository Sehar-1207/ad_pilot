'use client';

import { Lock } from 'lucide-react';

interface ProUpgradeBannerProps {
  hiddenCount: number;
  onUpgrade: () => void;
}

export default function ProUpgradeBanner({ hiddenCount, onUpgrade }: ProUpgradeBannerProps) {
  return (
    <div
      style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}
      className="relative border-t p-8 text-center"
    >
      <div className="mx-auto max-w-md space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
          <Lock className="h-5 w-5" />
        </div>
        <h3 style={{ color: 'var(--text-primary)' }} className="text-base font-bold">
          {hiddenCount} More Campaigns Locked
        </h3>
        <p style={{ color: 'var(--text-primary)' }} className="text-xs opacity-70">
          Free plan users can view up to 3 synced Meta campaigns. Upgrade to Pro to analyze all
          your campaigns and unlock real-time Gemini AI recommendations.
        </p>
        <button
          onClick={onUpgrade}
          className="rounded-xl bg-teal-500 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-all active:scale-95"
        >
          Upgrade to Pro ($29/mo)
        </button>
      </div>
    </div>
  );
}