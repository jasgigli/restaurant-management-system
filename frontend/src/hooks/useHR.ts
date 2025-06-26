import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../api/apiClient";

// Employees
export const useGetEmployees = () => {
  return useQuery(["employees"], async () => {
    const { data } = await apiClient.get("/hr/employees");
    return data;
  });
};
export const useAddEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (employee: any) => {
      const { data } = await apiClient.post("/hr/employees", employee);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["employees"]);
      },
    }
  );
};
// Attendance
export const useGetAttendance = () => {
  return useQuery(["attendance"], async () => {
    const { data } = await apiClient.get("/hr/attendance");
    return data;
  });
};
export const useAddAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (attendance: any) => {
      const { data } = await apiClient.post("/hr/attendance", attendance);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["attendance"]);
      },
    }
  );
};
// Advances
export const useGetAdvances = () => {
  return useQuery(["advances"], async () => {
    const { data } = await apiClient.get("/hr/advances");
    return data;
  });
};
export const useAddAdvance = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (advance: any) => {
      const { data } = await apiClient.post("/hr/advances", advance);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["advances"]);
      },
    }
  );
};
