import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

// Restaurant Assets
export const useGetAssets = () => {
  return useQuery(["assets"], async () => {
    const { data } = await apiClient.get("/assets/assets");
    return data;
  });
};
export const useAddAsset = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (asset: any) => {
      const { data } = await apiClient.post("/assets/assets", asset);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assets"]);
      },
    }
  );
};
// Staff Assigned Items
export const useGetAssignedItems = () => {
  return useQuery(["assignedItems"], async () => {
    const { data } = await apiClient.get("/assets/assigned-items");
    return data;
  });
};
export const useAddAssignedItem = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (item: any) => {
      const { data } = await apiClient.post("/assets/assigned-items", item);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["assignedItems"]);
      },
    }
  );
};
