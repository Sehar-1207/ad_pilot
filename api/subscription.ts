import apiClient from "./client";

export const createCheckoutSession = async () => {
    const response = await apiClient.post("/subscriptions/create-checkout-session");
    return response.data;
};

export const getSubscription = async () => {
    const response = await apiClient.get("/subscriptions");
    return response.data;
};

export const cancelSubscription = async () => {
    const response = await apiClient.post("/subscriptions/cancel");
    return response.data;
};