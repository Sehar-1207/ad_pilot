'use client';

import {
  CheckCircle2,
  CreditCard,
  Sparkles,
} from 'lucide-react';

interface BillingCardProps {
  plan: string;
  email: string;
  name: string;
  planEndsAt?: string | null;
  onUpgrade: () => void;
  upgrading: boolean;
}

export default function BillingCard({
  plan,
  email,
  name,
  planEndsAt,
  onUpgrade,
  upgrading,
}: BillingCardProps) {
  const isPro =
    plan?.toUpperCase() === 'PRO';

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
        <div className="p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                Account & Billing
              </h3>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                Manage your Ad Pilot plan and account
                information.
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                isPro
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                  : 'bg-[var(--bg-accent)] text-[var(--text-secondary)]'
              }`}
            >
              {isPro && (
                <Sparkles className="h-3 w-3" />
              )}

              {isPro ? 'Pro Plan' : 'Free Plan'}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              label="Name"
              value={name || 'Not available'}
            />

            <InfoItem
              label="Email"
              value={email || 'Not available'}
            />

            <InfoItem
              label="Current Plan"
              value={
                isPro ? 'Pro' : 'Free'
              }
            />

            <InfoItem
              label={
                isPro
                  ? 'Plan renewal'
                  : 'Plan status'
              }
              value={
                isPro && planEndsAt
                  ? new Date(
                      planEndsAt
                    ).toLocaleDateString()
                  : isPro
                  ? 'Active'
                  : 'No expiration'
              }
            />
          </div>
        </div>
      </section>

      {!isPro && (
        <section className="overflow-hidden rounded-2xl border border-[var(--primary)]/30 bg-[var(--bg-primary)]">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Upgrade to Pro
                </h3>

                <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                  Unlock full campaign analytics,
                  advanced insights and Pro features
                  available in your Ad Pilot plan.
                </p>

                <div className="mt-4 space-y-2">
                  <Feature text="Access all campaigns" />
                  <Feature text="Advanced campaign metrics" />
                  <Feature text="AI-powered insights" />
                </div>

                <button
                  type="button"
                  onClick={onUpgrade}
                  disabled={upgrading}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4" />

                  {upgrading
                    ? 'Opening checkout...'
                    : 'Upgrade to Pro'}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-accent)] p-4">
      <p className="text-xs text-[var(--text-secondary)]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[var(--text-primary)] break-all">
        {value}
      </p>
    </div>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
      {text}
    </div>
  );
}