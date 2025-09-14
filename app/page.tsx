"use client";
import { useState } from "react";
import "./landing.css"; // classes defined above

export default function LandingPage() {
  const [audience, setAudience] = useState<"users" | "businesses">("users");

  return (
    <div>
      {/* Top Bar */}
      <nav className="container topbar">
        <div className="brand">
          <div className="brand-mark">P</div>
          <span className="brand-name">PinHero</span>
        </div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#benefits">Benefits</a>
          <a href="#faq">FAQ</a>
          <a href="#join" className="button primary sm">Join Waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-gradient" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Launching first in Johannesburg</p>
            <h1 className="title">What’s happening around you — right now</h1>
            <p className="lead">
              PinHero is a live, people-powered feed of pop-ups, flash deals, events, and nearby help.
              Drop a pin and act in seconds — no planning, no endless searching.
            </p>

            {/* Audience Switcher */}
            <div className="switcher">
              <button
                className={`pill ${audience === "users" ? "active" : ""}`}
                onClick={() => setAudience("users")}
                type="button"
              >
                I’m a user
              </button>
              <button
                className={`pill ${audience === "businesses" ? "active" : ""}`}
                onClick={() => setAudience("businesses")}
                type="button"
              >
                I’m a business
              </button>
            </div>

            <SignupCard audience={audience} />
            <div className="trust">No spam. Unsubscribe anytime. We’ll email when early access opens.</div>
          </div>

          <div className="device">
            <div className="phone">
              <div className="notch" />
              <div className="screen">
                <div className="screen-placeholder">App preview / GIF</div>
              </div>
            </div>
            <p className="muted center">Visuals are placeholders for now</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="section">
        <div className="container stats">
          <Stat kpi="2,000+" label="pins dropped in testing" />
          <Stat kpi="50+" label="businesses expressed interest" />
          <Stat kpi="<10s" label="time to discover nearby" />
          <Stat kpi="1 app" label="to find, decide & act" />
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="section alt">
        <div className="container">
          <h2 className="h2">Why you’ll love PinHero</h2>
          <p className="center muted">
            Built for real life — quick decisions, local vibes, and on-the-minute moments.
          </p>
          <div className="cards">
            <Card title="Instant discovery" desc="Drop a pin to reveal what’s worth your time within your radius." />
            <Card title="Real-time value" desc="Catch spontaneous deals, events, and pop-ups when they’re actually happening." />
            <Card title="Get help fast" desc="From towing to music lessons — request services right where you are." />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="container">
          <h2 className="h2">How it works</h2>
          <div className="steps">
            <Step n={1} title="Drop a pin" desc="Mark your current spot or any place you care about." />
            <Step n={2} title="See what’s nearby" desc="Restaurants, events, services, deals — all in one feed." />
            <Step n={3} title="Act in seconds" desc="Call, navigate, book, or redeem — straight from PinHero." />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="section alt">
        <div className="container center">
          <h3 className="h3">Be first in line</h3>
          <p className="muted">Join the waitlist and get early access when we open the gates in your city.</p>
          <SignupInline />
          <p className="tiny muted">We’ll prioritise early signups in Johannesburg.</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="h2">FAQ</h2>
          <div className="faqs">
            <Faq q="Is the app free for users?" a="Yes. PinHero will be free for consumers at launch." />
            <Faq q="When are you launching?" a="We’re rolling out city by city. Johannesburg first, with other metros to follow." />
            <Faq q="Can businesses sign up too?" a="Absolutely. Use the Business toggle above to register your interest and get partner updates." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand">
              <div className="brand-mark">P</div>
              <span className="brand-name">PinHero</span>
            </div>
            <p className="tiny muted">Local discovery, on-the-minute. © {new Date().getFullYear()} PinHero.</p>
          </div>
          <div className="links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function SignupCard({ audience }: { audience: "users" | "businesses" }) {
  if (audience === "users") {
    return (
      <div className="card">
        <h3 className="h4">Join the user waitlist</h3>
        <p className="tiny muted">Get early access and perks when PinHero goes live.</p>

        {/* USERS FORM (posts to your /api/join) */}
        <form action="/api/join" method="POST" className="form">
          <input type="hidden" name="audience" value="users" />
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" style={{display:'none'}} />
          <input className="input" placeholder="Email address" type="email" name="email" required />
          <input className="input" placeholder="City (e.g., Johannesburg)" name="city" />
          <textarea className="input" placeholder="What would you love to discover with PinHero? (Optional)" name="discover" rows={2} />
          <textarea className="input" placeholder="What would make PinHero most valuable for you? (Optional)" name="value" rows={2} />
          <button type="submit" className="button primary">Join</button>
        </form>
      </div>
    );
  }

  // Businesses
  return (
    <div className="card">
      <h3 className="h4">Register business interest</h3>
      <p className="tiny muted">Be first to unlock on-the-minute reach to nearby customers.</p>

      <form action="/api/join" method="POST" className="form">
        <input type="hidden" name="audience" value="businesses" />
        <input type="text" name="_hp" tabIndex={-1} autoComplete="off" style={{display:'none'}} />
        <input className="input" placeholder="Work email" type="email" name="email" required />
        <input className="input" placeholder="Business name" name="businessName" />
        <input className="input" placeholder="City (e.g., Johannesburg)" name="city" />
        <textarea className="input" placeholder="What would you hope PinHero brings to your business? (Optional)" name="hope" rows={2} />
        <textarea className="input" placeholder="What’s your biggest challenge in attracting nearby customers? (Optional)" name="challenge" rows={2} />
        <button type="submit" className="button primary">Join Partner List</button>
      </form>
    </div>
  );
}

function SignupInline() {
  return (
    <form action="/api/join" method="POST" className="inline-form">
      <input type="hidden" name="audience" value="users" />
      <input type="text" name="_hp" tabIndex={-1} autoComplete="off" style={{display:'none'}} />
      <input className="input" type="email" name="email" required placeholder="Your email" />
      <button className="button primary">Join the Waitlist</button>
    </form>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="stat">
      <div className="stat-kpi">{kpi}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="card">
      <h3 className="h4">{title}</h3>
      <p className="muted">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="card">
      <div className="step-n">{n}</div>
      <h4 className="h4">{title}</h4>
      <p className="muted">{desc}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq">
      <summary className="faq-q">{q}</summary>
      <p className="muted">{a}</p>
    </details>
  );
}
