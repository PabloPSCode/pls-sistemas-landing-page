import type { Metadata } from "next";

import { landingPageTitle } from "@/mocks/landing-page";

type OpenGraphPageType = "website" | "article";

type ImageMetadata = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type CreatePageMetadataParams = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: OpenGraphPageType;
  image?: ImageMetadata;
  publishedTime?: string;
  modifiedTime?: string;
};

type BreadcrumbSchemaItem = {
  name: string;
  path: string;
};

type WebPageSchemaParams = {
  name: string;
  description: string;
  path: string;
  type?: string;
};

type ServiceSchemaParams = {
  name: string;
  description: string;
  path: string;
  serviceTypes: string[];
};

export type PrimarySitePage = {
  name: string;
  path: string;
  description: string;
  keywords?: string[];
};

export const siteName = "PLS Sistemas";
export const siteOrigin = "https://www.plssistemas.com.br";
export const siteMetadataBase = new URL(siteOrigin);
export const siteLanguage = "pt-BR";
export const siteLocale = "pt_BR";
export const siteDescription =
  "PLS Sistemas é uma empresa de desenvolvimento de sistemas em João Monlevade - MG. Criamos sites, landing pages, soluções web e software sob medida para empresas.";
export const defaultOgImagePath = "/social-preview.png";
export const siteLogoPath = "/imgs/logo_pls_sistemas.png";
export const siteSocialProfiles = ["https://www.instagram.com/pls.sistemas"];
export const defaultSiteTitle = landingPageTitle;

export const primarySitePages: PrimarySitePage[] = [
  {
    name: "Início",
    path: "/",
    description:
      "Página inicial da PLS Sistemas com visão geral dos serviços, diferenciais e soluções digitais.",
    keywords: [
      "PLS Sistemas",
      "desenvolvimento de sistemas",
      "sites em João Monlevade",
      "landing pages",
    ],
  },
  {
    name: "Landing Pages e Websites",
    path: "/landing-pages",
    description:
      "Página dedicada à criação de landing pages e websites com SEO técnico, design responsivo e foco em conversão.",
    keywords: [
      "criação de landing pages",
      "criação de websites",
      "site profissional",
      "SEO técnico",
    ],
  },
  {
    name: "Blog",
    path: "/blog",
    description:
      "Conteúdos da PLS Sistemas sobre SEO, landing pages, automação, websites e estratégias digitais.",
    keywords: [
      "blog de SEO",
      "conteúdo sobre landing pages",
      "automação comercial",
      "estratégias digitais",
    ],
  },
  {
    name: "Política de Privacidade",
    path: "/politica-de-privacidade",
    description:
      "Página com a política de privacidade da PLS Sistemas e informações sobre tratamento de dados.",
    keywords: ["política de privacidade", "LGPD", "dados pessoais"],
  },
];

export function toAbsoluteUrl(path: string) {
  return new URL(path, siteOrigin).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
}: CreatePageMetadataParams): Metadata {
  const resolvedImage = image ?? {
    url: defaultOgImagePath,
    alt: title,
    width: 1200,
    height: 630,
  };
  const imageUrl = toAbsoluteUrl(resolvedImage.url);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: siteLocale,
      url: toAbsoluteUrl(path),
      siteName,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: resolvedImage.width ?? 1200,
          height: resolvedImage.height ?? 630,
          alt: resolvedImage.alt ?? title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteOrigin}#organization`,
    name: siteName,
    url: siteOrigin,
    logo: toAbsoluteUrl(siteLogoPath),
    image: toAbsoluteUrl(defaultOgImagePath),
    description: siteDescription,
    sameAs: siteSocialProfiles,
  };
}

export function createProfessionalServiceSchema(telephone?: string) {
  return cleanSchemaObject({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteOrigin}#professional-service`,
    name: siteName,
    url: siteOrigin,
    image: toAbsoluteUrl(defaultOgImagePath),
    logo: toAbsoluteUrl(siteLogoPath),
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: "João Monlevade",
      addressRegion: "MG",
      addressCountry: "BR",
    },
    areaServed: [
      {
        "@type": "City",
        name: "João Monlevade",
      },
      {
        "@type": "State",
        name: "Minas Gerais",
      },
      {
        "@type": "Country",
        name: "Brasil",
      },
    ],
    sameAs: siteSocialProfiles,
    taxID: "47.463.499/0001-37",
    serviceType: [
      "Desenvolvimento de sistemas",
      "Criação de sites",
      "Criação de landing pages",
      "Soluções web sob medida",
    ],
    parentOrganization: {
      "@id": `${siteOrigin}#organization`,
    },
    telephone,
    contactPoint: telephone
      ? [
          {
            "@type": "ContactPoint",
            telephone,
            contactType: "customer service",
            areaServed: "BR",
            availableLanguage: [siteLanguage],
          },
        ]
      : undefined,
  });
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin}#website`,
    name: siteName,
    url: siteOrigin,
    inLanguage: siteLanguage,
    publisher: {
      "@id": `${siteOrigin}#organization`,
    },
    hasPart: primarySitePages.map((page) => ({
      "@type": "WebPage",
      name: page.name,
      url: toAbsoluteUrl(page.path),
      description: page.description,
    })),
  };
}

export function createPrimaryPagesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Principais páginas da PLS Sistemas",
    itemListElement: primarySitePages
      .filter((page) => page.path !== "/")
      .map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.name,
        url: toAbsoluteUrl(page.path),
        description: page.description,
      })),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function createWebPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: WebPageSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: toAbsoluteUrl(path),
    inLanguage: siteLanguage,
    isPartOf: {
      "@id": `${siteOrigin}#website`,
    },
  };
}

export function createServiceSchema({
  name,
  description,
  path,
  serviceTypes,
}: ServiceSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: toAbsoluteUrl(path),
    areaServed: "BR",
    provider: {
      "@id": `${siteOrigin}#professional-service`,
    },
    serviceType: serviceTypes,
  };
}

function cleanSchemaObject<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as T;
}
