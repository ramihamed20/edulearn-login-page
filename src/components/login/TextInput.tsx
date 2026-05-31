"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode
} from "react";
import { CircleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  icon: LucideIcon;
  label: string;
  rightSlot?: ReactNode;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      className,
      error,
      helperText,
      icon: Icon,
      id,
      label,
      required,
      rightSlot,
      ...props
    },
    ref
  ) {
    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy =
      [helperId, errorId, props["aria-describedby"]]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
          {required ? (
            <span className="ms-1 text-orange-600" aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
        <div
          className={cn(
            "group relative rounded-lg border bg-white/90 shadow-sm shadow-orange-950/5 backdrop-blur transition duration-200 focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(251,146,60,0.16)]",
            error
              ? "border-red-300 bg-red-50/60 focus-within:border-red-500 focus-within:shadow-[0_0_0_4px_rgba(220,38,38,0.14)]"
              : "border-white/90 hover:border-orange-200 hover:bg-white"
          )}
        >
          <Icon
            className={cn(
              "pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-orange-600",
              error ? "text-red-500" : "text-orange-500"
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            ref={ref}
            id={id}
            aria-describedby={describedBy}
            aria-invalid={error ? "true" : undefined}
            required={required}
            className={cn(
              "h-[52px] min-h-12 w-full rounded-lg bg-transparent ps-12 text-base text-slate-950 outline-none placeholder:text-slate-400 sm:h-12 sm:text-[15px]",
              rightSlot ? "pe-[52px]" : "pe-4",
              className
            )}
            {...props}
          />
          {rightSlot}
        </div>
        {helperText ? (
          <p id={helperId} className="text-xs leading-5 text-slate-500">
            {helperText}
          </p>
        ) : null}
        {error ? (
          <p
            id={errorId}
            role="alert"
            className="flex items-start gap-2 text-sm font-medium leading-5 text-red-700"
          >
            <CircleAlert
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
              strokeWidth={2.2}
            />
            <span>{error}</span>
          </p>
        ) : null}
      </div>
    );
  }
);
