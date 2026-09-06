import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Radar, MailCheck, CalendarX2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content: "設定航線與目標價，機票降價就通知你。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

const FEATURES = [
  {
    icon: Radar,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: MailCheck,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Plane className="size-4" />
            </span>
            Flight Price Notifier
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--glow)] transition-transform hover:scale-[1.03]"
          >
            Sign in / 登入
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-40 pb-24 sm:pt-48">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[480px] max-w-4xl rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-60 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <FadeIn>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
              機票降價通知 · Fare drop alerts from Taipei
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Flight Price Notifier
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-foreground sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="mt-10">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_0_40px_-8px_var(--glow)] transition-transform hover:scale-[1.04]"
              >
                Sign in / 登入
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 120}>
              <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/40">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/12 text-primary transition-colors group-hover:bg-primary/20">
                  <f.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {f.title}
                  <span className="mt-0.5 block text-xs font-normal tracking-wide text-primary">
                    {f.subtitle}
                  </span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
