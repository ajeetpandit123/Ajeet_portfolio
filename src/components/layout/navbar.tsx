"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certs" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const activeSection = useUIStore((s) => s.activeSection);
  const isMenuOpen = useUIStore((s) => s.isMenuOpen);
  const setIsMenuOpen = useUIStore((s) => s.setIsMenuOpen);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-glass-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <nav className="container-max px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg border border-primary/30 flex items-center justify-center group-hover:neon-border transition-all">
            <span className="text-sm font-bold text-primary">A</span>
          </div>
          <span className="font-mono text-sm hidden sm:block">
            Ajeet<span className="text-primary">.dev</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all",
                activeSection === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/admin"
            className="hidden sm:block text-xs font-mono text-muted hover:text-primary transition-colors"
          >
            Admin
          </a>
          <button
            className="lg:hidden text-muted hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden glass border-t border-glass-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-lg text-sm font-mono transition-all",
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
