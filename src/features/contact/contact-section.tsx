"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Terminal } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> Vorexis OS Terminal v2.0",
    "> Connection established...",
    "> Ready to receive transmission.",
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const addLine = (line: string) => {
    setTerminalLines((prev) => [...prev.slice(-8), line]);
  };

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    addLine(`> Sending message from ${data.name}...`);

    try {
      const supabase = createClient();
      const { error } = await supabase.from("contact_messages").insert({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        profile_id: null,
        is_read: false,
      } as never);

      if (error) throw error;

      addLine("> Transmission successful ✓");
      addLine("> Message stored in database.");
      setStatus("sent");
      reset();
    } catch {
      addLine("> ERROR: Transmission failed.");
      addLine("> Please try again or email directly.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Contact"
          title="Contact Terminal"
          description="Open a secure channel to initiate communication."
        />

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Terminal output */}
          <motion.div
            className="glass rounded-2xl p-6 font-mono text-sm min-h-[300px] flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-glass-border">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted">vorexis-terminal</span>
              <div className="ml-auto flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {terminalLines.map((line, i) => (
                <motion.p
                  key={i}
                  className={
                    line.includes("ERROR")
                      ? "text-destructive"
                      : line.includes("✓")
                        ? "text-accent"
                        : "text-primary/70"
                  }
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {line}
                </motion.p>
              ))}
              <span className="text-accent terminal-cursor" />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="glass rounded-2xl p-6 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" {...register("name")} />
              {errors.name && (
                <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Project inquiry" {...register("subject")} />
              {errors.subject && (
                <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message..." {...register("message")} />
              {errors.message && (
                <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={status === "sending"}>
              <Send className="w-4 h-4" />
              {status === "sending" ? "Transmitting..." : status === "sent" ? "Sent!" : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
