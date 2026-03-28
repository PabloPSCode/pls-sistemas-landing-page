import StructuredData from "@/components/seo/StructuredData";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";

const landingPagesTitle = "Criação de Landing Pages e Websites | PLS Sistemas";
const landingPagesDescription =
  "Criação de landing pages e websites pela PLS Sistemas em João Monlevade - MG, com SEO técnico, design responsivo e foco em conversão.";

export const metadata = createPageMetadata({
  title: landingPagesTitle,
  description: landingPagesDescription,
  path: "/landing-pages",
  keywords: [
    "criação de landing pages",
    "criação de websites",
    "desenvolvimento web",
    "site profissional",
    "SEO técnico",
  ],
});

export default function LandingPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const landingPagesSchemas = [
    createWebPageSchema({
      name: landingPagesTitle,
      description: landingPagesDescription,
      path: "/landing-pages",
    }),
    createBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Landing Pages e Websites", path: "/landing-pages" },
    ]),
    createServiceSchema({
      name: "Criação de landing pages e websites",
      description: landingPagesDescription,
      path: "/landing-pages",
      serviceTypes: [
        "Criação de landing pages",
        "Criação de websites",
        "SEO técnico",
        "Design responsivo",
      ],
    }),
  ];

  return (
    <>
      <StructuredData
        data={landingPagesSchemas}
        id="plssistemas-landing-pages-seo"
      />
      {children}
    </>
  );
}
