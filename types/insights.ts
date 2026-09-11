export type Campaign = {
  id: string;
  name: string;
  status: string;
  health: string;
  adAccountId?: string;
  adAccountName?: string;
  spend?: number;
  impressions?: number;
  reach?: number;
  clicks?: number;
  ctr?: number;
  cpc?: number;
  cpm?: number;
  conversions?: number;
  costPerConversion?: number;
  revenue?: number;
  roas?: number;
  lastSyncedAt?: string;
};

export type CampaignListResponse = {
  success: boolean;
  data: {
    campaigns: Campaign[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
      hiddenCount?: number;
      hasMore?: boolean;
    };
    range?: string;
    access?: {
      isPro: boolean;
      visible: number;
      total: number;
      hidden: number;
    };
  };
  message?: string;
};

export type CampaignDetailResponse = {
  success: boolean;
  data: Campaign;
  message?: string;
};

export type InsightsResponse = {
  success: boolean;
  data: {
    campaignId: string;
    campaignName: string;
    answer: string;
    generatedAt: string;
  };
  message?: string;
};

export type UserResponse = {
  success: boolean;
  data: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    plan?: string;
    isMetaConnected?: boolean;
  };
};