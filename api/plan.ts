import apiClient from "./client";

export const getPlans = async () => {
  const response = await apiClient.get("/plans");
  return response.data;
};