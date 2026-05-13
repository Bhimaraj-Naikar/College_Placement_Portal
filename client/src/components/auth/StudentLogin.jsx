import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginStudent } from "../../hooks/useStudentLogin"; // make sure path is correct

const StudentLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const mutation = useMutation({
    mutationFn: loginStudent,
    onSuccess: (data) => {
      localStorage.setItem("studentToken", data.token);
      navigate("/student");
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-100 via-white to-gray-200">
      {/* Left Side: Welcome */}
      <div className="hidden md:flex flex-col justify-center items-center w-full md:w-1/2 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 text-white p-12">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Welcome Back!
          </h1>
          <p className="text-lg font-medium opacity-90">
            Log in to access placement opportunities, resources, and more.
          </p>
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/13/14/online-2025932_1280.png"
            alt="Student portal"
            className="w-80 mx-auto rounded-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Right Side: Login Card */}
      <div className="flex flex-1 justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 animate-fade-in"
        >
          <h2 className="text-3xl font-bold text-gray-700 mb-2 text-center">
            Student Login
          </h2>
          <p className="text-gray-500 mb-8 text-center">
            The key to happiness is to sign in
          </p>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="okrj22ise@cmrit.ac.in"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-xl border-b border-gray-300 px-4 py-3 focus:outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              placeholder="••••••••"
              className="w-full rounded-xl border-b border-gray-300 px-4 py-3 focus:outline-none  transition"
            />
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 py-3 font-semibold text-white shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 disabled:opacity-60"
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
