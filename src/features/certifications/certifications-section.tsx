"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate } from "@/lib/utils";
import type { Certification } from "@/types/database";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
  return (
    <section id="certifications" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Certifications"
          title="Achievement Wall"
          description="Verified credentials and professional certifications."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.credential_url ?? "#"}
              target={cert.credential_url ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 group block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{
                y: -6,
                borderColor: "rgba(0,212,255,0.3)",
                boxShadow: "0 0 30px rgba(0,212,255,0.15)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">
                {cert.name}
              </h3>
              <p className="text-xs text-muted mb-3">{cert.organization}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-primary/60">
                  {formatDate(cert.issue_date)}
                </span>
                {cert.credential_url && (
                  <ExternalLink className="w-3 h-3 text-muted group-hover:text-primary transition-colors" />
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
