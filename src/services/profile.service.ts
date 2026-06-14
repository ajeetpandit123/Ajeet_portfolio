import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_owner", true)
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function updateProfile(
  id: string,
  updates: Partial<Profile>
): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getProfileStats(profileId: string) {
  const supabase = await createClient();

  const [projects, skills, certifications, experiences] = await Promise.all([
    supabase
      .from("projects")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", profileId),
    supabase
      .from("skills")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", profileId),
    supabase
      .from("certifications")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", profileId),
    supabase
      .from("experiences")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", profileId),
  ]);

  return {
    projects: projects.count ?? 0,
    skills: skills.count ?? 0,
    certifications: certifications.count ?? 0,
    experience: experiences.count ?? 0,
  };
}
