"use client";

import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound
} from "lucide-react";
import { motion } from "framer-motion";
import { ActionButton } from "@/components/login/ActionButton";
import { LogoMark } from "@/components/login/LogoMark";
import { TextInput } from "@/components/login/TextInput";
import { WaveLayer } from "@/components/login/WaveLayer";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // Switch this value to "rtl" when Arabic copy is introduced.
  const direction: "ltr" | "rtl" = "ltr";

  return (
    <main
      dir={direction}
      className="relative min-h-dvh overflow-x-hidden bg-[linear-gradient(135deg,#fff7ed_0%,#ffedd5_38%,#fff8f3_68%,#f8fafc_100%)] text-gray-900"
    >
      {/* Animated orange SVG waves frame the full-screen background. */}
      <WaveLayer position="top" />
      <WaveLayer position="bottom" />

      {/* Centered glassmorphism login card. */}
      <section className="relative z-10 flex min-h-dvh items-center justify-center px-4 py-6 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-md rounded-lg border border-white/70 bg-white/75 p-6 shadow-glass backdrop-blur-2xl sm:p-7"
        >
          {/* Logo and platform identity. */}
          <header className="text-center">
            <LogoMark />
            <div className="mt-4">
              <p className="text-2xl font-bold tracking-normal text-gray-950">
                EduLearn
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Smart Learning Platform
              </p>
            </div>
          </header>

          {/* Login form controls. */}
          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="text-start">
              <h1 className="text-2xl font-semibold tracking-normal text-gray-950">
                Welcome back 👋
              </h1>
            </div>

            <TextInput
              autoComplete="username"
              icon={Mail}
              id="student-id"
              label="Student ID or Email"
              placeholder="Student ID or Email"
              type="text"
            />

            <TextInput
              autoComplete="current-password"
              icon={LockKeyhole}
              id="password"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              rightSlot={
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute end-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:scale-105 hover:bg-orange-50 hover:text-orange-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={2} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={2} />
                  )}
                </button>
              }
            />

            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-semibold text-orange-600 transition hover:text-orange-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35"
              >
                Forgot password?
              </a>
            </div>

            <ActionButton
              icon={<ArrowRight className="h-5 w-5" strokeWidth={2.2} />}
              type="submit"
            >
              Sign In
            </ActionButton>

            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-orange-100" />
              <span className="text-xs font-bold text-gray-400">OR</span>
              <span className="h-px flex-1 bg-orange-100" />
            </div>

            <ActionButton
              icon={<UserRound className="h-5 w-5" strokeWidth={2.1} />}
              type="button"
              variant="secondary"
            >
              Continue as Guest
            </ActionButton>
          </form>

          {/* Signup prompt. */}
          <p className="mt-6 text-center text-sm text-gray-500">
            New to EduLearn?{" "}
            <a
              href="#"
              className="font-semibold text-orange-600 transition hover:text-orange-700 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35"
            >
              Create an account
            </a>
          </p>
        </motion.div>
      </section>
    </main>
  );
}
