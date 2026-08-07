'use client';

import Link from 'next/link';
import { RefreshCw, Sparkles } from 'lucide-react';

interface HeaderBannerProps {
  userPlan: 'free' | 'pro';
  onSync?: () => void;
}

export function HeaderBanner({ userPlan, onSync }: HeaderBannerProps) {
  return (
    <header className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 bg-[var(--bg-surface)] p-5 sm:p-6 rounded-2xl border border-[var(--border-color)] shadow-xs transition-all duration-300">
      <div className="flex-1 min-w-0">
        <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight leading-snug truncate">
          Campaign Performance
        </h1>
        <p className="text-xs sm:text-sm font-medium text-[var(--text-secondary)] mt-1 leading-relaxed">
          Real-time Meta advertising analytics and Gemini AI suggestions.
        </p>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">

        <button
          onClick={onSync}
          type="button"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[var(--bg-accent)] hover:bg-[var(--border-color)] text-[var(--text-primary)] text-xs font-bold rounded-xl transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <RefreshCw size={14} className="shrink-0" />
          <span className="whitespace-nowrap">Sync Data</span>
        </button>
        {userPlan === 'free' && (
          <Link
            href="/pricing"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--brand-blue)] hover:bg-[var(--primary-hover)] text-white text-xs font-extrabold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] cursor-pointer"
          >
            <Sparkles size={14} className="fill-white shrink-0" />
            <span className="whitespace-nowrap">Upgrade to Pro ($29/mo)</span>
          </Link>
        )}
      </div>
    </header>
  );
}