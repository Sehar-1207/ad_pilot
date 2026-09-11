'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Link2,
  RefreshCw,
  CheckCircle2,
  Sliders,
  Bell,
  CreditCard,
  Moon,
  Sun,
  ExternalLink,
  Unplug,
} from 'lucide-react';

import apiClient from '@/api/client';
import {
  connectMeta,
  getMetaStatus,
  getMetaAdAccounts,
  connectMetaAdAccount,
  disconnectMeta,
  syncMeta,
} from '@/api/meta';

type ActiveTab =
  | 'integrations'
  | 'preferences'
  | 'notifications'
  | 'billing';

interface AdAccount {
  id: string;
  name: string;
  account_id?: string;
  account_status?: number;
  currency?: string;
  timezone_name?: string;
  isEnabled?: boolean;
  enabled?: boolean;
  pixelId?: string;
  pixel?: string;
}

interface SettingsData {
  meta?: {
    connected?: boolean;
    adAccountId?: string | null;
    adAccountName?: string | null;
    tokenExpiresAt?: string | null;
    adAccounts?: AdAccount[];
  };
  sync?: {
    frequency?: string;
    importRange?: number;
    lastSyncAt?: string | null;
  };
}

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'USER' | 'ADMIN';
  avatarUrl?: string | null;
  plan: 'FREE' | 'PRO';
  isMetaConnected: boolean;
  memberSince?: string;
}

interface SubscriptionData {
  plan?: 'FREE' | 'PRO';
  status?: string;
  planEndsAt?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
}

interface Notification {
  id?: string;
  _id?: string;
  title?: string;
  message?: string;
  description?: string;
  type?: string;
  createdAt?: string;
  read?: boolean;
  isRead?: boolean;
}

const extractData = (response: any) => {
  return response?.data?.data ?? response?.data ?? response;
};

const normalizeAccounts = (response: any): AdAccount[] => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.adAccounts)) {
    return data.adAccounts;
  }

  if (Array.isArray(data?.accounts)) {
    return data.accounts;
  }

  return [];
};

const getMetaConnected = (response: any): boolean => {
  const data = extractData(response);

  if (typeof data === 'boolean') {
    return data;
  }

  if (typeof data?.connected === 'boolean') {
    return data.connected;
  }

  if (typeof data?.isMetaConnected === 'boolean') {
    return data.isMetaConnected;
  }

  if (typeof data?.isConnected === 'boolean') {
    return data.isConnected;
  }

  return false;
};

const getMetaAccountId = (response: any): string | null => {
  const data = extractData(response);

  return (
    data?.adAccountId ??
    data?.selectedAccountId ??
    data?.accountId ??
    data?.meta?.adAccountId ??
    null
  );
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] =
    useState<ActiveTab>('integrations');

  const { theme, setTheme } = useTheme();

  const [settings, setSettings] =
    useState<SettingsData | null>(null);

  const [profile, setProfile] =
    useState<ProfileData | null>(null);

  const [subscription, setSubscription] =
    useState<SubscriptionData | null>(null);

  const [notifications, setNotifications] =
    useState<Notification[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [notificationsLoading, setNotificationsLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [syncing, setSyncing] =
    useState(false);

  const [connecting, setConnecting] =
    useState(false);

  const [disconnecting, setDisconnecting] =
    useState(false);

  const [selectingAccount, setSelectingAccount] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  const [metaConnected, setMetaConnected] =
    useState(false);

  const [metaAccounts, setMetaAccounts] =
    useState<AdAccount[]>([]);

  const [selectedMetaAccountId, setSelectedMetaAccountId] =
    useState<string | null>(null);

  const [frequency, setFrequency] =
    useState('hourly');

  const [importRange, setImportRange] =
    useState<number>(30);

  const [enabledAccounts, setEnabledAccounts] =
    useState<Record<string, boolean>>({});

  const showSuccess = (message: string) => {
    setSuccess(message);
    setError(null);

    window.setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const showError = (message: string) => {
    setError(message);
    setSuccess(null);
  };

  const getErrorMessage = (
    err: any,
    fallback: string
  ) => {
    return (
      err?.response?.data?.message ??
      err?.response?.data?.error ??
      err?.message ??
      fallback
    );
  };

  const loadMetaData = async () => {
    try {
      const statusResponse =
        await getMetaStatus();

      const connectedFromMeta =
        getMetaConnected(statusResponse);

      setMetaConnected(
        connectedFromMeta
      );

      const accountId =
        getMetaAccountId(statusResponse);

      setSelectedMetaAccountId(
        accountId
      );

      if (connectedFromMeta) {
        try {
          const accountsResponse =
            await getMetaAdAccounts();

          const accounts =
            normalizeAccounts(
              accountsResponse
            );

          setMetaAccounts(accounts);

          const accountState: Record<
            string,
            boolean
          > = {};

          accounts.forEach(
            (account) => {
              accountState[account.id] =
                account.isEnabled ??
                account.enabled ??
                account.id === accountId;
            }
          );

          setEnabledAccounts(
            (current) => ({
              ...accountState,
              ...current,
            })
          );
        } catch (accountsError) {
          console.error(
            'Meta ad accounts loading error:',
            accountsError
          );
        }
      } else {
        setMetaAccounts([]);
        setSelectedMetaAccountId(
          null
        );
      }
    } catch (err) {
      console.error(
        'Meta status loading error:',
        err
      );

      setMetaConnected(false);
    }
  };

  const loadNotifications = async () => {
    try {
      setNotificationsLoading(true);

      const response =
        await apiClient.get(
          '/getNotifications '
        );

      const data =
        response?.data?.data ??
        response?.data ??
        [];

      const notificationList =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.notifications)
            ? data.notifications
            : [];

      setNotifications(
        notificationList
      );
    } catch (err) {
      console.error(
        'Notifications loading error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to load notifications.'
        )
      );
    } finally {
      setNotificationsLoading(
        false
      );
    }
  };

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        settingsResponse,
        profileResponse,
        subscriptionResponse,
      ] = await Promise.allSettled([
        apiClient.get(
          '/dashboard/settings'
        ),
        apiClient.get(
          '/dashboard/profile'
        ),
        apiClient.get(
          '/subscriptions/me'
        ),
      ]);

      if (
        settingsResponse.status ===
        'fulfilled'
      ) {
        const data =
          settingsResponse.value
            ?.data?.data ??
          settingsResponse.value
            ?.data;

        setSettings(
          data ?? null
        );

        const sync =
          data?.sync;

        if (sync?.frequency) {
          setFrequency(
            sync.frequency
          );
        }

        const parsedImportRange =
          Number(
            sync?.importRange
          );

        if (
          Number.isFinite(
            parsedImportRange
          ) &&
          [30, 90, 365].includes(
            parsedImportRange
          )
        ) {
          setImportRange(
            parsedImportRange
          );
        } else {
          setImportRange(30);
        }

        const accounts =
          data?.meta
            ?.adAccounts ?? [];

        const accountState: Record<
          string,
          boolean
        > = {};

        accounts.forEach(
          (account: AdAccount) => {
            accountState[
              account.id
            ] =
              account.isEnabled ??
              account.enabled ??
              false;
          }
        );

        setEnabledAccounts(
          (current) => ({
            ...accountState,
            ...current,
          })
        );

        if (
          data?.meta
            ?.adAccountId
        ) {
          setSelectedMetaAccountId(
            data.meta.adAccountId
          );
        }
      } else {
        throw settingsResponse.reason;
      }

      if (
        profileResponse.status ===
        'fulfilled'
      ) {
        const data =
          profileResponse.value
            ?.data?.data ??
          profileResponse.value
            ?.data;

        setProfile(
          data ?? null
        );
      }

      if (
        subscriptionResponse.status ===
        'fulfilled'
      ) {
        const data =
          subscriptionResponse.value
            ?.data?.data ??
          subscriptionResponse.value
            ?.data;

        setSubscription(
          data ?? null
        );
      }

      await loadMetaData();
    } catch (err) {
      console.error(
        'Settings loading error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to load your settings. Please try again.'
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleConnectMeta = () => {
    try {
      setConnecting(true);
      setError(null);

      connectMeta();
    } catch (err) {
      console.error(
        'Meta connection error:',
        err
      );

      setConnecting(false);

      showError(
        getErrorMessage(
          err,
          'Unable to connect Meta.'
        )
      );
    }
  };

  const handleDisconnectMeta = async () => {
    try {
      setDisconnecting(true);
      setError(null);

      await disconnectMeta();

      setMetaConnected(false);
      setMetaAccounts([]);
      setSelectedMetaAccountId(
        null
      );

      showSuccess(
        'Meta account disconnected successfully.'
      );

      await loadSettings();
    } catch (err) {
      console.error(
        'Meta disconnect error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to disconnect Meta.'
        )
      );
    } finally {
      setDisconnecting(false);
    }
  };

  const handleConnectAdAccount = async (
    accountId: string
  ) => {
    try {
      setSelectingAccount(
        accountId
      );
      setError(null);

      await connectMetaAdAccount(
        accountId
      );

      setSelectedMetaAccountId(
        accountId
      );

      setEnabledAccounts(
        (current) => ({
          ...current,
          [accountId]: true,
        })
      );

      const account =
        metaAccounts.find(
          (item) =>
            item.id === accountId
        );

      if (account) {
        setSettings(
          (current) => ({
            ...(current ?? {}),
            meta: {
              ...(current?.meta ?? {}),
              adAccountId:
                account.id,
              adAccountName:
                account.name,
              connected: true,
            },
          })
        );
      }

      showSuccess(
        'Meta ad account connected successfully.'
      );

      await loadSettings();
    } catch (err) {
      console.error(
        'Meta ad account connection error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to connect this Meta ad account.'
        )
      );
    } finally {
      setSelectingAccount(
        null
      );
    }
  };

  const toggleAdAccount = async (
    accountId: string
  ) => {
    const nextValue =
      !enabledAccounts[
        accountId
      ];

    setEnabledAccounts(
      (current) => ({
        ...current,
        [accountId]:
          nextValue,
      })
    );

    try {
      await apiClient.patch(
        `/dashboard/settings/ad-accounts/${accountId}`,
        {
          enabled:
            nextValue,
        }
      );

      showSuccess(
        nextValue
          ? 'Ad account enabled.'
          : 'Ad account disabled.'
      );

      await loadSettings();
    } catch (err) {
      console.error(
        'Ad account update error:',
        err
      );

      setEnabledAccounts(
        (current) => ({
          ...current,
          [accountId]:
            !nextValue,
        })
      );

      showError(
        getErrorMessage(
          err,
          'Unable to update the ad account.'
        )
      );
    }
  };

  const handleSync = async () => {
    if (!connected) {
      showError(
        'Connect your Meta account before synchronizing data.'
      );
      return;
    }

    if (!selectedMetaAccountId) {
      showError(
        'Select a Meta ad account before synchronizing data.'
      );
      return;
    }

    try {
      setSyncing(true);
      setError(null);

      await syncMeta();

      await loadSettings();

      showSuccess(
        'Meta data synchronized successfully.'
      );
    } catch (err) {
      console.error(
        'Meta synchronization error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to synchronize Meta data.'
        )
      );
    } finally {
      setSyncing(false);
    }
  };

  const saveSyncSettings =
    async () => {
      try {
        setSaving(true);
        setError(null);

        const safeImportRange =
          [30, 90, 365].includes(
            importRange
          )
            ? importRange
            : 30;

        setImportRange(
          safeImportRange
        );

        await apiClient.put(
          '/dashboard/settings/sync',
          {
            frequency,
            importRange:
              safeImportRange,
          }
        );

        await loadSettings();

        showSuccess(
          'Sync preferences saved successfully.'
        );
      } catch (err) {
        console.error(
          'Sync settings update error:',
          err
        );

        showError(
          getErrorMessage(
            err,
            'Unable to save sync preferences.'
          )
        );
      } finally {
        setSaving(false);
      }
    };

  const formatDate = (
    value?: string | null
  ) => {
    if (!value) {
      return 'Not available';
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return 'Not available';
    }

    return date.toLocaleDateString(
      undefined,
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }
    );
  };

  const getTokenStatus =
    () => {
      const expiresAt =
        settings?.meta
          ?.tokenExpiresAt;

      if (!expiresAt) {
        return {
          text: 'Expiration date unavailable',
          valid: true,
        };
      }

      const expiry =
        new Date(expiresAt);

      if (
        Number.isNaN(
          expiry.getTime()
        )
      ) {
        return {
          text: 'Expiration date unavailable',
          valid: true,
        };
      }

      const difference =
        expiry.getTime() -
        Date.now();

      if (difference <= 0) {
        return {
          text: 'Expired',
          valid: false,
        };
      }

      const days =
        Math.ceil(
          difference /
          (1000 *
            60 *
            60 *
            24)
        );

      return {
        text: `Active · Expires in ${days} day${
          days === 1
            ? ''
            : 's'
        }`,
        valid: true,
      };
    };

  const tokenStatus =
    getTokenStatus();

  const accounts =
    metaAccounts.length > 0
      ? metaAccounts
      : settings?.meta
          ?.adAccounts ?? [];

  const connected =
    metaConnected ||
    profile?.isMetaConnected ===
      true ||
    settings?.meta
      ?.connected === true;

  const selectedAccount =
    accounts.find(
      (account) =>
        account.id ===
        selectedMetaAccountId
    ) ??
    accounts.find(
      (account) =>
        account.id ===
        settings?.meta
          ?.adAccountId
    );

  const plan =
    subscription?.plan ??
    profile?.plan ??
    'FREE';

  const planEndsAt =
    subscription?.planEndsAt ??
    subscription?.currentPeriodEnd ??
    null;

  const handleNotificationsTab =
    async () => {
      setActiveTab(
        'notifications'
      );

      await loadNotifications();
    };

  if (loading) {
    return (
      <div className="min-h-screen text-[var(--text-primary)] p-6 md:p-10">
        <div className="max-w-6xl mx-auto flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Loading settings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--text-primary)] p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Settings
          </h1>

          <p className="text-[var(--text-secondary)] mt-1">
            Manage your Meta API connections, preferences,
            alerts, and subscription details.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500">
            {success}
          </div>
        )}

        <div className="flex space-x-1 border-b border-[var(--border-color)] overflow-x-auto scrollbar-none">

          <button
            onClick={() =>
              setActiveTab(
                'integrations'
              )
            }
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab ===
              'integrations'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Link2 className="w-4 h-4" />
            Meta Connections
          </button>

          <button
            onClick={() =>
              setActiveTab(
                'preferences'
              )
            }
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab ===
              'preferences'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Preferences
          </button>

          <button
            onClick={
              handleNotificationsTab
            }
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab ===
              'notifications'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>

          <button
            onClick={() =>
              setActiveTab(
                'billing'
              )
            }
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'billing'
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Billing & Usage
          </button>

        </div>

        <div className="space-y-6">

          {activeTab === 'integrations' && (
            <div className="space-y-6">

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-xl bg-[var(--social-facebook)] text-white flex items-center justify-center font-bold text-xl">
                      f
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">

                        <h3 className="font-semibold text-lg">
                          Meta Business Account
                        </h3>

                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            connected
                              ? 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]'
                              : 'bg-red-500/10 text-red-500'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />

                          {connected
                            ? 'Connected'
                            : 'Not Connected'}
                        </span>

                      </div>

                      <p className="text-sm text-[var(--text-secondary)]">
                        {connected
                          ? selectedAccount?.name ??
                            settings?.meta
                              ?.adAccountName ??
                            'Meta account connected'
                          : 'Connect your Meta Business account to synchronize advertising data.'}
                      </p>

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    {connected ? (
                      <>
                        <button
                          type="button"
                          onClick={
                            handleSync
                          }
                          disabled={
                            syncing ||
                            !selectedMetaAccountId
                          }
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--bg-accent)] text-[var(--text-primary)] hover:opacity-90 transition-opacity border border-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RefreshCw
                            className={`w-4 h-4 ${
                              syncing
                                ? 'animate-spin'
                                : ''
                            }`}
                          />

                          {syncing
                            ? 'Syncing...'
                            : 'Sync Data'}
                        </button>

                        <button
                          type="button"
                          onClick={
                            handleDisconnectMeta
                          }
                          disabled={
                            disconnecting
                          }
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                        >
                          <Unplug className="w-4 h-4" />

                          {disconnecting
                            ? 'Disconnecting...'
                            : 'Disconnect'}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={
                          handleConnectMeta
                        }
                        disabled={
                          connecting
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
                      >
                        <Link2 className="w-4 h-4" />

                        {connecting
                          ? 'Connecting...'
                          : 'Connect Meta'}
                      </button>
                    )}

                  </div>

                </div>

                <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-accent)] p-3 rounded-lg flex items-center justify-between gap-4">

                  <span>
                    Meta Access Token:{' '}
                    <strong>
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
                      className="text-[var(--primary)] hover:underline flex items-center gap-1"
                    >
                      Meta Portal
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                </div>

              </div>

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-4">

                <div>
                  <h3 className="font-semibold text-lg">
                    Active Ad Accounts
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)]">
                    Connect a Meta ad account and choose which accounts should synchronize with your dashboard.
                  </p>
                </div>

                {!connected ? (
                  <div className="border border-[var(--border-color)] rounded-lg p-5 text-sm text-[var(--text-secondary)]">
                    Connect your Meta account first to load your available ad accounts.
                  </div>
                ) : accounts.length === 0 ? (
                  <div className="border border-[var(--border-color)] rounded-lg p-5 text-sm text-[var(--text-secondary)]">
                    No Meta ad accounts are available for this account.
                  </div>
                ) : (
                  <div className="divide-y divide-[var(--border-color)] border border-[var(--border-color)] rounded-lg overflow-hidden">

                    {accounts.map(
                      (account) => {
                        const enabled =
                          enabledAccounts[
                            account.id
                          ] ?? false;

                        const selected =
                          selectedMetaAccountId ===
                          account.id;

                        const accountId =
                          account.account_id ??
                          account.id;

                        return (
                          <div
                            key={
                              account.id
                            }
                            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[var(--bg-accent)] transition-colors"
                          >

                            <div className="flex items-center gap-3">

                              <input
                                type="checkbox"
                                checked={
                                  enabled
                                }
                                onChange={() =>
                                  toggleAdAccount(
                                    account.id
                                  )
                                }
                                disabled={
                                  !connected
                                }
                                className="w-4 h-4 rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
                              />

                              <div>
                                <p className="text-sm font-medium">
                                  {
                                    account.name
                                  }
                                </p>

                                <p className="text-xs text-[var(--text-secondary)]">
                                  ID:{' '}
                                  {
                                    accountId
                                  }

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
                                <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]">
                                  Connected
                                </span>
                              )}

                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                  enabled
                                    ? 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]'
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
                                    handleConnectAdAccount(
                                      account.id
                                    )
                                  }
                                  disabled={
                                    selectingAccount !==
                                    null
                                  }
                                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
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
                      }
                    )}

                  </div>
                )}

              </div>

            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  Appearance
                </h3>

                <p className="text-sm text-[var(--text-secondary)]">
                  Choose how Ad Pilot looks on your device.
                </p>
              </div>

              <div className="space-y-3">

                <label className="text-sm font-medium">
                  Theme
                </label>

                <div className="flex gap-3 max-w-sm">

                  <button
                    type="button"
                    onClick={() =>
                      setTheme(
                        'light'
                      )
                    }
                    className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                      theme ===
                      'light'
                        ? 'border-[var(--primary)] bg-[var(--bg-accent)] text-[var(--primary)]'
                        : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setTheme(
                        'dark'
                      )
                    }
                    className={`flex-1 p-3 rounded-lg border flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                      theme ===
                      'dark'
                        ? 'border-[var(--primary)] bg-[var(--bg-accent)] text-[var(--primary)]'
                        : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>

                </div>

              </div>

            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  Notifications
                </h3>

                <p className="text-sm text-[var(--text-secondary)]">
                  Important updates and alerts from Ad Pilot.
                </p>
              </div>

              {notificationsLoading ? (
                <div className="py-10 text-center text-sm text-[var(--text-secondary)]">
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="border border-[var(--border-color)] rounded-lg p-6 text-center">

                  <Bell className="w-8 h-8 mx-auto text-[var(--text-secondary)] mb-3" />

                  <p className="text-sm font-medium">
                    No notifications
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    You are all caught up.
                  </p>

                </div>
              ) : (
                <div className="space-y-3">

                  {notifications.map(
                    (
                      notification,
                      index
                    ) => (
                      <div
                        key={
                          notification.id ??
                          notification._id ??
                          index
                        }
                        className="border border-[var(--border-color)] rounded-lg p-4 bg-[var(--bg-accent)]"
                      >

                        <div className="flex items-start gap-3">

                          <Bell className="w-5 h-5 text-[var(--primary)] mt-0.5" />

                          <div className="flex-1">

                            <p className="text-sm font-medium">
                              {notification.title ??
                                notification.type ??
                                'Notification'}
                            </p>

                            <p className="text-sm text-[var(--text-secondary)] mt-1">
                              {notification.message ??
                                notification.description ??
                                'No additional information available.'}
                            </p>

                            {notification.createdAt && (
                              <p className="text-xs text-[var(--text-secondary)] mt-2">
                                {formatDate(
                                  notification.createdAt
                                )}
                              </p>
                            )}

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-6">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                  <div>

                    <span className="text-xs uppercase tracking-wider text-[var(--accent-teal)] font-bold">
                      Current Plan
                    </span>

                    <h3 className="text-2xl font-bold mt-1">
                      {plan === 'PRO'
                        ? 'Pro Analytics Plan'
                        : 'Free Plan'}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)]">
                      {plan === 'PRO'
                        ? planEndsAt
                          ? `Plan active until ${formatDate(
                              planEndsAt
                            )}`
                          : 'Active Pro subscription'
                        : 'Upgrade to Pro to unlock premium features.'}
                    </p>

                  </div>

                  {plan === 'FREE' && (
                    <button
                      type="button"
                      onClick={() =>
                        window.location.href =
                          '/pricing'
                      }
                      className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors"
                    >
                      Upgrade Plan
                    </button>
                  )}

                </div>

                <div className="pt-4 border-t border-[var(--border-color)]">

                  <div className="flex justify-between text-sm">

                    <span>
                      Subscription Status
                    </span>

                    <span className="font-medium">
                      {subscription?.status ??
                        (plan === 'PRO'
                          ? 'Active'
                          : 'Free')}
                    </span>

                  </div>

                  {subscription?.cancelAtPeriodEnd && (
                    <p className="text-xs text-amber-500 mt-2">
                      Your subscription is scheduled to end at the end of the current billing period.
                    </p>
                  )}

                </div>

              </div>

              <div className="border border-[var(--border-color)] rounded-xl p-6 space-y-4">

                <div>

                  <h3 className="font-semibold text-lg">
                    Account & Subscription
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)]">
                    Subscription information currently available from your account.
                  </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="rounded-lg bg-[var(--bg-accent)] p-4">

                    <p className="text-xs text-[var(--text-secondary)]">
                      Account
                    </p>

                    <p className="font-medium mt-1">
                      {profile?.email ??
                        'Not available'}
                    </p>

                  </div>

                  <div className="rounded-lg bg-[var(--bg-accent)] p-4">

                    <p className="text-xs text-[var(--text-secondary)]">
                      Current Plan
                    </p>

                    <p className="font-medium mt-1">
                      {plan}
                    </p>

                  </div>

                  <div className="rounded-lg bg-[var(--bg-accent)] p-4">

                    <p className="text-xs text-[var(--text-secondary)]">
                      Plan End Date
                    </p>

                    <p className="font-medium mt-1">
                      {formatDate(
                        planEndsAt
                      )}
                    </p>

                  </div>

                  <div className="rounded-lg bg-[var(--bg-accent)] p-4">

                    <p className="text-xs text-[var(--text-secondary)]">
                      Meta Ad Accounts
                    </p>

                    <p className="font-medium mt-1">
                      {
                        accounts.filter(
                          (account) =>
                            enabledAccounts[
                              account.id
                            ]
                        ).length
                      }{' '}
                      enabled
                    </p>

                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}