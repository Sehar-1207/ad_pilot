import apiClient from "./client";

export const connectMeta = () => {
    if (typeof window === "undefined") return;
    window.location.href = `${apiClient.defaults.baseURL}/meta/auth`;
};

export const getMetaStatus = async () => {
    const response = await apiClient.get("/meta/status");
    return response.data;
};

export const getMetaAdAccounts = async () => {
    const response = await apiClient.get("/meta/ad-accounts");
    return response.data;
};

export const connectMetaAdAccount = async (adAccountId: string) => {
    const response = await apiClient.post("/meta/connect", { adAccountId, });
    return response.data;
};

export const disconnectMeta = async () => {
    const response = await apiClient.delete("/meta/disconnect");
    return response.data;
};

export const syncMeta = async () => {
    const response = await apiClient.post("/meta/sync");
    return response.data;
};