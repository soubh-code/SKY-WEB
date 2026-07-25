import { RouteLoadingLink } from "@/components/RouteLoadingLink";
import { business } from "@/lib/business";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <section className="legal-panel glass-card">
        <RouteLoadingLink className="legal-back" href="/contact-us" pageTitle="Contact Us">
          Back to Sky Skrabers
        </RouteLoadingLink>
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
          For privacy-related questions, contact Sky Skrabers at <a href={business.phoneHref}>{business.phoneDisplay}</a> or{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>.
        </p>
      </section>
    </main>
  );
}
