import { AdminCrudTable } from "@/features/admin/admin-crud-table";
import { getSocialLinks } from "@/services/content.service";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminSocialPage() {
  const [socialLinks, profile] = await Promise.all([
    getSocialLinks(),
    getProfile(),
  ]);
  const profileId = profile?.id ?? DEMO_PROFILE.id;

  return (
    <AdminCrudTable
      title="Social Links"
      table="social_links"
      items={socialLinks}
      defaultValues={{ profile_id: profileId, sort_order: 0 }}
      columns={[
        { key: "platform", label: "Platform" },
        { key: "url", label: "URL" },
        { key: "icon", label: "Icon" },
      ]}
      fields={[
        { name: "profile_id", label: "Profile ID" },
        { name: "platform", label: "Platform" },
        { name: "url", label: "URL", type: "url" },
        { name: "icon", label: "Icon (github, linkedin, twitter)" },
        { name: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
