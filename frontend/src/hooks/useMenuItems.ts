import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export const useGetMenuItems = () => {
  return useQuery(["menuItems"], async () => {
    const { data } = await apiClient.get("/menu/items");
    return data;
  });
};

export const useAddMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: any) => {
      const { data } = await apiClient.post("/menu/items", item);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menuItems"]);
      },
    }
  );
};

export const useAddMenuItemIngredients = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, ingredients }: { id: number; ingredients: any[] }) => {
      const { data } = await apiClient.post(`/menu/items/${id}/ingredients`, {
        ingredients,
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menuItems"]);
      },
    }
  );
};
