import type { HTMLAttributes, ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function Container({ children, className = "", size = "lg", ...props }: ContainerProps) {
  return (
    <div className={["ak-container", `ak-container--${size}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
