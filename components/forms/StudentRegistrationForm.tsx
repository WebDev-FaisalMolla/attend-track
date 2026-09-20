"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react"; // ✨ Added to catch backend responses

import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";

const studentRegistrationSchema = z
  .object({
    studentId: z
      .string()
      .length(12, "Student ID must be exactly 12 characters"),

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
  // ✨ State hook to manage dynamic validation banner messages
  const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset, // ✨ Destructured reset function to purge fields on registration success
    formState: { errors, isSubmitting },
  } = useForm<StudentRegistrationFormData>({
    resolver: zodResolver(studentRegistrationSchema),
  });

  const onSubmit = async (data: StudentRegistrationFormData) => {
    setApiMessage(null); // Clear past alerts before firing a fresh fetch request

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // 🔄 Maps matching fields exactly to what the updated backend validation requires
        body: JSON.stringify({
          roll_number: data.studentId,
          dob: data.dob,
          course: data.course,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Triggers validation errors if Roll Number, DOB, or Course mismatches in the DB
        throw new Error(result.error || "An error occurred during registration.");
      }

      // Render success message and scrub inputs clean
      setApiMessage({ type: "success", text: result.message });
      reset();

    } catch (error: any) {
      console.error(error);
      setApiMessage({ type: "error", text: error.message || "Could not reach registration server." });
    }
  };

  return (
    <div className="flex w-full flex-col items-center px-4 sm:px-6">
      {/* Mobile title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="poppins mb-4 text-center text-2xl font-semibold uppercase text-[#0072BC] sm:hidden"
      >
        Student Registration
      </motion.h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4 sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%]"
      >
        {/* ✨ Dynamic Server Validation Feedback Banners */}
        {apiMessage && (
          <div
            className={`w-full p-3 text-sm rounded-md border text-center font-light transition-all space ${
              apiMessage.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {apiMessage.text}
          </div>
        )}

        {/* Inputs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex w-full flex-col gap-3"
        >
          {/* Student ID */}
          <motion.div variants={inputVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">
            <InputField purpose="ID" {...register("studentId")} />
            {errors.studentId && <p className="mt-1 text-sm text-red-500 space">{errors.studentId.message}</p>}
          </motion.div>

          {/* Date of Birth */}
          <motion.div variants={inputVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">
            <InputField purpose="DOB" {...register("dob")} />
            {errors.dob && <p className="mt-1 text-sm text-red-500 space">{errors.dob.message}</p>}
          </motion.div>

          {/* Course */}
          <motion.div variants={inputVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">
            <InputField purpose="Course" {...register("course")} />
            {errors.course && <p className="mt-1 text-sm text-red-500 space">{errors.course.message}</p>}
          </motion.div>

          {/* Password */}
          <motion.div variants={inputVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">
            <InputField purpose="PasswordCreate" {...register("password")} />
            {errors.password && <p className="mt-1 text-sm text-red-500 space">{errors.password.message}</p>}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={inputVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">
            <InputField purpose="Confirm" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500 space">{errors.confirmPassword.message}</p>}
          </motion.div>
        </motion.div>

        {/* Button + Login */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="flex w-full flex-col items-baseline gap-1"
        >
          <PrimaryBtn
            type="submit"
            disabled={isSubmitting} // Lock double-submits out instantly during network payload parsing
            text={isSubmitting ? "Registering..." : "Register"}
          />

          <p className="space text-sm text-[#8b8b8b]">
            Already have an account?{" "}
            <Link
              href="/login-student"
              className="text-[#0072BC] transition-colors hover:text-[#005b96] hover:underline"
            >
              Login now
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
