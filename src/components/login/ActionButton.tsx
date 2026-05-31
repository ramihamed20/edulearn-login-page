"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type ActionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionButton({
  children,
  className,
  icon,
  variant = "primary",
  ...props
}: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/45",
        isPrimary
          ? "bg-orange-500 text-white shadow-lg shadow-orange-400/30 hover:bg-orange-600"
          : "border border-orange-100 bg-white/75 text-gray-700 shadow-sm hover:border-orange-200 hover:bg-orange-50",
        className
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </motion.button>
  );
}
