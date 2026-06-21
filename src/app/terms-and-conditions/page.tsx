import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <main className="legal-page">
      <section className="legal-panel glass-card">
        <Link className="legal-back" href="/#contact-us">
          Back to Sky Skrabers
        </Link>
        <p className="eyebrow">Terms</p>
        <h1>Terms & Conditions</h1>
        <p>
          By using this website or contacting Sky Skrabers through it, you agree to these terms. The website is intended
          to provide general information about our services, projects, and enquiries.
        </p>
        <h2>Website Information</h2>
        <p>
          Project descriptions, visuals, availability, pricing, specifications, and timelines are indicative and may be
          updated or changed without prior notice. Final details should be confirmed directly with Sky Skrabers.
        </p>
        <h2>Enquiries And Communication</h2>
        <p>
          Submitting an enquiry does not create a binding agreement. Any transaction, consultation, construction work, or
          property-related engagement will be governed by separate written terms agreed between the parties.
        </p>
        <h2>Intellectual Property</h2>
        <p>
          Website content, branding, images, layout, and copy belong to Sky Skrabers or their respective owners and may
          not be copied, republished, or used commercially without permission.
        </p>
        <h2>Contact</h2>
        <p>
          For questions about these terms, contact Sky Skrabers at <a href="tel:+919999997327">+91 99999 97327</a> or{" "}
          <a href="mailto:hello@skyskrabers.com">hello@skyskrabers.com</a>.
        </p>
      </section>
    </main>
  );
}
