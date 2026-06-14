import { AdminCrudTable } from "@/features/admin/admin-crud-table";
import { getResumes } from "@/services/content.service";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminResumePage() {
  const [resumes, profile] = await Promise.all([getResumes(), getProfile()]);
  const profileId = profile?.id ?? DEMO_PROFILE.id;

  return (
    <AdminCrudTable
      title="Resumes"
      table="resumes"
      items={resumes}
      defaultValues={{ profile_id: profileId, is_active: true }}
      columns={[
        { key: "file_name", label: "File Name" },
        { key: "is_active", label: "Active" },
        { key: "created_at", label: "Uploaded" },
      ]}
      fields={[
        { name: "profile_id", label: "Profile ID" },
        { name: "file_url", label: "File URL", type: "url" },
        { name: "file_name", label: "File Name" },
        { name: "is_active", label: "Active", type: "checkbox" },
      ]}
    />
  );
}
