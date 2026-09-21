import apiClient from "./client";

export interface MetaAdAccount {
  accountId: string;
  accountName: string | null;
  currency?: string | null;
  timezoneName?: string | null;
  syncEnabled: boolean;
  connectedAt?: string;
}

export interface MetaStatus {
  success: boolean;
  connected: boolean;
  metaUserId: string | null;
  tokenExpiresAt: string | null;
  adAccounts: MetaAdAccount[];
  connectedAccountCount: number;
}

export const connectMeta = () => {
  if (typeof window === "undefined") return;
  window.location.href = `${apiClient.defaults.baseURL}/meta/auth`;
};

export const getMetaStatus = async () => {
  const response = await apiClient.get<MetaStatus>("/meta/status");
  return response.data;
};

export const getMetaAdAccounts = async () => {
  const response = await apiClient.get("/meta/ad-accounts");
  return response.data;
};

export const getConnectedAdAccounts = async () => {
  const response = await apiClient.get<{
    success: boolean;
    data: MetaAdAccount[];
    limit: number;
  }>("/meta/ad-accounts/connected");

  return response.data;
};

export const connectMetaAdAccount = async (adAccountId: string) => {
  const response = await apiClient.post("/meta/connect", { adAccountId });
  return response.data;
};

export const disconnectMetaAdAccount = async (accountId: string) => {
  const response = await apiClient.delete(`/meta/ad-accounts/${accountId}`);
  return response.data;
};

export const disconnectMeta = async () => {
  const response = await apiClient.delete("/meta/disconnect");
  return response.data;
};

export const syncMeta = async () => {
  const response = await apiClient.post("/meta/sync");
  return response.data;
};