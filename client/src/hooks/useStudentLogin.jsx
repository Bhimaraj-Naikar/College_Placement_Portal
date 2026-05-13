import axios from "axios";

export const loginStudent = async (credentials) => {
  const { data } = await axios.post("/api/students/login", credentials);
  return data;
};
