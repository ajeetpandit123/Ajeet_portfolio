"use client";

import { motion } from "framer-motion";
import { ArrowDown, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "@/components/three/hero-scene";
import type { Profile } from "@/types/database";

interface HeroSectionProps {
  profile: Profile;
  stats: {
    projects: number;
    skills: number;
    certifications: number;
    experience: number;
  };
}

const statItems = [
  { key: "projects" as const, label: "Projects" },
  { key: "skills" as const, label: "Skills" },
  { key: "certifications" as const, label: "Certs" },
  { key: "experience" as const, label: "Years Exp" },
];

export function HeroSection({ profile, stats }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg"
    >
      <HeroScene />

      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 container-max section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-primary mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            System Online
          </motion.span>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="block text-foreground">{profile.full_name}</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent neon-text">
              {profile.title}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Button size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button size="lg" variant="neon" asChild>
              <a href="#contact">
                <Terminal className="w-4 h-4" />
                Open Terminal
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {statItems.map((item, i) => (
              <motion.div
                key={item.key}
                className="glass rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(0,212,255,0.3)" }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary neon-text">
                  {stats[item.key]}
                </div>
                <div className="text-xs font-mono text-muted uppercase tracking-wider mt-1">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#about" className="text-muted hover:text-primary transition-colors">
            <ArrowDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
