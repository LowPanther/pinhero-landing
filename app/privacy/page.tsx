import Link from "next/link";
import "../landing.css";
import "./legal.css";

export default function PrivacyPage() {
  return (
    <div className="legal-page">
      <nav className="container topbar">
        <Link href="/" className="brand">
          <img src="/hopskip-logo.png" alt="Hopskip" className="brand-logo" />
          <span className="brand-name">Hopskip</span>
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
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Hopskip ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and join our waitlist.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>When you join our waitlist, we may collect the following information:</p>
            <ul>
              <li><strong>Email address</strong> - Required to notify you when Hopskip launches in your area</li>
              <li><strong>City</strong> - Optional information to help us prioritize launch locations</li>
              <li><strong>Additional feedback</strong> - Optional responses to questions about your interests and needs</li>
              <li><strong>Technical information</strong> - Automatically collected data including IP address, browser type, and device information for security and analytics purposes</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Notify you when Hopskip launches in your city</li>
              <li>Prioritize launch locations based on interest</li>
              <li>Improve our service based on your feedback</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Storage and Security</h2>
            <p>
              Your information is stored securely using industry-standard security measures. We use Firebase (Google Cloud Platform) to store waitlist data. While we implement appropriate technical and organizational measures to protect your personal information, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>5. Data Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
            <ul>
              <li>With service providers who assist us in operating our website and conducting our business (e.g., hosting providers)</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer (e.g., merger or acquisition)</li>
            </ul>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> - Request a copy of the personal information we hold about you</li>
              <li><strong>Correction</strong> - Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion</strong> - Request deletion of your personal information</li>
              <li><strong>Withdrawal</strong> - Withdraw your consent and remove yourself from the waitlist at any time</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided in the Contact section.</p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. If you request deletion, we will remove your information within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              Our service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <p>
              <strong>Hopskip</strong><br />
              <a href="tel:+27784944688">+27 78 494 4688</a> | <a href="https://wa.me/27784944688" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </p>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/hopskip-logo.png" alt="Hopskip" className="brand-logo" />
            <p className="tiny muted">Local discovery, on-the-minute. © {new Date().getFullYear()} Hopskip.</p>
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

