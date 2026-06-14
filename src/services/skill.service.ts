import { createClient } from "@/lib/supabase/server";
import type { Skill, SkillInsert } from "@/types/database";

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  const skills = await getSkills();
  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
}

export async function createSkill(skill: SkillInsert): Promise<Skill | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .insert(skill)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSkill(
  id: string,
  updates: Partial<Skill>
): Promise<Skill | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSkill(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
