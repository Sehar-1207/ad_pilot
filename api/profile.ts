import apiClient from "./client";

export const getProfile = async () => {
    const response = await apiClient.get("/dashboard/profile");
    return response.data;
};

export const updateProfile = async (data: { name?: string; email?: string; avatarUrl?: string; }) => {
    const response = await apiClient.put("/dashboard/profile", data);
    return response.data;
};

export const changePassword = async (data: { currentPassword: string; newPassword: string; }) => {
    const response = await apiClient.put("/dashboard/profile/password", data);
    return response.data;
};