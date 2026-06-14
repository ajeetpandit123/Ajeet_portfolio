import { AdminCrudTable } from "@/features/admin/admin-crud-table";
import { getExperiences } from "@/services/content.service";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminExperiencePage() {
  const [experiences, profile] = await Promise.all([
    getExperiences(),
    getProfile(),
  ]);
  const profileId = profile?.id ?? DEMO_PROFILE.id;

  return (
    <AdminCrudTable
      title="Experience"
      table="experiences"
      items={experiences}
      defaultValues={{ profile_id: profileId, achievements: [], sort_order: 0 }}
      columns={[
        { key: "role", label: "Role" },
        { key: "company", label: "Company" },
        { key: "start_date", label: "Start" },
      ]}
      fields={[
        { name: "profile_id", label: "Profile ID" },
        { name: "company", label: "Company" },
        { name: "role", label: "Role" },
        { name: "start_date", label: "Start Date", type: "date" },
        { name: "end_date", label: "End Date (leave empty if current)", type: "date" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "achievements", label: "Achievements (comma-separated)", type: "array" },
        { name: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
