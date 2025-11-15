import Link from "next/link";
import "../landing.css";
import "../privacy/legal.css";

export default function TermsPage() {
  return (
    <div className="legal-page">
      <nav className="container topbar">
        <Link href="/" className="brand">
          <div className="brand-mark">H</div>
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
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Hopskip website and joining our waitlist, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>
              Hopskip is a local discovery platform currently in development. This website serves as a landing page to collect interest and build a waitlist for early access to the Hopskip application when it launches.
            </p>
          </section>

          <section>
            <h2>3. Waitlist Registration</h2>
            <p>By joining our waitlist, you agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your information to keep it accurate</li>
              <li>Not use the waitlist for any unlawful purpose</li>
              <li>Not submit false, misleading, or fraudulent information</li>
            </ul>
          </section>

          <section>
            <h2>4. No Guarantee of Access</h2>
            <p>
              Joining the waitlist does not guarantee access to Hopskip when it launches. Early access will be granted at our sole discretion, and we reserve the right to prioritize certain users or locations. We are under no obligation to provide access to all waitlist members.
            </p>
          </section>

          <section>
            <h2>5. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website in any way that violates any applicable law or regulation</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Use automated systems to submit multiple waitlist entries</li>
            </ul>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, and software, is the property of Hopskip or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
            </p>
          </section>

          <section>
            <h2>7. Disclaimer of Warranties</h2>
            <p>
              This website and service are provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the website will be uninterrupted, secure, or error-free, or that any defects will be corrected.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Hopskip shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of this website.
            </p>
          </section>

          <section>
            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Hopskip and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of or relating to your use of the website or violation of these Terms.
            </p>
          </section>

          <section>
            <h2>10. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the updated terms on this page and updating the "Last updated" date. Your continued use of the website after such changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2>11. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the waitlist at any time, without prior notice, for any reason, including if you breach these Terms of Service.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of South Africa.
            </p>
          </section>

          <section>
            <h2>13. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2>14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us:
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
          <div>
            <div className="brand">
              <div className="brand-mark">H</div>
              <span className="brand-name">Hopskip</span>
            </div>
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

