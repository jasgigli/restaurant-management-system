import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher, post, put, destroy } from '../services/api';
import type { MenuItem } from "@/types/menu"

// GET all menu items
export function useGetMenuItems() {
  return useQuery<MenuItem[]>({
    queryKey: ['menuItems'],
    queryFn: () => fetcher<MenuItem[]>('/menu/items'),
  });
}

// ADD a menu item
export function useAddMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Omit<MenuItem, 'id' | 'StoreItems'>) => post<MenuItem, typeof item>('/menu/items', item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });
}

// EDIT a menu item
export function useEditMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: MenuItem) => put<MenuItem, MenuItem>(`/menu/items/${item.id}`, item),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });
}

// DELETE a menu item
export function useDeleteMenuItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => destroy(`/menu/items/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });
}

// ADD ingredients to a menu item
export function useAddMenuItemIngredients() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ingredients }: { id: number; ingredients: any[] }) => post(`/menu/items/${id}/ingredients`, { ingredients }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['menuItems'] }),
  });
}
