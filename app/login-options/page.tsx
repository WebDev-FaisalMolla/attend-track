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
    <div className="flex flex-1 flex-col translate-y-6 items-center px-4 sm:px-6">
      {/* Mobile title */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="
          poppins
          mb-8
          text-center
          text-3xl
          font-semibold
          uppercase
          text-[#0072BC]
          sm:hidden
        "
      >
        login
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Login Options */}
        <motion.div
          className="flex w-full max-w-100 flex-col gap-5 sm:gap-6"
          variants={containerVariants}
        >
          {/* Admin */}
          <motion.div variants={itemVariants}>
            <Link href="/login-admin">
              <LoginBtn entity="Admin" />
            </Link>
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
            <Link href="/login-student">
              <LoginBtn entity="Student" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Registration */}
        <motion.p
          className="poppins mt-4 text-center text-sm text-[#8b8b8b] sm:text-lg"
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
    </div>
  );
}
