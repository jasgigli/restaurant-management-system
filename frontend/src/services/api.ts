import { QueryClient } from "@tanstack/react-query";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios, { AxiosError } from "axios";

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, // for HTTP-only cookie auth
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for token refresh and error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 errors and attempt token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await apiClient.post("/auth/refresh");
        const { token } = refreshResponse.data;

        // Update stored token
        localStorage.setItem("token", token);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors
        const axiosError = error as AxiosError;
        if (
          axiosError?.response?.status &&
          axiosError.response.status >= 400 &&
          axiosError.response.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Helper for GET
export async function fetcher<T>(url: string): Promise<T> {
  const { data } = await apiClient.get<T>(url);
  return data;
}

// Helper for POST
export async function post<T, U>(url: string, body: U): Promise<T> {
  const { data } = await apiClient.post<T>(url, body);
  return data;
}

// Helper for PUT
export async function put<T, U>(url: string, body: U): Promise<T> {
  const { data } = await apiClient.put<T>(url, body);
  return data;
}

// Helper for DELETE
export async function destroy<T>(url: string): Promise<T> {
  const { data } = await apiClient.delete<T>(url);
  return data;
}

// Auth-specific API functions
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    post<{ user: User; token: string }, typeof credentials>(
      "/auth/login",
      credentials
    ),

  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) =>
    post<{ user: User; token: string }, typeof userData>(
      "/auth/register",
      userData
    ),

  logout: () =>
    post<{ message: string }, Record<string, never>>("/auth/logout", {}),

  forgotPassword: (email: { email: string }) =>
    post<{ message: string }, typeof email>("/auth/forgot-password", email),

  resetPassword: (data: { token: string; password: string }) =>
    post<{ message: string }, typeof data>("/auth/reset-password", data),

  verifyResetToken: (token: string) =>
    fetcher<{ message: string }>(`/auth/verify-reset-token/${token}`),

  me: () => fetcher<{ user: User }>("/auth/me"),

  refresh: () =>
    post<{ token: string; user: User }, Record<string, never>>(
      "/auth/refresh",
      {}
    ),
};

// User type definition
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
