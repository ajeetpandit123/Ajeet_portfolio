import { AdminProfileForm } from "@/features/admin/admin-profile-form";
import { getProfile } from "@/services/profile.service";
import { DEMO_PROFILE } from "@/lib/demo-data";

export default async function AdminProfilePage() {
  const profile = (await getProfile()) ?? DEMO_PROFILE;
  return <AdminProfileForm profile={profile} />;
}
