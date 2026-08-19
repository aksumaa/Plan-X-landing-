import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/planx-app/AuthPanel";
import { AppLangProvider } from "@/lib/planx/app-i18n";

export const Route = createFileRoute("/register")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Create account — PlanX Architecture AI" },
      { name: "description", content: "Create a PlanX account and turn your idea into a floor plan, 3D concept and cost estimate." },
      { property: "og:title", content: "Create account — PlanX Architecture AI" },
      { property: "og:description", content: "Start your first PlanX architectural project in minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AppLangProvider>
      <AuthPanel mode="register" />
    </AppLangProvider>
  ),
});
