"use client";

import { usePathname } from "next/navigation";
import { motion, Variants } from "motion/react";

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function LoginLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/login-options": "Login",
    "/login-admin": "Admin Login",
  };

  return (
    <div className="flex flex-1 -translate-y-8 flex-col items-center justify-center px-4 sm:-translate-y-25 sm:px-6">
      <motion.h2
        key={pathname}
        className="poppins mb-8 text-center text-3xl font-semibold uppercase text-[#0072BC] sm:hidden"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        {pageTitles[pathname] ?? "Login"}
      </motion.h2>

      {children}
    </div>
  );
}