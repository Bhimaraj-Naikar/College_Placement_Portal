import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5002/api",
});
// it was created to handle API requests for the student profile management system. The base URL points to the local server where the API is hosted.

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("studentToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
      localStorage.removeItem("studentToken");
      window.location.href = "/studentlogin"; // Adjust as needed
    }
    return Promise.reject(error);
  }
);
