import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // for HTTP-only cookie auth
});

export const queryClient = new QueryClient();

// Helper for GET
export async function fetcher<T>(url: string): Promise<T> {
  const { data } = await api.get<T>(url);
  return data;
}

// Helper for POST
export async function post<T, U>(url: string, body: U): Promise<T> {
  const { data } = await api.post<T>(url, body);
  return data;
}

// Helper for PUT
export async function put<T, U>(url: string, body: U): Promise<T> {
  const { data } = await api.put<T>(url, body);
  return data;
}

// Helper for DELETE
export async function destroy<T>(url: string): Promise<T> {
  const { data } = await api.delete<T>(url);
  return data;
}
