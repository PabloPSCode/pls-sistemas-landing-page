import type { Metadata } from "next";

import BlogListingPage from "./BlogListingPage";

const blogPageTitle = "Blog | PLS Sistemas";
const blogPageDescription =
  "Conteúdos da PLS Sistemas sobre sites, landing pages, SEO, automação e estratégias digitais para empresas.";

export const metadata: Metadata = {
  title: blogPageTitle,
  description: blogPageDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "https://www.plssistemas.com.br/blog",
    title: blogPageTitle,
    description: blogPageDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Blog da PLS Sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: blogPageTitle,
    description: blogPageDescription,
    images: ["/og-image.png"],
  },
};

export default function BlogPage() {
  return <BlogListingPage />;
}
