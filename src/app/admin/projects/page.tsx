import { AdminCrudTable } from "@/features/admin/admin-crud-table";
import { getProjects } from "@/services/project.service";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminProjectsPage() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);
  const profileId = profile?.id ?? DEMO_PROFILE.id;

  return (
    <AdminCrudTable
      title="Projects"
      table="projects"
      items={projects}
      defaultValues={{ profile_id: profileId, featured: false, sort_order: 0, technologies: [], images: [], category: "web" }}
      columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "featured", label: "Featured" },
      ]}
      fields={[
        { name: "profile_id", label: "Profile ID", type: "text" },
        { name: "title", label: "Title" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "technologies", label: "Technologies (comma-separated)", type: "array" },
        { name: "category", label: "Category" },
        { name: "live_url", label: "Live URL", type: "url" },
        { name: "github_url", label: "GitHub URL", type: "url" },
        { name: "featured", label: "Featured", type: "checkbox" },
        { name: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
