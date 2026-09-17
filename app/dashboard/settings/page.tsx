'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import apiClient from '@/api/client';

import { connectMeta, getMetaStatus, getMetaAdAccounts, connectMetaAdAccount, disconnectMeta, syncMeta,} from '@/api/meta';
import { getInstagramAccounts, getConnectedInstagram, connectInstagram, syncInstagram, disconnectInstagram,} from '@/api/instagram';

import MetaBusinessCard from '@/components/dashboard/settings/MetaBusinessCard';
import MetaAdAccountsCard, {AdAccount,} from '@/components/dashboard/settings/AdAccountCard';

import InstagramAccountCard, { InstagramAccount, ConnectedInstagramAccount,} from '@/components/dashboard/settings/InstaAccountCard';

const extractData = (response: any) => {
  return (
    response?.data?.data ??
    response?.data ??
    response
  );
};

const normalizeAccounts = (
  response: any
): AdAccount[] => {
  const data = extractData(response);

  if (Array.isArray(data)) return data;

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

  if (Array.isArray(data)) return data;

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

  if (!data) return null;

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

const getConnectedValue = (
  response: any
): boolean => {
  const data = extractData(response);

  if (typeof data === 'boolean') {
    return data;
  }

  return Boolean(
    data?.connected ??
      data?.isMetaConnected ??
      data?.isConnected
  );
};

const getAccountId = (
  response: any
): string | null => {
  const data = extractData(response);

  return (
    data?.adAccountId ??
    data?.selectedAccountId ??
    data?.accountId ??
    data?.meta?.adAccountId ??
    null
  );
};

const getErrorMessage = (
  error: any,
  fallback: string
) => {
  return (
    error?.response?.data?.message ??
    error?.response?.data?.error ??
    error?.message ??
    fallback
  );
};

export default function IntegrationsTab() {
  const [metaConnected, setMetaConnected] =
    useState(false);

  const [metaAccounts, setMetaAccounts] =
    useState<AdAccount[]>([]);

  const [selectedMetaAccountId, setSelectedMetaAccountId] =
    useState<string | null>(null);

  const [enabledAccounts, setEnabledAccounts] =
    useState<Record<string, boolean>>({});

  const [instagramAccounts, setInstagramAccounts] =
    useState<InstagramAccount[]>([]);

  const [connectedInstagram, setConnectedInstagram] =
    useState<ConnectedInstagramAccount | null>(
      null
    );

  const [instagramLoading, setInstagramLoading] =
    useState(false);

  const [connectingMeta, setConnectingMeta] =
    useState(false);

  const [disconnectingMeta, setDisconnectingMeta] =
    useState(false);

  const [syncingMeta, setSyncingMeta] =
    useState(false);

  const [selectingAccount, setSelectingAccount] =
    useState<string | null>(null);

  const [connectingInstagram, setConnectingInstagram] =
    useState<string | null>(null);

  const [syncingInstagram, setSyncingInstagram] =
    useState(false);

  const [
    disconnectingInstagram,
    setDisconnectingInstagram,
  ] = useState(false);

  const [tokenExpiresAt, setTokenExpiresAt] =
    useState<string | null>(null);

  const loadMeta = async () => {
    try {
      const statusResponse =
        await getMetaStatus();

      const connected =
        getConnectedValue(statusResponse);

      setMetaConnected(connected);

      const accountId =
        getAccountId(statusResponse);

      setSelectedMetaAccountId(accountId);

      if (!connected) {
        setMetaAccounts([]);
        setSelectedMetaAccountId(null);
        return;
      }

      const accountsResponse =
        await getMetaAdAccounts();

      const accounts =
        normalizeAccounts(accountsResponse);

      setMetaAccounts(accounts);

      const states: Record<string, boolean> =
        {};

      accounts.forEach((account) => {
        states[account.id] =
          account.isEnabled ??
          account.enabled ??
          account.id === accountId;
      });

      setEnabledAccounts(states);
    } catch (error) {
      console.error(
        'Meta loading error:',
        error
      );

      setMetaConnected(false);
      setMetaAccounts([]);
    }
  };

  const loadInstagram = async () => {
    try {
      setInstagramLoading(true);

      const [
        accountsResponse,
        connectedResponse,
      ] = await Promise.all([
        getInstagramAccounts(),
        getConnectedInstagram(),
      ]);

      setInstagramAccounts(
        normalizeInstagramAccounts(
          accountsResponse
        )
      );

      setConnectedInstagram(
        normalizeConnectedInstagram(
          connectedResponse
        )
      );
    } catch (error) {
      console.error(
        'Instagram loading error:',
        error
      );

      setInstagramAccounts([]);
      setConnectedInstagram(null);
    } finally {
      setInstagramLoading(false);
    }
  };

  const loadAll = async () => {
    await Promise.all([
      loadMeta(),
      loadInstagram(),
    ]);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleConnectMeta = () => {
    try {
      setConnectingMeta(true);
      connectMeta();
    } catch (error) {
      setConnectingMeta(false);

      toast.error(
        getErrorMessage(
          error,
          'Unable to connect Meta.'
        )
      );
    }
  };

  const handleDisconnectMeta = async () => {
    try {
      setDisconnectingMeta(true);

      await disconnectMeta();

      setMetaConnected(false);
      setMetaAccounts([]);
      setSelectedMetaAccountId(null);

      toast.success(
        'Meta account disconnected successfully.'
      );

      await loadAll();
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          'Unable to disconnect Meta.'
        )
      );
    } finally {
      setDisconnectingMeta(false);
    }
  };

  const handleSyncMeta = async () => {
    if (!selectedMetaAccountId) {
      toast.error(
        'Select a Meta ad account first.'
      );
      return;
    }

    try {
      setSyncingMeta(true);

      await syncMeta();

      await loadMeta();

      toast.success(
        'Meta data synchronized successfully.'
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          'Unable to synchronize Meta data.'
        )
      );
    } finally {
      setSyncingMeta(false);
    }
  };

  const handleConnectAdAccount = async (
    accountId: string
  ) => {
    try {
      setSelectingAccount(accountId);

      await connectMetaAdAccount(accountId);

      setSelectedMetaAccountId(accountId);

      setEnabledAccounts((current) => ({
        ...current,
        [accountId]: true,
      }));

      toast.success(
        'Meta ad account connected successfully.'
      );

      await loadMeta();
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          'Unable to connect this Meta ad account.'
        )
      );
    } finally {
      setSelectingAccount(null);
    }
  };

  const handleToggleAdAccount = async (
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

      toast.success(
        nextValue
          ? 'Ad account enabled.'
          : 'Ad account disabled.'
      );
    } catch (error) {
      setEnabledAccounts((current) => ({
        ...current,
        [accountId]: !nextValue,
      }));

      toast.error(
        getErrorMessage(
          error,
          'Unable to update the ad account.'
        )
      );
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

      toast.success(
        `Instagram @${
          account.username ??
          account.name ??
          'account'
        } connected successfully.`
      );

      await loadInstagram();
    } catch (error) {
      console.error(
        'Instagram connection error:',
        error
      );

      toast.error(
        getErrorMessage(
          error,
          'Unable to connect Instagram account.'
        )
      );
    } finally {
      setConnectingInstagram(null);
    }
  };

  const handleSyncInstagram = async () => {
    if (!connectedInstagram) {
      toast.error(
        'Connect an Instagram account first.'
      );
      return;
    }

    try {
      setSyncingInstagram(true);

      await syncInstagram();

      await loadInstagram();

      toast.success(
        'Instagram data synchronized successfully.'
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
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

        toast.success(
          'Instagram account disconnected successfully.'
        );

        await loadInstagram();
      } catch (error) {
        toast.error(
          getErrorMessage(
            error,
            'Unable to disconnect Instagram.'
          )
        );
      } finally {
        setDisconnectingInstagram(false);
      }
    };

  const getTokenStatus = () => {
    if (!tokenExpiresAt) {
      return {
        text: 'Expiration date unavailable',
        valid: true,
      };
    }

    const expiry = new Date(
      tokenExpiresAt
    ).getTime();

    if (Number.isNaN(expiry)) {
      return {
        text: 'Expiration date unavailable',
        valid: true,
      };
    }

    const difference =
      expiry - Date.now();

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

  const selectedAccount =
    metaAccounts.find(
      (account) =>
        account.id === selectedMetaAccountId
    );

  const tokenStatus =
    getTokenStatus();

  return (
    <div className="space-y-6">
      <MetaBusinessCard
        connected={metaConnected}
        accountName={selectedAccount?.name}
        tokenStatus={tokenStatus}
        syncing={syncingMeta}
        connecting={connectingMeta}
        disconnecting={disconnectingMeta}
        selectedAccountId={
          selectedMetaAccountId
        }
        onConnect={handleConnectMeta}
        onSync={handleSyncMeta}
        onDisconnect={handleDisconnectMeta}
      />

      <MetaAdAccountsCard
        connected={metaConnected}
        accounts={metaAccounts}
        selectedAccountId={
          selectedMetaAccountId
        }
        enabledAccounts={enabledAccounts}
        selectingAccount={selectingAccount}
        onToggle={handleToggleAdAccount}
        onConnect={handleConnectAdAccount}
      />

      <InstagramAccountCard
        metaConnected={metaConnected}
        accounts={instagramAccounts}
        connectedInstagram={connectedInstagram}
        loading={instagramLoading}
        connectingId={connectingInstagram}
        syncing={syncingInstagram}
        disconnecting={disconnectingInstagram}
        onConnect={handleConnectInstagram}
        onSync={handleSyncInstagram}
        onDisconnect={
          handleDisconnectInstagram
        }
        onConnectMeta={handleConnectMeta}
      />
    </div>
  );
}