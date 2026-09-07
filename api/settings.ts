
import apiClient from "./client";

export const getSettings = async () => {
  const response = await apiClient.get("/dashboard/settings");

  return response.data;
};

export const updateSyncSettings = async (data: {
  autoSync?: boolean;
  syncFrequency?: string;
}) => {
  const response = await apiClient.put(
    "/dashboard/settings/sync",
    data
  );

  return response.data;
};

export const updateAdAccountSync = async (adAccountId: string) => {
  const response = await apiClient.patch(
    `/dashboard/settings/ad-accounts/${adAccountId}`
  );

  return response.data;
};

