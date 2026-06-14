import { AdminCrudTable } from "@/features/admin/admin-crud-table";
import { getCertifications } from "@/services/content.service";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminCertificationsPage() {
  const [certifications, profile] = await Promise.all([
    getCertifications(),
    getProfile(),
  ]);
  const profileId = profile?.id ?? DEMO_PROFILE.id;

  return (
    <AdminCrudTable
      title="Certifications"
      table="certifications"
      items={certifications}
      defaultValues={{ profile_id: profileId, sort_order: 0 }}
      columns={[
        { key: "name", label: "Name" },
        { key: "organization", label: "Organization" },
        { key: "issue_date", label: "Date" },
      ]}
      fields={[
        { name: "profile_id", label: "Profile ID" },
        { name: "name", label: "Certificate Name" },
        { name: "organization", label: "Organization" },
        { name: "issue_date", label: "Issue Date", type: "date" },
        { name: "credential_url", label: "Credential URL", type: "url" },
        { name: "image_url", label: "Image URL", type: "url" },
        { name: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
