// src/components/SidebarMenu.js
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Home, FileText, User, ListChecks, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// You can adjust these items as needed
const sidebarItems = [
  { label: "Dashboard", icon: <Home className="w-5 h-5" /> },
  { label: "Drives", icon: <FileText className="w-5 h-5" /> },
  { label: "Profile", icon: <User className="w-5 h-5" /> },
  { label: "All Drives", icon: <ListChecks className="w-5 h-5" /> },
  { label: "Eligible Drives", icon: <CheckCircle className="w-5 h-5" /> },
];

export default function SidebarMenu({ isOpen, onClose }) {
  return (
    <Menu
      isOpen={isOpen}
      onClose={onClose}
      width={220}
      customBurgerIcon={false}
      className="lg:hidden"
    >
      <div className="flex flex-col gap-2 mt-8">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full justify-start gap-2 font-medium"
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </Menu>
  );
}
