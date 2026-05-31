"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function LogoMark() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 shadow-xl shadow-orange-500/35 ring-1 ring-white/80"
      aria-hidden="true"
    >
      <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.25} />
    </motion.div>
  );
}
