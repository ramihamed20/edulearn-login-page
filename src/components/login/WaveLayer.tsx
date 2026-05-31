"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type WaveLayerProps = {
  position: "top" | "bottom";
};

export function WaveLayer({ position }: WaveLayerProps) {
  const isTop = position === "top";
  const shouldReduceMotion = useReducedMotion();
  const primaryId = `wave-primary-${position}`;
  const accentId = `wave-accent-${position}`;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-0 h-48 overflow-hidden sm:h-60 lg:h-72",
        isTop ? "top-0" : "bottom-0 rotate-180"
      )}
    >
      <motion.svg
        className="absolute -left-[10%] top-0 h-full w-[120%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        focusable="false"
        style={{ willChange: "transform" }}
        animate={shouldReduceMotion ? undefined : { x: ["-3%", "3%", "-3%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id={primaryId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#fb923c" stopOpacity="0.44" />
            <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id={accentId} x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#fdba74" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${primaryId})`}
          d="M0,128L60,138.7C120,149,240,171,360,154.7C480,139,600,85,720,74.7C840,64,960,96,1080,112C1200,128,1320,128,1380,128L1440,128L1440,0L0,0Z"
        />
        <path
          fill={`url(#${accentId})`}
          d="M0,72L80,90.7C160,109,320,147,480,133.3C640,120,800,56,960,53.3C1120,51,1280,109,1360,138.7L1440,168L1440,0L0,0Z"
        />
      </motion.svg>

      <motion.svg
        className="absolute -left-[8%] top-0 h-full w-[116%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        focusable="false"
        style={{ willChange: "transform" }}
        animate={shouldReduceMotion ? undefined : { x: ["3%", "-2%", "3%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          fill="#ffedd5"
          fillOpacity="0.72"
          d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,197.3C1120,181,1280,107,1360,69.3L1440,32L1440,0L0,0Z"
        />
      </motion.svg>
    </div>
  );
}
