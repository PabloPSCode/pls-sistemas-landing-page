import { IPost } from "@/types/post";

const BLOG_BASE_ROUTE = "/blog";

export interface BlogManagerSite {
  id?: string;
  url: string;
  domain: string;
  clientWhatsapp: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BlogManagerAuthor {
  id?: string;
  name: string;
  bio: string;
  siteId: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface BlogPost extends IPost {
  slug: string;
  category: string;
  readingTime: string;
  tags: string[];
  authorName: string;
  authorAvatarUrl: string;
}

export interface BlogManagerContent {
  site: BlogManagerSite | null;
  sites: BlogManagerSite[];
  authors: BlogManagerAuthor[];
  posts: BlogPost[];
}

export function getBlogPostHref(post: Pick<BlogPost, "slug">): string {
  return `${BLOG_BASE_ROUTE}/${post.slug}`;
}

export function getBlogPostBySlug(
  posts: BlogPost[],
  slug: string,
): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(
  posts: BlogPost[],
  slug: string,
  limit = 3,
): BlogPost[] {
  const currentPost = getBlogPostBySlug(posts, slug);

  if (!currentPost) return [];

  return posts
    .filter((post) => post.slug !== slug)
    .sort((postA, postB) => {
      const scoreA = getRelatedScore(postA, currentPost);
      const scoreB = getRelatedScore(postB, currentPost);

      if (scoreA !== scoreB) return scoreB - scoreA;

      return (
        new Date(postB.createdAt).getTime() -
        new Date(postA.createdAt).getTime()
      );
    })
    .slice(0, limit);
}

export function stripHtml(htmlContent: string): string {
  return htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getRelatedScore(post: BlogPost, currentPost: BlogPost): number {
  const sharedTags = post.tags.filter((tag) =>
    currentPost.tags.includes(tag),
  ).length;

  return sharedTags + (post.category === currentPost.category ? 3 : 0);
}
