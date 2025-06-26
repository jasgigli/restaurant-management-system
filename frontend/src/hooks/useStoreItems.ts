import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export const useGetStoreItems = () => {
  return useQuery(["storeItems"], async () => {
    const { data } = await apiClient.get("/store/items");
    return data;
  });
};

export const useAddStoreItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: any) => {
      const { data } = await apiClient.post("/store/items", item);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["storeItems"]);
      },
    }
  );
};
