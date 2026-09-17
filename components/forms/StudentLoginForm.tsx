"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";

import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";

const studentLoginSchema = z.object({
  studentId: z
    .string()
    .length(
      13,
      "Student ID must be exactly 13 characters"
    ),

  password: z
    .string()
    .min(1, "Please enter your password"),
});

type StudentLoginFormData = z.infer<
  typeof studentLoginSchema
>;

const inputVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function StudentLoginForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<StudentLoginFormData>({
    resolver: zodResolver(studentLoginSchema),
  });

  const onSubmit = async (
    data: StudentLoginFormData
  ) => {
    console.log(data);

    // await loginStudent(data);
  };

  return (
    <div className="flex w-full flex-col items-center px-4 sm:px-6">
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
          mb-4
          text-center
          text-2xl
          font-semibold
          uppercase
          text-[#0072BC]
          sm:hidden
        "
      >
        Student Login
      </motion.h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
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
          variants={containerVariants}
          className="flex w-full flex-col gap-3"
        >
          {/* Student ID */}
          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField
              purpose="ID"
              {...register("studentId")}
            />

            {errors.studentId && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.studentId.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField
              purpose="Password"
              {...register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.password.message}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Button + Contact */}
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
          <PrimaryBtn
            type="submit"
            disabled={isSubmitting}
            text={
              isSubmitting
                ? "Logging in..."
                : "Login"
            }
          />

          <p className="space text-sm text-[#8b8b8b]">
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
              Contact the administrator
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
