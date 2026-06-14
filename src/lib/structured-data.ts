import type { Profile } from "@/types/database";

export function generatePersonJsonLd(profile: Profile, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.full_name,
    jobTitle: profile.title,
    description: profile.tagline,
    email: profile.email,
    url: siteUrl,
    address: profile.location
      ? { "@type": "PostalAddress", addressLocality: profile.location }
      : undefined,
  };
}
