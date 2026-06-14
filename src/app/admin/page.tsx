import { AdminOverview } from "@/features/admin/admin-overview";
import { getProjects } from "@/services/project.service";
import { getSkills } from "@/services/skill.service";
import {
  getCertifications,
  getExperiences,
  getAnalyticsOverview,
} from "@/services/content.service";

export default async function AdminDashboardPage() {
  const [projects, skills, certifications, experiences, analytics] =
    await Promise.all([
      getProjects(),
      getSkills(),
      getCertifications(),
      getExperiences(),
      getAnalyticsOverview(),
    ]);

  return (
    <AdminOverview
      stats={{
        projects: projects.length,
        skills: skills.length,
        certifications: certifications.length,
        experiences: experiences.length,
        unreadMessages: analytics.unreadMessages,
        totalVisitors: analytics.totalVisitors,
      }}
    />
  );
}
