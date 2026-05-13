import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

const fetchDrives = async () => {
  const { data } = await axiosInstance.get("/profile/drives/eligible");
  return data;
};

export const useDrives = () => {
  return useQuery({
    queryKey: ["eligible-drives"],
    queryFn: fetchDrives,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
