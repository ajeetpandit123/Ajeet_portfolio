"use client";

import { GlassCard } from "@/components/ui/glass-card";

export default function AdminSettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Website Settings</h2>
      <GlassCard className="max-w-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold mb-2">Environment Configuration</h3>
            <p className="text-sm text-muted mb-4">
              Configure these environment variables in your <code className="text-primary">.env.local</code> file:
            </p>
            <div className="glass rounded-lg p-4 font-mono text-xs space-y-2 text-muted">
              <p>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</p>
              <p>NEXT_PUBLIC_SITE_URL=https://yourdomain.com</p>
              <p>CLOUDINARY_CLOUD_NAME=your_cloud_name</p>
              <p>CLOUDINARY_API_KEY=your_api_key</p>
              <p>CLOUDINARY_API_SECRET=your_api_secret</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Database Setup</h3>
            <p className="text-sm text-muted">
              Run the SQL schema in <code className="text-primary">supabase/schema.sql</code> in your Supabase SQL Editor to create all tables, RLS policies, and indexes.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Storage Buckets</h3>
            <p className="text-sm text-muted">
              Create storage buckets in Supabase: <code className="text-primary">avatars</code>, <code className="text-primary">projects</code>, <code className="text-primary">resumes</code>, <code className="text-primary">certifications</code>
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
