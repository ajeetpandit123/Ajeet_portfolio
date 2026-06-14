"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/types/database";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 aurora-bg opacity-50" />
      <div className="container-max relative">
        <SectionHeader
          label="Experience"
          title="Career Timeline"
          description="A journey through innovation, leadership, and technical excellence."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="relative pl-16 sm:pl-20 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="absolute left-4 sm:left-6 top-1 w-5 h-5 rounded-full border-2 border-primary bg-black flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      {exp.role}
                    </h3>
                    <p className="text-primary font-mono text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted glass px-3 py-1 rounded-full">
                    {formatDate(exp.start_date)} —{" "}
                    {exp.end_date ? formatDate(exp.end_date) : "Present"}
                  </span>
                </div>

                <p className="text-muted text-sm mb-4">{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                      >
                        <ChevronRight className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
