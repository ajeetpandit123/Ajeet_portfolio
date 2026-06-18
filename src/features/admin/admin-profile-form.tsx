"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { saveAdminRecord } from "@/app/admin/actions";
import type { Profile } from "@/types/database";

interface AdminProfileFormProps {
  profile: Profile;
}

export function AdminProfileForm({ profile: initial }: AdminProfileFormProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(initial);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const result = await saveAdminRecord("profiles", {
      full_name: profile.full_name,
      title: profile.title,
      tagline: profile.tagline,
      bio: profile.bio,
      email: profile.email,
      location: profile.location,
      avatar_url: profile.avatar_url,
    });

    if (!result.ok) {
      toast.error(result.error);
    } else {
      setProfile(result.data as Profile);
      router.refresh();
      toast.success("Profile updated");
    }
    setLoading(false);
  };

  const update = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Profile Management</h2>
      <GlassCard className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input value={profile.full_name} onChange={(e) => update("full_name", e.target.value)} />
          </div>
          <div>
            <Label>Title</Label>
            <Input value={profile.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input value={profile.tagline} onChange={(e) => update("tagline", e.target.value)} />
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea value={profile.bio} onChange={(e) => update("bio", e.target.value)} rows={5} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input value={profile.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <Label>Location</Label>
              <Input value={profile.location ?? ""} onChange={(e) => update("location", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Avatar URL</Label>
            <Input value={profile.avatar_url ?? ""} onChange={(e) => update("avatar_url", e.target.value)} />
          </div>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
