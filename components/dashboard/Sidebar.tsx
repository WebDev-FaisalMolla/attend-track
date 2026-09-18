"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDotsIcon,
  ChartBarHorizontalIcon,
  ChartBarIcon,
  FileTextIcon,
  GearIcon,
  UserIcon,
} from "@phosphor-icons/react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: ChartBarHorizontalIcon, path: "/dashboard" },
    {
      name: "Attendance",
      icon: CalendarDotsIcon,
      path: "/dashboard/attendance",
    },
    { name: "Reports", icon: ChartBarIcon, path: "/dashboard/reports" },
    { name: "Leave", icon: FileTextIcon, path: "/dashboard/leave" },
    { name: "Profile", icon: UserIcon, path: "/dashboard/profile" },
    { name: "Settings", icon: GearIcon, path: "/dashboard/settings" },
  ];

  const pathname = usePathname();

  return (
    <>
      {/* --- DESKTOP SIDEBAR (FIXED) --- */}
      {/* Fixed layout ensures it stays completely locked in place during page scroll */}
      <div className="hidden md:flex flex-col w-64 h-screen border-r-2 border-blue-500/10 px-4 py-6 items-center gap-6 fixed top-0 left-0 bg-white z-40">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" className="w-[50%] h-auto" />

        {/* Navigation */}
        <nav className="flex flex-col w-full gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`group flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors poppins ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-800 font-normal"
                }`}
              >
                <Icon
                  size={18}
                  className={`group-hover:text-slate-800 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-200 px-2 z-50 shadow-lg">
        <nav className="flex h-full items-center justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 text-[10px] font-medium transition-colors poppins ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-blue-600" : "text-slate-400"}
                />
                {isActive && (
                  <span className="truncate max-w-15">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
