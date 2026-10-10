"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import { Section } from "@/components/elements/Section";
import VideoSection from "@/components/elements/VideoSection";
import StructuredData from "@/components/seo/StructuredData";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import {
    createPrimaryPagesItemListSchema,
    createWebPageSchema,
    siteDescription,
} from "@/lib/seo";
import {
    ArrowUpRightIcon,
    CheckCircleIcon,
    ShoppingCartIcon,
    SwatchesIcon,
    TimerIcon,
    type Icon,
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { preload } from "react-dom";

import BrandMarquee from "@/components/marketing/BrandMarquee";
import {
    aboutContent,
    companies,
    customSolutionFormContent,
    landingPageTitle,
    solutionsContent,
    type SolutionStatIcon,
} from "@/mocks/landing-page";
import { works, worksSectionContent } from "@/mocks/works";
import { trackCtaClick } from "@/utils/analytics";
import { startWhatsAppChat } from "@/utils/whatsapp";
const MagicRingsSection = dynamic(
  () => import("@/components/elements/MagicRingsSection"),
  {
    ssr: false,
  },
);

const HERO_POSTER_URL = "/imgs/banner-video-poster.webp";
const MOBILE_MEDIA = "(max-width: 767px)";
// First compatible source wins: 480p on phones, 720p elsewhere; AV1 (~45% lighter) before H.264.
const heroVideoSources = [
  { src: "/videos/banner-video-480-av1.mp4", type: 'video/mp4; codecs="av01.0.04M.08"', media: MOBILE_MEDIA },
  { src: "/videos/banner-video-480-h264.mp4", type: 'video/mp4; codecs="avc1.640028"', media: MOBILE_MEDIA },
  { src: "/videos/banner-video-720-av1.mp4", type: 'video/mp4; codecs="av01.0.05M.08"' },
  { src: "/videos/banner-video-720-h264.mp4", type: 'video/mp4; codecs="avc1.640028"' },
];

const solutionStatIcons: Record<SolutionStatIcon, Icon> = {
  themes: SwatchesIcon,
  products: ShoppingCartIcon,
  time: TimerIcon,
};

const homePageSchemas = [
  createWebPageSchema({
    name: landingPageTitle,
    description: siteDescription,
    path: "/",
  }),
  createPrimaryPagesItemListSchema(),
];

export default function Home() {
  const router = useRouter();
  const [enableDecorativeFx, setEnableDecorativeFx] = useState(false);
  // The poster is the hero's first paint (LCP candidate): fetch it early.
  preload(HERO_POSTER_URL, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // The rings only render on desktop, so don't download three.js elsewhere.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (reducedMotion || !isDesktop) return;
    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const scheduleEnable = () => setEnableDecorativeFx(true);
    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(scheduleEnable, { timeout: 1200 });

      return () => {
        if (typeof win.cancelIdleCallback === "function") {
          win.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = setTimeout(scheduleEnable, 700);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <StructuredData data={homePageSchemas} id="plssistemas-home-seo" />
      <main className="flex flex-col">
        <VideoSection
          size="full"
          sources={heroVideoSources}
          posterUrl={HERO_POSTER_URL}
          lazyLoad
          containerClassName="!min-h-[min(calc(100svh_-_5rem),56.25vw)]"
          // Theme-tinted wash so the centered copy keeps contrast in light and dark modes,
          // fading into the page background at the bottom.
          overlayClassName="bg-background/60 !bg-[linear-gradient(to_top,var(--color-background)_0%,transparent_28%),radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--color-background)_80%,transparent)_0%,transparent_75%)]"
          contentClassName="gap-8 px-6 py-14 text-center sm:py-24"
        >
          <Title
            content="Soluções web para impulsionar seu negócio."
            className="max-w-3xl font-semibold tracking-wide text-foreground !text-3xl sm:!text-5xl lg:!text-6xl [text-shadow:0_0_18px_var(--color-background),0_0_4px_var(--color-background)]"
          />
          <p className="max-w-xl text-foreground/90 text-base sm:text-lg leading-relaxed [text-shadow:0_0_18px_var(--color-background),0_0_4px_var(--color-background)]">
            Criamos experiências online que encantam seus clientes e
            impulsionam seu negócio para o sucesso.
          </p>
          <FadeContainer
            once
            className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              type="button"
              label="Entrar em contato"
              onClick={() => startWhatsAppChat()}
              className="!rounded-full !bg-secondary-500 !px-8 !py-4 !text-black !shadow-none font-bold cursor-pointer transition-all duration-200 hover:!bg-secondary-400 hover:scale-[1.03] active:scale-[0.98]"
            />
            <Button
              type="button"
              variant="outlined"
              label="Ver serviços"
              onClick={() => router.push("/servicos")}
              className="!rounded-full !border !border-foreground/70 !px-8 !py-4 !text-foreground !shadow-none font-bold cursor-pointer transition-all duration-200 hover:!border-foreground hover:!bg-foreground/10 hover:scale-[1.03] active:scale-[0.98]"
            />
          </FadeContainer>
        </VideoSection>

        <div id={aboutContent.sectionId} className="scroll-mt-8">
          <Section size="full" sectionClassName="bg-background py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={aboutContent.title}
                element="h2"
                className="text-center text-foreground tracking-[0.18em] font-black"
              />
            </RevealContainer>

            <div className="mt-12 grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <ZoomContainer once className="w-full">
                <div className="relative mx-auto max-w-2xl bg-gradient-to-br from-primary-700/60 to-primary-900/80 flex justify-center rounded-2xl ring-1 ring-primary-400/20 shadow-[0_20px_60px_rgba(126,30,237,0.22)]">
                  <Image
                    src="/imgs/profile_3.webp"
                    alt="Equipe da PLS Sistemas trabalhando em projetos web"
                    width={360}
                    height={76}
                    sizes="(max-width: 1024px) 90vw, 360px"
                    className="contrast-115"
                  />
                </div>
              </ZoomContainer>

              <RevealContainer once className="w-full">
                <div className="space-y-5 ">
                  {aboutContent.paragraphs.map((text) => (
                    <Paragraph
                      key={text}
                      content={text}
                      className="text-foreground/90 text-lg leading-8 sm:text-2xl"
                    />
                  ))}
                </div>
              </RevealContainer>
            </div>
          </Section>
        </div>

        <div
          className="w-full flex flex-col items-center max-w-6xl mx-auto gap-4 p-8 px-4 mt-8 scroll-mt-12 sm:scroll-mt-14"
          id="empresas"
        >
          <Title content="Empresas assistidas" element="h3" />
          <Subtitle
            content="Empresas que já foram impactadas pelos nossos serviços"
            weight="light"
            className="text-center"
          />
          <div className="flex w-full mt-4">
            <BrandMarquee
              logos={companies}
              imageFilter="grayscale"
              speed={48}
            />
          </div>
        </div>

        <div id={solutionsContent.sectionId} className="scroll-mt-8">
          <Section size="full" sectionClassName="bg-surface py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={solutionsContent.title}
                element="h2"
                className="text-center text-foreground tracking-[0.16em] font-black"
              />
              <Subtitle
                content={solutionsContent.subtitle}
                className="mx-auto mt-4 max-w-4xl text-center text-foreground/85 text-xl sm:text-4xl !font-light"
              />
            </RevealContainer>

            <div className="mt-12 flex w-full max-w-6xl flex-col gap-8">
              {solutionsContent.items.map((solution) => (
                <FadeContainer key={solution.name} once>
                  <article className="relative isolate grid gap-10 overflow-hidden rounded-3xl border border-foreground/12 bg-foreground/[0.03] p-6 shadow-[0_18px_48px_var(--elevation-color)] sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                    {/* Soft glow in the product's brand colors */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,194,14,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(210,27,27,0.1),transparent_45%)]"
                    />

                    <div className="flex flex-col gap-6">
                      <Image
                        src={solution.logoPath}
                        alt={solution.name}
                        width={195}
                        height={31}
                        unoptimized
                        className="h-8 w-auto self-start sm:h-9"
                      />
                      <Subtitle
                        content={solution.headline}
                        element="h3"
                        weight="bold"
                        className="text-foreground !text-2xl leading-tight sm:!text-4xl"
                      />
                      <Paragraph
                        content={solution.description}
                        className="text-foreground/75 !text-base leading-7 sm:!text-lg"
                      />

                      <ul className="grid gap-3 sm:grid-cols-2">
                        {solution.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-sm leading-6 text-foreground/85 sm:text-base"
                          >
                            <CheckCircleIcon
                              aria-hidden="true"
                              weight="fill"
                              className="mt-0.5 h-5 w-5 shrink-0 text-success-600 dark:text-success-400"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/65">
                          {solutionsContent.segmentsLabel}
                        </span>
                        <ul className="flex flex-wrap gap-2">
                          {solution.segments.map((segment) => (
                            <li
                              key={segment}
                              className="rounded-full border border-foreground/15 bg-foreground/[0.05] px-3 py-1.5 text-xs text-foreground/85 sm:text-sm"
                            >
                              {segment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={solution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackCtaClick({
                            ctaLabel: solution.ctaLabel,
                            ctaLocation: "solutions",
                            destinationUrl: solution.url,
                            siteName: solution.name,
                          })
                        }
                        className="inline-flex w-fit items-center gap-2 rounded-full bg-[#D21B1B] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(210,27,27,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b51717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D21B1B]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
                      >
                        {solution.ctaLabel}
                        <ArrowUpRightIcon aria-hidden="true" weight="bold" className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-[0_18px_48px_var(--elevation-color)]">
                        {/* Browser-style frame around the product screenshot */}
                        <div
                          aria-hidden="true"
                          className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.04] px-4 py-2.5"
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                          <span className="ml-3 truncate text-xs text-foreground/60">
                            {solution.url.replace(/^https?:\/\//, "")}
                          </span>
                        </div>
                        <Image
                          src={solution.imagePath}
                          alt={solution.imageAlt}
                          width={1100}
                          height={602}
                          sizes="(max-width: 1024px) 100vw, 560px"
                          className="h-auto w-full"
                        />
                      </div>

                      <dl className="grid grid-cols-3 gap-3">
                        {solution.stats.map((stat) => {
                          const StatIcon = solutionStatIcons[stat.icon];

                          return (
                            <div
                              key={stat.label}
                              className="flex flex-col items-center gap-1 rounded-xl border border-foreground/10 bg-foreground/[0.04] px-1.5 py-3 text-center sm:px-2"
                            >
                              <dt className="order-2 text-[11px] leading-tight text-foreground/70 sm:text-xs">
                                {stat.label}
                              </dt>
                              <dd className="order-1 flex flex-col items-center gap-1.5">
                                <StatIcon
                                  aria-hidden="true"
                                  weight="duotone"
                                  className="h-6 w-6 text-[#D21B1B] sm:h-7 sm:w-7 dark:text-[#FFC20E]"
                                />
                                <span className="whitespace-nowrap text-base font-black text-foreground sm:text-2xl">
                                  {stat.value}
                                </span>
                              </dd>
                            </div>
                          );
                        })}
                      </dl>
                    </div>
                  </article>
                </FadeContainer>
              ))}
            </div>
          </Section>
        </div>

        <div id={worksSectionContent.sectionId} className="scroll-mt-8">
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-background py-20 sm:py-24"
          >
            <div className="relative z-10 flex w-full flex-col items-center">
              <RevealContainer once className="w-full max-w-6xl">
                <Title
                  content={worksSectionContent.title}
                  element="h2"
                  className="text-center text-foreground tracking-[0.16em] font-black"
                />
                <Subtitle
                  content={worksSectionContent.subtitle}
                  className="mx-auto mt-4 max-w-4xl text-center text-foreground/85 text-xl sm:text-4xl !font-light"
                />
              </RevealContainer>

              <div className="mt-12 grid w-full max-w-6xl gap-6 lg:grid-cols-3">
                {works.map((work, index) => (
                  <FadeContainer
                    key={work.title}
                    once
                    delay={index + 1}
                    className="h-full"
                  >
                    <article className="group flex h-full flex-col gap-5 rounded-2xl border border-foreground/12 bg-foreground/[0.04] p-5 shadow-[0_18px_48px_var(--elevation-color)] backdrop-blur transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.07] hover:-translate-y-1 hover:shadow-[0_28px_56px_var(--elevation-color-strong)]">
                      <div className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10">
                        <Image
                          src={work.imageUrl}
                          alt={`Preview do website ${work.title}`}
                          width={1280}
                          height={820}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="h-auto w-full object-cover transition duration-500 scale-[1.1] group-hover:scale-[1.3]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-4">
                        <Subtitle
                          content={work.title}
                          element="h3"
                          className="text-foreground text-3xl sm:text-4xl"
                        />

                        <Paragraph
                          content={work.description}
                          className="text-foreground/70 text-base leading-7 sm:text-xl"
                        />

                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex w-fit items-center rounded-full border border-primary-300/30 bg-primary-500/12 px-4 py-2 text-sm font-semibold text-highlight transition-all duration-200 hover:border-primary-400/60 hover:bg-primary-500/25 hover:text-foreground hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/60 sm:text-base"
                          onClick={() =>
                            trackCtaClick({
                              ctaLabel: worksSectionContent.ctaLabel,
                              ctaLocation: "portfolio",
                              destinationUrl: work.link,
                              siteName: work.title,
                            })
                          }
                        >
                          {worksSectionContent.ctaLabel}
                        </a>
                      </div>
                    </article>
                  </FadeContainer>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* <div id={testimonialsContent.sectionId}>
          <Section size="full" sectionClassName="bg-surface py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={testimonialsContent.title}
                element="h2"
                className="text-center text-foreground tracking-[0.16em] font-black"
              />
              <Subtitle
                content={testimonialsContent.subtitle}
                className="mx-auto mt-4 max-w-4xl text-center text-foreground/90 text-xl sm:text-4xl"
              />
            </RevealContainer>

            <div className="mt-12 grid w-full max-w-6xl gap-6 lg:grid-cols-3">
              {testimonialsContent.items.map((item, index) => (
                <ZoomContainer
                  key={item.name}
                  once
                  delay={index + 1}
                  className="h-full"
                >
                  <article className="flex h-full flex-col items-center gap-5 rounded-xl border border-border-card bg-bg-card p-8 text-center shadow-[0_16px_45px_var(--elevation-color)]">
                    <Image
                      src={item.avatarUrl}
                      alt={`Avatar de ${item.name}`}
                      width={92}
                      height={92}
                      className="h-[92px] w-[92px] rounded-full border-2 border-foreground/25 object-cover"
                    />

                    <Paragraph
                      content={`“${item.quote}”`}
                      className="text-foreground/85 text-base sm:text-2xl"
                    />

                    <div className="flex flex-col items-center gap-1">
                      <Subtitle
                        content={item.name}
                        className="text-foreground text-2xl sm:text-4xl"
                      />
                      <Paragraph
                        content={item.role}
                        className="text-foreground/65 text-sm sm:text-xl"
                      />
                    </div>
                  </article>
                </ZoomContainer>
              ))}
            </div>
          </Section>
        </div> */}

        <div id={customSolutionFormContent.sectionId} className="scroll-mt-8">
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-background py-20 sm:py-24"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              {enableDecorativeFx ? (
                <MagicRingsSection
                  color="#9f46ff"
                  colorTwo="#841eb7"
                  speed={0.8}
                  ringCount={6}
                  attenuation={12}
                  lineThickness={1.8}
                  baseRadius={0.28}
                  radiusStep={0.12}
                  scaleRate={0.11}
                  opacity={0.9}
                  blur={1}
                  noiseAmount={0.03}
                  rotation={-18}
                  ringGap={1.38}
                />
              ) : null}
            </div>

            <div className="relative z-10 flex w-full flex-col items-center">
              <RevealContainer once className="w-full max-w-6xl">
                <Title
                  content={customSolutionFormContent.title}
                  element="h2"
                  className="text-center text-foreground tracking-[0.16em] font-black"
                />

                <Subtitle
                  content={customSolutionFormContent.description}
                  className="mx-auto mt-5 max-w-5xl text-center text-foreground/90 text-xl sm:text-4xl !font-light"
                />
              </RevealContainer>

              <FadeContainer once className="mt-12 w-full max-w-4xl">
                <div className="flex justify-center">
                  <Button
                    label={customSolutionFormContent.submitLabel}
                    variant="filled"
                    className="relative isolate flex items-center justify-center overflow-hidden rounded-2xl border border-success-300/40 bg-gradient-to-r from-success-500 via-success-600 to-success-500 px-8 py-4 shadow-[0_14px_32px_rgba(16,185,129,0.4)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-success-400/35 before:blur-2xl before:content-[''] hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(16,185,129,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-300/60 text-white font-bold text-lg sm:text-3xl cursor-pointer"
                    onClick={() => {
                      trackCtaClick({
                        ctaLabel: customSolutionFormContent.submitLabel,
                        ctaLocation: "custom_solution_section",
                      });
                      startWhatsAppChat();
                    }}
                  />
                </div>
              </FadeContainer>
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
}
