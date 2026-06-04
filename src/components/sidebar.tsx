"use client";

import Link from "next/link";
import { logout } from "../services/auth";
import { LogOut } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  Bell,
  FileText,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: ClipboardList,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
import { useAuth } from "../context/AuthContext";
export default function Sidebar() {

  const { user } = useAuth();

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="mb-8 text-2xl font-bold">
        TaskFlow
      </h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100"
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
            
          );
        })}

        <div className="mt-auto border-t pt-4">
          <p className="text-sm font-medium">
            {user?.displayName ||
              "User"}
          </p>

          <p className="text-xs text-slate-500">
            {user?.email}
          </p>
        </div>
        <button
          onClick={async () => {
            await logout();
          }}
          className="cursor-pointer flex items-center gap-2 rounded-lg p-2 text-red-500 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    </aside>
  );
}