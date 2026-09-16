import apiClient from "./client";

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

export const getInstagramAccounts = async () => {
  const response = await apiClient.get("/instagram/accounts");
  return response.data;
};

export const getConnectedInstagram = async () => {
  const response = await apiClient.get("/instagram/connected");
  return response.data;
};

export const connectInstagram = async (
  instagramAccountId: string,
  facebookPageId?: string | null,
  facebookPageName?: string | null
) => {
  const response = await apiClient.post("/instagram/connect", {
    instagramAccountId,
    facebookPageId,
    facebookPageName,
  });

  return response.data;
};

export const getInstagramAccount = async () => {
  const response = await apiClient.get("/instagram/account");
  return response.data;
};

export const syncInstagram = async () => {
  const response = await apiClient.post("/instagram/sync");
  return response.data;
};

export const getInstagramInsights = async (
  metrics?: string
) => {
  const response = await apiClient.get("/instagram/insights", {
    params: metrics ? { metrics } : undefined,
  });

  return response.data;
};

export const disconnectInstagram = async () => {
  const response = await apiClient.delete("/instagram/disconnect");
  return response.data;
};

