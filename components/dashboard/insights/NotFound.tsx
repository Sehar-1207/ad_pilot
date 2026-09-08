'use client';

import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CampaignNotFoundProps {
  error?: string;
}

export function CampaignNotFound({
  error,
}: CampaignNotFoundProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen p-6">
      <button
        type="button"
        onClick={() => router.push('/dashboard/campaigns')}
        style={{
          color: 'var(--text-secondary)',
          borderColor: 'var(--border-color)',
        }}
        className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors hover:text-[var(--text-primary)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Campaigns
      </button>

      <div
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--border-color)',
        }}
        className="mt-6 rounded-xl border p-8 text-center"
      >
        <AlertTriangle className="mx-auto mb-3 h-7 w-7 text-rose-500" />

        <h2
          style={{ color: 'var(--text-primary)' }}
          className="text-base font-bold"
        >
          Campaign Not Found
        </h2>

        <p
          style={{ color: 'var(--text-secondary)' }}
          className="mt-1 text-xs"
        >
          {error || 'Unable to load this campaign.'}
        </p>
      </div>
    </div>
  );
}