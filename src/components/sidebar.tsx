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
import { usePathname } from "next/navigation";


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
  const pathname = usePathname();
  return (
    <aside className="flex
    h-screen
    w-72
    flex-col
    border-r
    border-[#1f335f]
    bg-gradient-to-b
    from-[#000000]
    via-[#14213D]
    to-[#14213D]
    p-4">
      <div className="px-6 py-8">
        <div className="flex items-center gap-3">
          <div
            className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-[#FCA311]
            text-lg
            font-bold
            text-[#14213D]
          "
          >
            T
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white">
              TaskFlow
            </h1>

            <p className="text-xs text-slate-400">
              Productivity Suite
            </p>
          </div>
        </div>
      </div>
      <p className="mb-4 px-3 text-xs uppercase tracking-[0.2em] text-slate-500">Workspace</p>
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                duration-200

                ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              {active && (
                <div
                  className="
                  absolute
                  left-0
                  top-2
                  h-8
                  w-1
                  rounded-r-full
                  bg-[#FCA311]
                "
                />
              )}

              <Icon className="h-5 w-5" />

              <span>
                {link.name}
              </span>
            </Link>
            
          );
        })}
        <div className="mt-auto border-t pt-4">
          <p className="text-sm font-medium text-white">
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