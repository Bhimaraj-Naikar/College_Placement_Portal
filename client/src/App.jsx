import Login from "./components/auth/adminLogin";
import Dashboard from "./components/admin/dashboard";
import StudentLogin from "./components/auth/StudentLogin";
import SuperAdminLogin from "./components/auth/SuperAdminLogin";
import SuperAdminDashboard from "./components/admin/SuperAdminDashboard";
import StudentDashboard from "./components/student/StudentDashboard";
import EligibleDrives from "./components/student/Drives";
import GetProfile from "./components/student/profile";
import CreateProfile from "./components/student/createProfile";
import AllDrives from "./components/student/AllDrives";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/studentlogin",
    element: <StudentLogin />,
  },
  {
    path: "createprofile", // ✅ becomes /student/createprofile
    element: <CreateProfile />,
  },

  //Student routes wrapped in Layout.
  {
    path: "/student",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> }, // ✅ relative path
      {
        path: "dashboard", // ✅ becomes /student/dashboard
        element: <StudentDashboard />,
      },
      {
        path: "createprofile", // ✅ becomes /student/createprofile
        element: <CreateProfile />,
      },

      {
        path: "drives", // ✅ becomes /student/drives
        element: <EligibleDrives />,
      },
      {
        path: "profile", // ✅ becomes /student/profile
        element: <GetProfile />,
      },
      {
        path: "alldrives", // ✅ becomes /student/alldrives
        element: <AllDrives />,
      },
    ],
  },

  {
    path: "/superadmin",
    element: <SuperAdminLogin />,
  },
  {
    path: "/superadmin/dashboard",
    element: <SuperAdminDashboard />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
