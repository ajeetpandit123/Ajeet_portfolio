"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  className,
  children,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6",
        glow && "neon-border",
        className
      )}
      whileHover={
        hover
          ? { y: -4, borderColor: "rgba(0, 212, 255, 0.3)" }
          : undefined
      }
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
