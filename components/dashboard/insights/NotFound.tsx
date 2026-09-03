'use client';

import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CampaignNotFoundProps {
  error: string;
}

export function CampaignNotFound({ error }: CampaignNotFoundProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6">
      <button
        type="button"
        onClick={() => router.push('/dashboard/campaigns')}
        className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] px-3 py-1.5 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Campaigns
      </button>

      <div className="mt-6 rounded-xl border border-[var(--border-color)] p-8 text-center">
        <AlertTriangle className="h-7 w-7 text-rose-500 mx-auto mb-3" />

        <h2 className="text-base font-bold text-[var(--text-primary)]">
          Campaign Not Found
        </h2>

        <p className="text-xs text-[var(--text-secondary)] mt-1">
          {error || 'Unable to load this campaign.'}
        </p>
      </div>
    </div>
  );
}