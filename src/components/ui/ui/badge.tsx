import { ReactNode } from "react";

interface Props {
  children: ReactNode;

  variant?:
    | "primary"
    | "success"
    | "warning"
    | "danger";
}

export default function Badge({
  children,
  variant = "primary",
}: Props) {
  const variants = {
    primary:
      "bg-[#14213D]/10 text-[#14213D]",

    success:
      "bg-green-100 text-green-700",

    warning:
      "bg-[#FCA311]/20 text-[#14213D]",

    danger:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${variants[variant]}
      `}
    >
      {children}
    </span>
  );
}