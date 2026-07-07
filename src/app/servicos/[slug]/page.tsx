import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PromotionalSection from "@/components/marketing/PromotionalSection";
import { Accordeon } from "@/components/miscellaneous/Accordeon";
import StructuredData from "@/components/seo/StructuredData";
import {
  createBreadcrumbSchema,
  createFAQPageSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";
import {
  getRelatedServiceSeoPages,
  getServiceSeoPage,
  serviceSeoPages,
} from "@/lib/programmatic-seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceSeoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServiceSeoPage(slug);

  if (!page) {
    return {
      title: "Serviço não encontrado | PLS Sistemas",
    };
  }

  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServiceSeoPage(slug);

  if (!page) notFound();

  const relatedPages = getRelatedServiceSeoPages(page);
  const serviceSchemas = [
    createWebPageSchema({
      name: page.title,
      description: page.description,
      path: page.path,
    }),
    createServiceSchema({
      name: page.name,
      description: page.description,
      path: page.path,
      serviceTypes: page.serviceTypes,
    }),
    createFAQPageSchema(page.faqs),
    createBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Serviços", path: "/servicos" },
      { name: page.shortName, path: page.path },
    ]),
  ];

  return (
    <main className="min-h-screen bg-[#030307] text-white">
      <StructuredData
        data={serviceSchemas}
        id={`plssistemas-service-seo-${page.slug}`}
      />

      <section className="relative isolate overflow-hidden border-b border-white/10 px-4 py-20 sm:px-6 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(126,30,237,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/62">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/servicos" className="hover:text-white">
                  Serviços
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">{page.shortName}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
                {page.heroEyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/78 sm:text-xl">
                {page.heroDescription}
              </p>
            </div>

            <aside className="rounded-2xl border border-white/12 bg-white/[0.04] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/56">
                Indicado para
              </p>
              <p className="mt-3 text-base leading-7 text-white/82">
                {page.audience}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href={page.primaryCtaHref ?? "/#solucoes-sob-medida"}
                  className="inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#030307] transition hover:bg-white/86"
                >
                  {page.primaryCtaLabel}
                </Link>
                <Link
                  href={page.secondaryCtaHref}
                  className="inline-flex justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-teal-200/70 hover:bg-white/10"
                >
                  {page.secondaryCtaLabel}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-3">
          {page.benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-white/12 bg-white/[0.04] p-6"
            >
              <h2 className="text-xl font-semibold text-white">
                {benefit.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/72">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {page.slug === "criacao-de-sites" ? (
        <PromotionalSection category="empresa" />
      ) : null}

      <section className="border-y border-white/10 bg-[#07110f] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          {page.sections.map((section) => (
            <section
              key={section.title}
              className="grid gap-4 md:grid-cols-[0.42fr_0.58fr] md:gap-10"
            >
              <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {section.title}
              </h2>
              <p className="text-base leading-8 text-white/76">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
              Perguntas frequentes
            </p>
            <Accordeon
              questions={page.faqs}
              maxWidthClassName="max-w-none"
              className="mt-6 !border-white/12 !bg-white/[0.03]"
            />
          </div>

          <aside>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
              Serviços relacionados
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {relatedPages.map((relatedPage) => (
                <Link
                  key={relatedPage.slug}
                  href={relatedPage.path}
                  className="rounded-2xl border border-white/12 bg-white/[0.04] p-4 text-sm font-semibold text-white transition hover:border-teal-200/60 hover:bg-teal-300/10"
                >
                  {relatedPage.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
