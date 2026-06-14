"use client";

import { motion } from "framer-motion";
import { Code2, Link2, Share2, Heart } from "lucide-react";
import type { SocialLink } from "@/types/database";

interface FooterProps {
  socialLinks: SocialLink[];
  profileName: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Code2,
  linkedin: Link2,
  twitter: Share2,
};

export function Footer({ socialLinks, profileName }: FooterProps) {
  return (
    <footer className="border-t border-glass-border py-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="w-8 h-8 rounded-lg border border-primary/30 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">V</span>
            </div>
            <span className="font-mono text-sm text-muted">
              Vorexis OS &copy; {new Date().getFullYear()}
            </span>
          </motion.div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon ?? ""] ?? Link2;
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>

          <p className="text-xs text-muted flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-destructive" /> by {profileName}
          </p>
        </div>
      </div>
    </footer>
  );
}
