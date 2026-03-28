import StructuredData from "@/components/seo/StructuredData";
import { getBlogManagerContentSafe } from "@/api/blog-manager";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  siteOrigin,
  siteLanguage,
  toAbsoluteUrl,
} from "@/lib/seo";
import { getBlogPostHref } from "@/lib/blog";
import BlogListingPage from "./BlogListingPage";

const blogPageTitle = "Blog | PLS Sistemas";
const blogPageDescription =
  "Conteúdos da PLS Sistemas sobre sites, landing pages, SEO, automação e estratégias digitais para empresas.";

export const metadata = createPageMetadata({
  title: blogPageTitle,
  description: blogPageDescription,
  path: "/blog",
  keywords: [
    "blog de SEO",
    "artigos sobre landing pages",
    "conteúdo sobre sites",
    "automação comercial",
    "marketing digital",
  ],
});

export default async function BlogPage() {
  const { posts } = await getBlogManagerContentSafe();
  const blogPageSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: blogPageTitle,
      description: blogPageDescription,
      url: toAbsoluteUrl("/blog"),
      inLanguage: siteLanguage,
      isPartOf: {
        "@id": `${siteOrigin}#website`,
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.slice(0, 12).map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: toAbsoluteUrl(getBlogPostHref(post)),
        })),
      },
    },
    createBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ];

  return (
    <>
      <StructuredData data={blogPageSchemas} id="plssistemas-blog-seo" />
      <BlogListingPage blogPosts={posts} />
    </>
  );
}
