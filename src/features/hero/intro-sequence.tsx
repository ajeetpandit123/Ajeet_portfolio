"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useUIStore } from "@/stores/ui.store";

export function IntroSequence() {
  const introComplete = useUIStore((s) => s.introComplete);
  const setIntroComplete = useUIStore((s) => s.setIntroComplete);

  useEffect(() => {
    const timer = setTimeout(() => setIntroComplete(true), 2800);
    return () => clearTimeout(timer);
  }, [setIntroComplete]);

  return (
    <AnimatePresence>
      {!introComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl border border-primary/30 flex items-center justify-center neon-border animate-pulse-glow">
                <span className="text-2xl font-bold text-primary neon-text">V</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl font-bold tracking-wider mb-2"
            >
              VOREXIS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-sm font-mono text-muted tracking-[0.5em] uppercase"
            >
              Operating System
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
              className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-8 max-w-xs mx-auto"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="text-xs font-mono text-primary/60 mt-4 terminal-cursor"
            >
              Initializing systems
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
