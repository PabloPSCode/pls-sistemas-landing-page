/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.plssistemas.com.br",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  transform: async (config, path) => {
    const priorityByPath = {
      "/": 1,
      "/landing-pages": 0.9,
      "/blog": 0.85,
      "/politica-de-privacidade": 0.5,
    };
    const changefreqByPath = {
      "/": "weekly",
      "/landing-pages": "weekly",
      "/blog": "daily",
      "/politica-de-privacidade": "monthly",
    };
    const isBlogPost = path.startsWith("/blog/");

    return {
      loc: path,
      changefreq:
        changefreqByPath[path] ?? (isBlogPost ? "weekly" : config.changefreq),
      priority: priorityByPath[path] ?? (isBlogPost ? 0.75 : config.priority),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    const importantRoutes = [
      "/",
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
