"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon;
  label: string;
  rightSlot?: ReactNode;
};

export function TextInput({
  className,
  icon: Icon,
  id,
  label,
  rightSlot,
  ...props
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <div className="group relative mt-2 rounded-lg border border-white/80 bg-white/70 shadow-sm shadow-orange-950/5 backdrop-blur transition duration-200 focus-within:scale-[1.01] focus-within:border-orange-300 focus-within:bg-white/90 focus-within:shadow-[0_0_0_4px_rgba(251,146,60,0.14)]">
        <Icon
          className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-400 transition-colors group-focus-within:text-orange-500"
          strokeWidth={2}
          aria-hidden="true"
        />
        <input
          id={id}
          className={cn(
            "h-12 w-full rounded-lg bg-transparent ps-12 text-sm text-gray-900 outline-none placeholder:text-gray-400",
            rightSlot ? "pe-12" : "pe-4",
            className
          )}
          {...props}
        />
        {rightSlot}
      </div>
    </div>
  );
}
