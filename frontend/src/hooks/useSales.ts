import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api";

export interface Sale {
  id: number;
  items: SaleItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleItem {
  id: number;
  saleId: number;
  menuItemId: number;
  quantity: number;
  price: number;
  menuItem?: {
    id: number;
    name: string;
    price: number;
  };
}

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sale: Omit<Sale, "id" | "createdAt" | "updatedAt">) => {
      const { data } = await apiClient.post<Sale>("/sales", sale);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};

export const useGetSalesReport = (period: "daily" | "weekly" | "monthly") => {
  return useQuery({
    queryKey: ["sales", period],
    queryFn: async () => {
      const { data } = await apiClient.get<Sale[]>(`/sales?period=${period}`);
      return data;
    },
  });
};
