"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { GlassCard } from "@/components/ui/glass-card";
import type { Profile } from "@/types/database";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="About"
          title="The Developer Behind the System"
          description="Engineering excellence through code, design, and innovation."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{profile.full_name}</h3>
                  <p className="text-sm text-primary font-mono">{profile.title}</p>
                </div>
              </div>

              <p className="text-muted leading-relaxed mb-6">{profile.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                {profile.location && (
                  <span className="flex items-center gap-2 text-muted">
                    <MapPin className="w-4 h-4 text-primary" />
                    {profile.location}
                  </span>
                )}
                <span className="flex items-center gap-2 text-muted">
                  <Mail className="w-4 h-4 text-primary" />
                  {profile.email}
                </span>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: "Architecture", value: "Microservices & Serverless" },
              { label: "Frontend", value: "React, Next.js, Three.js" },
              { label: "Backend", value: "Node.js, Python, Go" },
              { label: "Cloud", value: "AWS, GCP, Vercel" },
              { label: "Database", value: "PostgreSQL, Redis, MongoDB" },
              { label: "DevOps", value: "Docker, K8s, CI/CD" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="glass rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ borderColor: "rgba(0,212,255,0.3)" }}
              >
                <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm font-medium">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
