'use client';

import {
  FaFacebookF,
} from 'react-icons/fa';

import {
  CheckCircle2,
  ExternalLink,
  Link2,
  RefreshCw,
  Unplug,
} from 'lucide-react';

interface MetaBusinessCardProps {
  connected: boolean;
  accountName?: string | null;
  tokenStatus: {
    text: string;
    valid: boolean;
  };
  syncing: boolean;
  connecting: boolean;
  disconnecting: boolean;
  selectedAccountId: string | null;
  onConnect: () => void;
  onSync: () => void;
  onDisconnect: () => void;
}

export default function MetaBusinessCard({
  connected,
  accountName,
  tokenStatus,
  syncing,
  connecting,
  disconnecting,
  selectedAccountId,
  onConnect,
  onSync,
  onDisconnect,
}: MetaBusinessCardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-sm">
              <FaFacebookF size={24} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Meta Business Account
                </h3>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    connected
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />

                  {connected
                    ? 'Connected'
                    : 'Not Connected'}
                </span>
              </div>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {connected
                  ? accountName ??
                    'Meta account connected'
                  : 'Connect your Meta Business account to synchronize advertising data.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {connected ? (
              <>
                <button
                  type="button"
                  onClick={onSync}
                  disabled={
                    syncing || !selectedAccountId
                  }
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-accent)] px-4 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      syncing ? 'animate-spin' : ''
                    }`}
                  />

                  {syncing
                    ? 'Syncing...'
                    : 'Sync Data'}
                </button>

                <button
                  type="button"
                  onClick={onDisconnect}
                  disabled={disconnecting}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:opacity-50"
                >
                  <Unplug className="h-4 w-4" />

                  {disconnecting
                    ? 'Disconnecting...'
                    : 'Disconnect'}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onConnect}
                disabled={connecting}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-50"
              >
                <Link2 className="h-4 w-4" />

                {connecting
                  ? 'Connecting...'
                  : 'Connect Meta'}
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 rounded-xl bg-[var(--bg-accent)] p-3.5 text-xs text-[var(--text-secondary)] sm:flex-row sm:items-center">
          <span>
            Meta Access Token:{' '}
            <strong
              className={
                tokenStatus.valid
                  ? 'text-[var(--text-primary)]'
                  : 'text-red-500'
              }
            >
              {connected
                ? tokenStatus.text
                : 'Not connected'}
            </strong>
          </span>

          {connected && (
            <a
              href="https://business.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline"
            >
              Meta Business Suite
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}