export interface CampaignDeliverable {
  id: string;
  type: 'reel' | 'story' | 'post' | 'video';
  quantity: number;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
}

export interface Applicant {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  followers: string;
  engagementRate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CampaignDetails {
  id: string;
  title: string;
  brandName: string;
  category: string;
  status: 'active' | 'draft' | 'completed' | 'paused';
  budget: string;
  payoutPerCreator: string;
  startDate: string;
  endDate: string;
  description: string;
  deliverables: CampaignDeliverable[];
  targetAccountHandle: string;
  applicantsCount: number;
  maxFreeApplicantsVisible: number;
  applicants: Applicant[];
}