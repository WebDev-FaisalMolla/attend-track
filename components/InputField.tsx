"use client";

import {
  forwardRef,
  useState,
  type ChangeEventHandler,
  type FocusEventHandler,
} from "react";

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

type InputFieldProps = {
  purpose: InputPurpose;
  disabled?: boolean;
  name?: string;

  onChange?: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;

  onBlur?: FocusEventHandler<
    HTMLInputElement | HTMLSelectElement
  >;

  type?: string;
  autoComplete?: string;
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

const InputField = forwardRef<
  HTMLInputElement | HTMLSelectElement,
  InputFieldProps
>(function InputField(
  {
    purpose,
    onChange,
    onBlur,
    disabled = false,
    name,
    type,
    autoComplete,
  },
  ref
) {
  const InputIcon = icons[purpose];

  const isSpecialIcon =
    purpose === "Admin" || purpose === "Key";

  const inputId = `input-${inputNames[purpose]}`;

  const isDate = purpose === "DOB";
  const isCourse = purpose === "Course";

  /*
   * This state is ONLY for controlling the visual
   * DOB placeholder.
   *
   * React Hook Form still manages the actual form value.
   */
  const [hasDate, setHasDate] = useState(false);

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    if (isDate) {
      setHasDate(
        event.target.value.length > 0
      );
    }

    onChange?.(event);
  };

  const openDatePicker = () => {
    if (!isDate || disabled) return;

    const input = document.getElementById(
      inputId
    ) as HTMLInputElement | null;

    input?.showPicker?.();
  };

  return (
    <div className="group w-full">
      {/* Accessible label */}

      <label
        htmlFor={inputId}
        className="sr-only"
      >
        {labels[purpose]}
      </label>

      <div
        onClick={
          isDate
            ? openDatePicker
            : undefined
        }
        className={[
          "flex w-full items-center gap-4 rounded-xl border border-[#d9d9d9]",
          "bg-transparent p-5 transition-all duration-300",

          "focus-within:border-[#0072BC]",

          "focus-within:shadow-[0_0_0_3px_rgba(0,114,188,0.08)]",

          disabled
            ? "cursor-not-allowed bg-[#f7f7f7] opacity-60"
            : "",

          isDate && !disabled
            ? "cursor-pointer"
            : "",
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

        {/* ================================================= */}
        {/* COURSE */}
        {/* ================================================= */}

        {isCourse ? (
          <select
            ref={
              ref as React.Ref<HTMLSelectElement>
            }
            id={inputId}
            name={
              name ??
              inputNames[purpose]
            }
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            autoComplete={
              autoComplete ??
              autoCompleteValues[purpose]
            }
            defaultValue=""
            className="
              min-w-0
              flex-1
              cursor-pointer
              bg-transparent
              text-base
              font-light
              text-[#333]
              outline-none
              disabled:cursor-not-allowed
              sm:text-lg
              space
            "
          >
            <option
              value=""
              disabled
              className="space text-[#999]"
            >
              Select your course
            </option>

            <option
              value="BCA"
              className="space text-[#333]"
            >
              BCA
            </option>

            <option
              value="Diploma in Computer Engineering"
              className="space text-[#333]"
            >
              Diploma in Computer Engineering
            </option>
          </select>
        ) : (
          /* ================================================= */
          /* NORMAL INPUT */
          /* ================================================= */

          <div className="relative min-w-0 flex-1">
            {/* ================================================= */}
            {/* CUSTOM DOB PLACEHOLDER */}
            {/* ================================================= */}

            {isDate && !hasDate && (
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-0
                  z-10
                  flex
                  items-center

                  text-base
                  font-light
                  text-[#999]
                  space

                  sm:text-lg
                  bg-white
                "
              >
                Enter your date of birth
              </span>
            )}

            {/* ================================================= */}
            {/* INPUT */}
            {/* ================================================= */}

            <input
              ref={
                ref as React.Ref<HTMLInputElement>
              }
              id={inputId}
              name={
                name ??
                inputNames[purpose]
              }
              type={
                type ??
                inputTypes[purpose]
              }
              onChange={handleChange}
              onBlur={onBlur}
              placeholder={
                isDate
                  ? ""
                  : placeholders[purpose]
              }
              autoComplete={
                autoComplete ??
                autoCompleteValues[purpose]
              }
              disabled={disabled}
              required={isDate}
              className={`
                space
                min-w-0
                w-full
                flex-1

                bg-transparent

                text-base
                font-light
                text-[#333]

                outline-none

                placeholder:text-[#999]

                disabled:cursor-not-allowed

                sm:text-lg

                ${
                  isDate
                    ? `
                      cursor-pointer
                      appearance-auto
                      accent-[#0072BC]
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
});

InputField.displayName = "InputField";

export default InputField;
