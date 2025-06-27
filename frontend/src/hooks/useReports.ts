import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api";

export const useGetNetProfitReport = (start: string, end: string) => {
  return useQuery({
    queryKey: ["netProfitReport", start, end],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/reports/net-profit?start=${start}&end=${end}`
      );
      return data;
    },
  });
};
