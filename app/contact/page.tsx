import Link from "next/link";
import "../landing.css";
import "../privacy/legal.css";

export default function ContactPage() {
  return (
    <div className="legal-page">
      <nav className="container topbar">
        <Link href="/" className="brand">
          <div className="brand-mark">P</div>
          <span className="brand-name">PinHero</span>
        </Link>
        <div className="nav-links">
          <Link href="/#how">How it works</Link>
          <Link href="/#benefits">Benefits</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#join" className="button primary sm">Join Waitlist</Link>
        </div>
      </nav>

      <main className="legal-content">
        <div className="container">
          <h1>Contact Us</h1>
          <p className="lead">
            Have questions about PinHero? Want to learn more about our waitlist or partner program? We'd love to hear from you.
          </p>

          <section className="contact-info">
            <div className="contact-card">
              <h2>Get in Touch</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <a href="tel:+27784944688" className="contact-link">+27 78 494 4688</a>
                  <div className="contact-actions">
                    <a href="tel:+27784944688" className="contact-action">Call</a>
                    <a 
                      href="https://wa.me/27784944688" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-action"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              <p className="contact-note">
                We're currently in development and launching first in Johannesburg. Feel free to reach out with any questions about early access or partnerships.
              </p>
            </div>
          </section>

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-section">
              <div className="faq-item">
                <h3>When will PinHero launch?</h3>
                <p>We're rolling out city by city, starting with Johannesburg. Join the waitlist to be notified when we launch in your area.</p>
              </div>
              <div className="faq-item">
                <h3>Can businesses sign up?</h3>
                <p>Absolutely! Use the "For Businesses" toggle on our homepage to register your interest and learn about our partner program.</p>
              </div>
              <div className="faq-item">
                <h3>How do I remove myself from the waitlist?</h3>
                <p>Contact us using the information above, and we'll remove your information from our waitlist promptly.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

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
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

