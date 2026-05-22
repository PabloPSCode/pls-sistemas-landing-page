// eslint-disable-next-line @typescript-eslint/no-require-imports
const { servicePages } = require("./src/data/programmatic-seo.json");

const programmaticRoutes = [
  "/servicos",
  ...servicePages.map((page) => page.path),
];

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

    return {
      loc: path,
      changefreq:
        changefreqByPath[path] ??
        (isBlogPost || isServiceRoute ? "weekly" : config.changefreq),
      priority:
        priorityByPath[path] ??
        (isServiceRoute ? 0.85 : isBlogPost ? 0.75 : config.priority),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
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

    return resolvedRoutes.filter(Boolean);
  },
};
