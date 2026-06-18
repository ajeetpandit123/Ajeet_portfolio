"use client";

import { useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { deleteAdminRecord, markAdminMessageRead } from "@/app/admin/actions";
import type { ContactMessage } from "@/types/database";

interface AdminMessagesProps {
  messages: ContactMessage[];
}

export function AdminMessages({ messages: initial }: AdminMessagesProps) {
  const router = useRouter();
  const [messages, setMessages] = useState(initial);

  const markRead = async (id: string) => {
    const result = await markAdminMessageRead(id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
    router.refresh();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const result = await deleteAdminRecord("contact_messages", id);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    router.refresh();
    toast.success("Message deleted");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
      <div className="space-y-4">
        {messages.map((msg) => (
          <GlassCard key={msg.id} className={!msg.is_read ? "border-primary/30" : ""}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {!msg.is_read ? (
                    <Mail className="w-4 h-4 text-primary" />
                  ) : (
                    <MailOpen className="w-4 h-4 text-muted" />
                  )}
                  <span className="font-bold">{msg.name}</span>
                  <span className="text-xs text-muted font-mono">{msg.email}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-2">{msg.subject}</p>
                <p className="text-sm text-muted">{msg.message}</p>
                <p className="text-[10px] text-muted font-mono mt-2">
                  {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                {!msg.is_read && (
                  <button
                    onClick={() => markRead(msg.id)}
                    className="text-xs font-mono text-primary hover:underline"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="p-1.5 rounded hover:bg-destructive/10 text-muted hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-muted font-mono py-12">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
