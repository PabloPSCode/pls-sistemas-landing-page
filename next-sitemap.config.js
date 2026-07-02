// eslint-disable-next-line @typescript-eslint/no-require-imports
const { servicePages } = require("./src/data/programmatic-seo.json");

// Keep in sync with src/lib/business-categories.ts
const businessCategorySlugs = [
  "empresas-em-geral",
  "dentistas-e-clinicas",
  "corretores-de-imoveis",
  "rh-e-contabilidade",
  "tecnologia-e-software",
  "academias-e-bem-estar",
  "nutricionistas",
  "arquitetos-e-construcao-civil",
  "psicologos-e-terapeutas",
  "advogados-e-escritorios",
  "agencias-de-veiculos",
];

const businessCategoryRoutes = businessCategorySlugs.map(
  (slug) => `/sites/${slug}`,
);

const programmaticRoutes = [
  "/servicos",
  ...servicePages.map((page) => page.path),
  ...businessCategoryRoutes,
];

// Keep in sync with src/api/blog-manager.ts
const DEFAULT_BLOG_MANAGER_API_BASE_URL = "https://blog-manager-api.plssistemas.com.br";

const blogManagerApiBaseUrl =
  process.env.BLOG_MANAGER_API_BASE_URL?.trim() ||
  DEFAULT_BLOG_MANAGER_API_BASE_URL;
const configuredSiteId = process.env.BLOG_MANAGER_SITE_ID?.trim();
const configuredSiteUrl = process.env.SITE_URL?.trim();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.plssistemas.com.br",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const priorityByPath = {
      "/": 1,
      "/servicos": 0.9,
      "/landing-pages": 0.9,
      "/blog": 0.85,
      "/politica-de-privacidade": 0.5,
    };
    const changefreqByPath = {
      "/": "weekly",
      "/servicos": "weekly",
      "/landing-pages": "weekly",
      "/blog": "daily",
      "/politica-de-privacidade": "monthly",
    };
    const isBlogPost = path.startsWith("/blog/");
    const isServiceRoute = path.startsWith("/servicos/");
    const isBusinessCategoryRoute = path.startsWith("/sites/");

    return {
      loc: path,
      changefreq:
        changefreqByPath[path] ??
        (isBlogPost || isServiceRoute || isBusinessCategoryRoute
          ? "weekly"
          : config.changefreq),
      priority:
        priorityByPath[path] ??
        (isServiceRoute || isBusinessCategoryRoute
          ? 0.85
          : isBlogPost
            ? 0.75
            : config.priority),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    const blogPostPaths = await getBlogPostPaths();
    const importantRoutes = [
      "/",
      ...programmaticRoutes,
      "/landing-pages",
      "/blog",
      "/politica-de-privacidade",
    ];
    const resolvedRoutes = await Promise.all(
      importantRoutes.map((path) => config.transform(config, path)),
    );
    const resolvedBlogPosts = await Promise.all(
      blogPostPaths.map(async ({ path, lastmod }) => {
        const entry = await config.transform(config, path);

        if (!entry) {
          return null;
        }

        return { ...entry, lastmod: lastmod ?? entry.lastmod };
      }),
    );

    return [...resolvedRoutes, ...resolvedBlogPosts].filter(Boolean);
  },
};

/**
 * Fetches published blog posts from the blog manager API and returns their
 * sitemap paths, so newly created posts are automatically added to the sitemap
 * on each build. Mirrors the site resolution and slug logic in
 * src/api/blog-manager.ts. Any failure is swallowed so the build never breaks.
 *
 * @returns {Promise<{ path: string; lastmod?: string }[]>}
 */
async function getBlogPostPaths() {
  try {
    const sites = await fetchJson("/sites");
    const activeSites = (Array.isArray(sites) ? sites : [])
      .filter((site) => site.deletedAt === null)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
    const site = resolveSite(activeSites);

    if (!site) {
      return [];
    }

    const auth = await fetchJson("/auth/login", {
      method: "POST",
      body: JSON.stringify({ domain: site.domain, password: site.password }),
    });

    if (!auth?.jwt) {
      return [];
    }

    const posts = await fetchJson("/posts", {
      headers: { Authorization: `Bearer ${auth.jwt}` },
    });
    const activePosts = (Array.isArray(posts) ? posts : [])
      .filter((post) => post.deletedAt === null)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
    const slugUsage = new Map();

    return activePosts.map((post) => ({
      path: `/blog/${buildUniqueSlug(post, slugUsage)}`,
      lastmod: post.updatedAt ?? post.createdAt ?? undefined,
    }));
  } catch (error) {
    console.warn(
      "next-sitemap: failed to load blog posts, skipping them in the sitemap.",
      error,
    );

    return [];
  }
}

function resolveSite(sites) {
  if (!sites.length) {
    return null;
  }

  if (configuredSiteId) {
    const siteById = sites.find((site) => site.id === configuredSiteId);

    if (siteById) {
      return siteById;
    }
  }

  const normalizedConfiguredDomain = normalizeDomain(configuredSiteUrl);

  if (normalizedConfiguredDomain) {
    const siteByDomain = sites.find(
      (site) =>
        normalizeDomain(site.domain) === normalizedConfiguredDomain ||
        normalizeDomain(site.url) === normalizedConfiguredDomain,
    );

    if (siteByDomain) {
      return siteByDomain;
    }
  }

  return sites.length === 1 ? sites[0] : null;
}

function buildUniqueSlug(post, slugUsage) {
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

// Keep in sync with src/utils/slug.ts
function formatSlug(value) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDomain(value) {
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

async function fetchJson(path, init) {
  const headers = new Headers(init?.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const normalizedBaseUrl = blogManagerApiBaseUrl.endsWith("/")
    ? blogManagerApiBaseUrl
    : `${blogManagerApiBaseUrl}/`;
  const url = new URL(path.replace(/^\//, ""), normalizedBaseUrl).toString();
  const response = await fetch(url, { ...init, headers, cache: "no-store" });
  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Blog manager request to ${path} failed with status ${response.status}.`,
    );
  }

  if (!responseText) {
    return null;
  }

  return JSON.parse(responseText);
}
