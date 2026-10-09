import Image from "next/image";
import { company, navigation } from "@/data/company";
import { Icon } from "./Icon";
import { Brand } from "./Brand";
import { EstimateForm } from "./EstimateForm";

export function Introduction() {
  return (
    <section id="introduction" className="introduction section-light">
      <div className="container intro-grid">
        <div>
          <div className="eyebrow">
            <span className="small-rule" />
            Pride in every property
          </div>
          <h2>
            Good work
            <br />
            shows<span className="green-period">.</span>
          </h2>
        </div>
        <div className="intro-copy">
          <p className="intro-lead">
            Clean cuts. Sharp edges.
            <br />A property you’re proud
            <br className="desktop-break" /> to come home to.
          </p>
          <p>
            At Gutiérrez Landscaping & More, we take care of the hard work with
            dependable lawn care, landscaping, and property maintenance. Because
            the details make the difference.
          </p>
          <a className="text-link" href="#about">
            Get to know Gutiérrez <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-top">
          <div>
            <div className="eyebrow">
              <span className="small-rule" />
              What we do
            </div>
            <h2 id="services-title">
              Care for the
              <br />
              whole property.
            </h2>
          </div>
          <p>
            One property. Every detail.
            <br />
            The care your outdoor space deserves.
          </p>
        </div>
        <div className="service-grid">
          {company.services.map((service, i) => (
            <article className="service-item" key={service.id}>
              <div className="service-top">
                <span className="service-number">0{i + 1}</span>
                <Icon name={service.icon} />
              </div>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <div className="service-bottom">
                <span>{service.detail}</span>
                <a
                  href="#contact"
                  aria-label={`Request a ${service.name.toLowerCase()} estimate`}
                >
                  <Icon name="arrow-up" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="services-foot">
          <span>
            <Icon name="clock" />
            Available seven days a week
          </span>
          <a href="#contact" className="text-link">
            Find the right care for your property <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-brand">
          <div className="eyebrow">A name we stand behind</div>
          <Image
            src={company.logo}
            alt="Gutiérrez Landscape & More crest with mountains, trees, a pathway, and green and red ribbon"
            width={540}
            height={410}
            loading="eager"
          />
          <div className="brand-caption">
            <span className="heritage-rule" />
            <span>Your property. Our pride.</span>
          </div>
        </div>
        <div className="about-copy">
          <div className="eyebrow">
            <span className="small-rule" />
            The people behind the work
          </div>
          <h2 id="about-title">
            Hard work.
            <br />
            Honest service.
            <br />
            <span>Quality results.</span>
          </h2>
          <p>
            Darwin Gutierrez and his team take care of your property the right
            way—so you can spend more time enjoying your home, your family, and
            your weekends.
          </p>
          <p>
            From lawn care to landscaping and property maintenance, we bring the
            same attention to detail to every job.
          </p>
          <ul className="values">
            {[
              "Reliable service",
              "Attention to detail",
              "Property care with pride",
              "Available 7 days a week",
            ].map((value) => (
              <li key={value}>
                <Icon name="check" />
                {value}
              </li>
            ))}
          </ul>
          <a
            className="text-link"
            href={`tel:${company.contacts[0].telephone}`}
          >
            Talk to Darwin <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  if (!company.reviews.length) return null;
  return (
    <section id="reviews" className="reviews section-light">
      <div className="container">
        <div className="eyebrow">
          <span className="small-rule" />
          From our customers
        </div>
        <h2>
          Words that mean
          <br />
          something to us.
        </h2>
        <div className="review-grid">
          {company.reviews.map((review) => (
            <figure key={`${review.name}-${review.quote}`}>
              <blockquote>“{review.quote}”</blockquote>
              <figcaption>
                {review.name}
                {review.source && <span>{review.source}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceArea() {
  return (
    <section className="service-area section-light" aria-label="Service area">
      <div className="container area-inner">
        <div className="area-icon">
          <Icon name="location" />
        </div>
        <div>
          <h3>{company.serviceArea || "Good care starts close to home."}</h3>
          <p>
            {company.serviceArea
              ? "Get in touch to discuss your property."
              : "Tell us where your property is. We’ll confirm service availability when we talk."}
          </p>
        </div>
        <a className="text-link" href="#contact">
          Let’s talk <Icon name="arrow-up" />
        </a>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="contact section-light"
      aria-labelledby="contact-title"
    >
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">
            <span className="small-rule" />
            Your next fresh start
          </div>
          <h2 id="contact-title">
            Ready to love
            <br />
            your yard
            <br />
            <span>again?</span>
          </h2>
          <p>
            Let’s give your property the care it deserves.
            <br />
            Get in touch for a free estimate.
          </p>
          <div className="contact-people">
            {company.contacts.map((contact) => (
              <a
                className="contact-person"
                key={contact.name}
                href={`tel:${contact.telephone}`}
              >
                <div>
                  <span className="contact-role">{contact.role}</span>
                  <h3>{contact.name}</h3>
                  <span className="contact-number">{contact.phone}</span>
                </div>
                <span className="contact-phone">
                  <Icon name="phone" />
                </span>
              </a>
            ))}
          </div>
          {company.email && (
            <a
              className="text-link company-email"
              href={`mailto:${company.email}`}
            >
              {company.email}
              <Icon name="arrow-up" />
            </a>
          )}
          <div className="contact-tagline">
            <span className="heritage-rule" />
            <p>
              Your Property.
              <br />
              Our Pride.
            </p>
          </div>
        </div>
        <EstimateForm />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>Good work speaks for itself.</p>
          </div>
          <div className="footer-nav">
            <span className="eyebrow">Explore</span>
            {navigation
              .filter((item) => item.label !== "Home")
              .map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
          </div>
          <div className="footer-contact">
            <span className="eyebrow">Let’s talk</span>
            {company.contacts.map((contact) => (
              <a href={`tel:${contact.telephone}`} key={contact.name}>
                {contact.firstName}
                <span>{contact.phone}</span>
              </a>
            ))}
            {company.serviceArea ? (
              <p>{company.serviceArea}</p>
            ) : (
              <p>Ask us about service in your area.</p>
            )}
            {company.socialLinks.map((link) => (
              <a
                href={link.url}
                key={link.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a className="footer-top" href="#home" aria-label="Back to top">
            <Icon name="arrow-up" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {company.name}
          </span>
          <span>Your Property. Our Pride.</span>
          <a href="/privacy">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
