"use client";

import { useRef } from "react";

import {
  StudentIcon,
  UserCheckIcon,
  LockKeyIcon,
  PasswordIcon,
  KeyIcon,
  CalendarIcon,
  BookOpenIcon,
  type Icon,
} from "@phosphor-icons/react";

type InputPurpose =
  | "Admin"
  | "ID"
  | "Password"
  | "PasswordCreate"
  | "Confirm"
  | "Key"
  | "DOB"
  | "Course";

type InputProps = {
  purpose: InputPurpose;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

const icons: Record<InputPurpose, Icon> = {
  Admin: UserCheckIcon,
  ID: StudentIcon,
  Password: PasswordIcon,
  PasswordCreate: PasswordIcon,
  Confirm: LockKeyIcon,
  Key: KeyIcon,
  DOB: CalendarIcon,
  Course: BookOpenIcon,
};

const placeholders: Record<InputPurpose, string> = {
  Admin: "Enter Admin ID",
  ID: "Enter your student ID",
  Password: "Enter your password",
  PasswordCreate: "Create your password",
  Confirm: "Confirm your password",
  Key: "Enter your secret key",
  DOB: "Enter your date of birth",
  Course: "Select your course",
};

const iconColors: Record<InputPurpose, string> = {
  Admin: "text-[#0072BC]",
  ID: "text-[#4d4d4d]",
  Password: "text-[#4d4d4d]",
  PasswordCreate: "text-[#4d4d4d]",
  Confirm: "text-[#4d4d4d]",
  Key: "text-yellow-500",
  DOB: "text-[#4d4d4d]",
  Course: "text-[#4d4d4d]",
};

const inputTypes: Record<InputPurpose, string> = {
  Admin: "text",
  ID: "text",
  Password: "password",
  PasswordCreate: "password",
  Confirm: "password",
  Key: "password",
  DOB: "date",
  Course: "text",
};

const inputNames: Record<InputPurpose, string> = {
  Admin: "adminId",
  ID: "studentId",
  Password: "password",
  PasswordCreate: "password",
  Confirm: "confirmPassword",
  Key: "secretKey",
  DOB: "dateOfBirth",
  Course: "course",
};

const autoCompleteValues: Record<InputPurpose, string> = {
  Admin: "username",
  ID: "username",
  Password: "current-password",
  PasswordCreate: "new-password",
  Confirm: "new-password",
  Key: "off",
  DOB: "bday",
  Course: "off",
};

const labels: Record<InputPurpose, string> = {
  Admin: "Admin ID",
  ID: "Student ID",
  Password: "Password",
  PasswordCreate: "Create Password",
  Confirm: "Confirm Password",
  Key: "Secret Key",
  DOB: "Date of Birth",
  Course: "Course",
};

export default function InputField({
  purpose,
  value,
  onChange,
  disabled = false,
}: InputProps) {
  const InputIcon = icons[purpose];

  const isSpecialIcon = purpose === "Admin" || purpose === "Key";

  const inputId = `input-${inputNames[purpose]}`;

  // Reference to the DOB input
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Open native date picker when clicking anywhere on the DOB field
  const openDatePicker = () => {
    if (purpose === "DOB" && !disabled) {
      dateInputRef.current?.showPicker();
    }
  };

  return (
    <div
      className="group w-full"
      onClick={purpose === "DOB" ? openDatePicker : undefined}
    >
      <label htmlFor={inputId} className="sr-only">
        {labels[purpose]}
      </label>

      <div
        className={[
          "flex w-full items-center gap-4 rounded-xl border border-[#d9d9d9]",
          "bg-transparent p-5 transition-all duration-300",
          "focus-within:border-[#0072BC]",
          "focus-within:shadow-[0_0_0_3px_rgba(0,114,188,0.08)]",
          disabled ? "cursor-not-allowed bg-[#f7f7f7] opacity-60" : "",
          purpose === "DOB" && !disabled ? "cursor-pointer" : "",
        ].join(" ")}
      >
        {/* Icon */}
        <InputIcon
          size={26}
          weight="regular"
          aria-hidden="true"
          className={`
            shrink-0
            transition-colors
            duration-300
            ${iconColors[purpose]}
            ${!isSpecialIcon ? "group-focus-within:text-black" : ""}
          `}
        />

        {/* Course Dropdown */}
        {purpose === "Course" ? (
          <select
            id={inputId}
            name={inputNames[purpose]}
            value={value ?? ""}
            onChange={(event) => onChange?.(event.target.value)}
            disabled={disabled}
            className="
              min-w-0
              flex-1
              space
              cursor-pointer
              bg-transparent
              text-base
              font-light
              text-[#333]
              outline-none
              disabled:cursor-not-allowed
              sm:text-lg
            "
          >
            <option value="" disabled>
              Select your course
            </option>

            <option value="BCA">BCA</option>

            <option value="Diploma in Computer Engineering">
              Diploma in Computer Engineering
            </option>
          </select>
        ) : (
          /* Regular Input */
          <div className="relative min-w-0 flex-1">
            {/* Custom DOB placeholder */}
            {purpose === "DOB" && !value && (
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-10
                  flex
                  w-full
                  items-center
                  bg-white
                  text-base
                  font-light
                  text-[#999]
                  sm:text-lg
                  space
                "
              >
                Enter your date of birth
              </span>
            )}

            <input
              ref={purpose === "DOB" ? dateInputRef : undefined}
              id={inputId}
              name={inputNames[purpose]}
              type={inputTypes[purpose]}
              value={value ?? ""}
              onChange={(event) => onChange?.(event.target.value)}
              placeholder={purpose === "DOB" ? "" : placeholders[purpose]}
              autoComplete={autoCompleteValues[purpose]}
              disabled={disabled}
              required={purpose === "DOB"}
              className={`
                min-w-0
                w-full
                flex-1
                space
                bg-transparent
                text-base
                font-light
                text-[#333]
                outline-none
                placeholder:text-[#999]
                disabled:cursor-not-allowed
                sm:text-lg

                ${
                  purpose === "DOB"
                    ? `
                      cursor-pointer
                      select-none
                      [&::-webkit-datetime-edit]:text-transparent
                      [&:valid::-webkit-datetime-edit]:text-[#333]
                    `
                    : ""
                }
              `}
            />
          </div>
        )}
      </div>
    </div>
  );
}
