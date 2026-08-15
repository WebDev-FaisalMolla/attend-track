"use client";

import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminLogin() {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="flex w-full flex-col gap-4 sm:w-[35%]"
      >
        {/* Inputs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="flex w-full flex-col gap-3"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <InputField purpose="Admin" />
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <InputField purpose="Key" />
          </motion.div>
        </motion.div>

        {/* Button + Contact */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="flex w-full flex-col items-baseline gap-1"
        >
          <PrimaryBtn text="Login" />

          <p className="poppins text-center text-sm text-[#8b8b8b]">
            Facing issues?{" "}
            <Link
              href="#"
              className="text-[#0072BC] transition-colors hover:text-[#005b96] hover:underline"
            >
              Contact the web manager
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
