import { useState } from "react";
import { useStudentCreateProfile } from "../../hooks/useStudentProfile";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "Other",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate();

  const { mutate: createProfile, isLoading } = useStudentCreateProfile({
    onSuccess: (data, variables, context) => {
      console.log("Profile created successfully, redirecting...");
      navigate("/student/dashboard", { replace: true });
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return; // Ignore non-numeric input
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    // Optional: Check for empty required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.dateOfBirth
    ) {
      alert("Please fill all required fields.");
      return;
    }
    createProfile(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Student Profile
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            name="firstName"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            name="lastName"
            className="w-full p-2 border border300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="gender">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium mb-2"
          >
            Phone Number
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium mb-2"
          >
            Date of Birth
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            name="dateOfBirth"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
