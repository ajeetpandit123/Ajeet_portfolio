# Vorexis OS

A premium 3D full-stack developer portfolio platform built with Next.js 15, React Three Fiber, Supabase, and Framer Motion.

## Features

- **Cinematic Hero** — 3D environment with particles, floating tech icons, and mouse-reactive lighting
- **Portfolio Sections** — About, Experience Timeline, Skills Galaxy, Projects Showcase, Certifications Wall, Resume Center, Contact Terminal
- **Admin Dashboard** — Full CRUD for all content modules, protected by Supabase Auth
- **Premium Dark Theme** — Glassmorphism, aurora gradients, neon highlights, JARVIS-style UI
- **Demo Mode** — Works out of the box with demo data when Supabase is not configured

## Tech Stack

- **Frontend:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion, GSAP, React Three Fiber, Drei, Shadcn UI, Zustand
- **Backend:** Supabase (Auth, PostgreSQL, Storage, RLS)
- **Validation:** React Hook Form + Zod
- **Deployment:** Vercel

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Create storage buckets: `avatars`, `projects`, `resumes`, `certifications`
4. Copy your project URL and anon key to `.env.local`
5. Create an auth user and insert a profile row with `is_owner = true`

```sql
INSERT INTO profiles (user_id, full_name, title, email, is_owner)
VALUES ('your-auth-user-id', 'Your Name', 'Full Stack Developer', 'you@email.com', true);
```

## Admin Panel

Navigate to `/admin/login` and sign in with your Supabase credentials.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Shared UI and 3D components
├── features/         # Feature-based modules (hero, projects, admin, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities, Supabase clients, demo data
├── services/         # Data access layer (Page → Service → Supabase)
├── stores/           # Zustand state management
└── types/            # TypeScript type definitions
```

## Deployment

Deploy to Vercel and set environment variables from `.env.example`.

## License

MIT
