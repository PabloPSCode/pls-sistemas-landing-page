import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import PromotionalSection from "@/components/marketing/PromotionalSection";
import { Accordeon } from "@/components/miscellaneous/Accordeon";
import ReferenceSiteButton from "@/components/miscellaneous/ReferenceSiteButton";
import StructuredData from "@/components/seo/StructuredData";
import {
  businessCategories,
  getBusinessCategory,
  getRelatedBusinessCategories,
} from "@/lib/business-categories";
import {
  createBreadcrumbSchema,
  createFAQPageSchema,
  createPageMetadata,
  createServiceSchema,
  createWebPageSchema,
} from "@/lib/seo";
import { getSiteFaqQuestions } from "@/mocks/faq";

type BusinessCategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return businessCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: BusinessCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBusinessCategory(slug);

  if (!category) {
    return {
      title: "Categoria não encontrada | PLS Sistemas",
    };
  }

  return createPageMetadata({
    title: `${category.title} | PLS Sistemas`,
    description: category.problemContext,
    path: category.path,
    keywords: [
      category.title.toLowerCase(),
      `site para ${category.shortName.toLowerCase()}`,
      "criação de sites",
      "landing pages",
      "SEO técnico",
    ],
    image: category.coverUrl
      ? { url: category.coverUrl, alt: category.title }
      : undefined,
  });
}

export default async function BusinessCategoryPage({
  params,
}: BusinessCategoryPageProps) {
  const { slug } = await params;
  const category = getBusinessCategory(slug);

  if (!category) notFound();

  const relatedCategories = getRelatedBusinessCategories(category);
  const referenceUrl = category.templates[0]?.templateUrl;
  const faqQuestions = getSiteFaqQuestions(category.slug);
  const categorySchemas = [
    createWebPageSchema({
      name: category.title,
      description: category.problemContext,
      path: category.path,
    }),
    createServiceSchema({
      name: category.title,
      description: category.problemContext,
      path: category.path,
      serviceTypes: [
        "Criação de sites",
        "Criação de landing pages",
        "SEO técnico",
        "Design responsivo",
      ],
    }),
    createBreadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Landing Pages e Websites", path: "/landing-pages" },
      { name: category.shortName, path: category.path },
    ]),
    createFAQPageSchema(faqQuestions),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        data={categorySchemas}
        id={`plssistemas-business-category-${category.slug}`}
      />

      <section className="relative isolate overflow-hidden border-b border-foreground/10 px-4 py-20 sm:px-6 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(126,30,237,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8">
          <nav aria-label="Breadcrumb" className="text-sm text-foreground/62">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-foreground">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/landing-pages" className="hover:text-foreground">
                  Landing Pages e Websites
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{category.shortName}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Site para o seu negócio
              </p>
              <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-6xl">
                {category.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-foreground/78 sm:text-xl">
                {category.problemContext}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {referenceUrl ? (
                  <ReferenceSiteButton
                    url={referenceUrl}
                    title={category.title}
                  />
                ) : null}
                <Link
                  href="/#solucoes-sob-medida"
                  className="inline-flex justify-center rounded-full border border-foreground/25 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent/70 hover:bg-foreground/10"
                >
                  Falar com um especialista
                </Link>
              </div>
            </div>

            {category.coverUrl ? (
              <div className="relative overflow-hidden rounded-2xl border border-foreground/12 bg-foreground/[0.04]">
                <Image
                  src={category.coverUrl}
                  alt={`Exemplo de ${category.title.toLowerCase()}`}
                  width={960}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <PromotionalSection category={category.shortName} />

      <section className="border-y border-foreground/10 bg-surface-accent px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.72fr_0.28fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Perguntas frequentes
            </p>
            <Accordeon
              questions={faqQuestions}
              maxWidthClassName="max-w-none"
              className="mt-6 !border-foreground/12 !bg-foreground/[0.03]"
            />
          </div>

          <aside>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/65">
              Sites para outros negócios
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {relatedCategories.map((relatedCategory) => (
                <Link
                  key={relatedCategory.slug}
                  href={relatedCategory.path}
                  className="rounded-2xl border border-foreground/12 bg-foreground/[0.04] p-4 text-sm font-semibold text-foreground transition hover:border-accent/60 hover:bg-accent/10"
                >
                  {relatedCategory.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
