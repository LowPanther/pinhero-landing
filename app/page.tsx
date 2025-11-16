"use client";
import { useState, useEffect } from "react";
import "./landing.css"; // classes defined above

// Content mapping for different audiences
const content = {
  users: {
    hero: {
      eyebrow: "Launching first in Johannesburg",
      title: "What's happening around you — right now",
      lead: "Hopskip helps you uncover local spots, on-the-minute events, and deals. Share your own discoveries and see what others around you recommend."
    },
    stats: [
      { kpi: "Real-time", label: "local discovery" },
      { kpi: "On-the-minute", label: "updates & deals" },
      { kpi: "Free", label: "forever for users" },
      { kpi: "1 app", label: "to find, decide & act" }
    ],
    benefits: {
      title: "Why you'll love Hopskip",
      subtitle: "Built for real life — quick decisions, local vibes, and on-the-minute moments.",
      cards: [
        { title: "Instant discovery", desc: "Open the app and your feed updates automatically with what's happening around you right now." },
        { title: "Real-time value", desc: "Catch spontaneous deals, events, and pop-ups when they're actually happening." },
        { title: "Discover with friends", desc: "Connect with friends and see what they're discovering nearby — make plans together in real-time." }
      ]
    },
    howItWorks: {
      title: "How it works",
      steps: [
        { title: "Open the app", desc: "Your location is automatically detected and your feed updates with nearby happenings." },
        { title: "Browse your feed", desc: "Restaurants, events, deals, and more — all curated by proximity and time." },
        { title: "Act in seconds", desc: "Call, navigate, book, or redeem — straight from Hopskip." }
      ]
    },
    cta: {
      title: "Be first in line",
      subtitle: "Join the waitlist and get early access when we open the gates in your city.",
      note: "We'll prioritise early signups in Johannesburg."
    },
    faqs: [
      { q: "Is the app free for users?", a: "Yes. Hopskip will be free for consumers at launch." },
      { q: "When are you launching?", a: "We're rolling out city by city. Johannesburg first, with other metros to follow." },
      { q: "Can businesses sign up too?", a: "Absolutely. Use the Business toggle above to register your interest and get partner updates." }
    ]
  },
  businesses: {
    hero: {
      eyebrow: "Launching first in Johannesburg",
      title: "Reach nearby customers — on the minute",
      lead: "Hopskip helps businesses connect with customers who are actively looking right now. Show up when it matters most — when they're nearby and ready to act."
    },
    stats: [
      { kpi: "Real-time", label: "customer discovery" },
      { kpi: "On-demand", label: "local reach" },
      { kpi: "Launching", label: "in Johannesburg" },
      { kpi: "Early access", label: "for partners" }
    ],
    benefits: {
      title: "Why businesses love Hopskip",
      subtitle: "Built for real-time customer connection — reach people when they're nearby and ready to engage.",
      cards: [
        { title: "Instant visibility", desc: "Show up in nearby customers' feeds automatically when they open the app — no ads needed." },
        { title: "On-the-minute promotions", desc: "Post flash deals and events that appear to customers right when they're looking nearby." },
        { title: "Targeted reach", desc: "Connect with customers who are actively searching in your area — higher intent, better conversions." }
      ]
    },
    howItWorks: {
      title: "How it works",
      steps: [
        { title: "List your business", desc: "Add your business to Hopskip and set your location, hours, and offerings." },
        { title: "Customers discover you", desc: "When customers open the app nearby, your business appears in their feed automatically." },
        { title: "They act immediately", desc: "Customers can call, navigate, book, or redeem offers — straight from the app." }
      ]
    },
    cta: {
      title: "Join the partner program",
      subtitle: "Get early access to Hopskip's business platform and start reaching nearby customers.",
      note: "We'll prioritise early signups in Johannesburg."
    },
    faqs: [
      { q: "How much does it cost?", a: "Pricing details will be shared with early partners. Contact us to learn more." },
      { q: "When can I start using it?", a: "We're rolling out city by city. Johannesburg first, with other metros to follow." },
      { q: "What types of businesses can join?", a: "Any local business — restaurants, shops, services, events, and more. If you serve customers nearby, Hopskip can help." }
    ]
  }
};

export default function LandingPage() {
  const [audience, setAudience] = useState<"users" | "businesses">("users");
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check localStorage on mount and show modal if no choice exists
  useEffect(() => {
    const savedAudience = localStorage.getItem("hopskip-audience") as "users" | "businesses" | null;
    if (savedAudience) {
      setAudience(savedAudience);
    } else {
      setShowModal(true);
    }
  }, []);

  const handleAudienceSelect = (selected: "users" | "businesses") => {
    setAudience(selected);
    localStorage.setItem("hopskip-audience", selected);
    setShowModal(false);
  };

  const handleAudienceChange = (newAudience: "users" | "businesses") => {
    setAudience(newAudience);
    localStorage.setItem("hopskip-audience", newAudience);
  };

  const currentContent = content[audience];

  return (
    <div>
      {/* Audience Selection Modal */}
      {showModal && (
        <AudienceModal onSelect={handleAudienceSelect} />
      )}

      {/* Top Bar */}
      <nav className="container topbar">
        <div className="brand">
          <img src="/hopskip-logo.png" alt="Hopskip" className="brand-logo" />
          <span className="brand-name">Hopskip</span>
        </div>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          aria-label="Toggle menu"
        >
          <span className={mobileMenuOpen ? "open" : ""}></span>
          <span className={mobileMenuOpen ? "open" : ""}></span>
          <span className={mobileMenuOpen ? "open" : ""}></span>
        </button>
        <div className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <a href="#how" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#benefits" onClick={() => setMobileMenuOpen(false)}>Benefits</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <div className="audience-switcher-nav">
            <button
              className={audience === "users" ? "active" : ""}
              onClick={() => handleAudienceChange("users")}
              type="button"
            >
              For Users
            </button>
            <button
              className={audience === "businesses" ? "active" : ""}
              onClick={() => handleAudienceChange("businesses")}
              type="button"
            >
              For Businesses
            </button>
          </div>
          <a href="#join" className="button primary sm" onClick={() => setMobileMenuOpen(false)}>Join Waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-gradient" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{currentContent.hero.eyebrow}</p>
            <h1 className="title">{currentContent.hero.title}</h1>
            <p className="lead">{currentContent.hero.lead}</p>

            {/* Mobile audience switcher - visible on mobile, hidden on desktop */}
            <div className="audience-switcher-mobile">
              <button
                className={`pill ${audience === "users" ? "active" : ""}`}
                onClick={() => handleAudienceChange("users")}
                type="button"
              >
                I'm a user
              </button>
              <button
                className={`pill ${audience === "businesses" ? "active" : ""}`}
                onClick={() => handleAudienceChange("businesses")}
                type="button"
              >
                I'm a business
              </button>
            </div>

            <SignupCard audience={audience} />
            <div className="trust">No spam. Unsubscribe anytime. We'll email when early access opens.</div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="section">
        <div className="container stats">
          {currentContent.stats.map((stat, i) => (
            <Stat key={i} kpi={stat.kpi} label={stat.label} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="section alt">
        <div className="container">
          <h2 className="h2">{currentContent.benefits.title}</h2>
          <p className="center muted">{currentContent.benefits.subtitle}</p>
          <div className="cards">
            {currentContent.benefits.cards.map((card, i) => (
              <Card key={i} title={card.title} desc={card.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="section">
        <div className="container">
          <h2 className="h2">{currentContent.howItWorks.title}</h2>
          <div className="steps">
            {currentContent.howItWorks.steps.map((step, i) => (
              <Step key={i} n={i + 1} title={step.title} desc={step.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="section alt">
        <div className="container center">
          <h3 className="h3">{currentContent.cta.title}</h3>
          <p className="muted">{currentContent.cta.subtitle}</p>
          <button 
            className="button primary"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
                if (emailInput) {
                  emailInput.focus();
                }
              }, 500);
            }}
            type="button"
          >
            {audience === "users" ? "Join the Waitlist" : "Join Partner List"}
          </button>
          <p className="tiny muted">{currentContent.cta.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <h2 className="h2">FAQ</h2>
          <div className="faqs">
            {currentContent.faqs.map((faq, i) => (
              <Faq key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/hopskip-logo.png" alt="Hopskip" className="brand-logo" />
            <p className="tiny muted">Local discovery, on-the-minute. © {new Date().getFullYear()} Hopskip.</p>
          </div>
          <div className="links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Contact</a>
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
        <p className="tiny muted">Get early access and perks when Hopskip goes live.</p>

        {/* USERS FORM (posts to your /api/join) */}
        <form action="/api/join" method="POST" className="form">
          <input type="hidden" name="audience" value="users" />
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" style={{display:'none'}} />
          <input className="input" placeholder="Email address" type="email" name="email" required />
          <input className="input" placeholder="City (e.g., Johannesburg)" name="city" />
          <textarea className="input" placeholder="What would you love to discover with Hopskip? (Optional)" name="discover" rows={2} />
          <textarea className="input" placeholder="What would make Hopskip most valuable for you? (Optional)" name="value" rows={2} />
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
        <textarea className="input" placeholder="What would you hope Hopskip brings to your business? (Optional)" name="hope" rows={2} />
        <textarea className="input" placeholder="What’s your biggest challenge in attracting nearby customers? (Optional)" name="challenge" rows={2} />
        <button type="submit" className="button primary">Join Partner List</button>
      </form>
    </div>
  );
}


function AudienceModal({ onSelect }: { onSelect: (audience: "users" | "businesses") => void }) {
  const [selected, setSelected] = useState<"users" | "businesses" | null>(null);

  return (
    <div className="audience-modal" onClick={() => onSelect(selected || "users")}>
      <div className="audience-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Welcome to Hopskip</h2>
        <p>Are you here as a user or a business?</p>
        <div className="audience-options">
          <div
            className={`audience-option ${selected === "users" ? "selected" : ""}`}
            onClick={() => setSelected("users")}
          >
            <h3>I'm a user</h3>
            <p>I want to discover local spots, events, and deals happening around me right now.</p>
          </div>
          <div
            className={`audience-option ${selected === "businesses" ? "selected" : ""}`}
            onClick={() => setSelected("businesses")}
          >
            <h3>I'm a business</h3>
            <p>I want to reach nearby customers and show up when they're actively looking.</p>
          </div>
        </div>
        <button
          className="button primary"
          style={{ marginTop: "24px", width: "100%" }}
          onClick={() => onSelect(selected || "users")}
        >
          Continue
        </button>
      </div>
    </div>
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
