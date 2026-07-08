"use client";

import ArticleResumeCard from "@/components/blogs/ArticleResumeCard";
import SocialRibbon from "@/components/marketing/SocialRibbon";
import Breadcrumb from "@/components/navigation/BreadCrumb";
import Paragraph from "@/components/typography/Paragraph";
import Title from "@/components/typography/Title";
import {
    type BlogPost,
    getBlogPostHref,
} from "@/lib/blog";
import { formatDateLong } from "@/utils/format";
import { CalendarIcon, ClockIcon } from "@phosphor-icons/react";
import Image from "next/image";

interface BlogPostDetailsProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  siteUrl: string;
}

export default function BlogPostDetails({
  post,
  relatedPosts,
  siteUrl,
}: BlogPostDetailsProps) {
  const breadcrumbLabels = {
    blog: "Blog",
    [post.slug]: post.title,
  };
  const shareItems = getShareItems(
    post.title,
    `${siteUrl}${getBlogPostHref(post)}`,
  );

  return (
    <main className="min-h-screen bg-[#020205] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(126,30,237,0.16),_transparent_38%),linear-gradient(180deg,_#05050a_0%,_#020205_100%)]">
        <div className="pointer-events-none absolute right-[-4rem] top-12 h-64 w-64 rounded-full bg-primary-500/12 blur-3xl" />
        <div className="pointer-events-none absolute left-[-5rem] top-48 h-72 w-72 rounded-full bg-primary-300/8 blur-3xl" />

        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.45fr)_320px]">
          <div className="min-w-0">
            <Breadcrumb
              currentPath={getBlogPostHref(post)}
              rootLabel="Home"
              labelMap={breadcrumbLabels}
              separator="•"
              className="text-white/70"
            />

            <Title
              content={post.title}
              element="h1"
              className="mt-6 max-w-5xl !text-4xl font-black tracking-[-0.05em] text-white sm:!text-5xl lg:!text-6xl"
            />

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/78">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                <Image
                  src={post.authorAvatarUrl}
                  alt={post.authorName}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="font-semibold text-white">
                  {post.authorName}
                </span>
              </div>

              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-medium text-white/80">
                {post.category}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-medium text-white/80">
                <ClockIcon size={16} weight="bold" />
                {post.readingTime} de leitura
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-medium text-white/80">
                <CalendarIcon size={16} weight="bold" />
                {formatDateLong(post.createdAt)}
              </span>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.03] shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
              <Image
                src={post.backgroundUrl}
                alt={post.title}
                width={1600}
                height={1000}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            <article
              className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:p-10 [&_blockquote]:mt-8 [&_blockquote]:border-l-2 [&_blockquote]:border-primary-300/60 [&_blockquote]:pl-5 [&_blockquote]:text-lg [&_blockquote]:leading-8 [&_blockquote]:text-white/86 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:tracking-[-0.04em] [&_h2]:text-white sm:[&_h2]:text-4xl [&_h2:first-child]:mt-0 [&_li]:text-sm [&_li]:leading-7 [&_li]:text-white/76 sm:[&_li]:text-base [&_p]:mt-5 [&_p]:text-sm [&_p]:leading-8 [&_p]:text-white/76 sm:[&_p]:text-lg [&_ul]:mt-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.24)] backdrop-blur">
              <SocialRibbon
                title="Compartilhe este conteúdo"
                items={shareItems}
                iconsWeight="regular"
                iconsClassName="text-white/72 transition hover:text-white"
              />
            </div>

            {post.tags.length ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.24)] backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                  Tags
                </span>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-sm font-medium text-white/78"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.24)] backdrop-blur">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
                Relacionados
              </span>
              <Title
                content="Leituras relacionadas"
                element="h2"
                className="mt-3 !text-2xl text-white"
              />
              <Paragraph
                content="Posts complementares para aprofundar temas próximos e continuar a navegação dentro do blog."
                className="mt-3 !text-sm leading-7 text-white/60"
              />

              <div className="mt-6 divide-y divide-white/10">
                {relatedPosts.length ? (
                  relatedPosts.map((relatedPost) => (
                    <div
                      key={relatedPost.slug}
                      className="py-4 first:pt-0 last:pb-0"
                    >
                      <ArticleResumeCard
                        href={getBlogPostHref(relatedPost)}
                        category={relatedPost.category}
                        title={relatedPost.title}
                        imageUrl={relatedPost.backgroundUrl}
                        badgeClassName="bg-primary-500 text-white"
                        titleClassName="text-white"
                        containerClassName="max-w-none !rounded-none !bg-transparent !p-0 hover:!bg-white/[0.03]"
                      />
                    </div>
                  ))
                ) : (
                  <Paragraph
                    content="Ainda não existem outras publicações para relacionar com este post."
                    className="py-4 !text-sm leading-7 text-white/60"
                  />
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function getShareItems(title: string, url: string) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  return [
    {
      iconName: "x" as const,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      iconName: "facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      iconName: "whatsapp" as const,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      iconName: "reddit" as const,
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    },
  ];
}
