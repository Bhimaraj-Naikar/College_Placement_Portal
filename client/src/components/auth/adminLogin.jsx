import { useState } from "react";
import { useAdminLogin } from "../../hooks/useAdminLogin";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useAdminLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: (data) => {
        console.log("Login success:", data);
        navigate("/dashboard"); // redirect to dashboard after login
      },
    });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-r from-blue-100 via-white to-blue-100 md:grid-cols-[70%_30%]">
      {/* Left - Form Section */}
      <div className="flex flex-col items-center justify-center px-8 py-12 md:px-16 bg-white shadow-2xl rounded-b-3xl md:rounded-r-3xl md:rounded-b-none">
        <h1 className="mb-2 text-4xl font-extrabold text-blue-700">
          Admin Login
        </h1>
        <p className="mb-6 text-gray-600">
          Are you a student?{" "}
          <Link
            to="/studentlogin"
            target="_blank"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Login here
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-md w-full">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              required
              type="email"
              placeholder="admin@cmrit.ac.in"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-lg border-b border-gray-300 px-4 py-2 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              required
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full rounded-lg border-b border-gray-300 px-4 py-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

          {isError && (
            <p className="text-red-500 text-sm">
              {error.response?.data?.message || "Login failed"}
            </p>
          )}
        </form>
      </div>

      {/* Right - Welcome Section */}
      <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500 text-white text-center px-8 py-12 rounded-t-3xl md:rounded-l-3xl md:rounded-t-none">
        <h1 className="text-4xl font-bold mb-4 leading-snug">
          Welcome to <br />
          CMRIT Placement Portal
        </h1>
        <p className="text-lg font-light max-w-md">
          Connecting Talent with Opportunities.
        </p>
      </div>
    </div>
  );
};

export default Login;
