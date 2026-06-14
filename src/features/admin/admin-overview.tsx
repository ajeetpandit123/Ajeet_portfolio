"use client";

import { motion } from "framer-motion";
import {
  FolderKanban,
  Sparkles,
  Award,
  Briefcase,
  MessageSquare,
  Eye,
  BarChart3,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  delay?: number;
}

function StatCard({ label, value, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs font-mono text-muted uppercase">{label}</p>
        </div>
      </GlassCard>
    </motion.div>
  );
}

interface AdminOverviewProps {
  stats: {
    projects: number;
    skills: number;
    certifications: number;
    experiences: number;
    unreadMessages: number;
    totalVisitors: number;
  };
}

export function AdminOverview({ stats }: AdminOverviewProps) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-muted text-sm mt-1">
          Welcome to Ajeet.dev Control Panel
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Projects" value={stats.projects} icon={FolderKanban} color="#00d4ff" delay={0} />
        <StatCard label="Skills" value={stats.skills} icon={Sparkles} color="#7c3aed" delay={0.05} />
        <StatCard label="Certifications" value={stats.certifications} icon={Award} color="#06ffa5" delay={0.1} />
        <StatCard label="Experience" value={stats.experiences} icon={Briefcase} color="#f59e0b" delay={0.15} />
        <StatCard label="Unread Messages" value={stats.unreadMessages} icon={MessageSquare} color="#ef4444" delay={0.2} />
        <StatCard label="Total Visitors" value={stats.totalVisitors} icon={Eye} color="#00d4ff" delay={0.25} />
      </div>

      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-bold">Quick Actions</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/admin/projects", label: "Add Project" },
            { href: "/admin/skills", label: "Add Skill" },
            { href: "/admin/messages", label: "View Messages" },
            { href: "/admin/profile", label: "Edit Profile" },
          ].map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="glass rounded-lg p-3 text-sm font-mono text-center hover:border-primary/30 transition-all hover:text-primary"
            >
              {action.label}
            </a>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
