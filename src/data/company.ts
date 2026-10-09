export type Project = {
  id: string;
  title: string;
  location?: string;
  description: string;
  workPerformed: string[];
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export type Review = { name: string; quote: string; source?: string };

// Publish only verified information. Empty optional values stay hidden.
export const company = {
  name: "Gutiérrez Landscaping & More",
  slogan: "Your Property. Our Pride.",
  email: null as string | null,
  serviceArea: null as string | null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  logo: "/media/gutierrez-crest.webp",
  hero: {
    image: "/media/hero-lawn.webp",
    mobileImage: "/media/hero-lawn-mobile.webp",
    // Enable after placing the approved, optimized video in public/media.
    video: null as string | null, // "/media/hero-lawn.mp4"
    illustrative: true,
  },
  contacts: [
    {
      name: "Darwin Gutierrez",
      firstName: "Darwin",
      phone: "(443) 856-3448",
      telephone: "+14438563448",
      role: "Your primary contact",
    },
    {
      name: "Will",
      firstName: "Will",
      phone: "(410) 892-0177",
      telephone: "+14108920177",
      role: "Here to help",
    },
  ],
  services: [
    {
      id: "lawn-care",
      name: "Lawn Care",
      description:
        "A well-kept lawn makes all the difference. Dependable care for a clean, fresh finish.",
      detail: "Clean cuts. Sharp edges.",
      icon: "grass" as const,
    },
    {
      id: "landscaping",
      name: "Landscaping",
      description:
        "Thoughtful attention to your outdoor space, with pride in every detail.",
      detail: "A space worth coming home to.",
      icon: "landscape" as const,
    },
    {
      id: "property-maintenance",
      name: "Property Maintenance",
      description:
        "Keep your property looking cared for, so you can spend more time enjoying it.",
      detail: "Less on your list. More to enjoy.",
      icon: "home" as const,
    },
  ],
  projects: [] as Project[],
  reviews: [] as Review[],
  socialLinks: [] as { label: string; url: string }[],
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#our-work" },
  { label: "About", href: "#about" },
  ...(company.reviews.length ? [{ label: "Reviews", href: "#reviews" }] : []),
  { label: "Contact", href: "#contact" },
];
