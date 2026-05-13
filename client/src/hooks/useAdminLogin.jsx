import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/admin/login", data);
      return response.data;
    },
  });
};

export const useAdminLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/admin/logout");
      return response.data;
    },
    onSuccess: () => {
      navigate("/admin/login");
    },
  });
};
export const useAdminProfile = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/admin/profile");
      return response.data;
    },
  });
};
export const useAdminUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put("/admin/profile", data);
      return response.data;
    },
  });
};
export const useAdminChangePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.put("/admin/change-password", data);
      return response.data;
    },
  });
};
export const useAdminGetAllStudents = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/admin/students");
      return response.data;
    },
  });
};
