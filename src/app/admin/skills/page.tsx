import { AdminCrudTable } from "@/features/admin/admin-crud-table";
import { getSkills } from "@/services/skill.service";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminSkillsPage() {
  const [skills, profile] = await Promise.all([getSkills(), getProfile()]);
  const profileId = profile?.id ?? DEMO_PROFILE.id;

  return (
    <AdminCrudTable
      title="Skills"
      table="skills"
      items={skills}
      defaultValues={{ profile_id: profileId, proficiency: 80, color: "#00d4ff", sort_order: 0, category: "general" }}
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "proficiency", label: "Level" },
      ]}
      fields={[
        { name: "profile_id", label: "Profile ID" },
        { name: "name", label: "Name" },
        { name: "category", label: "Category" },
        { name: "icon", label: "Icon (emoji)" },
        { name: "proficiency", label: "Proficiency (0-100)", type: "number" },
        { name: "color", label: "Color (hex)" },
        { name: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
