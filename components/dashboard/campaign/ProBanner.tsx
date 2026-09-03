'use client';

import { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import { createCheckoutSession } from '@/api/subscription';

interface ProUpgradeBannerProps {
  hiddenCount: number;
  onUpgrade?: () => void;
}

export default function ProUpgradeBanner({
  hiddenCount,
  onUpgrade,
}: ProUpgradeBannerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpgrade = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError('');

      const response = await createCheckoutSession();

      if (!response?.checkoutUrl) {
        throw new Error('Stripe checkout URL was not returned.');
      }

      // Optional parent callback before redirect
      onUpgrade?.();

      // Redirect user to Stripe Checkout
      window.location.href = response.checkoutUrl;
    } catch (err: any) {
      console.error('Upgrade error:', err);

      const message =
        err?.response?.data?.error ||
        err?.message ||
        'Unable to start the Pro upgrade. Please try again.';

      setError(message);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--card-bg)',
      }}
      className="relative border-t p-8 text-center"
    >
      <div className="mx-auto max-w-md space-y-3">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-teal-500/20 bg-teal-500/10 text-teal-400">
          <Lock className="h-5 w-5" />
        </div>

        <h3
          style={{ color: 'var(--text-primary)' }}
          className="text-base font-bold"
        >
          {hiddenCount} More Campaigns Locked
        </h3>

        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-xs opacity-70"
        >
          Free plan users can view up to 3 synced Meta campaigns. Upgrade to
          Pro to analyze all your campaigns and unlock real-time Gemini AI
          recommendations.
        </p>

        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleUpgrade}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-teal-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting to Checkout...
            </>
          ) : (
            'Upgrade to Pro ($29/mo)'
          )}
        </button>
      </div>
    </div>
  );
}

