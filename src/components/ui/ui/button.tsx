import { ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger";
}

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const variants = {
    primary:
      "bg-[#14213D] text-white hover:bg-[#0f1a33]",

    secondary:
      "bg-[#FCA311] text-[#14213D] hover:bg-[#e4950d]",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      {...props}
      className={`
        cursor-pointer
        rounded-xl
        px-4
        py-2
        font-medium
        transition-all
        duration-200
        hover:shadow-lg
        ${variants[variant]}
        ${className}
      `}
    />
  );
}