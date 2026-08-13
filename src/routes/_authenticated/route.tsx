import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AppLangProvider } from "@/lib/planx/app-i18n";
import { AppThemeProvider } from "@/lib/planx/theme";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: () => (
    <AppThemeProvider>
      <AppLangProvider>
        <Outlet />
      </AppLangProvider>
    </AppThemeProvider>
  ),
});
