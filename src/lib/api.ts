import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { config } from '@/config';

/**
 * Configuration for the API client
 */
const API_CONFIG = {
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Creates and configures an Axios instance for API requests
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create(API_CONFIG);

  // Request interceptor to add auth token
  instance.interceptors.request.use(
    config => {
      // const { accessToken } = useAuthStore.getState();

      // if (accessToken) {
      //   config.headers.Authorization = `Bearer ${accessToken}`;
      // }

      return config;
    },
    error => Promise.reject(error)
  );

  // Response interceptor for error handling and token refresh
  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      // const originalRequest = error.config as AxiosRequestConfig & {
      //   _retry?: boolean;
      // };

      // Handle 401 Unauthorized errors (token expired)
      // if (error.response?.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true;

      //   try {
      //     const { refreshToken } = useAuthStore.getState();

      //     if (!refreshToken) {
      //       // No refresh token available, logout user
      //       useAuthStore.getState().clearAuth();
      //       return Promise.reject(error);
      //     }

      //     // Attempt to refresh the token
      //     const response = await axios.post(
      //       `${API_CONFIG.baseURL}/auth/refresh-token`,
      //       { refreshToken }
      //     );

      //     const { accessToken, refreshToken: newRefreshToken } = response.data;

      //     // Update tokens in store
      //     useAuthStore.getState().setTokens(accessToken, newRefreshToken);

      //     // Retry the original request with new token
      //     originalRequest.headers = {
      //       ...originalRequest.headers,
      //       Authorization: `Bearer ${accessToken}`,
      //     };

      //     return instance(originalRequest);
      //   } catch (refreshError) {
      //     // If refresh fails, logout user
      //     useAuthStore.getState().clearAuth();
      //     return Promise.reject(refreshError);
      //   }
      // }

      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * API client instance
 */
export const api = createApiClient();
