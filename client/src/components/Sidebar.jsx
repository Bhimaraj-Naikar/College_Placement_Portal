import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  FileText,
  User,
  ListChecks,
  CheckCircle,
} from "lucide-react";
import clsx from "clsx";

const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    to: "/student/dashboard",
  },
  {
    label: "Profile",
    icon: <User className="w-5 h-5" />,
    to: "/student/profile",
  },
  {
    label: "Eligible Drives",
    icon: <CheckCircle className="w-5 h-5" />,
    to: "/student/drives",
  },

  {
    label: "All Drives",
    icon: <ListChecks className="w-5 h-5" />,
    to: "/student/alldrives",
  },
];

const Sidebar = ({ mobileSidebarOpen, toggleSidebar }) => {
  return (
    <>
      {/* === Mobile Sidebar Drawer === */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 lg:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg text-blue-700">Menu</span>
          <button
            onClick={toggleSidebar}
            className="rounded-full p-2 hover:bg-gray-100 transition"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {sidebarItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.label}
              className={({ isActive }) =>
                `w-full rounded flex items-center gap-2 px-3 py-2 font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={toggleSidebar}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* === Desktop Sidebar === */}
      <aside className="w-56 bg-white border-r hidden lg:flex flex-col items-center py-8 px-2">
        <div className="font-bold text-lg text-blue-700 mb-8">
          Student Portal
        </div>
        <nav className="flex flex-col gap-2 w-full">
          {sidebarItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.label}
              className={({ isActive }) =>
                `w-full rounded flex items-center gap-2 px-3 py-2 font-medium transition ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
