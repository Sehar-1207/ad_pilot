import apiClient from "./client";

export const createCheckoutSession = async () => {
  const response = await apiClient.post("/subscriptions/checkout");

  return response.data;
};

export const getSubscription = async () => {
  const response = await apiClient.get("/subscriptions/me");

  return response.data;
};

export const cancelSubscription = async () => {
  const response = await apiClient.post("/subscriptions/cancel");

  return response.data;
};

export const retrySubscriptionPayment = async () => {
  const response = await apiClient.post("/subscriptions/retry-payment");

  return response.data;
};

