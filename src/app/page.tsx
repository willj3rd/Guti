import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  Introduction,
  Services,
  About,
  Reviews,
  ServiceArea,
  Contact,
  Footer,
} from "@/components/Sections";
import { Work } from "@/components/Work";
import { company } from "@/data/company";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: "Lawn care, landscaping, and property maintenance.",
    telephone: company.contacts[0].telephone,
    ...(company.siteUrl ? { url: company.siteUrl } : {}),
    ...(company.email ? { email: company.email } : {}),
    ...(company.serviceArea ? { areaServed: company.serviceArea } : {}),
  };
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Introduction />
        <Services />
        <Work />
        <About />
        <Reviews />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
