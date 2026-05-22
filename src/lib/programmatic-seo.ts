import programmaticSeoData from "@/data/programmatic-seo.json";

export type ProgrammaticSeoBenefit = {
  title: string;
  description: string;
};

export type ProgrammaticSeoSection = {
  title: string;
  body: string;
};

export type ProgrammaticSeoFaq = {
  question: string;
  answer: string;
};

export type ProgrammaticSeoPage = {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords: string[];
  serviceTypes: string[];
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  audience: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  benefits: ProgrammaticSeoBenefit[];
  sections: ProgrammaticSeoSection[];
  faqs: ProgrammaticSeoFaq[];
  relatedSlugs: string[];
};

export const serviceSeoPages =
  programmaticSeoData.servicePages as ProgrammaticSeoPage[];

export function getServiceSeoPage(slug: string) {
  return serviceSeoPages.find((page) => page.slug === slug);
}

export function getRelatedServiceSeoPages(page: ProgrammaticSeoPage) {
  return page.relatedSlugs
    .map((slug) => getServiceSeoPage(slug))
    .filter((item): item is ProgrammaticSeoPage => Boolean(item));
}
