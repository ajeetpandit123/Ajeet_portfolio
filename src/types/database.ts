export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type Relationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type TableDef<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: Relationship[];
};
export type Database = {
  public: {
    Tables: {
      profiles: TableDef<
        Profile,
        Omit<Profile, "id" | "created_at" | "updated_at">,
        Partial<Omit<Profile, "id" | "created_at" | "updated_at">>
      >;
      projects: TableDef<
        Project,
        Omit<Project, "id" | "created_at" | "updated_at">,
        Partial<Omit<Project, "id" | "created_at" | "updated_at">>
      >;
      skills: TableDef<
        Skill,
        Omit<Skill, "id" | "created_at" | "updated_at">,
        Partial<Omit<Skill, "id" | "created_at" | "updated_at">>
      >;
      certifications: TableDef<
        Certification,
        Omit<Certification, "id" | "created_at" | "updated_at">,
        Partial<Omit<Certification, "id" | "created_at" | "updated_at">>
      >;
      experiences: TableDef<
        Experience,
        Omit<Experience, "id" | "created_at" | "updated_at">,
        Partial<Omit<Experience, "id" | "created_at" | "updated_at">>
      >;
      resumes: TableDef<
        Resume,
        Omit<Resume, "id" | "created_at" | "updated_at">,
        Partial<Omit<Resume, "id" | "created_at" | "updated_at">>
      >;
      contact_messages: TableDef<
        ContactMessage,
        Omit<ContactMessage, "id" | "created_at" | "updated_at">,
        Partial<Omit<ContactMessage, "id" | "created_at" | "updated_at">>
      >;
      social_links: TableDef<
        SocialLink,
        Omit<SocialLink, "id" | "created_at" | "updated_at">,
        Partial<Omit<SocialLink, "id" | "created_at" | "updated_at">>
      >;
      site_settings: TableDef<
        SiteSetting,
        Omit<SiteSetting, "id" | "created_at" | "updated_at">,
        Partial<Omit<SiteSetting, "id" | "created_at" | "updated_at">>
      >;
      analytics: TableDef<
        AnalyticsEvent,
        Omit<AnalyticsEvent, "id" | "created_at">,
        Partial<Omit<AnalyticsEvent, "id" | "created_at">>
      >;
      visitor_tracking: TableDef<
        VisitorTracking,
        Omit<VisitorTracking, "id" | "created_at">,
        Partial<Omit<VisitorTracking, "id" | "created_at">>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  title: string;
  tagline: string;
  bio: string;
  avatar_url: string | null;
  email: string;
  location: string | null;
  is_owner: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  profile_id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  images: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  profile_id: string;
  name: string;
  category: string;
  icon: string | null;
  proficiency: number;
  color: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  profile_id: string;
  name: string;
  organization: string;
  issue_date: string;
  credential_url: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  profile_id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  achievements: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: string;
  profile_id: string;
  file_url: string;
  file_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  profile_id: string | null;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  profile_id: string;
  key: string;
  value: Json;
  created_at: string;
  updated_at: string;
}

export interface AnalyticsEvent {
  id: string;
  profile_id: string | null;
  event_type: string;
  event_data: Json;
  page_path: string | null;
  created_at: string;
}

export interface VisitorTracking {
  id: string;
  profile_id: string | null;
  session_id: string;
  page_path: string;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
  created_at: string;
}

export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type SkillInsert = Database["public"]["Tables"]["skills"]["Insert"];
export type CertificationInsert =
  Database["public"]["Tables"]["certifications"]["Insert"];
export type ExperienceInsert =
  Database["public"]["Tables"]["experiences"]["Insert"];
export type ResumeInsert = Database["public"]["Tables"]["resumes"]["Insert"];
export type ContactMessageInsert =
  Database["public"]["Tables"]["contact_messages"]["Insert"];
export type SocialLinkInsert =
  Database["public"]["Tables"]["social_links"]["Insert"];
export type SiteSettingInsert =
  Database["public"]["Tables"]["site_settings"]["Insert"];
