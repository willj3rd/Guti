import Link from "next/link";
import { company } from "@/data/company";

export const metadata = {
  title: `Privacy | ${company.name}`,
  ...(company.siteUrl ? { alternates: { canonical: "/privacy" } } : {}),
};

export default function Privacy() {
  return (
    <main id="main-content" className="privacy-page">
      <div className="container">
        <Link className="text-link" href="/">
          ← Back to the website
        </Link>
        <span className="eyebrow">Gutiérrez Landscaping & More</span>
        <h1>Your privacy.</h1>
        <p>
          This website helps you prepare an estimate request. Your form details
          stay in your browser until you choose to send them through your
          messaging app or copy them. The website does not save estimate
          requests to a database.
        </p>
        <p>
          If you send a text or call, the contact information and property
          details you share are used to discuss your request and provide
          service. Your messaging provider handles the text you send under its
          own privacy terms.
        </p>
        <p>
          No advertising trackers or analytics are installed. The hosting
          provider may keep standard technical access logs to operate and secure
          the website.
        </p>
        <p>
          Questions? Call Darwin at{" "}
          <a href={`tel:${company.contacts[0].telephone}`}>
            {company.contacts[0].phone}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
