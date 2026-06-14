"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import type { Resume } from "@/types/database";

interface ResumeSectionProps {
  resume: Resume | null;
}

export function ResumeSection({ resume }: ResumeSectionProps) {
  if (!resume) return null;

  return (
    <section id="resume" className="section-padding relative">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="container-max relative">
        <SectionHeader
          label="Resume"
          title="Resume Center"
          description="Download or preview my professional resume."
        />

        <motion.div
          className="max-w-xl mx-auto glass rounded-2xl p-8 text-center neon-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 animate-pulse-glow">
            <FileText className="w-10 h-10 text-primary" />
          </div>

          <h3 className="text-xl font-bold mb-2">{resume.file_name}</h3>
          <p className="text-sm text-muted mb-8 font-mono">
            Last updated: {new Date(resume.updated_at).toLocaleDateString()}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <a href={resume.file_url} download={resume.file_name}>
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </Button>
            <Button size="lg" variant="neon" asChild>
              <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4" />
                Preview
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
