import { createClient } from "@/lib/supabase/server";
import type {
  Certification,
  CertificationInsert,
  Experience,
  ExperienceInsert,
  Resume,
  ResumeInsert,
  ContactMessage,
  ContactMessageInsert,
  SocialLink,
  SocialLinkInsert,
  AnalyticsEvent,
  VisitorTracking,
} from "@/types/database";

// Certifications
export async function getCertifications(): Promise<Certification[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data ?? [];
}

export async function createCertification(
  cert: CertificationInsert
): Promise<Certification | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .insert(cert)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCertification(
  id: string,
  updates: Partial<Certification>
): Promise<Certification | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certifications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCertification(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("certifications")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// Experiences
export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data ?? [];
}

export async function createExperience(
  exp: ExperienceInsert
): Promise<Experience | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .insert(exp)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateExperience(
  id: string,
  updates: Partial<Experience>
): Promise<Experience | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experiences")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteExperience(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("experiences").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Resumes
export async function getActiveResume(): Promise<Resume | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .single();
  if (error) return null;
  return data;
}

export async function getResumes(): Promise<Resume[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resumes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

export async function createResume(
  resume: ResumeInsert
): Promise<Resume | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resumes")
    .insert(resume)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateResume(
  id: string,
  updates: Partial<Resume>
): Promise<Resume | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("resumes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteResume(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("resumes").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Contact Messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return [];
  return data ?? [];
}

export async function createContactMessage(
  message: ContactMessageInsert
): Promise<ContactMessage | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .insert(message)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function markMessageAsRead(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteContactMessage(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

// Social Links
export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) return [];
  return data ?? [];
}

export async function createSocialLink(
  link: SocialLinkInsert
): Promise<SocialLink | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .insert(link)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateSocialLink(
  id: string,
  updates: Partial<SocialLink>
): Promise<SocialLink | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("social_links")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSocialLink(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("social_links").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// Analytics
export async function getAnalyticsOverview() {
  const supabase = await createClient();
  const [events, visitors, messages] = await Promise.all([
    supabase.from("analytics").select("id", { count: "exact", head: true }),
    supabase
      .from("visitor_tracking")
      .select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("is_read", false),
  ]);

  return {
    totalEvents: events.count ?? 0,
    totalVisitors: visitors.count ?? 0,
    unreadMessages: messages.count ?? 0,
  };
}

export async function trackVisitor(
  data: Omit<VisitorTracking, "id" | "created_at">
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("visitor_tracking").insert(data);
}

export async function trackEvent(
  data: Omit<AnalyticsEvent, "id" | "created_at">
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("analytics").insert(data);
}
