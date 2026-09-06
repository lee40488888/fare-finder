import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plane, LogOut, Radar } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your flight route watching dashboard." },
    ],
  }),
  component: AppShell,
});

function AppShell() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/app" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Plane className="size-4" />
            </span>
            Flight Price Notifier
          </Link>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground disabled:opacity-60"
          >
            <LogOut className="size-4" />
            Sign out / 登出
          </button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary shadow-[0_0_40px_-10px_var(--glow)]">
            <Radar className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Hi {user.email}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
