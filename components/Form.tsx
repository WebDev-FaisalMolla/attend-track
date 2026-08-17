"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";
import Link from "next/link";

type LoginType = "admin" | "student" | "register";

type LoginFormProps = {
  type: LoginType;
};

type InputPurpose =
  | "Admin"
  | "Key"
  | "ID"
  | "Password"
  | "DOB"
  | "Course"
  | "Confirm"
  | "PasswordCreate";

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

const formInputs: Record<LoginType, InputPurpose[]> = {
  admin: ["Admin", "Key"],
  student: ["ID", "Password"],
  register: ["ID", "DOB", "Course", "PasswordCreate", "Confirm"],
};

const pageTitles: Record<LoginType, string> = {
  admin: "Admin Login",
  student: "Student Login",
  register: "Student Registration",
};

export default function Form({ type }: LoginFormProps) {
  const inputs = formInputs[type];
  const pageTitle = pageTitles[type];

  const [adminId, setAdminId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCreate, setPasswordCreate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [course, setCourse] = useState("");

  const values: Record<InputPurpose, string> = {
    Admin: adminId,
    ID: studentId,
    Password: password,
    PasswordCreate: passwordCreate,
    Confirm: confirmPassword,
    Key: secretKey,
    DOB: dateOfBirth,
    Course: course,
  };

  const setters: Record<InputPurpose, (value: string) => void> = {
    Admin: setAdminId,
    ID: setStudentId,
    Password: setPassword,
    PasswordCreate: setPasswordCreate,
    Confirm: setConfirmPassword,
    Key: setSecretKey,
    DOB: setDateOfBirth,
    Course: setCourse,
  };

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
              <InputField
                purpose={input}
                value={values[input]}
                onChange={setters[input]}
              />
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
          <PrimaryBtn text={type === "register" ? "Register" : "Login"} />

          <p className="space text-sm text-[#8b8b8b]">
            {type === "register" ? "Already have an account" : "Facing issues"}?{" "}
            <Link
              href={type === "register" ? "/login-student" : "#"}
              className="
                text-[#0072BC]
                transition-colors
                hover:text-[#005b96]
                hover:underline
              "
            >
              {type === "register"
                ? "Login now"
                : `Contact the ${
                    type === "admin" ? "web manager" : "administrator"
                  }`}
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
