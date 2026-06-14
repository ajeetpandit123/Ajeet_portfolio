import { PortfolioClient } from "@/features/portfolio/portfolio-client";
import { isSupabaseConfigured } from "@/lib/demo-data";
import {
  DEMO_PROFILE,
  DEMO_STATS,
  DEMO_PROJECTS,
  DEMO_SKILLS,
  DEMO_CERTIFICATIONS,
  DEMO_EXPERIENCES,
  DEMO_SOCIAL_LINKS,
  DEMO_RESUME,
} from "@/lib/demo-data";
import { getProfile, getProfileStats } from "@/services/profile.service";
import { getProjects } from "@/services/project.service";
import { getSkills } from "@/services/skill.service";
import {
  getCertifications,
  getExperiences,
  getActiveResume,
  getSocialLinks,
} from "@/services/content.service";

export default async function HomePage() {
  if (!isSupabaseConfigured()) {
    return (
      <PortfolioClient
        profile={DEMO_PROFILE}
        stats={DEMO_STATS}
        projects={DEMO_PROJECTS}
        skills={DEMO_SKILLS}
        certifications={DEMO_CERTIFICATIONS}
        experiences={DEMO_EXPERIENCES}
        resume={DEMO_RESUME}
        socialLinks={DEMO_SOCIAL_LINKS}
      />
    );
  }

  const profile = await getProfile();

  if (!profile) {
    return (
      <PortfolioClient
        profile={DEMO_PROFILE}
        stats={DEMO_STATS}
        projects={DEMO_PROJECTS}
        skills={DEMO_SKILLS}
        certifications={DEMO_CERTIFICATIONS}
        experiences={DEMO_EXPERIENCES}
        resume={DEMO_RESUME}
        socialLinks={DEMO_SOCIAL_LINKS}
      />
    );
  }

  const [stats, projects, skills, certifications, experiences, resume, socialLinks] =
    await Promise.all([
      getProfileStats(profile.id),
      getProjects(),
      getSkills(),
      getCertifications(),
      getExperiences(),
      getActiveResume(),
      getSocialLinks(),
    ]);

  return (
    <PortfolioClient
      profile={profile}
      stats={stats}
      projects={projects}
      skills={skills}
      certifications={certifications}
      experiences={experiences}
      resume={resume}
      socialLinks={socialLinks}
    />
  );
}
