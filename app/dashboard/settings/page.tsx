'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Link2,
  RefreshCw,
  CheckCircle2,
  Sliders,
  CreditCard,
  Moon,
  Sun,
  ExternalLink,
  Unplug,
  Users,
  Image,
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

import apiClient from '@/api/client';

import {
  connectMeta,
  getMetaStatus,
  getMetaAdAccounts,
  connectMetaAdAccount,
  disconnectMeta,
  syncMeta,
} from '@/api/meta';

import {
  getInstagramAccounts,
  getConnectedInstagram,
  connectInstagram,
  syncInstagram,
  disconnectInstagram,
} from '@/api/instagram';

type ActiveTab = 'integrations' | 'preferences' | 'billing';

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

interface InstagramAccount {
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

interface ConnectedInstagramAccount {
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

const TOAST_DURATION = 5000;

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

const normalizeInstagramAccounts = (
  response: any
): InstagramAccount[] => {
  const data = extractData(response);

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.accounts)) {
    return data.accounts;
  }

  if (Array.isArray(data?.instagramAccounts)) {
    return data.instagramAccounts;
  }

  return [];
};

const normalizeConnectedInstagram = (
  response: any
): ConnectedInstagramAccount | null => {
  const data = extractData(response);

  if (!data) {
    return null;
  }

  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  if (Array.isArray(data?.data)) {
    return data.data[0] ?? null;
  }

  if (data?.account) {
    return data.account;
  }

  if (data?.instagram) {
    return data.instagram;
  }

  if (data?.connectedInstagram) {
    return data.connectedInstagram;
  }

  if (
    data?.instagramAccountId ||
    data?.username ||
    data?.profilePictureUrl
  ) {
    return data;
  }

  return null;
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

const getErrorMessage = (err: any, fallback: string) => {
  return (
    err?.response?.data?.message ??
    err?.response?.data?.error ??
    err?.message ??
    fallback
  );
};

const InstagramIcon = ({ size = 24 }: { size?: number }) => {
  const innerSize = Math.round(size * 0.32);
  const dotSize = Math.max(2, Math.round(size * 0.1));
  const borderRadius = Math.round(size * 0.28);

  return (
    <div
      className="relative border-2 border-white"
      style={{
        width: size,
        height: size,
        borderRadius,
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
        style={{
          width: innerSize,
          height: innerSize,
        }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: dotSize,
          height: dotSize,
          top: size * 0.18,
          right: size * 0.18,
        }}
      />
    </div>
  );
};

const ToastMessage = ({
  t,
  message,
}: {
  t: any;
  message: string;
}) => {
  const isError = t.type === 'error';

  return (
    <div
      className={`relative min-w-[320px] max-w-[420px] overflow-hidden rounded-xl border px-4 py-3 shadow-xl ${
        isError
          ? 'border-red-500/30 bg-[var(--bg-primary)] text-red-500'
          : 'border-emerald-500/30 bg-[var(--bg-primary)] text-emerald-500'
      }`}
    >
      <div className="flex items-start gap-3 pr-1">
        <div className="flex-1 text-sm font-medium leading-5">
          {message}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full overflow-hidden">
        <div
          className={`h-full ${
            isError ? 'bg-red-500' : 'bg-emerald-500'
          }`}
          style={{
            animation: `toastProgress ${TOAST_DURATION}ms linear forwards`,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes toastProgress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] =
    useState(false);

  const [selectingAccount, setSelectingAccount] =
    useState<string | null>(null);

  const [syncingInstagram, setSyncingInstagram] =
    useState(false);

  const [connectingInstagram, setConnectingInstagram] =
    useState<string | null>(null);

  const [
    disconnectingInstagram,
    setDisconnectingInstagram,
  ] = useState(false);

  const [metaConnected, setMetaConnected] =
    useState(false);

  const [metaAccounts, setMetaAccounts] =
    useState<AdAccount[]>([]);

  const [
    selectedMetaAccountId,
    setSelectedMetaAccountId,
  ] = useState<string | null>(null);

  const [instagramAccounts, setInstagramAccounts] =
    useState<InstagramAccount[]>([]);

  const [
    connectedInstagram,
    setConnectedInstagram,
  ] = useState<ConnectedInstagramAccount | null>(
    null
  );

  const [instagramLoading, setInstagramLoading] =
    useState(false);

  const [frequency, setFrequency] =
    useState('hourly');

  const [importRange, setImportRange] =
    useState<number>(30);

  const [enabledAccounts, setEnabledAccounts] =
    useState<Record<string, boolean>>({});

  const showSuccess = (message: string) => {
    toast.custom(
      (t) => (
        <ToastMessage
          t={t}
          message={message}
        />
      ),
      {
        duration: TOAST_DURATION,
        position: 'top-right',
      }
    );
  };

  const showError = (message: string) => {
    toast.custom(
      (t) => (
        <ToastMessage
          t={t}
          message={message}
        />
      ),
      {
        duration: TOAST_DURATION,
        position: 'top-right',
      }
    );
  };

  const loadMetaData = async () => {
    try {
      const statusResponse = await getMetaStatus();

      const connectedFromMeta =
        getMetaConnected(statusResponse);

      setMetaConnected(connectedFromMeta);

      const accountId =
        getMetaAccountId(statusResponse);

      setSelectedMetaAccountId(accountId);

      if (connectedFromMeta) {
        try {
          const accountsResponse =
            await getMetaAdAccounts();

          const accounts =
            normalizeAccounts(accountsResponse);

          setMetaAccounts(accounts);

          const accountState: Record<
            string,
            boolean
          > = {};

          accounts.forEach((account) => {
            accountState[account.id] =
              account.isEnabled ??
              account.enabled ??
              account.id === accountId;
          });

          setEnabledAccounts((current) => ({
            ...accountState,
            ...current,
          }));
        } catch (accountsError) {
          console.error(
            'Meta ad accounts loading error:',
            accountsError
          );
        }
      } else {
        setMetaAccounts([]);
        setSelectedMetaAccountId(null);
      }
    } catch (err) {
      console.error(
        'Meta status loading error:',
        err
      );

      setMetaConnected(false);
    }
  };

  const loadInstagramData = async () => {
    try {
      setInstagramLoading(true);

      const [
        accountsResponse,
        connectedResponse,
      ] = await Promise.all([
        getInstagramAccounts(),
        getConnectedInstagram(),
      ]);

      const availableAccounts =
        normalizeInstagramAccounts(
          accountsResponse
        );

      const connectedAccount =
        normalizeConnectedInstagram(
          connectedResponse
        );

      setInstagramAccounts(
        availableAccounts
      );

      setConnectedInstagram(
        connectedAccount
      );
    } catch (err) {
      console.error(
        'Instagram loading error:',
        err
      );

      setInstagramAccounts([]);
      setConnectedInstagram(null);
    } finally {
      setInstagramLoading(false);
    }
  };

  const loadSettings = async () => {
    try {
      setLoading(true);

      const [
        settingsResponse,
        profileResponse,
        subscriptionResponse,
      ] = await Promise.allSettled([
        apiClient.get('/dashboard/settings'),
        apiClient.get('/dashboard/profile'),
        apiClient.get('/subscriptions/me'),
      ]);

      if (
        settingsResponse.status ===
        'fulfilled'
      ) {
        const data =
          settingsResponse.value?.data?.data ??
          settingsResponse.value?.data;

        setSettings(data ?? null);

        const sync = data?.sync;

        if (sync?.frequency) {
          setFrequency(sync.frequency);
        }

        const parsedImportRange = Number(
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
          setImportRange(parsedImportRange);
        } else {
          setImportRange(30);
        }

        const accounts =
          data?.meta?.adAccounts ?? [];

        const accountState: Record<
          string,
          boolean
        > = {};

        accounts.forEach(
          (account: AdAccount) => {
            accountState[account.id] =
              account.isEnabled ??
              account.enabled ??
              false;
          }
        );

        setEnabledAccounts((current) => ({
          ...accountState,
          ...current,
        }));

        if (data?.meta?.adAccountId) {
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
          profileResponse.value?.data?.data ??
          profileResponse.value?.data;

        setProfile(data ?? null);
      }

      if (
        subscriptionResponse.status ===
        'fulfilled'
      ) {
        const data =
          subscriptionResponse.value?.data?.data ??
          subscriptionResponse.value?.data;

        setSubscription(data ?? null);
      }

      await Promise.all([
        loadMetaData(),
        loadInstagramData(),
      ]);
    } catch (err) {
      console.error(
        'Settings loading error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to load your settings.'
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

      await disconnectMeta();

      setMetaConnected(false);
      setMetaAccounts([]);
      setSelectedMetaAccountId(null);

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
      setSelectingAccount(accountId);

      await connectMetaAdAccount(
        accountId
      );

      setSelectedMetaAccountId(accountId);

      setEnabledAccounts((current) => ({
        ...current,
        [accountId]: true,
      }));

      const account = metaAccounts.find(
        (item) => item.id === accountId
      );

      if (account) {
        setSettings((current) => ({
          ...(current ?? {}),
          meta: {
            ...(current?.meta ?? {}),
            adAccountId: account.id,
            adAccountName: account.name,
            connected: true,
          },
        }));
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
      setSelectingAccount(null);
    }
  };

  const toggleAdAccount = async (
    accountId: string
  ) => {
    const nextValue =
      !enabledAccounts[accountId];

    setEnabledAccounts((current) => ({
      ...current,
      [accountId]: nextValue,
    }));

    try {
      await apiClient.patch(
        `/dashboard/settings/ad-accounts/${accountId}`,
        {
          enabled: nextValue,
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

      setEnabledAccounts((current) => ({
        ...current,
        [accountId]: !nextValue,
      }));

      showError(
        getErrorMessage(
          err,
          'Unable to update the ad account.'
        )
      );
    }
  };

  const handleSync = async () => {
    if (!metaConnected) {
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

  const handleConnectInstagram = async (
    account: InstagramAccount
  ) => {
    try {
      setConnectingInstagram(account.id);

      await connectInstagram(
        account.id,
        account.facebookPageId,
        account.facebookPageName
      );

      showSuccess(
        `Instagram @${
          account.username ??
          account.name ??
          'account'
        } connected successfully.`
      );

      await loadInstagramData();
    } catch (err) {
      console.error(
        'Instagram connection error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to connect Instagram account.'
        )
      );
    } finally {
      setConnectingInstagram(null);
    }
  };

  const handleSyncInstagram = async () => {
    if (!connectedInstagram) {
      showError(
        'Connect an Instagram account before synchronizing.'
      );
      return;
    }

    try {
      setSyncingInstagram(true);

      await syncInstagram();
      await loadInstagramData();

      showSuccess(
        'Instagram data synchronized successfully.'
      );
    } catch (err) {
      console.error(
        'Instagram synchronization error:',
        err
      );

      showError(
        getErrorMessage(
          err,
          'Unable to synchronize Instagram data.'
        )
      );
    } finally {
      setSyncingInstagram(false);
    }
  };

  const handleDisconnectInstagram =
    async () => {
      try {
        setDisconnectingInstagram(true);

        await disconnectInstagram();

        setConnectedInstagram(null);

        showSuccess(
          'Instagram account disconnected successfully.'
        );

        await loadInstagramData();
      } catch (err) {
        console.error(
          'Instagram disconnect error:',
          err
        );

        showError(
          getErrorMessage(
            err,
            'Unable to disconnect Instagram.'
          )
        );
      } finally {
        setDisconnectingInstagram(false);
      }
    };

  const saveSyncSettings = async () => {
    try {
      setSaving(true);

      const safeImportRange =
        [30, 90, 365].includes(
          importRange
        )
          ? importRange
          : 30;

      setImportRange(safeImportRange);

      await apiClient.put(
        '/dashboard/settings/sync',
        {
          frequency,
          importRange: safeImportRange,
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

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
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

  const getTokenStatus = () => {
    const expiresAt =
      settings?.meta?.tokenExpiresAt;

    if (!expiresAt) {
      return {
        text: 'Expiration date unavailable',
        valid: true,
      };
    }

    const expiry = new Date(expiresAt);

    if (Number.isNaN(expiry.getTime())) {
      return {
        text: 'Expiration date unavailable',
        valid: true,
      };
    }

    const difference =
      expiry.getTime() - Date.now();

    if (difference <= 0) {
      return {
        text: 'Expired',
        valid: false,
      };
    }

    const days = Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );

    return {
      text: `Active · Expires in ${days} day${
        days === 1 ? '' : 's'
      }`,
      valid: true,
    };
  };

  const tokenStatus = getTokenStatus();

  const accounts =
    metaAccounts.length > 0
      ? metaAccounts
      : settings?.meta?.adAccounts ?? [];

  const connected =
    metaConnected ||
    profile?.isMetaConnected === true ||
    settings?.meta?.connected === true;

  const selectedAccount =
    accounts.find(
      (account) =>
        account.id ===
        selectedMetaAccountId
    ) ??
    accounts.find(
      (account) =>
        account.id ===
        settings?.meta?.adAccountId
    );

  const plan =
    subscription?.plan ??
    profile?.plan ??
    'FREE';

  const planEndsAt =
    subscription?.planEndsAt ??
    subscription?.currentPeriodEnd ??
    null;

  const instagramConnected =
    connectedInstagram?.isConnected ===
    true;

  if (loading) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: TOAST_DURATION,
          }}
        />

        <div className="min-h-screen p-6 text-[var(--text-primary)] md:p-10">
          <div className="mx-auto flex min-h-[400px] max-w-6xl items-center justify-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Loading settings...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: TOAST_DURATION,
        }}
      />

      <div className="min-h-screen p-6 text-[var(--text-primary)] transition-colors duration-300 md:p-10">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Settings
            </h1>

            <p className="mt-1 text-[var(--text-secondary)]">
              Manage your Meta and Instagram
              connections, preferences, and
              subscription details.
            </p>
          </div>

          <div className="flex space-x-1 overflow-x-auto border-b border-[var(--border-color)] scrollbar-none">
            <button
              onClick={() =>
                setActiveTab('integrations')
              }
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'integrations'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Link2 className="h-4 w-4" />
              Connections
            </button>

            <button
              onClick={() =>
                setActiveTab('preferences')
              }
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'preferences'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Sliders className="h-4 w-4" />
              Preferences
            </button>

            <button
              onClick={() =>
                setActiveTab('billing')
              }
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'billing'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <CreditCard className="h-4 w-4" />
              Billing & Usage
            </button>
          </div>

          <div className="space-y-6">
            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="space-y-4 rounded-xl border border-[var(--border-color)] p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--social-facebook)] text-xl font-bold text-white">
                        f
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            Meta Business Account
                          </h3>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              connected
                                ? 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]'
                                : 'bg-red-500/10 text-red-500'
                            }`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
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
                            onClick={handleSync}
                            disabled={
                              syncing ||
                              !selectedMetaAccountId
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-accent)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <RefreshCw
                              className={`h-4 w-4 ${
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
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
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
                          onClick={
                            handleConnectMeta
                          }
                          disabled={connecting}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50"
                        >
                          <Link2 className="h-4 w-4" />
                          {connecting
                            ? 'Connecting...'
                            : 'Connect Meta'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-lg bg-[var(--bg-accent)] p-3 text-xs text-[var(--text-secondary)]">
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
                        className="flex items-center gap-1 text-[var(--primary)] hover:underline"
                      >
                        Meta Portal
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-[var(--border-color)] p-6">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Active Ad Accounts
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)]">
                      Connect a Meta ad account and
                      choose which accounts should
                      synchronize with your dashboard.
                    </p>
                  </div>

                  {!connected ? (
                    <div className="rounded-lg border border-[var(--border-color)] p-5 text-sm text-[var(--text-secondary)]">
                      Connect your Meta account first
                      to load your available ad
                      accounts.
                    </div>
                  ) : accounts.length === 0 ? (
                    <div className="rounded-lg border border-[var(--border-color)] p-5 text-sm text-[var(--text-secondary)]">
                      No Meta ad accounts are
                      available for this account.
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--border-color)] overflow-hidden rounded-lg border border-[var(--border-color)]">
                      {accounts.map((account) => {
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
                            key={account.id}
                            className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-[var(--bg-accent)] sm:flex-row sm:items-center"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={enabled}
                                onChange={() =>
                                  toggleAdAccount(
                                    account.id
                                  )
                                }
                                disabled={!connected}
                                className="h-4 w-4 rounded border-[var(--border-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
                              />

                              <div>
                                <p className="text-sm font-medium">
                                  {account.name}
                                </p>

                                <p className="text-xs text-[var(--text-secondary)]">
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
                                <span className="rounded-full bg-[var(--accent-teal)]/10 px-2.5 py-1 text-xs font-medium text-[var(--accent-teal)]">
                                  Connected
                                </span>
                              )}

                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
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
                                  className="rounded-lg bg-[var(--primary)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50"
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

                <div className="space-y-5 rounded-xl border border-[var(--border-color)] p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white">
                        <InstagramIcon size={24} />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            Instagram Account
                          </h3>

                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              instagramConnected
                                ? 'bg-[var(--accent-teal)]/10 text-[var(--accent-teal)]'
                                : 'bg-red-500/10 text-red-500'
                            }`}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                            {instagramConnected
                              ? 'Connected'
                              : 'Not Connected'}
                          </span>
                        </div>

                        <p className="text-sm text-[var(--text-secondary)]">
                          {instagramConnected
                            ? `@${
                                connectedInstagram?.username ??
                                connectedInstagram?.name ??
                                'Instagram account'
                              }`
                            : 'Connect an Instagram account associated with your Meta setup.'}
                        </p>
                      </div>
                    </div>

                    {instagramConnected && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={
                            handleSyncInstagram
                          }
                          disabled={
                            syncingInstagram
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-accent)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-opacity hover:opacity-90 disabled:opacity-50"
                        >
                          <RefreshCw
                            className={`h-4 w-4 ${
                              syncingInstagram
                                ? 'animate-spin'
                                : ''
                            }`}
                          />
                          {syncingInstagram
                            ? 'Syncing...'
                            : 'Sync Instagram'}
                        </button>

                        <button
                          type="button"
                          onClick={
                            handleDisconnectInstagram
                          }
                          disabled={
                            disconnectingInstagram
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                        >
                          <Unplug className="h-4 w-4" />
                          {disconnectingInstagram
                            ? 'Disconnecting...'
                            : 'Disconnect'}
                        </button>
                      </div>
                    )}
                  </div>

                  {instagramConnected &&
                    connectedInstagram && (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <Users className="h-4 w-4" />
                            Followers
                          </div>

                          <p className="mt-1 text-lg font-semibold">
                            {(
                              connectedInstagram.followersCount ??
                              0
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <Users className="h-4 w-4" />
                            Following
                          </div>

                          <p className="mt-1 text-lg font-semibold">
                            {(
                              connectedInstagram.followsCount ??
                              0
                            ).toLocaleString()}
                          </p>
                        </div>

                        <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                            <Image className="h-4 w-4" />
                            Posts
                          </div>

                          <p className="mt-1 text-lg font-semibold">
                            {(
                              connectedInstagram.mediaCount ??
                              0
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}

                  {instagramConnected &&
                    connectedInstagram?.facebookPageName && (
                      <div className="rounded-lg bg-[var(--bg-accent)] p-3 text-xs text-[var(--text-secondary)]">
                        Connected through Facebook
                        Page:{' '}
                        <strong>
                          {
                            connectedInstagram.facebookPageName
                          }
                        </strong>
                      </div>
                    )}

                  {instagramConnected &&
                    connectedInstagram?.lastSyncedAt && (
                      <p className="text-xs text-[var(--text-secondary)]">
                        Last synchronized:{' '}
                        {formatDate(
                          connectedInstagram.lastSyncedAt
                        )}
                      </p>
                    )}

                  {!instagramConnected && (
                    <div className="space-y-3">
                      {instagramLoading ? (
                        <div className="rounded-lg border border-[var(--border-color)] p-5 text-sm text-[var(--text-secondary)]">
                          Loading Instagram
                          accounts...
                        </div>
                      ) : instagramAccounts.length ===
                        0 ? (
                        <div className="rounded-lg border border-[var(--border-color)] p-5 text-sm text-[var(--text-secondary)]">
                          No Instagram accounts
                          are available. Make sure
                          your Instagram professional
                          account is connected to an
                          eligible Facebook Page and
                          that the required Meta
                          permissions are configured.
                        </div>
                      ) : (
                        <div className="divide-y divide-[var(--border-color)] overflow-hidden rounded-lg border border-[var(--border-color)]">
                          {instagramAccounts.map(
                            (account) => (
                              <div
                                key={account.id}
                                className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-[var(--bg-accent)] sm:flex-row sm:items-center"
                              >
                                <div className="flex items-center gap-3">
                                  {account.profile_picture_url ? (
                                    <img
                                      src={
                                        account.profile_picture_url
                                      }
                                      alt={
                                        account.username ??
                                        'Instagram'
                                      }
                                      className="h-11 w-11 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white">
                                      <InstagramIcon size={20} />
                                    </div>
                                  )}

                                  <div>
                                    <p className="text-sm font-medium">
                                      {account.username
                                        ? `@${account.username}`
                                        : account.name ??
                                          'Instagram Account'}
                                    </p>

                                    <p className="text-xs text-[var(--text-secondary)]">
                                      {account.name &&
                                      account.username
                                        ? account.name
                                        : ''}

                                      {account.facebookPageName &&
                                        ` • Page: ${account.facebookPageName}`}
                                    </p>

                                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                                      {(
                                        account.followers_count ??
                                        0
                                      ).toLocaleString()}{' '}
                                      followers
                                      {' • '}
                                      {(
                                        account.media_count ??
                                        0
                                      ).toLocaleString()}{' '}
                                      posts
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleConnectInstagram(
                                      account
                                    )
                                  }
                                  disabled={
                                    connectingInstagram !==
                                    null
                                  }
                                  className="rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50"
                                >
                                  {connectingInstagram ===
                                  account.id
                                    ? 'Connecting...'
                                    : 'Connect'}
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6 rounded-xl border border-[var(--border-color)] p-6">
                <div>
                  <h3 className="text-lg font-semibold">
                    Appearance
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)]">
                    Choose how Ad Pilot looks on
                    your device.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    Theme
                  </label>

                  <div className="flex max-w-sm gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setTheme('light')
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${
                        theme === 'light'
                          ? 'border-[var(--primary)] bg-[var(--bg-accent)] text-[var(--primary)]'
                          : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Sun className="h-4 w-4" />
                      Light
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setTheme('dark')
                      }
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${
                        theme === 'dark'
                          ? 'border-[var(--primary)] bg-[var(--bg-accent)] text-[var(--primary)]'
                          : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Moon className="h-4 w-4" />
                      Dark
                    </button>
                  </div>
                </div>

                <div className="space-y-5 border-t border-[var(--border-color)] pt-6">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Data Synchronization
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)]">
                      Configure how frequently
                      Meta data is synchronized.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">
                        Sync Frequency
                      </label>

                      <select
                        value={frequency}
                        onChange={(event) =>
                          setFrequency(
                            event.target.value
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-sm outline-none"
                      >
                        <option value="hourly">
                          Hourly
                        </option>
                        <option value="daily">
                          Daily
                        </option>
                        <option value="weekly">
                          Weekly
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Import Range
                      </label>

                      <select
                        value={importRange}
                        onChange={(event) =>
                          setImportRange(
                            Number(
                              event.target.value
                            )
                          )
                        }
                        className="mt-2 w-full rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-sm outline-none"
                      >
                        <option value={30}>
                          Last 30 days
                        </option>
                        <option value={90}>
                          Last 90 days
                        </option>
                        <option value={365}>
                          Last 365 days
                        </option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={saveSyncSettings}
                    disabled={saving}
                    className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50"
                  >
                    {saving
                      ? 'Saving...'
                      : 'Save Preferences'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="space-y-6 rounded-xl border border-[var(--border-color)] p-6">
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-teal)]">
                        Current Plan
                      </span>

                      <h3 className="mt-1 text-2xl font-bold">
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
                          (window.location.href =
                            '/pricing')
                        }
                        className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--primary-hover)]"
                      >
                        Upgrade Plan
                      </button>
                    )}
                  </div>

                  <div className="border-t border-[var(--border-color)] pt-4">
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
                      <p className="mt-2 text-xs text-amber-500">
                        Your subscription is
                        scheduled to end at the end
                        of the current billing period.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 rounded-xl border border-[var(--border-color)] p-6">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Account & Subscription
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)]">
                      Subscription information
                      currently available from your
                      account.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                      <p className="text-xs text-[var(--text-secondary)]">
                        Account
                      </p>

                      <p className="mt-1 font-medium">
                        {profile?.email ??
                          'Not available'}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                      <p className="text-xs text-[var(--text-secondary)]">
                        Current Plan
                      </p>

                      <p className="mt-1 font-medium">
                        {plan}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                      <p className="text-xs text-[var(--text-secondary)]">
                        Plan End Date
                      </p>

                      <p className="mt-1 font-medium">
                        {formatDate(planEndsAt)}
                      </p>
                    </div>

                    <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                      <p className="text-xs text-[var(--text-secondary)]">
                        Meta Ad Accounts
                      </p>

                      <p className="mt-1 font-medium">
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

                    <div className="rounded-lg bg-[var(--bg-accent)] p-4">
                      <p className="text-xs text-[var(--text-secondary)]">
                        Instagram
                      </p>

                      <p className="mt-1 font-medium">
                        {instagramConnected
                          ? `@${
                              connectedInstagram?.username ??
                              'Connected'
                            }`
                          : 'Not connected'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}