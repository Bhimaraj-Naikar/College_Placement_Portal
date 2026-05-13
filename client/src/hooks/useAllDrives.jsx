import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchAllDrives = async () => {
  const { data } = await axiosInstance.get("/profile/drives/all");
  return data;
};
export const useAllDrives = () => {
  return useQuery({
    queryKey: ["all-drives"],
    queryFn: fetchAllDrives,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
