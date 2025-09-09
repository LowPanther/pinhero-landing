"use client";
import { useState } from "react";

export default function LandingPage() {
  const [audience, setAudience] = useState<"users" | "businesses">("users");

  return (
    <div
      className="min-h-screen"
      style={{
        ["--brand-primary" as any]: "#FF9472", // coral/orange
        ["--brand-success" as any]: "#00B894", // teal
        ["--brand-secondary" as any]: "#4ECDC4", // light teal
        ["--text-primary" as any]: "#4A5C6A", // blue-gray
        ["--text-secondary" as any]: "#2B2B2B", // very dark gray
        ["--brand-warning" as any]: "#FDCB6E", // golden yellow
        ["--brand-error" as any]: "#FF6B6B", // coral red
        ["--bg-primary" as any]: "#FAFAF5", // off-white
        ["--bg-secondary" as any]: "#F8F9FA", // light gray
        ["--border" as any]: "#E5E5E5",
        color: "var(--text-primary)",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Top Bar */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-9 h-9 rounded-xl grid place-items-center shadow-sm"
            style={{ backgroundColor: "var(--brand-warning)" }}
          >
            <span className="font-black" style={{ color: "var(--text-secondary)" }}>
              P
            </span>
          </div>
          <span className="font-extrabold tracking-tight text-lg" style={{ color: "var(--text-secondary)" }}>
            PinHero
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <a href="#how" className="hover:opacity-80">
            How it works
          </a>
          <a href="#benefits" className="hover:opacity-80">
            Benefits
          </a>
          <a href="#faq" className="hover:opacity-80">
            FAQ
          </a>
          <a
            href="#join"
            className="px-4 py-2 rounded-xl text-white hover:opacity-95"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(135deg, #FF9472 0%, #FDCB6E 60%, #FAFAF5 100%)",
            opacity: 0.25,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="uppercase text-xs tracking-widest mb-3" style={{ color: "var(--text-primary)" }}>
              Launching first in Johannesburg
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "var(--text-secondary)" }}>
              What's happening around you - right now
            </h1>
            <p className="mt-4 text-lg max-w-xl">
              PinHero is a live, people-powered feed of pop-ups, flash deals, micro-events, and nearby help.
	      Drop a pin and act in seconds - no planning, no endless searching.
            </p>

            {/* Audience Switcher */}
            <div
              className="mt-6 inline-flex rounded-2xl border p-1 shadow-sm bg-white"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => setAudience("users")}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: audience === "users" ? "var(--text-secondary)" : "transparent",
                  color: audience === "users" ? "#FFFFFF" : "var(--text-primary)",
                }}
                type="button"
              >
                I’m a user
              </button>
              <button
                onClick={() => setAudience("businesses")}
                className="px-4 py-2 rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: audience === "businesses" ? "var(--text-secondary)" : "transparent",
                  color: audience === "businesses" ? "#FFFFFF" : "var(--text-primary)",
                }}
                type="button"
              >
                I’m a business
              </button>
            </div>

            {/* Signup Form */}
            <SignupCard audience={audience} />

            {/* Trust Bits */}
            <div className="mt-4 text-xs">No spam. Unsubscribe anytime. We’ll email when early access opens.</div>
          </div>

          {/* Device Mock */}
          <div className="md:justify-self-end">
            <div
              className="w-[320px] h-[660px] rounded-[36px] border-[10px] shadow-2xl bg-white overflow-hidden mx-auto"
              style={{ borderColor: "var(--text-secondary)" }}
            >
              <div className="h-10" style={{ backgroundColor: "var(--text-secondary)" }} />
              <div className="h-full grid place-items-center">
                <div
                  className="w-56 h-56 rounded-2xl border border-dashed grid place-items-center"
                  style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                >
                  <span className="text-sm">App preview / GIF</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs mt-3">Visuals are placeholders for now</p>
          </div>
        </div>
      </header>

      {/* Social Proof / Counters */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat kpi="2,000+" label="pins dropped in testing" />
          <Stat kpi="50+" label="businesses expressed interest" />
          <Stat kpi="<10s" label="time to discover nearby" />
          <Stat kpi="1 app" label="to find, decide & act" />
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-16" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center" style={{ color: "var(--text-secondary)" }}>
            Why you’ll love PinHero
          </h2>
          <p className="text-center mt-2">Built for real life — quick decisions, local vibes, and on-the-minute moments.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <Card title="Instant discovery" desc="Drop a pin to reveal what’s worth your time within your radius." />
            <Card title="Real-time value" desc="Catch spontaneous deals, events, and pop-ups when they’re actually happening." />
            <Card title="Get help fast" desc="From towing to lessons — request services right where you are." />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center" style={{ color: "var(--text-secondary)" }}>
            How it works
          </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
            <Step n={1} title="Drop a pin" desc="Mark your current spot or any place you care about." />
            <Step n={2} title="See what’s nearby" desc="Restaurants, events, services, deals — all in one feed." />
            <Step n={3} title="Act in seconds" desc="Call, navigate, book, or redeem — straight from PinHero." />
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section id="join" className="py-16" style={{ backgroundColor: "#FFF7EC" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold" style={{ color: "var(--text-secondary)" }}>
            Be first in line
          </h3>
          <p className="mt-2">Join the waitlist and get early access when we open the gates in your city.</p>
          <div className="mt-6">
            <SignupInline />
          </div>
          <p className="text-xs mt-3">We’ll prioritise early signups in Johannesburg.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center" style={{ color: "var(--text-secondary)" }}>
            FAQ
          </h2>
          <div className="mt-10 grid gap-4">
            <Faq q="Is the app free for users?" a="Yes. PinHero will be free for consumers at launch." />
            <Faq q="When are you launching?" a="We’re rolling out city by city. Johannesburg first, with other metros to follow." />
            <Faq q="Can businesses sign up too?" a="Absolutely. Use the Business toggle above to register your interest and get partner updates." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white" style={{ backgroundColor: "var(--text-secondary)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl grid place-items-center" style={{ backgroundColor: "var(--brand-warning)" }}>
                <span className="font-black" style={{ color: "var(--text-secondary)" }}>
                  P
                </span>
              </div>
              <span className="font-extrabold tracking-tight">PinHero</span>
            </div>
            <p className="text-sm mt-3">Local discovery, on-the-minute. © {new Date().getFullYear()} PinHero.</p>
          </div>
          <div className="justify-self-end text-sm space-x-5">
            <a href="#" className="opacity-90 hover:opacity-100">
              Privacy
            </a>
            <a href="#" className="opacity-90 hover:opacity-100">
              Terms
            </a>
            <a href="#" className="opacity-90 hover:opacity-100">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function SignupCard({ audience }: { audience: "users" | "businesses" }) {
  const borderStyle = { borderColor: "var(--border)" };

  if (audience === "users") {
    return (
      <div className="mt-6 p-4 bg-white/70 backdrop-blur rounded-2xl border shadow-sm max-w-lg" style={borderStyle}>
        <h3 className="font-semibold" style={{ color: "var(--text-secondary)" }}>Join the user waitlist</h3>
        <p className="text-sm mb-3">Get early access and perks when PinHero goes live.</p>

        {/* USERS FORM */}
        <form action="/api/join" method="POST" className="grid gap-2">
          {/* required by server */}
          <input type="hidden" name="audience" value="users" />
          {/* optional honeypot (keeps bots out) */}
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" />

          <input
            className="border rounded-xl px-3 py-3"
            placeholder="Email address"
            type="email"
            name="email"
            required
            style={borderStyle}
          />
          <input
            className="border rounded-xl px-3 py-3"
            placeholder="City (e.g., Johannesburg)"
            name="city"
            style={borderStyle}
          />
          <textarea
            className="border rounded-xl px-3 py-3 text-sm"
            placeholder="What kind of places or experiences would you love to discover with PinHero? (Optional)"
            name="discover"
            rows={2}
            style={borderStyle}
          />
          <textarea
            className="border rounded-xl px-3 py-3 text-sm"
            placeholder="What would make PinHero most valuable for you? (Optional)"
            name="value"
            rows={2}
            style={borderStyle}
          />
          <button type="submit" className="px-5 py-3 rounded-xl text-white hover:opacity-95" style={{ backgroundColor: "var(--brand-primary)" }}>
            Join
          </button>
        </form>
      </div>
    );
  }

  // audience === "businesses"
  return (
    <div className="mt-6 p-4 bg-white/70 backdrop-blur rounded-2xl border shadow-sm max-w-lg" style={borderStyle}>
      <h3 className="font-semibold" style={{ color: "var(--text-secondary)" }}>Register business interest</h3>
      <p className="text-sm mb-3">Be first to unlock on-the-minute reach to nearby customers.</p>

      {/* BUSINESSES FORM */}
      <form action="/api/join" method="POST" className="grid gap-2">
        {/* required by server */}
        <input type="hidden" name="audience" value="businesses" />
        {/* optional honeypot */}
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" />

        <input
          className="border rounded-xl px-3 py-3"
          placeholder="Work email"
          type="email"
          name="email"
          required
          style={borderStyle}
        />
        <input
          className="border rounded-xl px-3 py-3"
          placeholder="Business name"
          name="businessName" /* not stored server-side yet, fine to keep */
          style={borderStyle}
        />
        <input
          className="border rounded-xl px-3 py-3"
          placeholder="City (e.g., Johannesburg)"
          name="city"
          style={borderStyle}
        />
        <textarea
          className="border rounded-xl px-3 py-3 text-sm"
          placeholder="What would you hope PinHero brings to your business? (Optional)"
          name="hope"
          rows={2}
          style={borderStyle}
        />
        <textarea
          className="border rounded-xl px-3 py-3 text-sm"
          placeholder="What’s your biggest challenge in attracting nearby customers? (Optional)"
          name="challenge"
          rows={2}
          style={borderStyle}
        />
        <button type="submit" className="px-5 py-3 rounded-xl text-white hover:opacity-95" style={{ backgroundColor: "var(--brand-primary)" }}>
          Join Partner List
        </button>
      </form>
    </div>
  );
}

function SignupInline() {
  // Treat inline as a simple "users" capture by default
  return (
    <form action="/api/join" method="POST" className="grid md:grid-cols-[1fr_auto] gap-3 max-w-xl mx-auto">
      <input type="hidden" name="audience" value="users" />
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" />

      <input
        type="email"
        name="email"
        required
        className="border rounded-xl px-4 py-3"
        placeholder="Your email"
        style={{ borderColor: "var(--border)" }}
      />
      <button className="px-6 py-3 rounded-xl text-white hover:opacity-95" style={{ backgroundColor: "var(--brand-primary)" }}>
        Join the Waitlist
      </button>
    </form>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-2xl py-6 border" style={{ borderColor: "var(--border)" }}>
      <div className="text-2xl font-extrabold" style={{ color: "var(--text-secondary)" }}>
        {kpi}
      </div>
      <div className="text-xs mt-1 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: "#FFFFFF", borderColor: "var(--border)" }}>
      <h3 className="font-semibold text-lg" style={{ color: "var(--text-secondary)" }}>
        {title}
      </h3>
      <p className="mt-2 text-sm">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl border shadow-sm" style={{ backgroundColor: "#FFFFFF", borderColor: "var(--border)" }}>
      <div className="text-4xl font-extrabold" style={{ color: "var(--brand-warning)" }}>
        {n}
      </div>
      <h4 className="font-semibold mt-2" style={{ color: "var(--text-secondary)" }}>
        {title}
      </h4>
      <p className="text-sm mt-1">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-2xl border p-4" style={{ backgroundColor: "#FFFFFF", borderColor: "var(--border)" }}>
      <summary className="cursor-pointer font-medium" style={{ color: "var(--text-secondary)" }}>
        {q}
      </summary>
      <p className="text-sm mt-2">{a}</p>
    </details>
  );
}
