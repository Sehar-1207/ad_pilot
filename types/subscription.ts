export type PlanTier = 'free' | 'pro';

export interface SocialAccount {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin';
  username: string;
  avatarUrl?: string;
  isPrimary?: boolean;
}

export interface UserPlanConfig {
  tier: PlanTier;
  activeCampaignsCount: number;
  maxCampaigns: number;
  accounts: SocialAccount[];
  maxAccounts: number;
}