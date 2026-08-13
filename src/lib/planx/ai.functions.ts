import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({
  projectId: z.string().uuid(),
  message: z.string().min(1).max(2000),
});

export type DesignerReply = {
  reply: string;
  changes: {
    area?: number;
    floors?: number;
    bedrooms?: number;
    bathrooms?: number;
    style?: string;
    garage?: boolean;
    pool?: boolean;
    terrace?: boolean;
  } | null;
};

/** AI designer chat. Knows the current project context and may propose brief changes. */
export const askDesigner = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data, context }): Promise<DesignerReply> => {
    const { supabase } = context;
    const { data: project, error } = await supabase
      .from("projects")
      .select("name, brief, area, floors, bedrooms, bathrooms, style, budget, cost, score")
      .eq("id", data.projectId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!project) throw new Error("Project not found");

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return {
        reply: "The AI designer is temporarily unavailable. Please try again shortly.",
        changes: null,
      };
    }

    const system = [
      "You are PlanX, an assistant for preliminary residential architecture concepts.",
      "You never claim engineering certainty; you always frame numbers as preliminary estimates.",
      "Answer briefly (max 5 sentences) in the same language as the user's message.",
      "If the user asks for a concrete change to the program (area, floors, bedrooms, bathrooms, style, garage, pool, terrace), fill the changes object; otherwise set changes to null.",
      `Current project: ${JSON.stringify(project)}`,
    ].join("\n");

    let res: Response;
    try {
      res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3.5-flash",
          messages: [
            { role: "system", content: system },
            { role: "user", content: data.message },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "respond",
                description: "Reply to the user and optionally propose project changes.",
                parameters: {
                  type: "object",
                  properties: {
                    reply: { type: "string" },
                    changes: {
                      type: "object",
                      properties: {
                        area: { type: "number" },
                        floors: { type: "number" },
                        bedrooms: { type: "number" },
                        bathrooms: { type: "number" },
                        style: { type: "string" },
                        garage: { type: "boolean" },
                        pool: { type: "boolean" },
                        terrace: { type: "boolean" },
                      },
                      additionalProperties: false,
                    },
                  },
                  required: ["reply"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "respond" } },
        }),
      });
    } catch (e) {
      console.error("[PlanX AI] gateway request failed", e);
      return { reply: "The AI designer could not be reached. Please try again.", changes: null };
    }

    if (!res.ok) {
      const status = res.status;
      console.error("[PlanX AI] gateway error", status, await res.text().catch(() => ""));
      const reply =
        status === 429
          ? "Too many requests right now — please retry in a moment."
          : status === 402
            ? "AI usage limit reached for this workspace."
            : "The AI designer is temporarily unavailable.";
      return { reply, changes: null };
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string; tool_calls?: { function?: { arguments?: string } }[] } }[];
    };
    const call = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (call) {
      try {
        const parsed = JSON.parse(call) as DesignerReply;
        return { reply: parsed.reply, changes: parsed.changes ?? null };
      } catch {
        /* fall through */
      }
    }
    return { reply: json.choices?.[0]?.message?.content ?? "…", changes: null };
  });
