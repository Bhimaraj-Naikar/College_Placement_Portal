import { useStudentProfile } from "../../hooks/useStudentProfile";
import { Button } from "@/components/ui/button";
import AdminSidebar from "./adminSidebar";
import {
  Home,
  Users,
  Building2,
  FileText,
  LogOut,
  TrendingUp,
  Briefcase,
  CheckCircle,
  Bell,
} from "lucide-react";
import {
  Card,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Skeleton,
} from "../ui"; // adjust path as needed

const Dashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-white to-blue-200">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 text-sm">Welcome back, Admin 👋</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://api.dicebear.com/7.x/identicon/svg?seed=admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 px-6 py-8">
          <div className="bg-white/90 rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition-transform">
            <Users className="w-10 h-10 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Total Students</p>
              <p className="text-2xl font-bold text-blue-700">312</p>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition-transform">
            <Building2 className="w-10 h-10 text-green-500" />
            <div>
              <p className="text-xs text-gray-500">Companies Visited</p>
              <p className="text-2xl font-bold text-green-600">42</p>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition-transform">
            <CheckCircle className="w-10 h-10 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Placements Done</p>
              <p className="text-2xl font-bold text-purple-700">78</p>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-105 transition-transform">
            <TrendingUp className="w-10 h-10 text-red-500" />
            <div>
              <p className="text-xs text-gray-500">Open Applications</p>
              <p className="text-2xl font-bold text-red-600">13</p>
            </div>
          </div>
        </section>

        {/* Latest Registrations Table */}
        <section className="flex-1 px-6 pb-8">
          <div className="bg-white/90 rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-500" />
              Latest Student Registrations
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead>
                  <tr className="border-b bg-blue-50">
                    <th className="px-4 py-2 font-semibold">Name</th>
                    <th className="px-4 py-2 font-semibold">Email</th>
                    <th className="px-4 py-2 font-semibold">Branch</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-blue-50 transition">
                    <td className="px-4 py-2">Lol</td>
                    <td className="px-4 py-2">aryan@cmrit.ac.in</td>
                    <td className="px-4 py-2">CSE</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-blue-50 transition">
                    <td className="px-4 py-2">Riya Das</td>
                    <td className="px-4 py-2">riya@cmrit.ac.in</td>
                    <td className="px-4 py-2">ECE</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
                        Pending
                      </span>
                    </td>
                  </tr>
                  {/* Add more rows dynamically */}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
