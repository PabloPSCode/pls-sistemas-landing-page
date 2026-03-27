import "server-only";

import { cache } from "react";

import {
  type BlogManagerAuthor,
  type BlogManagerContent,
  type BlogManagerSite,
  type BlogPost,
  stripHtml,
} from "@/lib/blog";
import { IPost } from "@/types/post";
import { formatSlug } from "@/utils/slug";

const DEFAULT_BLOG_MANAGER_API_BASE_URL = "http://127.0.0.1:3336";
const DEFAULT_AUTHOR_AVATAR_URL = "/imgs/profile_1.png";
const DEFAULT_BACKGROUND_URL = "/og-image.png";
const DEFAULT_CATEGORY = "Blog";
const DEFAULT_AUTHOR_NAME = "Equipe PLS Sistemas";
const WORDS_PER_MINUTE = 200;

interface BlogManagerSiteRecord {
  id?: string;
  url: string;
  domain: string;
  clientWhatsapp: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface AuthenticatedSiteRecord extends BlogManagerSiteRecord {
  jwt: string;
}

type ErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

const blogManagerApiBaseUrl =
  process.env.BLOG_MANAGER_API_BASE_URL?.trim() ||
  DEFAULT_BLOG_MANAGER_API_BASE_URL;
const configuredSiteId = process.env.BLOG_MANAGER_SITE_ID?.trim();
const configuredSiteUrl = process.env.SITE_URL?.trim();

const loadBlogManagerContent = cache(
  async (): Promise<BlogManagerContent> => {
    const siteRecords = await listSites();
    const resolvedSite = resolveSite(siteRecords);
    const authenticatedSite = await authenticateSite(resolvedSite);
    const [authors, posts] = await Promise.all([
      fetchAuthorizedJson<BlogManagerAuthor[]>("/authors", authenticatedSite.jwt),
      fetchAuthorizedJson<IPost[]>("/posts", authenticatedSite.jwt),
    ]);

    return {
      site: sanitizeSite(resolvedSite),
      sites: siteRecords.map(sanitizeSite),
      authors: authors
        .filter((author) => author.deletedAt === null)
        .sort((leftAuthor, rightAuthor) =>
          rightAuthor.createdAt.localeCompare(leftAuthor.createdAt),
        ),
      posts: mapBlogPosts(posts, authors),
    };
  },
);

export async function getBlogManagerContent(): Promise<BlogManagerContent> {
  return loadBlogManagerContent();
}

export async function getBlogManagerContentSafe(): Promise<BlogManagerContent> {
  try {
    return await getBlogManagerContent();
  } catch (error) {
    console.error("Failed to load blog manager content.", error);

    return {
      site: null,
      sites: [],
      authors: [],
      posts: [],
    };
  }
}

async function listSites(): Promise<BlogManagerSiteRecord[]> {
  const sites = await fetchJson<BlogManagerSiteRecord[]>("/sites");

  return sites
    .filter((site) => site.deletedAt === null)
    .sort((leftSite, rightSite) =>
      rightSite.createdAt.localeCompare(leftSite.createdAt),
    );
}

function resolveSite(sites: BlogManagerSiteRecord[]): BlogManagerSiteRecord {
  if (!sites.length) {
    throw new Error("No active blog manager sites were returned by the backend.");
  }

  if (configuredSiteId) {
    const siteById = sites.find((site) => site.id === configuredSiteId);

    if (siteById) {
      return siteById;
    }
  }

  const normalizedConfiguredDomain = normalizeDomain(configuredSiteUrl);

  if (normalizedConfiguredDomain) {
    const siteByDomain = sites.find((site) => {
      const siteDomain = normalizeDomain(site.domain);
      const siteUrlDomain = normalizeDomain(site.url);

      return (
        siteDomain === normalizedConfiguredDomain ||
        siteUrlDomain === normalizedConfiguredDomain
      );
    });

    if (siteByDomain) {
      return siteByDomain;
    }
  }

  if (sites.length === 1) {
    return sites[0];
  }

  if (configuredSiteId) {
    throw new Error(
      `Blog manager site ${configuredSiteId} was not found. Set BLOG_MANAGER_SITE_ID to a valid id.`,
    );
  }

  throw new Error(
    "Unable to resolve a blog manager site. Set BLOG_MANAGER_SITE_ID to a valid id.",
  );
}

async function authenticateSite(
  site: BlogManagerSiteRecord,
): Promise<AuthenticatedSiteRecord> {
  return fetchJson<AuthenticatedSiteRecord>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      domain: site.domain,
      password: site.password,
    }),
  });
}

async function fetchAuthorizedJson<T>(
  path: string,
  jwt: string,
): Promise<T> {
  return fetchJson<T>(path, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });
  const data = await parseJsonResponse<T | ErrorResponse>(response);

  if (!response.ok) {
    //@ts-ignore
    throw new Error(getErrorMessage(data, response.status));
  }

  return data as T;
}

async function parseJsonResponse<T>(response: Response): Promise<T | null> {
  const responseText = await response.text();

  if (!responseText) {
    return null;
  }

  try {
    return JSON.parse(responseText) as T;
  } catch {
    return null;
  }
}

function getErrorMessage(data: ErrorResponse | null, status: number): string {
  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  return `Blog manager request failed with status ${status}.`;
}

function buildApiUrl(path: string): string {
  const normalizedBaseUrl = blogManagerApiBaseUrl.endsWith("/")
    ? blogManagerApiBaseUrl
    : `${blogManagerApiBaseUrl}/`;

  return new URL(path.replace(/^\//, ""), normalizedBaseUrl).toString();
}

function sanitizeSite(site: BlogManagerSiteRecord): BlogManagerSite {
  return {
    id: site.id,
    url: site.url,
    domain: site.domain,
    clientWhatsapp: site.clientWhatsapp,
    createdAt: site.createdAt,
    updatedAt: site.updatedAt,
    deletedAt: site.deletedAt,
  };
}

function mapBlogPosts(
  posts: IPost[],
  authors: BlogManagerAuthor[],
): BlogPost[] {
  const activeAuthors = new Map(
    authors
      .filter((author) => author.deletedAt === null && author.id)
      .map((author) => [author.id as string, author]),
  );
  const slugUsage = new Map<string, number>();

  return posts
    .filter((post) => post.deletedAt === null)
    .sort((leftPost, rightPost) =>
      rightPost.createdAt.localeCompare(leftPost.createdAt),
    )
    .map((post) => {
      const author = activeAuthors.get(post.authorId);
      const slug = buildUniqueSlug(post, slugUsage);

      return {
        ...post,
        backgroundUrl: normalizeImageUrl(post.backgroundUrl, DEFAULT_BACKGROUND_URL),
        slug,
        category: DEFAULT_CATEGORY,
        readingTime: estimateReadingTime(post.htmlContent),
        tags: [],
        authorName: author?.name?.trim() || DEFAULT_AUTHOR_NAME,
        authorAvatarUrl: normalizeImageUrl(
          author?.avatarUrl,
          DEFAULT_AUTHOR_AVATAR_URL,
        ),
      };
    });
}

function buildUniqueSlug(
  post: Pick<IPost, "id" | "title">,
  slugUsage: Map<string, number>,
): string {
  const titleOrId = post.title || post.id || "post";
  const baseSlug = formatSlug(titleOrId) || "post";
  const currentSlugUsage = slugUsage.get(baseSlug) ?? 0;

  slugUsage.set(baseSlug, currentSlugUsage + 1);

  if (currentSlugUsage === 0) {
    return baseSlug;
  }

  const idSuffix = post.id ? formatSlug(post.id) : `${currentSlugUsage + 1}`;

  return `${baseSlug}-${idSuffix}`;
}

function estimateReadingTime(htmlContent: string): string {
  const words = stripHtml(htmlContent)
    .split(/\s+/)
    .filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));

  return `${readingMinutes} min`;
}

function normalizeImageUrl(value: string | undefined, fallback: string): string {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : fallback;
}

function normalizeDomain(value?: string): string | null {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return null;
  }

  try {
    const parsedUrl = new URL(
      normalizedValue.includes("://")
        ? normalizedValue
        : `https://${normalizedValue}`,
    );

    return parsedUrl.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return normalizedValue
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .split("/")[0]
      .toLowerCase();
  }
}
