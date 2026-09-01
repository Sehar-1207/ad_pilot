import apiClient from "./client";

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await apiClient.post("/auth/register", { name, email, password, });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password, });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};