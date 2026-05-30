import Link from "next/link";

import StructuredData from "@/components/seo/StructuredData";
import {
  createBreadcrumbSchema,
  createPageMetadata,
  createWebPageSchema,
  siteLanguage,
  siteOrigin,
  toAbsoluteUrl,
} from "@/lib/seo";
import { serviceSeoPages } from "@/lib/programmatic-seo";

const servicesPageTitle = "Serviços de Desenvolvimento Web e SEO | PLS Sistemas";
const servicesPageDescription =
  "Conheça os serviços da PLS Sistemas para criação de sites, landing pages, sistemas web sob medida e SEO técnico.";

export const metadata = createPageMetadata({
  title: servicesPageTitle,
  description: servicesPageDescription,
  path: "/servicos",
  keywords: [
    "serviços de desenvolvimento web",
    "criação de sites",
    "landing pages",
    "desenvolvimento de sistemas",
    "SEO técnico",
  ],
});

export default function ServicesPage() {
  const servicesPageSchemas = [
    createWebPageSchema({
      name: servicesPageTitle,
      description: servicesPageDescription,
      path: "/servicos",
      type: "CollectionPage",
    }),
    createBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Serviços", path: "/servicos" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Serviços da PLS Sistemas",
      inLanguage: siteLanguage,
      isPartOf: {
        "@id": `${siteOrigin}#website`,
      },
      itemListElement: serviceSeoPages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: page.name,
        description: page.description,
        url: toAbsoluteUrl(page.path),
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-[#030307] text-white">
      <StructuredData
        data={servicesPageSchemas}
        id="plssistemas-services-seo"
      />

      <section className="relative isolate overflow-hidden border-b border-white/10 px-4 py-20 sm:px-6 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(126,30,237,0.16),transparent_36%)]"
        />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
            Serviços
          </p>
          <h1 className="max-w-5xl text-4xl font-bold leading-tight text-white sm:text-6xl">
            Desenvolvimento web e SEO para empresas que precisam crescer com
            uma base digital sólida.
          </h1>
          <p className="max-w-3xl text-base leading-8 text-white/78 sm:text-xl">
            Escolha o tipo de projeto que mais se aproxima da sua necessidade
            para entender como a PLS Sistemas pode estruturar a entrega,
            reduzir riscos e gerar mais presença digital.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/#solucoes-sob-medida"
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#030307] transition hover:bg-white/86 sm:text-base"
            >
              Falar com especialista
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-200/70 hover:bg-white/10 sm:text-base"
            >
              Ver conteúdos no blog
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-2">
          {serviceSeoPages.map((page) => (
            <article
              key={page.slug}
              className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.04] p-6 shadow-[0_18px_46px_rgba(0,0,0,0.28)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
                {page.heroEyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {page.name}
              </h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-white/74 sm:text-base">
                {page.description}
              </p>
              <Link
                href={page.path}
                className="mt-6 inline-flex w-fit rounded-full border border-teal-200/35 px-4 py-2 text-sm font-semibold text-teal-100 transition hover:border-teal-100 hover:bg-teal-300/10"
              >
                Acessar serviço
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
