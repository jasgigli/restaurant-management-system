import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (sale: any) => {
      const { data } = await apiClient.post("/sales", sale);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sales"]);
      },
    }
  );
};

export const useGetSalesReport = (period: "daily" | "weekly" | "monthly") => {
  return useQuery(["sales", period], async () => {
    const { data } = await apiClient.get(`/sales?period=${period}`);
    return data;
  });
};
