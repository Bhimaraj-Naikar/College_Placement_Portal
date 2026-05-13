import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setMobileSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        mobileSidebarOpen={mobileSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content wrapper */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
