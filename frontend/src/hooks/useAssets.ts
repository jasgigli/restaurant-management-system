import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api";

// Restaurant Assets
export const useGetAssets = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const { data } = await apiClient.get("/assets/assets");
      return data;
    },
  });
};

export const useAddAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (asset: Record<string, unknown>) => {
      const { data } = await apiClient.post("/assets/assets", asset);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};

// Staff Assigned Items
export const useGetAssignedItems = () => {
  return useQuery({
    queryKey: ["assignedItems"],
    queryFn: async () => {
      const { data } = await apiClient.get("/assets/assigned");
      return data;
    },
  });
};

export const useAddAssignedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: Record<string, unknown>) => {
      const { data } = await apiClient.post("/assets/assigned", item);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignedItems"] });
    },
  });
};
