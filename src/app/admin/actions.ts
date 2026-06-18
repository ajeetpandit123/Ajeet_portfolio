"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

const ownedTables = [
  "projects",
  "skills",
  "certifications",
  "experiences",
  "resumes",
  "social_links",
] as const;

type OwnedTable = (typeof ownedTables)[number];
type AdminTable = OwnedTable | "profiles" | "contact_messages";
type MutationPayload = Record<string, unknown>;

const adminPaths = ["/", "/admin"];

function isOwnedTable(table: string): table is OwnedTable {
  return ownedTables.includes(table as OwnedTable);
}

function normalizeError(error: unknown) {
  return error instanceof Error ? error.message : "Operation failed";
}

async function getOwnerProfile(): Promise<Profile> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be signed in to manage admin content.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_owner", true)
    .single();

  if (profileError || !profile) {
    throw new Error("No owner profile is linked to this admin account.");
  }

  return profile as Profile;
}

function revalidateAdmin() {
  adminPaths.forEach((path) => revalidatePath(path));
  revalidatePath("/admin", "layout");
}

function stripSystemFields(payload: MutationPayload) {
  const next = { ...payload };
  delete next.id;
  delete next.created_at;
  delete next.updated_at;
  return next;
}

function cleanNullableFields(payload: MutationPayload) {
  Object.entries(payload).forEach(([key, value]) => {
    if (value === "") {
      payload[key] = null;
    }
  });
}

export async function ensureOwnerProfile() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { ok: false, error: "Unable to verify the signed-in user." };
  }

  const { data: existing, error: existingError } = await supabase
    .from("profiles")
    .select("id, is_owner")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingError) {
    return { ok: false, error: existingError.message };
  }

  if (existing?.is_owner) {
    return { ok: true };
  }

  const { data: currentOwner, error: ownerError } = await supabase
    .from("profiles")
    .select("id")
    .eq("is_owner", true)
    .limit(1)
    .maybeSingle();

  if (ownerError) {
    return { ok: false, error: ownerError.message };
  }

  if (currentOwner) {
    return { ok: false, error: "This account is not linked to the owner profile." };
  }

  if (existing) {
    const { error } = await supabase
      .from("profiles")
      .update({ is_owner: true })
      .eq("id", existing.id);

    return error ? { ok: false, error: error.message } : { ok: true };
  }

  const { error } = await supabase.from("profiles").insert({
    user_id: user.id,
    full_name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "",
    email: user.email ?? "",
    is_owner: true,
  });

  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function saveAdminRecord(
  table: AdminTable,
  payload: MutationPayload,
  id?: string
) {
  try {
    const ownerProfile = await getOwnerProfile();
    const supabase = await createClient();
    const updates = stripSystemFields(payload);
    cleanNullableFields(updates);

    if (isOwnedTable(table)) {
      updates.profile_id = ownerProfile.id;
    }

    if (table === "profiles") {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", ownerProfile.id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      revalidateAdmin();
      return { ok: true, data };
    }

    if (!isOwnedTable(table)) {
      throw new Error(`Saving ${table} is not supported from this form.`);
    }

    const query = id
      ? supabase.from(table).update(updates).eq("id", id)
      : supabase.from(table).insert(updates);

    const { data, error } = await query.select().single();

    if (error) throw new Error(error.message);
    revalidateAdmin();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: normalizeError(error) };
  }
}

export async function deleteAdminRecord(table: AdminTable, id: string) {
  try {
    await getOwnerProfile();

    if (!isOwnedTable(table) && table !== "contact_messages") {
      throw new Error(`Deleting ${table} is not supported.`);
    }

    const supabase = await createClient();
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) throw new Error(error.message);
    revalidateAdmin();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: normalizeError(error) };
  }
}

export async function markAdminMessageRead(id: string) {
  try {
    await getOwnerProfile();

    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);

    if (error) throw new Error(error.message);
    revalidateAdmin();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: normalizeError(error) };
  }
}
