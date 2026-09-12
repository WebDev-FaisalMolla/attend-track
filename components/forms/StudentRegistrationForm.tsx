"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";

import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";

const studentRegistrationSchema = z
  .object({
    studentId: z
      .string()
      .length(13, "Student ID must be exactly 13 characters"),

    dob: z.string().min(1, "Please enter your date of birth"),

    course: z.string().min(1, "Please select your course"),

    password: z.string().min(6, "Password must be at least 6 characters long"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type StudentRegistrationFormData = z.infer<typeof studentRegistrationSchema>;

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

export default function StudentRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentRegistrationFormData>({
    resolver: zodResolver(studentRegistrationSchema),
  });

  const onSubmit = async (data: StudentRegistrationFormData) => {
    console.log(data);

    // await registerStudent(data);
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
          mb-8
          text-center
          text-3xl
          font-semibold
          uppercase
          text-[#0072BC]
          sm:hidden
        "
      >
        Student Registration
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
            <InputField purpose="ID" {...register("studentId")} />

            {errors.studentId && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.studentId.message}
              </p>
            )}
          </motion.div>

          {/* Date of Birth */}

          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField purpose="DOB" {...register("dob")} />

            {errors.dob && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.dob.message}
              </p>
            )}
          </motion.div>

          {/* Course */}

          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField purpose="Course" {...register("course")} />

            {errors.course && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.course.message}
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
            <InputField purpose="PasswordCreate" {...register("password")} />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Confirm Password */}

          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField purpose="Confirm" {...register("confirmPassword")} />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Button + Login */}

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
            text={isSubmitting ? "Registering..." : "Register"}
          />

          <p className="space text-sm text-[#8b8b8b]">
            Already have an account?{" "}
            <Link
              href="/login-student"
              className="
                text-[#0072BC]
                transition-colors
                hover:text-[#005b96]
                hover:underline
              "
            >
              Login now
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
