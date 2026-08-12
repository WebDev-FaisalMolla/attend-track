"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const pageTitles: Record<string, string> = {
  "/login-options": "Login",
  "/student": "Student Dashboard",
  "/admin": "Admin Dashboard",
};

export default function Navbar() {
  const pathname = usePathname();
  const currentPage = pageTitles[pathname] ?? "";

  return (
    <motion.header
      className="flex w-full items-center gap-4 p-6 sm:p-8"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {/* Logo */}
      <Link href="/" aria-label="Go to home">
        <img
          src="/logo.png"
          alt="University Attendance System logo"
          className="sm:h-34 sm:w-28"
        />
      </Link>

      {/* Headings */}
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="poppins text-3xl font-semibold text-[#0072BC] sm:text-2xl md:text-4xl">
          University Attendance System
        </h1>

        {currentPage && (
          <span className="poppins hidden text-2xl text-[#4d4d4d] sm:block">
            {currentPage}
          </span>
        )}
      </div>
    </motion.header>
  );
}
