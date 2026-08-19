import { createFileRoute } from "@tanstack/react-router";
import { AuthPanel } from "@/components/planx-app/AuthPanel";
import { AppLangProvider } from "@/lib/planx/app-i18n";

export const Route = createFileRoute("/forgot-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset password — PlanX Architecture AI" },
      { name: "description", content: "Request a password reset link for your PlanX architectural workspace account." },
      { property: "og:title", content: "Reset password — PlanX Architecture AI" },
      { property: "og:description", content: "Recover access to your PlanX projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AppLangProvider>
      <AuthPanel mode="forgot" />
    </AppLangProvider>
  ),
});
