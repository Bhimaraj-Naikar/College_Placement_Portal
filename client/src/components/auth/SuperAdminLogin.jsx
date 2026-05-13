import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData) =>
      axios.post("/api/superadmin/login", formData, { withCredentials: true }),
    onSuccess: (res) => {
      console.log("Login success:", res.data);
      navigate("/superadmin/dashboard"); // Redirect to superadmin dashboard
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          SuperAdmin Login
        </h2>

        {error && (
          <p className="text-red-600 mb-4">
            {error.response?.data?.message || "Login failed"}
          </p>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
