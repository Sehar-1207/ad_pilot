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
  connectedAt?: string;
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

export interface InstagramMedia {
  _id: string;
  user: string;
  instagramAccountId: string;
  mediaId: string;
  caption?: string | null;
  mediaType?: string | null;
  mediaProductType?: string | null;
  mediaUrl?: string | null;
  thumbnailUrl?: string | null;
  permalink?: string | null;
  timestamp?: string | null;
  username?: string | null;
  likes?: number;
  comments?: number;
  saves?: number;
  shares?: number;
  views?: number;
  reach?: number;
  totalInteractions?: number;
  lastSyncedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface InstagramMediaResponse {
  success: boolean;
  data: InstagramMedia[];
  message?: string;
}

export interface InstagramMediaSyncResponse {
  success: boolean;
  message: string;
  data: {
    mediaFound: number;
    mediaSynced: number;
    mediaFailed: number;
    syncedAt: string;
  };
}

export interface InstagramMediaInsightsResponse {
  success: boolean;
  data: {
    data?: Array<{
      name?: string;
      period?: string;
      values?: Array<{
        value?: number;
        end_time?: string;
      }>;
      title?: string;
      description?: string;
      id?: string;
    }>;
    paging?: {
      next?: string;
      previous?: string;
    };
  };
  message?: string;
}

export const getInstagramMedia = async () => {
  const response =
    await apiClient.get<InstagramMediaResponse>(
      "/instagram/media"
    );

  return response.data;
};

export const syncInstagramMedia = async () => {
  const response =
    await apiClient.post<InstagramMediaSyncResponse>(
      "/instagram/media/sync"
    );

  return response.data;
};

export const getInstagramMediaInsights = async (
  mediaId: string,
  metrics: string
) => {
  const response =
    await apiClient.get<InstagramMediaInsightsResponse>(
      "/instagram/media/insights",
      {
        params: {
          mediaId,
          metrics,
        },
      }
    );

  return response.data;
};