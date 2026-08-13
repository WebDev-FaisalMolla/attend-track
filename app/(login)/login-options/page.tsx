"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import LoginBtn from "@/components/LoginBtn";

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

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

export default function Login() {
  return (
    <motion.div
      className="flex flex-1 -translate-y-8 flex-col items-center justify-center px-4 sm:-translate-y-12 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Mobile Page Title */}
      <motion.h2
        className="poppins mb-8 text-center text-3xl font-semibold text-[#0072BC] sm:hidden"
        variants={itemVariants}
      >
        LOGIN
      </motion.h2>

      {/* Login Options */}
      <motion.div
        className="flex w-full max-w-100 flex-col gap-5 sm:gap-6"
        variants={containerVariants}
      >
        {/* Admin */}
        <motion.div variants={itemVariants}>
          <LoginBtn entity="Admin" />
        </motion.div>

        {/* Separator */}
        <motion.div
          className="flex w-full items-center gap-3 sm:gap-4"
          variants={itemVariants}
        >
          <div className="h-px flex-1 bg-[#d9d9d9]" />

          <span className="poppins shrink-0 text-lg text-[#4d4d4d] sm:text-2xl">
            OR
          </span>

          <div className="h-px flex-1 bg-[#d9d9d9]" />
        </motion.div>

        {/* Student */}
        <motion.div variants={itemVariants}>
          <LoginBtn entity="Student" />
        </motion.div>
      </motion.div>

      {/* Registration */}
      <motion.p
        className="poppins mt-4 text-center text-sm text-[#4d4d4d] sm:text-lg"
        variants={itemVariants}
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-[#0072BC] transition-colors hover:text-[#005b96] hover:underline"
        >
          Register now
        </Link>
      </motion.p>
    </motion.div>
  );
}
