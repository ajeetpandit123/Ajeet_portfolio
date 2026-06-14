"use client";

import { IntroSequence } from "@/features/hero/intro-sequence";
import { HeroSection } from "@/features/hero/hero-section";
import { AboutSection } from "@/features/about/about-section";
import { ExperienceSection } from "@/features/experience/experience-section";
import { SkillsSection } from "@/features/skills/skills-section";
import { ProjectsSection } from "@/features/projects/projects-section";
import { CertificationsSection } from "@/features/certifications/certifications-section";
import { ResumeSection } from "@/features/resume/resume-section";
import { ContactSection } from "@/features/contact/contact-section";
import { Footer } from "@/features/footer/footer";
import { Navbar } from "@/components/layout/navbar";
import { useMousePosition, useScrollSpy } from "@/hooks/use-mouse-position";
import type {
  Profile,
  Project,
  Skill,
  Certification,
  Experience,
  Resume,
  SocialLink,
} from "@/types/database";

interface PortfolioClientProps {
  profile: Profile;
  stats: {
    projects: number;
    skills: number;
    certifications: number;
    experience: number;
  };
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  resume: Resume | null;
  socialLinks: SocialLink[];
}

export function PortfolioClient({
  profile,
  stats,
  projects,
  skills,
  certifications,
  experiences,
  resume,
  socialLinks,
}: PortfolioClientProps) {
  useMousePosition();
  useScrollSpy([
    "hero",
    "about",
    "experience",
    "skills",
    "projects",
    "certifications",
    "resume",
    "contact",
  ]);

  return (
    <>
      <IntroSequence />
      <Navbar />
      <main>
        <HeroSection profile={profile} stats={stats} />
        <AboutSection profile={profile} />
        <ExperienceSection experiences={experiences} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <CertificationsSection certifications={certifications} />
        <ResumeSection resume={resume} />
        <ContactSection />
      </main>
      <Footer socialLinks={socialLinks} profileName={profile.full_name} />
    </>
  );
}
