import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { estimateCost, estimateMaterials, fallbackName, generatePlan, scoreProject } from "./engine";
import type { Brief, ProjectRow } from "./types";

export const projectsKey = ["planx", "projects"] as const;
export const projectKey = (id: string) => ["planx", "project", id] as const;

export function useProjects() {
  return useQuery({
    queryKey: projectsKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as ProjectRow[];
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKey(id),
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return (data ?? null) as unknown as ProjectRow | null;
    },
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["planx", "profile"],
    queryFn: async () => {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;
      if (!user) return null;
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (!data) {
        const insert = {
          id: user.id,
          full_name: (user.user_metadata?.["full_name"] as string) ?? null,
        };
        const { data: created } = await supabase
          .from("profiles")
          .insert(insert)
          .select("*")
          .maybeSingle();
        return { ...(created ?? insert), email: user.email } as Record<string, unknown>;
      }
      return { ...data, email: user.email } as Record<string, unknown>;
    },
  });
}

/** Builds the full preliminary project payload from a brief and stores it. */
export async function createProjectFromBrief(brief: Brief) {
  const { data: auth } = await supabase.auth.getUser();
  const user = auth.user;
  if (!user) throw new Error("Not authenticated");

  const plan = generatePlan(brief);
  const materials = { lines: estimateMaterials(brief.req.area, brief.req.floors) };
  const cost = estimateCost(brief.req.area);
  const score = scoreProject(brief, plan, cost);

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name: fallbackName(brief),
      description: brief.idea ?? null,
      brief: brief as unknown as Record<string, unknown>,
      area: brief.req.area,
      floors: brief.req.floors,
      bedrooms: brief.req.bedrooms,
      bathrooms: brief.req.bathrooms,
      style: brief.style,
      budget: brief.budget ?? null,
      plan: plan as unknown as Record<string, unknown>,
      materials,
      cost: cost as unknown as Record<string, unknown>,
      score: score as unknown as Record<string, unknown>,
      timeline: { stage: 2 },
      status: "ready",
    } as never)
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Record<string, unknown> }) => {
      const { error } = await supabase.from("projects").update(patch as never).eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: projectKey(id) });
      qc.invalidateQueries({ queryKey: projectsKey });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: projectsKey }),
  });
}

export function useDuplicateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: ProjectRow) => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Not authenticated");
      const {
        id: _id,
        created_at: _c,
        updated_at: _u,
        share_slug: _s,
        ...rest
      } = row;
      const { data, error } = await supabase
        .from("projects")
        .insert({ ...rest, user_id: auth.user.id, name: `${row.name} (copy)`, visibility: "private", share_slug: null } as never)
        .select("id")
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: projectsKey }),
  });
}

export function useMessages(projectId: string) {
  return useQuery({
    queryKey: ["planx", "messages", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_messages")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}
