export type SiteReview = {
  id: string;
  name: string;
  role: string;
  text: string;
  service: string;
  visible: boolean;
};

export type SiteService = {
  id: string;
  title: string;
  description: string;
  cta: string;
  includes: string[];
};

export type SiteFaqItem = {
  id: string;
  question: string;
  answer: string;
  visible: boolean;
};

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "p_vk"; before: string; linkLabel: string; after?: string }
  | {
      type: "related";
      before: string;
      links: { href: string; label: string }[];
      middle?: string;
      linksAfter?: { href: string; label: string }[];
      after?: string;
    }
  | { type: "contact"; lines: string[] };

export type LegalPageContent = {
  title: string;
  blocks: LegalBlock[];
};

export type SiteLegal = {
  operator: {
    brand: string;
    fullName: string;
    status: string;
    siteUrl: string;
    vkProfile: string;
    vkCommunity: string;
    vkReviews: string;
  };
  privacy: LegalPageContent;
  consent: LegalPageContent;
  offer: LegalPageContent & { publishedAt: string };
};

export type SiteContent = {
  brand: {
    siteName: string;
    siteTagline: string;
    footerDescription: string;
    vkProfileUrl: string;
    vkCommunityUrl: string;
    vkReviewsUrl: string;
  };
  hero: {
    eyebrow: string;
    titleMain: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    note: string;
    trustMarkers: string[];
    specialistName: string;
    specialistRoles: string;
    specialistExperience: string;
    specialistPhoto: string;
  };
  intro: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    extraParagraph: string;
    skills: string[];
    photo: string;
    badgeValue: string;
    badgeLabel: string;
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: SiteService[];
  };
  reviews: {
    title: string;
    subtitle: string;
    items: SiteReview[];
  };
  images: {
    backgroundPhoto: string;
  };
  faq: {
    title: string;
    items: SiteFaqItem[];
  };
  portfolio: {
    featured: {
      label: string;
      title: string;
      subtitle: string;
      ctaLabel: string;
    };
    page: {
      label: string;
      title: string;
      subtitle: string;
    };
  };
  legal: SiteLegal;
};
