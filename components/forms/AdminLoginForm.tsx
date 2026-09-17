"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import Link from "next/link";

import InputField from "@/components/InputField";
import PrimaryBtn from "@/components/PrimaryBtn";

const adminLoginSchema = z.object({
  adminId: z.string().length(6, "Invalid admin ID"),

  secretKey: z.string().length(6, "Invalid secret key"),
});

type AdminLoginFormData = z.infer<typeof adminLoginSchema>;

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

export default function AdminLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormData) => {
    console.log(data);

    // await loginAdmin(data);
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
        Admin Login
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
          {/* Admin ID */}
          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField purpose="Admin" {...register("adminId")} />

            {errors.adminId && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.adminId.message}
              </p>
            )}
          </motion.div>

          {/* Secret Key */}
          <motion.div
            variants={inputVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <InputField purpose="Key" {...register("secretKey")} />

            {errors.secretKey && (
              <p className="mt-1 text-sm text-red-500 space">
                {errors.secretKey.message}
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
            text={isSubmitting ? "Logging in..." : "Login"}
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
              Contact the web manager
            </Link>
          </p>
        </motion.div>
      </form>
    </div>
  );
}
