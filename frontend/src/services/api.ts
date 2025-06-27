import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true, // for HTTP-only cookie auth
});

export const queryClient = new QueryClient();

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
