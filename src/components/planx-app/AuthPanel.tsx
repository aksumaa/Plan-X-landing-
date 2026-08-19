import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useT } from "@/lib/planx/app-i18n";
import mark from "@/assets/planx-mark.png";

export type AuthMode = "login" | "register" | "forgot";

const copy = {
  uz: {
    forgot: "Parolni tiklash",
    forgotHint: "Emailingizni kiriting — tiklash havolasini yuboramiz.",
    send: "Havolani yuborish",
    sent: "Tiklash havolasi emailingizga yuborildi.",
    forgotLink: "Parolni unutdingizmi?",
    backToLogin: "Kirishga qaytish",
  },
  ru: {
    forgot: "Сброс пароля",
    forgotHint: "Введите email — мы отправим ссылку для сброса.",
    send: "Отправить ссылку",
    sent: "Ссылка для сброса отправлена на email.",
    forgotLink: "Забыли пароль?",
    backToLogin: "Вернуться к входу",
  },
  en: {
    forgot: "Reset password",
    forgotHint: "Enter your email and we will send a reset link.",
    send: "Send reset link",
    sent: "Password reset link sent to your email.",
    forgotLink: "Forgot your password?",
    backToLogin: "Back to sign in",
  },
} as const;

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const { t, lang } = useT();
  const c = copy[lang];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (mode === "forgot") return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) void routeAfterAuth(navigate);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) void routeAfterAuth(navigate);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, mode]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/login`, data: { full_name: name } },
        });
        if (error) throw error;
        toast.success(t.auth.checkEmail);
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        });
        if (error) throw error;
        toast.success(c.sent);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(t.auth.welcome);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/login",
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    void routeAfterAuth(navigate);
  };

  const heading = mode === "login" ? t.auth.login : mode === "register" ? t.auth.signup : c.forgot;

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <div className="relative hidden items-end bg-ink p-12 lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative">
          <img src={mark} alt="" aria-hidden="true" width={96} height={104} className="h-10 w-auto" />
          <h2 className="display mt-8 max-w-sm text-4xl text-primary-foreground">{t.auth.title}</h2>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/60">{t.auth.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-[0.75rem] text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> {t.nav.backToSite}
          </Link>

          <h1 className="display text-3xl">{heading}</h1>
          {mode === "forgot" && <p className="mt-3 text-sm text-muted-foreground">{c.forgotHint}</p>}

          {mode !== "forgot" && (
            <>
              <button
                onClick={google}
                disabled={busy}
                className="mt-8 flex w-full items-center justify-center gap-3 border border-border bg-card px-4 py-3 text-sm transition-colors hover:bg-secondary disabled:opacity-60"
              >
                <GoogleIcon /> {t.auth.google}
              </button>
              <div className="my-6 flex items-center gap-4">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">{t.auth.or}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
            </>
          )}

          <form onSubmit={submit} className={`flex flex-col gap-4 ${mode === "forgot" ? "mt-8" : ""}`}>
            {mode === "register" && (
              <Field label={t.auth.name} value={name} onChange={setName} type="text" autoComplete="name" />
            )}
            <Field label={t.auth.email} value={email} onChange={setEmail} type="email" required autoComplete="email" />
            {mode !== "forgot" && (
              <Field
                label={t.auth.password}
                value={password}
                onChange={setPassword}
                type="password"
                required
                autoComplete={mode === "register" ? "new-password" : "current-password"}
              />
            )}
            <button
              type="submit"
              disabled={busy}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-primary px-4 py-3 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-pine disabled:opacity-60"
            >
              {busy && <Loader2 className="size-3.5 animate-spin" />}
              {mode === "login" ? t.auth.login : mode === "register" ? t.auth.signup : c.send}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            {mode === "login" && (
              <>
                <p>
                  {t.auth.noAccount}{" "}
                  <Link to="/register" className="text-foreground underline underline-offset-4">
                    {t.auth.signup}
                  </Link>
                </p>
                <Link to="/forgot-password" className="underline underline-offset-4 hover:text-foreground">
                  {c.forgotLink}
                </Link>
              </>
            )}
            {mode !== "login" && (
              <p>
                {t.auth.haveAccount}{" "}
                <Link to="/login" className="text-foreground underline underline-offset-4">
                  {t.auth.login}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="border border-border bg-card px-3 py-2.5 text-sm outline-none transition-colors focus:border-pine"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#4285F4" d="M23 12.2c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.1-2 3.4-4.9 3.4-8.6z" />
      <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.7-2.9c-1 .7-2.4 1.2-4.1 1.2a7.2 7.2 0 0 1-6.8-5H1.4v3A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.2 14.4a7.2 7.2 0 0 1 0-4.6v-3H1.4a12 12 0 0 0 0 10.6l3.8-3z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.3-3.3A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.4 6.8l3.8 3A7.2 7.2 0 0 1 12 4.8z" />
    </svg>
  );
}

export async function routeAfterAuth(navigate: ReturnType<typeof useNavigate>) {
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return;
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type")
    .eq("id", auth.user.id)
    .maybeSingle();
  if (!profile || !(profile as { user_type?: string | null }).user_type) {
    navigate({ to: "/welcome", replace: true });
    return;
  }
  navigate({ to: "/dashboard", replace: true });
}
