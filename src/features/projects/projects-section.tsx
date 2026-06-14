"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ExternalLink, Code2, X, Star } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/database";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))];
    return ["all", ...cats];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        );
      const matchCategory = category === "all" || p.category === category;
      return matchSearch && matchCategory;
    });
  }, [projects, search, category]);

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="container-max relative">
        <SectionHeader
          label="Projects"
          title="Project Showcase"
          description="Holographic displays of my finest engineering work."
        />

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={category === cat ? "default" : "secondary"}
                size="sm"
                onClick={() => setCategory(cat)}
                className="capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              className="glass rounded-2xl overflow-hidden cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8, borderColor: "rgba(0,212,255,0.3)" }}
              onClick={() => setSelected(project)}
              style={{ perspective: "1000px" }}
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {project.title.charAt(0)}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass text-xs text-accent">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-glass-border text-primary/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-12 font-mono">
            No projects match your search.
          </p>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="relative glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
              <span className="text-xs font-mono text-primary uppercase">
                {selected.category}
              </span>
              <p className="text-muted mt-4 mb-6 leading-relaxed">
                {selected.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg border border-primary/20 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {selected.live_url && (
                  <Button asChild>
                    <a href={selected.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {selected.github_url && (
                  <Button variant="secondary" asChild>
                    <a href={selected.github_url} target="_blank" rel="noopener noreferrer">
                      <Code2 className="w-4 h-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
