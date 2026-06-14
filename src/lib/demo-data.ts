import type {
  Profile,
  Project,
  Skill,
  Certification,
  Experience,
  Resume,
  SocialLink,
} from "@/types/database";

export const DEMO_PROFILE: Profile = {
  id: "demo-profile",
  user_id: "demo-user",
  full_name: "Alex Chen",
  title: "Senior Full Stack Engineer",
  tagline: "Architecting digital experiences at the intersection of design and code.",
  bio: "I'm a passionate full stack developer with 8+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture, with a keen eye for premium UI/UX design. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring junior developers.",
  avatar_url: null,
  email: "alex@vorexis.dev",
  location: "San Francisco, CA",
  is_owner: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const DEMO_STATS = {
  projects: 24,
  skills: 32,
  certifications: 8,
  experience: 5,
};

export const DEMO_PROJECTS: Project[] = [
  {
    id: "1",
    profile_id: "demo-profile",
    title: "NeuralFlow AI",
    description:
      "An enterprise AI workflow platform with real-time collaboration, model training pipelines, and intelligent automation.",
    technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL", "Redis"],
    category: "ai",
    images: [],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    profile_id: "demo-profile",
    title: "Quantum Commerce",
    description:
      "Headless e-commerce platform processing 10M+ transactions with sub-100ms response times globally.",
    technologies: ["React", "Node.js", "GraphQL", "MongoDB", "AWS"],
    category: "ecommerce",
    images: [],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    profile_id: "demo-profile",
    title: "Vortex Analytics",
    description:
      "Real-time data visualization dashboard with 3D charts, predictive analytics, and custom reporting.",
    technologies: ["Vue.js", "D3.js", "WebGL", "Supabase", "Vercel"],
    category: "analytics",
    images: [],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    profile_id: "demo-profile",
    title: "CipherVault",
    description:
      "Zero-knowledge encrypted password manager with biometric authentication and secure sharing.",
    technologies: ["React Native", "Rust", "WebAssembly", "Firebase"],
    category: "security",
    images: [],
    live_url: "https://example.com",
    github_url: "https://github.com",
    featured: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEMO_SKILLS: Skill[] = [
  { id: "1", profile_id: "demo-profile", name: "React", category: "frontend", icon: "⚛️", proficiency: 95, color: "#61DAFB", sort_order: 0, created_at: "", updated_at: "" },
  { id: "2", profile_id: "demo-profile", name: "Next.js", category: "frontend", icon: "▲", proficiency: 92, color: "#ffffff", sort_order: 1, created_at: "", updated_at: "" },
  { id: "3", profile_id: "demo-profile", name: "TypeScript", category: "frontend", icon: "TS", proficiency: 90, color: "#3178C6", sort_order: 2, created_at: "", updated_at: "" },
  { id: "4", profile_id: "demo-profile", name: "Node.js", category: "backend", icon: "🟢", proficiency: 88, color: "#339933", sort_order: 3, created_at: "", updated_at: "" },
  { id: "5", profile_id: "demo-profile", name: "Python", category: "backend", icon: "🐍", proficiency: 85, color: "#3776AB", sort_order: 4, created_at: "", updated_at: "" },
  { id: "6", profile_id: "demo-profile", name: "PostgreSQL", category: "database", icon: "🐘", proficiency: 87, color: "#4169E1", sort_order: 5, created_at: "", updated_at: "" },
  { id: "7", profile_id: "demo-profile", name: "AWS", category: "cloud", icon: "☁️", proficiency: 82, color: "#FF9900", sort_order: 6, created_at: "", updated_at: "" },
  { id: "8", profile_id: "demo-profile", name: "Docker", category: "devops", icon: "🐳", proficiency: 80, color: "#2496ED", sort_order: 7, created_at: "", updated_at: "" },
  { id: "9", profile_id: "demo-profile", name: "Three.js", category: "frontend", icon: "🎮", proficiency: 78, color: "#000000", sort_order: 8, created_at: "", updated_at: "" },
  { id: "10", profile_id: "demo-profile", name: "GraphQL", category: "backend", icon: "◈", proficiency: 83, color: "#E10098", sort_order: 9, created_at: "", updated_at: "" },
  { id: "11", profile_id: "demo-profile", name: "Redis", category: "database", icon: "⚡", proficiency: 79, color: "#DC382D", sort_order: 10, created_at: "", updated_at: "" },
  { id: "12", profile_id: "demo-profile", name: "Kubernetes", category: "devops", icon: "☸️", proficiency: 75, color: "#326CE5", sort_order: 11, created_at: "", updated_at: "" },
];

export const DEMO_CERTIFICATIONS: Certification[] = [
  { id: "1", profile_id: "demo-profile", name: "AWS Solutions Architect", organization: "Amazon Web Services", issue_date: "2024-03-15", credential_url: "https://aws.amazon.com", image_url: null, sort_order: 0, created_at: "", updated_at: "" },
  { id: "2", profile_id: "demo-profile", name: "Google Cloud Professional", organization: "Google Cloud", issue_date: "2023-11-20", credential_url: "https://cloud.google.com", image_url: null, sort_order: 1, created_at: "", updated_at: "" },
  { id: "3", profile_id: "demo-profile", name: "Meta Frontend Developer", organization: "Meta", issue_date: "2023-06-10", credential_url: "https://meta.com", image_url: null, sort_order: 2, created_at: "", updated_at: "" },
  { id: "4", profile_id: "demo-profile", name: "Kubernetes Administrator", organization: "CNCF", issue_date: "2023-01-05", credential_url: "https://cncf.io", image_url: null, sort_order: 3, created_at: "", updated_at: "" },
];

export const DEMO_EXPERIENCES: Experience[] = [
  {
    id: "1",
    profile_id: "demo-profile",
    company: "Vortex Technologies",
    role: "Senior Full Stack Engineer",
    start_date: "2022-01-01",
    end_date: null,
    description: "Leading development of enterprise SaaS platform serving 500K+ users.",
    achievements: [
      "Reduced page load time by 60% through performance optimization",
      "Architected microservices migration reducing deployment time by 80%",
      "Mentored team of 8 engineers on modern React patterns",
    ],
    sort_order: 0,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    profile_id: "demo-profile",
    company: "Nexus Digital",
    role: "Full Stack Developer",
    start_date: "2019-06-01",
    end_date: "2021-12-31",
    description: "Built and maintained multiple client-facing web applications.",
    achievements: [
      "Delivered 15+ projects on time and under budget",
      "Implemented CI/CD pipeline reducing bugs by 45%",
      "Introduced TypeScript across the organization",
    ],
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    profile_id: "demo-profile",
    company: "StartupLab Inc.",
    role: "Junior Developer",
    start_date: "2017-03-01",
    end_date: "2019-05-31",
    description: "Full stack development for early-stage startup products.",
    achievements: [
      "Built MVP that secured $2M seed funding",
      "Developed real-time chat feature used by 10K+ users",
    ],
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
];

export const DEMO_SOCIAL_LINKS: SocialLink[] = [
  { id: "1", profile_id: "demo-profile", platform: "GitHub", url: "https://github.com", icon: "github", sort_order: 0, created_at: "", updated_at: "" },
  { id: "2", profile_id: "demo-profile", platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", sort_order: 1, created_at: "", updated_at: "" },
  { id: "3", profile_id: "demo-profile", platform: "Twitter", url: "https://twitter.com", icon: "twitter", sort_order: 2, created_at: "", updated_at: "" },
];

export const DEMO_RESUME: Resume = {
  id: "demo-resume",
  profile_id: "demo-profile",
  file_url: "/resume.pdf",
  file_name: "Alex_Chen_Resume.pdf",
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
