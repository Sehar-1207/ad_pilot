'use client';

import {
  CheckCircle2,
  Circle,
  RefreshCw,
} from 'lucide-react';

export interface AdAccount {
  id: string;
  name: string;
  account_id?: string;
  currency?: string;
  timezone_name?: string;
  account_status?: number;
  isEnabled?: boolean;
  enabled?: boolean;
  pixelId?: string;
  pixel?: string;
}

interface MetaAdAccountsCardProps {
  connected: boolean;
  accounts: AdAccount[];
  selectedAccountId: string | null;
  enabledAccounts: Record<string, boolean>;
  selectingAccount: string | null;
  onToggle: (accountId: string) => void;
  onConnect: (accountId: string) => void;
}

export default function MetaAdAccountsCard({
  connected,
  accounts,
  selectedAccountId,
  enabledAccounts,
  selectingAccount,
  onToggle,
  onConnect,
}: MetaAdAccountsCardProps) {
  const connectedCount = selectedAccountId ? 1 : 0;

  const enabledCount = accounts.filter(
    (account) =>
      enabledAccounts[account.id] === true
  ).length;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Meta Ad Accounts
            </h3>

            <p className="mt-1 max-w-2xl text-sm text-[var(--text-secondary)]">
              Choose the Meta advertising account that
              Ad Pilot uses to synchronize campaign and
              performance data.
            </p>
          </div>

          {connected && accounts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <SummaryBadge
                label="Available"
                value={accounts.length}
              />

              <SummaryBadge
                label="Connected"
                value={connectedCount}
              />

              <SummaryBadge
                label="Enabled"
                value={enabledCount}
              />
            </div>
          )}
        </div>

        <div className="mt-6">
          {!connected ? (
            <EmptyState>
              Connect your Meta account first to load
              your available advertising accounts.
            </EmptyState>
          ) : accounts.length === 0 ? (
            <EmptyState>
              No Meta ad accounts are available for the
              connected Meta account.
            </EmptyState>
          ) : (
            <>
              <div className="mb-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-accent)] p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-[var(--primary)]">
                    <RefreshCw className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      How Meta accounts work with Ad Pilot
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                      Meta provides Ad Pilot with the advertising
                      accounts available to your connected Meta
                      user. The connected account is used for
                      campaign synchronization, insights and
                      dashboard analytics.
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
                {accounts.map((account, index) => {
                  const selected =
                    selectedAccountId === account.id;

                  const enabled =
                    enabledAccounts[account.id] ?? false;

                  const accountId =
                    account.account_id ?? account.id;

                  return (
                    <div
                      key={account.id}
                      className={`flex flex-col gap-4 p-4 transition hover:bg-[var(--bg-accent)] sm:flex-row sm:items-center sm:justify-between ${
                        index !== 0
                          ? 'border-t border-[var(--border-color)]'
                          : ''
                      }`}
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {selected ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-[var(--text-secondary)]" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                            {account.name}
                          </p>

                          <p className="mt-1 text-xs text-[var(--text-secondary)]">
                            ID: {accountId}
                            {account.currency &&
                              ` • ${account.currency}`}
                            {account.timezone_name &&
                              ` • ${account.timezone_name}`}
                          </p>

                          {selected && (
                            <p className="mt-1 text-xs text-emerald-500">
                              This account is connected to
                              your Ad Pilot dashboard.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {selected && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
                            <CheckCircle2 className="h-3 w-3" />
                            Connected
                          </span>
                        )}

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            enabled
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : 'bg-[var(--bg-accent)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {enabled
                            ? 'Enabled'
                            : 'Disabled'}
                        </span>

                        {!selected && (
                          <button
                            type="button"
                            onClick={() =>
                              onConnect(account.id)
                            }
                            disabled={
                              selectingAccount !== null
                            }
                            className="rounded-lg bg-[var(--primary)] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {selectingAccount ===
                            account.id
                              ? 'Connecting...'
                              : 'Connect'}
                          </button>
                        )}

                        {selected && (
                          <button
                            type="button"
                            onClick={() =>
                              onToggle(account.id)
                            }
                            className="rounded-lg border border-[var(--border-color)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition hover:bg-[var(--bg-accent)]"
                          >
                            {enabled
                              ? 'Disable'
                              : 'Enable'}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function SummaryBadge({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-accent)] px-3 py-2">
      <p className="text-[10px] uppercase tracking-wide text-[var(--text-secondary)]">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-semibold text-[var(--text-primary)]">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-accent)] p-5 text-sm text-[var(--text-secondary)]">
      {children}
    </div>
  );
}