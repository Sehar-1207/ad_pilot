import apiClient from "./client";

export const getNotifications = async () => {
  const response = await apiClient.get(
    "/dashboard/settings/notifications"
  );

  return response.data;
};

export const updateNotifications = async (data: {
  emailNotifications?: boolean;
  campaignAlerts?: boolean;
  performanceAlerts?: boolean;
}) => {
  const response = await apiClient.put(
    "/dashboard/settings/notifications",
    data
  );

  return response.data;
};
