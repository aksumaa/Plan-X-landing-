import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/planx-app/AuthPanel";
import { AppLangProvider } from "@/lib/planx/app-i18n";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in — PlanX Architecture AI" },
      { name: "description", content: "Sign in to the PlanX workspace to design floor plans, 3D concepts and cost estimates." },
      { property: "og:title", content: "Sign in — PlanX Architecture AI" },
      { property: "og:description", content: "Access your PlanX projects, AI floor plans, 3D studio and construction estimates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AppLangProvider>
      <AuthPanel mode="login" />
    </AppLangProvider>
  ),
});
