import { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-[#E5E5E5]
        bg-white
        shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}