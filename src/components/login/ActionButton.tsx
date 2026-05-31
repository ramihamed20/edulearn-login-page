"use client";

import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps
} from "framer-motion";
import { cn } from "@/lib/cn";

type ActionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary";
};

export function ActionButton({
  children,
  className,
  disabled,
  icon,
  loading = false,
  loadingText,
  variant = "primary",
  ...props
}: ActionButtonProps) {
  const isPrimary = variant === "primary";
  const shouldReduceMotion = useReducedMotion();
  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled && !shouldReduceMotion ? { y: -1 } : undefined}
      whileTap={!isDisabled && !shouldReduceMotion ? { scale: 0.985 } : undefined}
      aria-busy={loading ? "true" : undefined}
      className={cn(
        "flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-bold tracking-normal transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/45 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0",
        isPrimary
          ? "bg-[linear-gradient(135deg,#f97316,#ea580c)] text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/35 disabled:hover:shadow-lg"
          : "border border-orange-200 bg-white/80 text-slate-700 shadow-sm hover:border-orange-300 hover:bg-orange-50/90 hover:text-slate-950 disabled:hover:border-orange-200 disabled:hover:bg-white/80",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <LoaderCircle
          className="h-5 w-5 animate-spin"
          aria-hidden="true"
          strokeWidth={2.2}
        />
      ) : (
        icon
      )}
      <span>{loading ? loadingText || children : children}</span>
    </motion.button>
  );
}
