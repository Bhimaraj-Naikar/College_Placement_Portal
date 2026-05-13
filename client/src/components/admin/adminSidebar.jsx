import React from "react";
import { Button } from "@/components/ui/button";

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

const navItems = [
  { label: "Overview", icon: <Home className="w-5 h-5" /> },
  { label: "Manage Students", icon: <Users className="w-5 h-5" /> },
  { label: "Manage Companies", icon: <Building2 className="w-5 h-5" /> },
  { label: "Applications", icon: <FileText className="w-5 h-5" /> },
];

const adminSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur border-r shadow-lg">
      <div className="flex flex-col items-center gap-2 py-8">
        <Avatar className="w-16 h-16 shadow-lg ring-2 ring-blue-400">
          <AvatarImage
            src="https://api.dicebear.com/7.x/identicon/svg?seed=admin"
            alt="Admin"
          />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="text-center mt-2">
          <p className="font-bold text-lg text-blue-700">Admin</p>
          <p className="text-xs text-gray-500">admin@cmrit.ac.in</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {navItems.map((item, idx) => (
          <Button
            key={idx}
            variant={idx === 0 ? "default" : "ghost"}
            className="justify-start gap-3 w-full text-base font-medium"
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </nav>
      <div className="mt-auto px-4 pb-8">
        <Button variant="destructive" className="w-full gap-2">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default adminSidebar;
