import BlogPostDetails from "./BlogPostDetails";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/mocks/blog";
import { collapseLongString } from "@/utils/format";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const siteUrl = "https://www.plssistemas.com.br";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado | PLS Sistemas",
    };
  }

  const description = collapseLongString(stripHtml(post.htmlContent), 160);
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog PLS Sistemas`,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: [
        {
          url: post.backgroundUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [post.backgroundUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  return (
    <BlogPostDetails
      post={post}
      relatedPosts={relatedPosts}
      siteUrl={siteUrl}
    />
  );
}

function stripHtml(htmlContent: string): string {
  return htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
