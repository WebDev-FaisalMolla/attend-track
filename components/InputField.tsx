"use client";

import {
  StudentIcon,
  UserCheckIcon,
  LockKeyIcon,
  KeyIcon,
  CalendarIcon,
  BookOpenIcon,
  type Icon,
} from "@phosphor-icons/react";

type InputProps = {
  purpose: "Admin" | "ID" | "Password" | "Confirm" | "Key" | "DOB" | "Course";
};

const icons: Record<InputProps["purpose"], Icon> = {
  Admin: UserCheckIcon,
  ID: StudentIcon,
  Password: LockKeyIcon,
  Confirm: LockKeyIcon,
  Key: KeyIcon,
  DOB: CalendarIcon,
  Course: BookOpenIcon,
};

const placeholders: Record<InputProps["purpose"], string> = {
  Admin: "Enter Admin ID",
  ID: "Enter your student ID",
  Password: "Enter your password",
  Confirm: "Confirm your password",
  Key: "Enter your secret key",
  DOB: "Enter your date of birth",
  Course: "Enter your course",
};

const iconColors: Record<InputProps["purpose"], string> = {
  Admin: "text-[#0072BC]",
  ID: "text-[#4d4d4d]",
  Password: "text-[#4d4d4d]",
  Confirm: "text-[#4d4d4d]",
  Key: "text-yellow-500",
  DOB: "text-[#4d4d4d]",
  Course: "text-[#4d4d4d]",
};

export default function InputField({ purpose }: InputProps) {
  const InputIcon = icons[purpose];

  const inputType =
    purpose === "Password" || purpose === "Confirm" || purpose === "Key"
      ? "password"
      : purpose === "DOB"
        ? "date"
        : "text";

  return (
    <div className="group flex w-full items-center gap-4 rounded-xl border border-[#d9d9d9] p-5 transition-all duration-300 focus-within:border-[#0072BC] focus-within:shadow-[0_0_0_3px_rgba(0,114,188,0.08)] sm:w-full">
      {/* Icon */}
      <InputIcon
        size={26}
        weight="regular"
        className={`shrink-0 ${iconColors[purpose]}`}
      />

      {/* Input */}
      <input
        type={inputType}
        placeholder={placeholders[purpose]}
        className="min-w-0 flex-1 space font-light bg-transparent text-base text-[#333] placeholder:text-[#999] focus:outline-none sm:text-lg"
      />
    </div>
  );
}
