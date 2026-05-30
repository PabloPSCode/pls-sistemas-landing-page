"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import { Section } from "@/components/elements/Section";
import StructuredData from "@/components/seo/StructuredData";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import {
  createPrimaryPagesItemListSchema,
  createWebPageSchema,
  siteDescription,
} from "@/lib/seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { HeroSection } from "@/components/elements/HeroSection";
import BrandMarquee from "@/components/marketing/BrandMarquee";
import {
  aboutContent,
  companies,
  customSolutionFormContent,
  landingPageTitle,
  webSolutionsContent,
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

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const win = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const scheduleEnable = () => setEnableDecorativeFx(!reducedMotion);
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
    <div className="overflow-x-hidden bg-[#020205] text-white">
      <StructuredData data={homePageSchemas} id="plssistemas-home-seo" />
      <main className="flex flex-col">
        <HeroSection
          size="full"
          sectionClassName="bg-[#020205] relative isolate overflow-hidden !px-0 !py-0"
          children={
            <div className="w-full">
              {/* ── MOBILE / TABLET ─────────────────────────────────────────────
                  Stacked column: image on top, text below.
                  Hidden at lg and above.
              ──────────────────────────────────────────────────────────────── */}
              <div className="md:hidden">
                {/* Image block */}
                <div className="relative h-[28vh] w-full overflow-hidden">
                  <Image
                    aria-hidden="true"
                    src="/imgs/mosaic_bg.png"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="pointer-events-none select-none object-cover object-top"
                  />
                  {/* Fade bottom of image into the dark background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#020205] to-transparent"
                  />
                </div>

                {/* Text content below image */}
                <div className="flex flex-col items-center gap-8 px-6 pt-2 text-center">
                  <Title
                    content="Soluções web para impulsionar seu negócio."
                    className="max-w-lg font-semibold tracking-wide text-white/95 !text-3xl sm:!text-4xl"
                  />
                  <p className="max-w-sm text-center text-white/80 text-base sm:text-lg leading-relaxed">
                    Criamos experiências online que encantam seus clientes e
                    impulsionam seu negócio para o sucesso.
                  </p>
                  <FadeContainer
                    once
                    className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
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
                      className="!rounded-full !border !border-white/70 !px-8 !py-4 !text-white !shadow-none font-bold cursor-pointer transition-all duration-200 hover:!border-white hover:!bg-white/10 hover:scale-[1.03] active:scale-[0.98]"
                    />
                  </FadeContainer>
                </div>
              </div>

              {/* ── DESKTOP ─────────────────────────────────────────────────────
                  Split layout: image right, text left, gradient glue.
                  Hidden below md.
              ──────────────────────────────────────────────────────────────── */}
              <div className="hidden md:block relative min-h-[64vh]">
                {/* Background image anchored to the right column */}
                <Image
                  aria-hidden="true"
                  src="/imgs/mosaic_bg.png"
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="pointer-events-none absolute inset-0 z-0 select-none object-cover object-right opacity-80"
                />

                {/* Horizontal gradient: black left → transparent right — the "glue" */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#020205] from-[26%] via-[#020205]/78 via-[52%] to-transparent to-[78%]"
                />

                {/* Bottom fade into next section */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[#020205] to-transparent"
                />

                {/* Subtle purple radial accent on the left */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_left_center,rgba(126,30,237,0.18)_0%,transparent_54%)]"
                />

                {/* Text content — left column */}
                <div className="relative z-10 mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col justify-center px-12">
                  <div className="pointer-events-auto max-w-2xl space-y-8">
                    <Title
                      content="Soluções web para impulsionar seu negócio."
                      className="max-w-lg font-semibold tracking-wide text-white/95 text-4xl sm:text-6xl"
                    />
                    <p className="max-w-lg text-left text-white/80 text-base sm:text-lg leading-relaxed">
                      Criamos experiências online que encantam seus clientes e
                      impulsionam seu negócio para o sucesso.
                    </p>
                    <FadeContainer
                      once
                      className="flex flex-col gap-4 sm:flex-row items-center"
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
                        className="!rounded-full !border !border-white/70 !px-8 !py-4 !text-white !shadow-none font-bold cursor-pointer transition-all duration-200 hover:!border-white hover:!bg-white/10 hover:scale-[1.03] active:scale-[0.98]"
                      />
                    </FadeContainer>
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <div id={aboutContent.sectionId} className="scroll-mt-8">
          <Section size="full" sectionClassName="bg-[#020205] py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={aboutContent.title}
                element="h2"
                className="text-center text-white tracking-[0.18em] font-black"
              />
            </RevealContainer>

            <div className="mt-12 grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <ZoomContainer once className="w-full">
                <div className="relative mx-auto max-w-2xl bg-gradient-to-br from-primary-700/60 to-primary-900/80 flex justify-center rounded-2xl ring-1 ring-primary-400/20 shadow-[0_20px_60px_rgba(126,30,237,0.22)]">
                  <Image
                    src="/imgs/profile_3.png"
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
                      className="text-white/90 text-lg leading-8 sm:text-2xl"
                    />
                  ))}
                </div>
              </RevealContainer>
            </div>
          </Section>
        </div>

        <div
          className="w-full flex flex-col items-center max-w-7xl mx-auto gap-4 p-8 px-4 mt-8 scroll-mt-12 sm:scroll-mt-14"
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

        <div id={webSolutionsContent.sectionId} className="scroll-mt-8">
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-[#030307] py-20 sm:py-24"
          >
            <div className="relative z-10 flex w-full flex-col items-center">
              <RevealContainer once className="w-full max-w-6xl">
                <Title
                  content={webSolutionsContent.title}
                  element="h2"
                  className="text-center text-white tracking-[0.16em] font-black"
                />
                <Subtitle
                  content={webSolutionsContent.subtitle}
                  className="mx-auto mt-4 max-w-4xl text-center text-white/90 text-xl sm:text-4xl !font-light"
                />
              </RevealContainer>

              <div className="mt-12 grid w-full max-w-6xl gap-6 lg:grid-cols-2">
                {webSolutionsContent.items.map((item, index) => {
                  return (
                    <RevealContainer
                      key={item.title}
                      once
                      delay={index + 1}
                      className="h-full"
                    >
                      <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/15 bg-[rgba(0,0,0,0.52)] p-8 shadow-[0_16px_45px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-primary-400/35 hover:bg-[rgba(8,3,18,0.68)] hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(0,0,0,0.48)]">
                        <div className="flex items-start justify-between gap-4">
                          <Image
                            src={item.imagePath}
                            alt={`Icone de ${item.title}`}
                            width={40}
                            height={40}
                          />
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer transition-colors duration-150"
                          >
                            <Subtitle
                              content={item.ctaLabel}
                              className="text-primary-200 text-lg sm:text-3xl"
                            />
                          </a>
                        </div>

                        <Subtitle
                          content={item.title}
                          element="h3"
                          className="text-white text-3xl sm:text-5xl"
                        />

                        <Paragraph
                          content={item.description}
                          className="text-white/85 text-base sm:text-2xl"
                        />
                      </article>
                    </RevealContainer>
                  );
                })}
              </div>
            </div>
          </Section>
        </div>

        <div id={worksSectionContent.sectionId} className="scroll-mt-8">
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-[#020205] py-20 sm:py-24"
          >
            <div className="relative z-10 flex w-full flex-col items-center">
              <RevealContainer once className="w-full max-w-6xl">
                <Title
                  content={worksSectionContent.title}
                  element="h2"
                  className="text-center text-white tracking-[0.16em] font-black"
                />
                <Subtitle
                  content={worksSectionContent.subtitle}
                  className="mx-auto mt-4 max-w-4xl text-center text-white/85 text-xl sm:text-4xl !font-light"
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
                    <article className="group flex h-full flex-col gap-5 rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.32)] backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(0,0,0,0.42)]">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
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
                          className="text-white text-3xl sm:text-4xl"
                        />

                        <Paragraph
                          content={work.description}
                          className="text-white/70 text-base leading-7 sm:text-xl"
                        />

                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex w-fit items-center rounded-full border border-primary-300/30 bg-primary-500/12 px-4 py-2 text-sm font-semibold text-primary-100 transition-all duration-200 hover:border-primary-200/60 hover:bg-primary-500/25 hover:text-white hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/60 sm:text-base"
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
          <Section size="full" sectionClassName="bg-[#030307] py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={testimonialsContent.title}
                element="h2"
                className="text-center text-white tracking-[0.16em] font-black"
              />
              <Subtitle
                content={testimonialsContent.subtitle}
                className="mx-auto mt-4 max-w-4xl text-center text-white/90 text-xl sm:text-4xl"
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
                  <article className="flex h-full flex-col items-center gap-5 rounded-xl border border-white/10 bg-[#2B2B2B] p-8 text-center shadow-[0_16px_45px_rgba(0,0,0,0.35)]">
                    <Image
                      src={item.avatarUrl}
                      alt={`Avatar de ${item.name}`}
                      width={92}
                      height={92}
                      className="h-[92px] w-[92px] rounded-full border-2 border-white/25 object-cover"
                    />

                    <Paragraph
                      content={`“${item.quote}”`}
                      className="text-white/85 text-base sm:text-2xl"
                    />

                    <div className="flex flex-col items-center gap-1">
                      <Subtitle
                        content={item.name}
                        className="text-white text-2xl sm:text-4xl"
                      />
                      <Paragraph
                        content={item.role}
                        className="text-white/65 text-sm sm:text-xl"
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
            sectionClassName="relative isolate overflow-hidden bg-[#020205] py-20 sm:py-24"
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
                  className="text-center text-white tracking-[0.16em] font-black"
                />

                <Subtitle
                  content={customSolutionFormContent.description}
                  className="mx-auto mt-5 max-w-5xl text-center text-white/90 text-xl sm:text-4xl !font-light "
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
