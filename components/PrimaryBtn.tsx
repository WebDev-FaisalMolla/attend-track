import type { ButtonHTMLAttributes } from "react";

type PrimaryBtnProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryBtn({ text, ...props }: PrimaryBtnProps) {
  return (
    <button
      {...props}
      className="
        w-fit
        poppins
        cursor-pointer
        rounded-lg
        bg-[#0072BC]
        px-15
        py-3
        font-poppins
        text-white
        transition-colors
        duration-300
        hover:bg-[#005a9e]
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {text}
    </button>
  );
}
