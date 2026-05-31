"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
  UsersRound
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ActionButton } from "@/components/login/ActionButton";
import { LogoMark } from "@/components/login/LogoMark";
import { TextInput } from "@/components/login/TextInput";
import { WaveLayer } from "@/components/login/WaveLayer";
import { cn } from "@/lib/cn";

type FieldName = "identifier" | "password";

type FormValues = {
  identifier: string;
  password: string;
  remember: boolean;
};

type FormErrors = Partial<Record<FieldName, string>>;

type AuthMessage = {
  text: string;
  type: "error" | "success";
};

const initialValues: FormValues = {
  identifier: "",
  password: "",
  remember: true
};

function validateField(name: FieldName, value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return name === "identifier"
      ? "Enter your student ID or email to continue."
      : "Enter your password to continue.";
  }

  if (name === "identifier") {
    const looksLikeEmail = trimmedValue.includes("@");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);

    if (looksLikeEmail && !validEmail) {
      return "Use a valid school email address, such as name@school.edu.";
    }

    if (!looksLikeEmail && trimmedValue.length < 4) {
      return "Student IDs should be at least 4 characters.";
    }
  }

  if (name === "password" && value.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return "";
}

function validateForm(values: FormValues) {
  const errors: FormErrors = {};
  const identifierError = validateField("identifier", values.identifier);
  const passwordError = validateField("password", values.password);

  if (identifierError) {
    errors.identifier = identifierError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function LoginPage() {
  const [authMessage, setAuthMessage] = useState<AuthMessage | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [guestLoading, setGuestLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [values, setValues] = useState<FormValues>(initialValues);

  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isBusy = isSubmitting || guestLoading;
  const visibleErrors = Object.entries(errors).filter(
    ([field, message]) => Boolean(message) && touched[field as FieldName]
  );

  function focusFirstInvalid(nextErrors: FormErrors) {
    if (nextErrors.identifier) {
      identifierRef.current?.focus();
      return;
    }

    if (nextErrors.password) {
      passwordRef.current?.focus();
    }
  }

  function handleFieldChange(
    name: FieldName,
    event: ChangeEvent<HTMLInputElement>
  ) {
    const nextValue = event.target.value;

    setValues((current) => ({
      ...current,
      [name]: nextValue
    }));
    setAuthMessage(null);

    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, nextValue) || undefined
      }));
    }
  }

  function handleFieldBlur(name: FieldName) {
    setTouched((current) => ({
      ...current,
      [name]: true
    }));
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, values[name]) || undefined
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setTouched({ identifier: true, password: true });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setAuthMessage({
        text: "Please fix the highlighted fields before signing in.",
        type: "error"
      });
      focusFirstInvalid(nextErrors);
      return;
    }

    setAuthMessage(null);
    setIsSubmitting(true);

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    setIsSubmitting(false);
    setAuthMessage({
      text: "Sign-in details are ready. Connect your authentication API to continue to the dashboard.",
      type: "success"
    });
  }

  async function handleGuestAccess() {
    setAuthMessage(null);
    setGuestLoading(true);

    await new Promise((resolve) => window.setTimeout(resolve, 700));

    setGuestLoading(false);
    setAuthMessage({
      text: "Guest learning mode is ready for exploration.",
      type: "success"
    });
  }

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[linear-gradient(135deg,#fff7ed_0%,#ffedd5_36%,#fff8f3_68%,#f8fafc_100%)] text-slate-950">
      <a
        href="#login-form"
        className="sr-only z-50 rounded-lg bg-white px-4 py-3 text-sm font-bold text-orange-700 shadow-lg focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:outline-none focus:ring-4 focus:ring-orange-300/45"
      >
        Skip to sign in
      </a>

      <WaveLayer position="top" />
      <WaveLayer position="bottom" />

      <section
        className="relative z-10 flex min-h-dvh items-center justify-center px-4 sm:px-6 lg:px-10"
        style={{
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
          paddingTop: "max(1.5rem, env(safe-area-inset-top))"
        }}
      >
        <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(400px,460px)] lg:gap-12">
          <motion.aside
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden max-w-xl lg:block"
            aria-label="EduLearn platform benefits"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/70 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm shadow-orange-950/5 backdrop-blur">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Secure academic access
            </div>

            <h2 className="mt-7 max-w-lg font-serif text-5xl font-semibold leading-tight text-slate-950">
              Learn with clarity, momentum, and confidence.
            </h2>

            <p className="mt-5 max-w-lg text-lg leading-8 text-slate-700">
              EduLearn keeps lessons, assignments, progress, and classroom tools
              in one focused workspace for students and educators.
            </p>

            <div className="mt-8 grid max-w-lg gap-4">
              {[
                {
                  icon: BookOpenCheck,
                  text: "Personalized course access stays one step away."
                },
                {
                  icon: UsersRound,
                  text: "Classroom activity stays synced across devices."
                },
                {
                  icon: CheckCircle2,
                  text: "Progress checkpoints help students stay on track."
                }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/75 text-orange-600 shadow-sm shadow-orange-950/5 ring-1 ring-orange-100/90 backdrop-blur">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-base font-semibold leading-6 text-slate-800">
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.aside>

          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }
            }
            animate={
              shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto w-full max-w-[440px] rounded-lg border border-white/80 bg-white/90 p-5 shadow-glass backdrop-blur-2xl sm:p-7 lg:me-0"
          >
            <header className="text-center">
              <LogoMark />
              <div className="mt-4">
                <p className="text-2xl font-bold tracking-normal text-slate-950">
                  EduLearn
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Smart Learning Platform
                </p>
              </div>
            </header>

            <form
              id="login-form"
              className="mt-7 space-y-5"
              noValidate
              onSubmit={handleSubmit}
            >
              <div>
                <h1 className="text-2xl font-bold tracking-normal text-slate-950">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Sign in to continue your courses, assignments, and progress.
                </p>
              </div>

              {visibleErrors.length > 1 ? (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  <p className="font-bold">Review these fields:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {visibleErrors.map(([field]) => (
                      <a
                        key={field}
                        href={`#${field === "identifier" ? "student-id" : "password"}`}
                        className="rounded-full bg-white px-3 py-1 text-xs font-bold text-red-700 ring-1 ring-red-200 transition hover:bg-red-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-200"
                      >
                        {field === "identifier" ? "Student ID" : "Password"}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              <TextInput
                ref={identifierRef}
                autoCapitalize="none"
                autoComplete="username"
                error={touched.identifier ? errors.identifier : undefined}
                helperText="Use your student ID or school email."
                icon={Mail}
                id="student-id"
                inputMode="email"
                label="Student ID or Email"
                onBlur={() => handleFieldBlur("identifier")}
                onChange={(event) => handleFieldChange("identifier", event)}
                placeholder="name@school.edu"
                required
                spellCheck={false}
                type="text"
                value={values.identifier}
              />

              <TextInput
                ref={passwordRef}
                autoComplete="current-password"
                error={touched.password ? errors.password : undefined}
                icon={LockKeyhole}
                id="password"
                label="Password"
                onBlur={() => handleFieldBlur("password")}
                onChange={(event) => handleFieldChange("password", event)}
                placeholder="Enter your password"
                required
                type={showPassword ? "text" : "password"}
                value={values.password}
                rightSlot={
                  <button
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute end-2 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-slate-500 transition duration-200 hover:bg-orange-50 hover:text-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isBusy}
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

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-semibold text-slate-700">
                  <input
                    checked={values.remember}
                    className="h-5 w-5 rounded border-orange-200 text-orange-600 accent-orange-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35"
                    disabled={isBusy}
                    onChange={(event) =>
                      setValues((current) => ({
                        ...current,
                        remember: event.target.checked
                      }))
                    }
                    type="checkbox"
                  />
                  Remember me
                </label>

                <a
                  href="#"
                  className="inline-flex min-h-11 items-center text-sm font-bold text-orange-700 transition hover:text-orange-800 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35"
                >
                  Forgot password?
                </a>
              </div>

              <AnimatePresence mode="wait">
                {authMessage ? (
                  <motion.div
                    key={authMessage.text}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={
                      shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    role={authMessage.type === "error" ? "alert" : "status"}
                    aria-live={
                      authMessage.type === "error" ? "assertive" : "polite"
                    }
                    className={cn(
                      "rounded-lg border px-4 py-3 text-sm font-semibold leading-6",
                      authMessage.type === "error"
                        ? "border-red-200 bg-red-50 text-red-800"
                        : "border-emerald-200 bg-emerald-50 text-emerald-800"
                    )}
                  >
                    {authMessage.text}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <ActionButton
                disabled={guestLoading}
                icon={<ArrowRight className="h-5 w-5" strokeWidth={2.2} />}
                loading={isSubmitting}
                loadingText="Signing in..."
                type="submit"
              >
                Sign In
              </ActionButton>

              <div className="flex items-center gap-4">
                <span className="h-px flex-1 bg-orange-100" />
                <span className="text-xs font-bold uppercase text-slate-400">
                  Or
                </span>
                <span className="h-px flex-1 bg-orange-100" />
              </div>

              <ActionButton
                disabled={isSubmitting}
                icon={<UserRound className="h-5 w-5" strokeWidth={2.1} />}
                loading={guestLoading}
                loadingText="Preparing guest mode..."
                onClick={handleGuestAccess}
                type="button"
                variant="secondary"
              >
                Continue as Guest
              </ActionButton>
            </form>

            <p className="mt-6 text-center text-sm leading-6 text-slate-500">
              New to EduLearn?{" "}
              <a
                href="#"
                className="font-bold text-orange-700 transition hover:text-orange-800 focus-visible:rounded focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/35"
              >
                Create an account
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
