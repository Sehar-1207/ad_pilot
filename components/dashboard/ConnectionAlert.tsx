'use client';

import { AlertCircle } from 'lucide-react';
import { connectMeta } from '@/api/meta';

interface ConnectionAlertProps {
  isConnected: boolean;
}

export function ConnectionAlert({ isConnected }: ConnectionAlertProps) {
  if (isConnected) return null;

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <AlertCircle
          className="text-amber-500 flex-shrink-0"
          size={20}
        />

        <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
          Your Meta Ads account is not connected yet. Connect your account to view real-time data.
        </p>
      </div>

      <button
        type="button"
        onClick={connectMeta}
        className="text-xs font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/15 hover:bg-amber-500/25 px-4 py-2 rounded-xl transition-colors flex-shrink-0 border border-amber-500/20"
      >
        Connect Now
      </button>
    </div>
  );
}