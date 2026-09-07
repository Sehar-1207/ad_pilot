import apiClient from './client';

export const getAdminDashboard = async () => {
  const response = await apiClient.get('/admin/overview');
  return response.data;
};

export const getAdminUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const response = await apiClient.get('/admin/users', {
    params,
  });

  return response.data;
};

export const getAdminUser = async (userId: string) => {
  const response = await apiClient.get(`/admin/users/${userId}`);
  return response.data;
};

export const updateAdminUser = async (
  userId: string,
  data: {
    name?: string;
    email?: string;
    role?: string;
    plan?: string;
  }
) => {
  const response = await apiClient.put(
    `/admin/users/${userId}`,
    data
  );

  return response.data;
};

export const deleteAdminUser = async (userId: string) => {
  const response = await apiClient.delete(
    `/admin/users/${userId}`
  );

  return response.data;
};

export const getAdminSubscriptions = async () => {
  const response = await apiClient.get('/admin/subscriptions');
  return response.data;
};

export const getAdminProfile = async () => {
  const response = await apiClient.get('/admin/profile');
  return response.data;
};

export const updateAdminProfile = async (data: {
  name?: string;
  email?: string;
}) => {
  const response = await apiClient.patch(
    '/admin/profile',
    data
  );

  return response.data;
};