import apiClient from "./client";

export const getCampaignSummary = async () => {
  const response = await apiClient.get( "/dashboard/campaigns/summary");
  return response.data;
};

export const getCampaigns = async (params?: { page?: number; limit?: number; status?: string; search?: string;}) => {
  const response = await apiClient.get("/dashboard/campaigns",{params,});
  return response.data;
};

export const getCampaign = async (campaignId: string) => {
  const response = await apiClient.get(`/dashboard/campaigns/${campaignId}`);
  return response.data;
};

export const getCampaignAIInsights = async (campaignId: string) => {
  const response = await apiClient.get(  `/dashboard/campaigns/${campaignId}/ai-insights`  );
  return response.data;
};

export const syncDashboard = async () => {
  const response = await apiClient.post("/dashboard/sync");
  return response.data;
};