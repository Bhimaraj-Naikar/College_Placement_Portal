import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";

// GET /profile/me
const fetchStudentProfile = async () => {
  const { data } = await axiosInstance.get("/profile/me");
  return data;
};

export const useStudentProfile = () => {
  return useQuery({
    queryKey: ["student-profile"],
    queryFn: fetchStudentProfile,
    staleTime: 5 * 60 * 1000,
    retry: false, // Optional: prevent retry if 404
  });
};

// POST /profile
const createStudentProfile = async (formData) => {
  const { data } = await axiosInstance.post("/profile", formData);
  return data;
};

export const useStudentCreateProfile = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudentProfile,
    onSuccess: (...args) => {
      toast.success("Profile created successfully!");
      queryClient.invalidateQueries(["student-profile"]);

      // Call the custom onSuccess if provided
      if (options.onSuccess) {
        options.onSuccess(...args);
      }
    },
    onError: (error) => {
      console.error("Error creating profile:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create profile."
      );
      if (options.onError) {
        options.onError(error);
      }
    },
  });
};
