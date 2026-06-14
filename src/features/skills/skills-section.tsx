"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import type { Skill } from "@/types/database";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = useMemo(() => {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach((skill) => {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [skills]);

  const orbitSkills = useMemo(() => {
    return skills.slice(0, 12);
  }, [skills]);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-max">
        <SectionHeader
          label="Skills"
          title="Technology Galaxy"
          description="An interactive constellation of technologies I wield."
        />

        {/* Orbit visualization */}
        <div className="relative h-[400px] sm:h-[500px] mb-16 flex items-center justify-center">
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-primary/10 animate-pulse-glow" />
          <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-secondary/10" />
          <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-accent/10" />

          <motion.div
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center neon-border"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-2xl font-bold text-primary neon-text">Core</span>
          </motion.div>

          {orbitSkills.map((skill, i) => {
            const angle = (i / orbitSkills.length) * Math.PI * 2;
            const radius = 140 + (i % 3) * 40;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={skill.id}
                className="absolute glass rounded-xl px-3 py-2 cursor-pointer group"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring" }}
                whileHover={{
                  scale: 1.15,
                  borderColor: skill.color,
                  boxShadow: `0 0 20px ${skill.color}40`,
                }}
              >
                <div className="flex items-center gap-2">
                  {skill.icon && (
                    <span className="text-sm">{skill.icon}</span>
                  )}
                  <span className="text-xs font-mono font-medium whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Category clusters */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categories).map(([category, categorySkills], i) => (
            <motion.div
              key={category}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-sm font-mono uppercase tracking-wider text-primary mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <motion.span
                    key={skill.id}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-glass-border hover:border-primary/40 transition-colors cursor-default"
                    style={{ color: skill.color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
