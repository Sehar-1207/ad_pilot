'use client';

import {
  CheckCircle2,
} from 'lucide-react';

export interface AdAccount {
  id: string;
  name: string;
  account_id?: string;
  currency?: string;
  timezone_name?: string;
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
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="p-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Active Ad Accounts
          </h3>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Connect a Meta ad account and choose which
            accounts should synchronize with your dashboard.
          </p>
        </div>

        <div className="mt-5">
          {!connected ? (
            <EmptyState>
              Connect your Meta account first to load your
              available ad accounts.
            </EmptyState>
          ) : accounts.length === 0 ? (
            <EmptyState>
              No Meta ad accounts are available for this
              account.
            </EmptyState>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
              {accounts.map((account, index) => {
                const enabled =
                  enabledAccounts[account.id] ??
                  false;

                const selected =
                  selectedAccountId === account.id;

                const accountId =
                  account.account_id ?? account.id;

                return (
                  <div
                    key={account.id}
                    className={`flex flex-col justify-between gap-4 p-4 transition hover:bg-[var(--bg-accent)] sm:flex-row sm:items-center ${
                      index !== 0
                        ? 'border-t border-[var(--border-color)]'
                        : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() =>
                          onToggle(account.id)
                        }
                        className="h-4 w-4 rounded border-[var(--border-color)] text-[var(--primary)]"
                      />

                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">
                          {account.name}
                        </p>

                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                          ID: {accountId}

                          {account.currency &&
                            ` • ${account.currency}`}

                          {account.timezone_name &&
                            ` • ${account.timezone_name}`}

                          {(account.pixelId ??
                            account.pixel) &&
                            ` • Pixel: ${
                              account.pixelId ??
                              account.pixel
                            }`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {selected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">
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
                          ? 'Syncing'
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
                          className="rounded-lg bg-[var(--primary)] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-50"
                        >
                          {selectingAccount ===
                          account.id
                            ? 'Connecting...'
                            : 'Connect'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
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