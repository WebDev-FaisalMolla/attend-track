"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";

const studentLoginSchema = z.object({
  studentId: z
    .string()
    .length(12, "Student ID must be exactly 12 characters"),

  password: z
    .string()
    .min(1, "Please enter your password"),
});

type StudentLoginFormData = z.infer<typeof studentLoginSchema>;

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
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentLoginFormData>({
    resolver: zodResolver(studentLoginSchema),
  });

  const onSubmit = async (data: StudentLoginFormData) => {
    setApiMessage(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roll_number: data.studentId,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Authentication failed.");
      }

      setApiMessage({ type: "success", text: result.message });

      router.push("/dashboard");

    } catch (error: any) {
      console.error(error);
      setApiMessage({ type: "error", text: error.message || "Could not reach login server." });
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
        Student Login
      </motion.h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4 sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%]"
      >
        {/* Dynamic Server Validation Feedback Banners */}
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
            {errors.studentId && (
              <p className="mt-1 text-sm text-red-500 space">{errors.studentId.message}</p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div variants={inputVariants} transition={{ duration: 0.35, ease: "easeOut" }} className="w-full">
            <InputField purpose="Password" {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 space">{errors.password.message}</p>
            )}
          </motion.div>
        </motion.div>

        {/* Button + Contact */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="flex w-full flex-col items-baseline gap-1"
        >
          <PrimaryBtn
            type="submit"
            disabled={isSubmitting}
            text={isSubmitting ? "Logging in..." : "Login"}
          />

          <p className="space text-sm text-[#8b8b8b]">
            Facing issues?{" "}
            <Link
              href="#"
              className="text-[#0072BC] transition-colors hover:text-[#005b96] hover:underline"
            >
              Contact the administrator
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
