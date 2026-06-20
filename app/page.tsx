import Link from "next/link";
import { ArrowRightIcon, FEATURE_ICONS } from "@/components/icons";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { GradientShell } from "@/components/layout/GradientShell";
import { SiteFooter } from "@/components/layout/SiteFooter";

// ─── Landing page data ────────────────────────────────────────────────────────

const STATS = [
  { value: "100%", label: "Private & local" },
  { value: "Zero", label: "Privacy Compromises" },
  { value: "∞", label: "Tracking Limit" },
] as const;

const FEATURES = [
  {
    icon: "clock" as const,
    title: "Live Countdown",
    desc: "See exactly how many days are left on every warranty. Color-coded alerts warn you 90 days before expiry.",
  },
  {
    icon: "image" as const,
    title: "Receipt Storage",
    desc: "Attach a photo of your bill or receipt directly to each product. View it full-screen any time you need it.",
  },
  {
    icon: "lock" as const,
    title: "100% Private",
    desc: "All data is stored locally in your browser. Nothing is sent to any server — ever. Your data stays yours.",
  },
] as const;

const STEPS = [
  {
    step: "01",
    title: "Add a product",
    desc: 'Click "Add Product", enter the product name, purchase date, and warranty length.',
  },
  {
    step: "02",
    title: "Attach your receipt",
    desc: "Optionally snap a photo of your bill and attach it so you always have proof of purchase.",
  },
  {
    step: "03",
    title: "Stay ahead of expiry",
    desc: "WarrantyVault counts down the days and highlights anything expiring soon in amber.",
  },
] as const;

// ─── Shared within this page ──────────────────────────────────────────────────

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-14">
      <p className="text-sm font-semibold text-[#561e2d] uppercase tracking-widest mb-2">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a0a0e] tracking-tight">{title}</h2>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <GradientShell>
      <FloatingNav action={{ href: "/products", label: "My Products" }} />

      <main className="flex-1">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#561e2d]/10 text-[#561e2d] text-sm font-medium mb-8 border border-[#561e2d]/20">
            Built for Digital Heroes
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 text-[#1a0a0e]">
            Never lose track of
            <br />
            <span className="text-[#561e2d]">product warranty</span> again.
          </h1>

          <p className="max-w-2xl mx-auto text-[#7a3a4a] text-lg sm:text-xl leading-relaxed mb-10">
            WarrantyVault stores all your purchase warranties in one place, counts down the days
            remaining, and keeps your receipts handy — right in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#561e2d] text-[#ffffff] font-bold text-base hover:bg-[#3d1520] transition shadow-lg shadow-[#561e2d]/25"
            >
              Start Tracking Now
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#561e2d]/30 text-[#561e2d] font-semibold text-base hover:border-[#561e2d]/60 hover:bg-[#561e2d]/5 transition"
            >
              See how it works
            </a>
          </div>
        </section>

        {/* ── Stats ────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-3 gap-4 text-center divide-x divide-[#561e2d]/20">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#561e2d]">{stat.value}</p>
                <p className="text-sm text-[#9a6070] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-24 sm:pb-32">
          <SectionHeading eyebrow="Features" title="Everything you need, nothing you don't" />

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#561e2d]/15 bg-white/70 backdrop-blur-sm p-7 hover:border-[#561e2d]/40 hover:bg-white/90 hover:shadow-md hover:shadow-[#561e2d]/10 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#561e2d]/10 text-[#561e2d] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1a0a0e] mb-2">{feature.title}</h3>
                  <p className="text-[#7a3a4a] text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-6 pb-24 sm:pb-32">
          <SectionHeading eyebrow="How it works" title="Up and running in three steps" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-[#561e2d]/20" />

            {STEPS.map((step) => (
              <div key={step.step} className="relative text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#561e2d] text-[#ffffff] flex items-center justify-center text-xl font-extrabold shadow-lg shadow-[#561e2d]/25 mb-5">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-[#1a0a0e] mb-2">{step.title}</h3>
                <p className="text-[#7a3a4a] text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 pb-28">
          <div className="rounded-3xl border border-[#561e2d]/20 bg-white/70 backdrop-blur-sm text-center px-8 py-16 shadow-sm shadow-[#561e2d]/10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight text-[#561e2d]">
              Ready to take control?
            </h2>
            <p className="text-[#7a3a4a] text-lg mb-8 max-w-xl mx-auto">
              Start tracking your warranties right now. It takes less than a minute to add your first product.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#561e2d] text-[#ffffff] font-bold text-base hover:bg-[#3d1520] transition shadow-lg shadow-[#561e2d]/25"
            >
              Go to My Products
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </GradientShell>
  );
}
