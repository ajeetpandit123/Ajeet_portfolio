"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { createClient } from "@/lib/supabase/client";

interface Field {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "url" | "date" | "checkbox" | "array";
  placeholder?: string;
}

interface AdminCrudTableProps<T extends { id: string }> {
  title: string;
  table: string;
  items: T[];
  fields: Field[];
  columns: { key: keyof T; label: string }[];
  defaultValues?: Partial<T>;
  onRefresh?: () => void;
}

export function AdminCrudTable<T extends { id: string }>({
  title,
  table,
  items,
  fields,
  columns,
  defaultValues = {},
}: AdminCrudTableProps<T>) {
  const [data, setData] = useState(items);
  const [editing, setEditing] = useState<T | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(false);

  const openCreate = () => {
    setFormData(defaultValues as Record<string, unknown>);
    setIsCreating(true);
    setEditing(null);
  };

  const openEdit = (item: T) => {
    setFormData(item as unknown as Record<string, unknown>);
    setEditing(item);
    setIsCreating(false);
  };

  const closeForm = () => {
    setEditing(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleSave = async () => {
    setLoading(true);
    const supabase = createClient();

    try {
      const processed = { ...formData };
      fields.forEach((field) => {
        if (field.type === "array" && typeof processed[field.name] === "string") {
          processed[field.name] = (processed[field.name] as string)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
        if (field.type === "checkbox") {
          processed[field.name] = !!processed[field.name];
        }
        if (field.type === "number") {
          processed[field.name] = Number(processed[field.name]);
        }
      });

      if (isCreating) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: created, error } = await (supabase as any)
          .from(table)
          .insert(processed)
          .select()
          .single();
        if (error) throw error;
        setData((prev) => [...prev, created as T]);
        toast.success(`${title} created`);
      } else if (editing) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { data: updated, error } = await (supabase as any)
          .from(table)
          .update(processed)
          .eq("id", editing.id)
          .select()
          .single();
        if (error) throw error;
        setData((prev) =>
          prev.map((item) => (item.id === editing.id ? (updated as T) : item))
        );
        toast.success(`${title} updated`);
      }
      closeForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const supabase = createClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from(table).delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setData((prev) => prev.filter((item) => item.id !== id));
    toast.success(`${title} deleted`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {(isCreating || editing) && (
        <GlassCard className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">
              {isCreating ? `New ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}
            </h3>
            <button onClick={closeForm} className="text-muted hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <Label>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    placeholder={field.placeholder}
                  />
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={!!formData[field.name]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.checked })
                    }
                    className="mt-2"
                  />
                ) : (
                  <Input
                    type={field.type ?? "text"}
                    value={String(formData[field.name] ?? "")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field.name]:
                          field.type === "number"
                            ? e.target.value
                            : e.target.value,
                      })
                    }
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </GlassCard>
      )}

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border">
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    className="text-left px-4 py-3 font-mono text-xs text-muted uppercase"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-right px-4 py-3 font-mono text-xs text-muted uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-glass-border/50 hover:bg-white/2"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      {String(item[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 rounded hover:bg-primary/10 text-muted hover:text-primary"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded hover:bg-destructive/10 text-muted hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-8 text-center text-muted font-mono"
                  >
                    No items yet. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
