"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

export function LogoMark() {
  return (
    <motion.div
      animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-xl shadow-orange-400/35"
      aria-hidden="true"
    >
      <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.25} />
    </motion.div>
  );
}
