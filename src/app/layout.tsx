import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ajeet.dev — Full Stack Developer Portfolio",
    template: "%s | Ajeet.dev",
  },
  description:
    "A premium 3D developer portfolio platform. Explore projects, skills, experience, and connect through an immersive futuristic interface.",
  keywords: [
    "developer portfolio",
    "full stack developer",
    "react",
    "next.js",
    "3D portfolio",
  ],
  authors: [{ name: "Ajeet.dev" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ajeet.dev",
    title: "Ajeet.dev — Full Stack Developer Portfolio",
    description:
      "A premium 3D developer portfolio platform with immersive experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajeet.dev — Full Stack Developer Portfolio",
    description:
      "A premium 3D developer portfolio platform with immersive experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-black text-foreground antialiased">
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fafafa",
              backdropFilter: "blur(20px)",
            },
          }}
        />
      </body>
    </html>
  );
}
