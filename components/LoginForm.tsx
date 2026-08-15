"use client";

import { motion, type Variants } from "motion/react";
import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";
import Link from "next/link";

type LoginType = "admin" | "student";

type LoginFormProps = {
  type: LoginType;
};

const inputVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const inputContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const formInputs: Record<LoginType, ("Admin" | "Key" | "ID" | "Password")[]> = {
  admin: ["Admin", "Key"],
  student: ["ID", "Password"],
};

const pageTitles: Record<LoginType, string> = {
  admin: "Admin Login",
  student: "Student Login",
};

export default function LoginForm({ type }: LoginFormProps) {
  const inputs = formInputs[type];
  const pageTitle = pageTitles[type];

  return (
    <div className="flex w-full flex-col items-center px-4 sm:px-6">
      {/* Mobile title */}
      <motion.h2
        key={type}
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
        {pageTitle}
      </motion.h2>

      {/* Login form */}
      <form
        className="
          flex
          w-full
          flex-col
          items-center
          gap-4
          sm:w-[70%]
          md:w-[50%]
          lg:w-[40%]
          xl:w-[35%]
        "
      >
        {/* Inputs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={inputContainerVariants}
          className="flex w-full flex-col gap-3"
        >
          {inputs.map((input) => (
            <motion.div
              key={input}
              variants={inputVariants}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="w-full"
            >
              <InputField purpose={input} />
            </motion.div>
          ))}
        </motion.div>

        {/* Login button + Contact */}
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="flex w-full flex-col items-baseline gap-1"
        >
          <PrimaryBtn text="Login" />

          <p className="poppins text-sm text-[#8b8b8b]">
            Facing issues?{" "}
            <Link
              href="#"
              className="
                text-[#0072BC]
                transition-colors
                hover:text-[#005b96]
                hover:underline
              "
            >
              Contact the {type === "admin" ? "web manager" : "administrator"}
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
