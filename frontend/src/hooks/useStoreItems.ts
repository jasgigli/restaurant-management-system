import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api";

export const useGetStoreItems = () => {
  return useQuery({
    queryKey: ["storeItems"],
    queryFn: async () => {
      const { data } = await apiClient.get("/store/items");
      return data;
    },
  });
};

export const useAddStoreItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Record<string, unknown>) => {
      const { data } = await apiClient.post("/store/items", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storeItems"] });
    },
  });
};
