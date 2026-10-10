"use client";

import ArticleImage from "@/components/blogs/ArticleImage";
import Button from "@/components/buttons/Button";
import SearchInput from "@/components/inputs/SearchInput";
import Breadcrumb from "@/components/navigation/BreadCrumb";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import { getBlogPostHref, type BlogPost } from "@/lib/blog";
import { normalizeTextValue } from "@/utils/slug";
import { FormEvent, useState } from "react";

const stripHtml = (htmlContent: string) =>
  htmlContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

interface BlogListingPageProps {
  blogPosts: BlogPost[];
}

export default function BlogListingPage({
  blogPosts,
}: BlogListingPageProps) {
  const [search, setSearch] = useState("");

  const normalizedSearch = normalizeTextValue(search);
  const filteredPosts = blogPosts.filter((post) => {
    if (!normalizedSearch) return true;

    const searchableContent = normalizeTextValue(
      [post.title, post.category, stripHtml(post.htmlContent)].join(" "),
    );

    return searchableContent.includes(normalizedSearch);
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document
      .getElementById("blog-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-foreground/10 bg-[radial-gradient(circle_at_top,_rgba(126,30,237,0.22),_transparent_42%),linear-gradient(180deg,_var(--color-surface)_0%,_var(--color-background)_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[linear-gradient(90deg,rgba(126,30,237,0)_0%,rgba(126,30,237,0.22)_50%,rgba(126,30,237,0)_100%)] blur-3xl" />
        <div className="pointer-events-none absolute left-[-10%] top-20 h-52 w-52 rounded-full bg-primary-500/15 blur-3xl" />
        <div className="pointer-events-none absolute right-[-5%] top-10 h-72 w-72 rounded-full bg-primary-300/10 blur-3xl" />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-20 text-center sm:px-8 sm:py-24">
          <div className="w-full max-w-3xl text-left">
            <Breadcrumb
              currentPath="/blog"
              rootLabel="Início"
              labelMap={{ blog: "Blog" }}
              separator="•"
            />
          </div>

          <Title
            content="Descubra nossos conteúdos mais recentes"
            element="h1"
            className="mt-6 max-w-4xl !text-4xl font-black tracking-[-0.04em] text-foreground sm:!text-5xl lg:!text-6xl"
          />

          <Subtitle
            content="Insights sobre sites, landing pages, SEO e estratégias digitais para empresas que precisam vender mais e operar melhor."
            className="mt-6 max-w-3xl text-center !text-base !font-light leading-8 text-foreground/72 sm:!text-xl"
          />

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-foreground/[0.04] p-3 shadow-[0_18px_60px_var(--elevation-color)] backdrop-blur sm:flex-row sm:items-center"
          >
            <SearchInput
              search={search}
              setSearch={setSearch}
              onCancelSearch={() => setSearch("")}
              placeholder="Pesquise por SEO, landing pages ou performance"
              containerClassName="flex-1"
              className="!my-0 !h-12 !rounded-2xl !border-foreground/10 !bg-foreground/[0.03] !px-3 text-foreground placeholder:!text-foreground/50"
            />

            <Button
              type="submit"
              label="Buscar"
              className="h-12 w-full rounded-2xl bg-primary-500 px-6 text-sm font-semibold text-white sm:w-auto"
            />
          </form>
        </div>
      </section>

      <section
        id="blog-results"
        className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24"
      >
        <div className="min-w-0">
          <div className="flex flex-col gap-3 border-b border-foreground/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Title
                content="Nossas publicações"
                element="h2"
                className="!text-3xl text-foreground sm:!text-4xl"
              />
              <Paragraph
                content={
                  normalizedSearch
                    ? `${filteredPosts.length} resultado(s) para "${search.trim()}".`
                    : `${blogPosts.length} publicações disponíveis.`
                }
                className="mt-3 !text-sm text-foreground/60 sm:!text-base"
              />
            </div>

            {normalizedSearch ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="w-fit text-sm font-semibold text-highlight transition hover:text-foreground"
              >
                Limpar busca
              </button>
            ) : null}
          </div>

          {filteredPosts.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <ArticleImage
                  key={post.id ?? post.slug}
                  imgUrl={post.backgroundUrl}
                  title={post.title}
                  publishedAt={post.createdAt}
                  readingTime={post.readingTime}
                  href={getBlogPostHref(post)}
                  className="max-w-none border-foreground/10 bg-foreground/[0.03]"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-foreground/15 bg-foreground/[0.03] p-8 text-center sm:p-12">
              <Title
                content="Nenhum conteúdo encontrado"
                element="h3"
                className="!text-2xl text-foreground sm:!text-3xl"
              />
              <Paragraph
                content="Tente uma busca mais ampla ou limpe o filtro para voltar aos posts disponíveis."
                className="mx-auto mt-4 max-w-xl !text-sm leading-7 text-foreground/65 sm:!text-base"
              />
              <Button
                type="button"
                label="Voltar para todos os posts"
                onClick={() => setSearch("")}
                className="mx-auto mt-6 rounded-2xl bg-primary-500 px-6 py-3 text-white"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
