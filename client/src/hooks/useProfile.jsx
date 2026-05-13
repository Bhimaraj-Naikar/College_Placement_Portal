import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchOnlyProfile = async () => {
  const { data } = await axiosInstance.get("/profile/me");
  return data;
};
export const useProfile = () => {
  return useQuery({
    queryKey: ["only-profile"],
    queryFn: fetchOnlyProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

// BRO CREATE 'CREATE PROFILE' FOR STUDENT, PROFILE FOR STUDENT AND IT SHOULD BE EDITABLE
