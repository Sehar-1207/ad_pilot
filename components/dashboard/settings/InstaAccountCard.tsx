'use client';

import {
  FaInstagram,
  FaFacebookF,
} from 'react-icons/fa';
import {
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  RefreshCw,
  Unplug,
  Users,
} from 'lucide-react';

export interface InstagramAccount {
  id: string;
  username?: string | null;
  name?: string | null;
  profile_picture_url?: string | null;
  followers_count?: number;
  follows_count?: number;
  media_count?: number;
  facebookPageId?: string | null;
  facebookPageName?: string | null;
}

export interface ConnectedInstagramAccount {
  _id: string;
  user: string;
  instagramAccountId: string;
  username: string | null;
  name: string | null;
  profilePictureUrl: string | null;
  followersCount: number;
  followsCount: number;
  mediaCount: number;
  facebookPageId: string | null;
  facebookPageName: string | null;
  isConnected: boolean;
  lastSyncedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface InstagramAccountCardProps {
  metaConnected: boolean;
  accounts: InstagramAccount[];
  connectedInstagram: ConnectedInstagramAccount | null;
  loading: boolean;
  connectingId: string | null;
  syncing: boolean;
  disconnecting: boolean;
  onConnect: (account: InstagramAccount) => void;
  onSync: () => void;
  onDisconnect: () => void;
  onConnectMeta: () => void;
}

export default function InstagramAccountCard({
  metaConnected,
  accounts,
  connectedInstagram,
  loading,
  connectingId,
  syncing,
  disconnecting,
  onConnect,
  onSync,
  onDisconnect,
  onConnectMeta,
}: InstagramAccountCardProps) {
  const isConnected =
    connectedInstagram?.isConnected === true;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white shadow-sm">
              <FaInstagram size={25} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  Instagram Account
                </h3>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                    isConnected
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />

                  {isConnected
                    ? 'Connected'
                    : 'Not Connected'}
                </span>
              </div>

              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {isConnected
                  ? `@${connectedInstagram?.username ?? connectedInstagram?.name ?? 'Instagram account'}`
                  : 'Connect your Instagram professional account through Meta.'}
              </p>
            </div>
          </div>

          {isConnected && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onSync}
                disabled={syncing}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-accent)] px-4 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    syncing ? 'animate-spin' : ''
                  }`}
                />

                {syncing
                  ? 'Syncing...'
                  : 'Sync Instagram'}
              </button>

              <button
                type="button"
                onClick={onDisconnect}
                disabled={disconnecting}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 text-sm font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Unplug className="h-4 w-4" />

                {disconnecting
                  ? 'Disconnecting...'
                  : 'Disconnect'}
              </button>
            </div>
          )}
        </div>

        {isConnected && connectedInstagram ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-accent)] p-4">
              <div className="flex items-center gap-3">
                {connectedInstagram.profilePictureUrl ? (
                  <img
                    src={connectedInstagram.profilePictureUrl}
                    alt={
                      connectedInstagram.username ??
                      'Instagram'
                    }
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white">
                    <FaInstagram size={22} />
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {connectedInstagram.username
                      ? `@${connectedInstagram.username}`
                      : connectedInstagram.name ??
                        'Instagram Account'}
                  </p>

                  {connectedInstagram.name &&
                    connectedInstagram.username && (
                      <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                        {connectedInstagram.name}
                      </p>
                    )}
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-500">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatCard
                icon={<Users className="h-4 w-4" />}
                label="Followers"
                value={connectedInstagram.followersCount}
              />

              <StatCard
                icon={<Users className="h-4 w-4" />}
                label="Following"
                value={connectedInstagram.followsCount}
              />

              <StatCard
                icon={<ImageIcon className="h-4 w-4" />}
                label="Posts"
                value={connectedInstagram.mediaCount}
              />
            </div>

            {connectedInstagram.facebookPageName && (
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-accent)] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2] text-white">
                  <FaFacebookF size={16} />
                </div>

                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Connected through Facebook Page
                  </p>

                  <p className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                    {connectedInstagram.facebookPageName}
                  </p>
                </div>
              </div>
            )}

            {connectedInstagram.lastSyncedAt && (
              <p className="text-xs text-[var(--text-secondary)]">
                Last synchronized:{' '}
                {new Date(
                  connectedInstagram.lastSyncedAt
                ).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        ) : (
          <div className="mt-6">
            {!metaConnected ? (
              <div className="flex flex-col gap-4 rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-accent)] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Connect Meta first
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                    Instagram accounts are discovered through
                    your connected Meta Business account.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onConnectMeta}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)]"
                >
                  <FaFacebookF size={14} />
                  Connect Meta
                </button>
              </div>
            ) : loading ? (
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-accent)] p-5 text-sm text-[var(--text-secondary)]">
                Loading available Instagram accounts...
              </div>
            ) : accounts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[var(--border-color)] bg-[var(--bg-accent)] p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white">
                  <FaInstagram size={23} />
                </div>

                <h4 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                  No Instagram account found
                </h4>

                <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-[var(--text-secondary)]">
                  Make sure your Instagram Professional
                  account is connected to an eligible Facebook
                  Page and that your Meta app has the required
                  Instagram permissions.
                </p>

                <a
                  href="https://www.facebook.com/pages/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[var(--primary)] hover:underline"
                >
                  Check Facebook Pages
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[var(--border-color)]">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex flex-col justify-between gap-4 p-4 transition hover:bg-[var(--bg-accent)] sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-3">
                      {account.profile_picture_url ? (
                        <img
                          src={account.profile_picture_url}
                          alt={
                            account.username ??
                            'Instagram account'
                          }
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] text-white">
                          <FaInstagram size={22} />
                        </div>
                      )}

                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {account.username
                            ? `@${account.username}`
                            : account.name ??
                              'Instagram Account'}
                        </p>

                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                          {account.name &&
                            account.username
                            ? account.name
                            : 'Instagram Professional Account'}
                        </p>

                        {account.facebookPageName && (
                          <div className="mt-1 flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                            <FaFacebookF size={10} />
                            {account.facebookPageName}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onConnect(account)}
                      disabled={connectingId !== null}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <FaInstagram size={15} />

                      {connectingId === account.id
                        ? 'Connecting...'
                        : 'Connect Instagram'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-accent)] p-4">
      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
        {icon}
        {label}
      </div>

      <p className="mt-1.5 text-lg font-semibold text-[var(--text-primary)]">
        {(value ?? 0).toLocaleString()}
      </p>
    </div>
  );
}