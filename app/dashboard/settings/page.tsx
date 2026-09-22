"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/api/client";
import { updateAdAccountSync } from "@/api/dashboad";
import {
connectMeta,
getMetaStatus,
getMetaAdAccounts,
connectMetaAdAccount,
disconnectMeta,
syncMeta,
} from "@/api/meta";
import {
getInstagramAccounts,
getConnectedInstagram,
connectInstagram,
syncInstagram,
disconnectInstagram,
} from "@/api/instagram";
import MetaBusinessCard from "@/components/dashboard/settings/MetaBusinessCard";
import MetaAdAccountsCard, {
AdAccount,
} from "@/components/dashboard/settings/AdAccountCard";
import InstagramAccountCard, {
InstagramAccount,
ConnectedInstagramAccount,
} from "@/components/dashboard/settings/InstaAccountCard";
import PreferencesCard from "@/components/dashboard/settings/PreferenceCard";
import BillingCard from "@/components/dashboard/settings/BillingCard";

type SettingsTab = "integrations" | "preferences" | "billing";

interface ProfileData {
name: string;
email: string;
plan: string;
}

const extractData = (response: unknown): any => {
const res = response as any;
return res?.data?.data ?? res?.data ?? res;
};

const normalizeAccounts = (response: unknown): AdAccount[] => {
const data = extractData(response);

if (Array.isArray(data)) {
return data;
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
response: unknown
): InstagramAccount[] => {
const data = extractData(response);

if (Array.isArray(data)) {
return data;
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
response: unknown
): ConnectedInstagramAccount | null => {
const data = extractData(response);

if (!data) {
return null;
}

if (data?.isConnected === false) {
return null;
}

if (data?.instagramAccountId) {
return data;
}

if (data?.account?.instagramAccountId) {
return data.account;
}

return null;
};

const getConnectedValue = (response: unknown): boolean => {
const data = extractData(response);

if (typeof data === "boolean") {
return data;
}

if (typeof data?.connected === "boolean") {
return data.connected;
}

if (typeof data?.isConnected === "boolean") {
return data.isConnected;
}

return false;
};

const getAccountId = (response: unknown): string | null => {
const data = extractData(response);

return (
data?.adAccountId ??
data?.metaAdAccountId ??
data?.accountId ??
null
);
};

const getTokenExpiry = (response: unknown): string | null => {
const data = extractData(response);

return (
data?.tokenExpiresAt ??
data?.metaTokenExpiresAt ??
data?.expiresAt ??
null
);
};

const getErrorMessage = (error: unknown, fallback: string): string => {
const err = error as any;

return (
err?.response?.data?.message ??
err?.response?.data?.error ??
err?.message ??
fallback
);
};

export default function SettingsPage() {
const [activeTab, setActiveTab] =
useState<SettingsTab>("integrations");

const [metaConnected, setMetaConnected] = useState<boolean>(false);
const [metaAccounts, setMetaAccounts] = useState<AdAccount[]>([]);
const [selectedMetaAccountId, setSelectedMetaAccountId] =
useState<string | null>(null);
const [enabledAccounts, setEnabledAccounts] =
useState<Record<string, boolean>>({});

const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]> ([]);
const [connectedInstagram, setConnectedInstagram] = useState<ConnectedInstagramAccount | null>(null);

const [instagramLoading, setInstagramLoading] =
useState<boolean>(false);
const [connectingMeta, setConnectingMeta] =
useState<boolean>(false);
const [disconnectingMeta, setDisconnectingMeta] =
useState<boolean>(false);
const [syncingMeta, setSyncingMeta] =
useState<boolean>(false);
const [selectingAccount, setSelectingAccount] =
useState<string | null>(null);
const [connectingInstagram, setConnectingInstagram] =
useState<string | null>(null);
const [syncingInstagram, setSyncingInstagram] =
useState<boolean>(false);
const [disconnectingInstagram, setDisconnectingInstagram] =
useState<boolean>(false);
const [tokenExpiresAt, setTokenExpiresAt] =
useState<string | null>(null);
const [profile, setProfile] =
useState<ProfileData | null>(null);
const [upgrading, setUpgrading] =
useState<boolean>(false);

const loadMeta = async (): Promise<void> => {
try {
const statusResponse = await getMetaStatus();
const connected = getConnectedValue(statusResponse);


  setMetaConnected(connected);

  const accountId = getAccountId(statusResponse);
  setSelectedMetaAccountId(accountId);

  const expiresAt = getTokenExpiry(statusResponse);
  setTokenExpiresAt(expiresAt);

  if (!connected) {
    setMetaAccounts([]);
    setSelectedMetaAccountId(null);
    setTokenExpiresAt(null);
    return;
  }

  const accountsResponse = await getMetaAdAccounts();
  const accounts = normalizeAccounts(accountsResponse);

  setMetaAccounts(accounts);

  const states: Record<string, boolean> = {};

  accounts.forEach((account) => {
    states[account.id] =
      account.isEnabled ??
      account.enabled ??
      account.id === accountId;
  });

  setEnabledAccounts(states);
} catch (error) {
  console.error("Meta loading error:", error);
  setMetaConnected(false);
  setMetaAccounts([]);
  setSelectedMetaAccountId(null);
  setTokenExpiresAt(null);
}


};

const loadInstagram = async (): Promise<void> => {
try {
setInstagramLoading(true);


  const [accountsResponse, connectedResponse] =
    await Promise.all([
      getInstagramAccounts(),
      getConnectedInstagram(),
    ]);

  setInstagramAccounts(
    normalizeInstagramAccounts(accountsResponse)
  );

  setConnectedInstagram(
    normalizeConnectedInstagram(connectedResponse)
  );
} catch (error) {
  console.error("Instagram loading error:", error);
  setInstagramAccounts([]);
  setConnectedInstagram(null);
} finally {
  setInstagramLoading(false);
}


};

const loadProfile = async (): Promise<void> => {
try {
const response = await apiClient.get("/dashboard/profile");
const data = extractData(response);


  setProfile({
    name: data?.name ?? "",
    email: data?.email ?? "",
    plan: data?.plan ?? "FREE",
  });
} catch (error) {
  console.error("Profile loading error:", error);
}


};

const loadAll = async (): Promise<void> => {
await Promise.all([
loadMeta(),
loadInstagram(),
loadProfile(),
]);
};

useEffect(() => {
loadAll();
}, []);

const handleConnectMeta = (): void => {
try {
setConnectingMeta(true);
connectMeta();
} catch (error) {
setConnectingMeta(false);
toast.error(
getErrorMessage(error, "Unable to connect Meta.")
);
}
};

const handleUpgrade = async (): Promise<void> => {
try {
setUpgrading(true);


  const response = await apiClient.post(
    "/subscriptions/create-checkout-session"
  );

  const checkoutUrl =
    response?.data?.url ??
    response?.data?.data?.url;

  if (!checkoutUrl) {
    throw new Error("Checkout URL was not returned.");
  }

  window.location.href = checkoutUrl;
} catch (error) {
  toast.error(
    getErrorMessage(error, "Unable to start checkout.")
  );
} finally {
  setUpgrading(false);
}


};

const handleDisconnectMeta = async (): Promise<void> => {
try {
setDisconnectingMeta(true);


  await disconnectMeta();

  setMetaConnected(false);
  setMetaAccounts([]);
  setSelectedMetaAccountId(null);
  setEnabledAccounts({});
  setTokenExpiresAt(null);

  toast.success("Meta account disconnected.");

  await loadAll();
} catch (error) {
  toast.error(
    getErrorMessage(error, "Failed to disconnect Meta.")
  );
} finally {
  setDisconnectingMeta(false);
}


};

const handleSyncMeta = async (): Promise<void> => {
if (!selectedMetaAccountId) {
toast.error("Connect a Meta ad account first.");
return;
}


try {
  setSyncingMeta(true);

  await syncMeta();
  await loadMeta();

  toast.success("Meta account synced successfully.");
} catch (error) {
  toast.error(
    getErrorMessage(error, "Meta sync failed.")
  );
} finally {
  setSyncingMeta(false);
}


};

const handleConnectAdAccount = async (
accountId: string
): Promise<void> => {
try {
setSelectingAccount(accountId);


  await connectMetaAdAccount(accountId);

  setSelectedMetaAccountId(accountId);

  setEnabledAccounts((previous) => ({
    ...previous,
    [accountId]: true,
  }));

  toast.success("Meta ad account connected.");

  await loadMeta();
} catch (error) {
  toast.error(
    getErrorMessage(
      error,
      "Failed to connect ad account."
    )
  );
} finally {
  setSelectingAccount(null);
}


};

const handleToggleAdAccount = async (
accountId: string
): Promise<void> => {
const nextValue = !enabledAccounts[accountId];


try {
  setEnabledAccounts((previous) => ({
    ...previous,
    [accountId]: nextValue,
  }));

  await updateAdAccountSync(accountId, nextValue);

  toast.success(
    nextValue
      ? "Ad account enabled."
      : "Ad account disabled."
  );
} catch (error) {
  setEnabledAccounts((previous) => ({
    ...previous,
    [accountId]: !nextValue,
  }));

  toast.error(
    getErrorMessage(
      error,
      "Failed to update ad account."
    )
  );
}


};

const handleConnectInstagram = async (
account: InstagramAccount
): Promise<void> => {
try {
setConnectingInstagram(account.id);


  await connectInstagram(
    account.id,
    account.facebookPageId,
    account.facebookPageName
  );

  toast.success("Instagram account connected.");

  await loadInstagram();
} catch (error) {
  toast.error(
    getErrorMessage(
      error,
      "Failed to connect Instagram."
    )
  );
} finally {
  setConnectingInstagram(null);
}


};

const handleSyncInstagram = async (): Promise<void> => {
if (!connectedInstagram) {
toast.error("Connect an Instagram account first.");
return;
}


try {
  setSyncingInstagram(true);

  await syncInstagram();
  await loadInstagram();

  toast.success(
    "Instagram account synced successfully."
  );
} catch (error) {
  toast.error(
    getErrorMessage(
      error,
      "Instagram sync failed."
    )
  );
} finally {
  setSyncingInstagram(false);
}


};

const handleDisconnectInstagram = async (): Promise<void> => {
try {
setDisconnectingInstagram(true);


  await disconnectInstagram();

  setConnectedInstagram(null);

  toast.success(
    "Instagram account disconnected."
  );

  await loadInstagram();
} catch (error) {
  toast.error(
    getErrorMessage(
      error,
      "Failed to disconnect Instagram."
    )
  );
} finally {
  setDisconnectingInstagram(false);
}


};

const selectedAccount = metaAccounts.find(
(account) => account.id === selectedMetaAccountId
);

const accountName =
selectedAccount?.name ??
selectedMetaAccountId ??
null;

const getTokenStatus = (): {
text: string;
valid: boolean;
} => {
if (!metaConnected) {
return {
text: "Not connected",
valid: false,
};
}


if (!tokenExpiresAt) {
  return {
    text: "Connected",
    valid: true,
  };
}

const expiry = new Date(tokenExpiresAt).getTime();
const now = Date.now();

if (expiry <= now) {
  return {
    text: "Expired",
    valid: false,
  };
}

const daysLeft = Math.ceil(
  (expiry - now) / (1000 * 60 * 60 * 24)
);

if (daysLeft <= 7) {
  return {
    text: `Expires in ${daysLeft} day${
      daysLeft === 1 ? "" : "s"
    }`,
    valid: true,
  };
}

return {
  text: "Active",
  valid: true,
};


};

return ( <div className="space-y-4"> <div> <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
Settings </h1>


    <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
      Manage your integrations, preferences, and subscription.
    </p>
  </div>

  <div className="border-b border-[var(--border-color)]">
    <div className="flex gap-6 overflow-x-auto">
      <button
        type="button"
        onClick={() => setActiveTab("integrations")}
        className={`relative whitespace-nowrap pb-2.5 text-sm font-medium transition-colors ${
          activeTab === "integrations"
            ? "text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
      >
        Integrations

        {activeTab === "integrations" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--primary)]" />
        )}
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("preferences")}
        className={`relative whitespace-nowrap pb-2.5 text-sm font-medium transition-colors ${
          activeTab === "preferences"
            ? "text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
      >
        Preferences

        {activeTab === "preferences" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--primary)]" />
        )}
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("billing")}
        className={`relative whitespace-nowrap pb-2.5 text-sm font-medium transition-colors ${
          activeTab === "billing"
            ? "text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        }`}
      >
        Billing

        {activeTab === "billing" && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[var(--primary)]" />
        )}
      </button>
    </div>
  </div>

  {activeTab === "integrations" && (
    <div className="space-y-4">
      <MetaBusinessCard
        connected={metaConnected}
        accountName={accountName}
        tokenStatus={getTokenStatus()}
        syncing={syncingMeta}
        connecting={connectingMeta}
        disconnecting={disconnectingMeta}
        selectedAccountId={selectedMetaAccountId}
        onConnect={handleConnectMeta}
        onSync={handleSyncMeta}
        onDisconnect={handleDisconnectMeta}
      />

      <MetaAdAccountsCard
        connected={metaConnected}
        accounts={metaAccounts}
        selectedAccountId={selectedMetaAccountId}
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
        onDisconnect={handleDisconnectInstagram}
        onConnectMeta={handleConnectMeta}
      />
    </div>
  )}

  {activeTab === "preferences" && <PreferencesCard />}

  {activeTab === "billing" && (
    <BillingCard
      plan={profile?.plan ?? "FREE"}
      name={profile?.name ?? ""}
      email={profile?.email ?? ""}
      onUpgrade={handleUpgrade}
      upgrading={upgrading}
    />
  )}
</div>


);
}
