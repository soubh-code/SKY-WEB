import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <section className="legal-panel glass-card">
        <Link className="legal-back" href="/#contact-us">
          Back to Sky Skrabers
        </Link>
        <p className="eyebrow">Privacy Policy</p>
        <h1>Privacy Policy</h1>
        <p>
          Sky Skrabers respects your privacy. This policy explains how we collect, use, and protect information shared
          through our website, phone calls, WhatsApp, email, and enquiry forms.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We may collect your name, phone number, email address, property requirement, message details, and any other
          information you voluntarily provide while contacting us.
        </p>
        <h2>How We Use Information</h2>
        <p>
          We use your information to respond to enquiries, schedule calls or site visits, share project details, improve
          our services, and maintain records related to customer communication.
        </p>
        <h2>Sharing And Security</h2>
        <p>
          We do not sell personal information. Information may be shared only with trusted service providers or advisors
          where required to respond to your request, operate the website, or comply with applicable law.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact Sky Skrabers at <a href="tel:+919999997327">+91 99999 97327</a> or{" "}
          <a href="mailto:hello@skyskrabers.com">hello@skyskrabers.com</a>.
        </p>
      </section>
    </main>
  );
}
