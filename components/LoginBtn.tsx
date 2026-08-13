"use client";

import { StudentIcon, UserCheckIcon, type Icon } from "@phosphor-icons/react";

type Props = {
  entity: "Student" | "Admin";
};

const icons: Record<Props["entity"], Icon> = {
  Student: StudentIcon,
  Admin: UserCheckIcon,
};

export default function LoginBtn({ entity }: Props) {
  const Icon = icons[entity];

  return (
    <div className="group flex w-full cursor-pointer items-center gap-8 rounded-[20px] border border-[#d9d9d9] p-6 transition duration-300 hover:border-[#0072BC] shadow-2xl shadow-white hover:shadow-black/10 sm:px-8 sm:py-7 md:gap-8 md:px-10 md:py-8">
      {/* Icon */}
      <Icon
        size={26}
        weight="regular"
        className={`shrink-0 transition-colors duration-300 sm:size-9 ${
          entity === "Student"
            ? "text-black sm:text-[#4d4d4d] sm:group-hover:text-black"
            : "text-[#0072BC] sm:text-[#4d4d4d] sm:group-hover:text-[#0072BC]"
        }`}
      />

      {/* Text */}
      <span className="poppins text-lg text-[#4d4d4d] transition-colors duration-300 group-hover:text-black sm:text-xl md:text-2xl">
        Login as{" "}
        <span
          className={`font-semibold transition-colors duration-300 ${
            entity === "Student"
              ? "text-black sm:text-[#4d4d4d] sm:group-hover:text-black"
              : "text-[#0072BC] sm:text-[#4d4d4d] sm:group-hover:text-[#0072BC]"
          }`}
        >
          {entity}
        </span>
      </span>
    </div>
  );
}
