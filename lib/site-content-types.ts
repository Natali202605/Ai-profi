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
};
