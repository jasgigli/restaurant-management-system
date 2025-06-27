import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api";

// Employees
export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await apiClient.get("/hr/employees");
      return data;
    },
  });
};
export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (employee: Record<string, unknown>) => {
      const { data } = await apiClient.post("/hr/employees", employee);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
// Attendance
export const useGetAttendance = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const { data } = await apiClient.get("/hr/attendance");
      return data;
    },
  });
};
export const useAddAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attendance: Record<string, unknown>) => {
      const { data } = await apiClient.post("/hr/attendance", attendance);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
  });
};
// Advances
export const useGetAdvances = () => {
  return useQuery({
    queryKey: ["advances"],
    queryFn: async () => {
      const { data } = await apiClient.get("/hr/advances");
      return data;
    },
  });
};
export const useAddAdvance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (advance: Record<string, unknown>) => {
      const { data } = await apiClient.post("/hr/advances", advance);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["advances"] });
    },
  });
};
