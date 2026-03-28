import StructuredData from "@/components/seo/StructuredData";
import BlogPostDetails from "./BlogPostDetails";
import { getBlogManagerContentSafe } from "@/api/blog-manager";
import { getBlogPostBySlug, getRelatedBlogPosts, stripHtml } from "@/lib/blog";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  siteOrigin,
  siteLanguage,
  toAbsoluteUrl,
} from "@/lib/seo";
import { collapseLongString } from "@/utils/format";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const fallbackSiteUrl = process.env.SITE_URL ?? "https://www.plssistemas.com.br";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getBlogManagerContentSafe();
  const post = getBlogPostBySlug(posts, slug);

  if (!post) {
    return {
      title: "Post não encontrado | PLS Sistemas",
    };
  }

  const description = collapseLongString(stripHtml(post.htmlContent), 160);

  return createPageMetadata({
    title: `${post.title} | Blog PLS Sistemas`,
    description,
    path: `/blog/${post.slug}`,
    type: "article",
    image: {
      url: post.backgroundUrl,
      alt: post.title,
    },
    keywords: post.tags,
    publishedTime: post.createdAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const { site, posts } = await getBlogManagerContentSafe();
  const post = getBlogPostBySlug(posts, slug);

  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(posts, post.slug, 3);
  const siteUrl = site?.url ?? fallbackSiteUrl;
  const description = collapseLongString(stripHtml(post.htmlContent), 160);
  const postUrl = toAbsoluteUrl(`/blog/${post.slug}`);
  const wordCount = stripHtml(post.htmlContent)
    .split(/\s+/)
    .filter(Boolean).length;
  const postSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description,
      url: postUrl,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": postUrl,
      },
      inLanguage: siteLanguage,
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      image: [toAbsoluteUrl(post.backgroundUrl)],
      articleSection: post.category,
      keywords: post.tags,
      wordCount,
      author: {
        "@type": "Person",
        name: post.authorName,
        image: toAbsoluteUrl(post.authorAvatarUrl),
      },
      publisher: {
        "@id": `${siteOrigin}#organization`,
      },
    },
    createBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <StructuredData
        data={postSchemas}
        id={`plssistemas-blog-post-seo-${post.slug}`}
      />
      <BlogPostDetails
        post={post}
        relatedPosts={relatedPosts}
        siteUrl={siteUrl}
      />
    </>
  );
}
