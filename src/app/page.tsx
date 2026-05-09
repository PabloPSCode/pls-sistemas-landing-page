"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import TargetCursor from "@/components/cursors";
import DotGridSection from "@/components/elements/DotGridSection";
import MagicRingsSection from "@/components/elements/MagicRingsSection";
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
import {
  MagnifyingGlassIcon,
  PaintBrushIcon,
  TableIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import Image from "next/image";

import BorderedGlowCard from "@/components/animations-and-loading/BorderedGlowCard";
import { FadeText } from "@/components/animations-and-loading/FadeText";
import VideoSection from "@/components/elements/VideoSection";
import BrandMarquee from "@/components/marketing/BrandMarquee";
import {
  aboutContent,
  companies,
  customSolutionFormContent,
  landingPageTitle,
  landingServicesContent,
  webSolutionsContent,
} from "@/mocks/landing-page";
import { works, worksSectionContent } from "@/mocks/works";
import { trackCtaClick } from "@/utils/analytics";
import { startWhatsAppChat } from "@/utils/whatsapp";
import Link from "next/link";

const landingServiceIcons = [
  TableIcon,
  PaintBrushIcon,
  MagnifyingGlassIcon,
  WrenchIcon,
];

const homePageSchemas = [
  createWebPageSchema({
    name: landingPageTitle,
    description: siteDescription,
    path: "/",
  }),
  createPrimaryPagesItemListSchema(),
];

export default function Home() {
  const heroTexts = [
    "Sites e landing pages com qualidade premium.",
    "Ferramentas web prontas para facilitar o seu dia a dia.",
    "Soluções digitais personalizadas para alavancar o seu negócio.",
  ];

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="overflow-x-hidden bg-[#020205] text-white">
      <StructuredData data={homePageSchemas} id="plssistemas-home-seo" />
      <TargetCursor
        targetSelector="#portfolio .portfolio-card-target"
        zoneSelector="#portfolio"
        hideDefaultCursor={false}
        spinDuration={3}
      />
      <main className="flex flex-col">
        <section className="relative overflow-hidden ">
          <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-black/80 via-primary-500/50 to-black/20 flex flex-col items-center justify-center" />
          <VideoSection
            size="full"
            videoUrl="/videos/setup.mp4"
            showPlayPauseButton={false}
            showOverlay
            containerClassName="!min-h-[82vh] bg-transparent"
          />
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center h-full">
            <div className="mx-auto my-auto min-h-[95vh] flex w-full max-w-7xl items-center justify-center2 px-6 pb-16 lg:px-8">
              <RevealContainer
                once
                className="pointer-events-auto m-auto space-y-8"
              >
                <FadeText
                  items={heroTexts}
                  wrapper="p"
                  className="mt-8 max-w-4xl text-center font-semibold tracking-wide text-white/95 text-3xl sm:text-5xl"
                />

                <FadeContainer
                  once
                  className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                >
                  <Button
                    type="button"
                    label="Entrar em contato"
                    onClick={() => startWhatsAppChat()}
                    className="!rounded-full !bg-secondary-500 !px-8 !py-4 !text-black !shadow-none font-bold"
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    label="Ver portfólio"
                    onClick={() => scrollToSection("portfolio")}
                    className="!rounded-full !border !border-white !px-8 !py-4 !text-white !shadow-none font-bold"
                  />
                </FadeContainer>
              </RevealContainer>
            </div>
          </div>
        </section>

        <div id={aboutContent.sectionId} className="scroll-mt-8">
          <Section size="full" sectionClassName="bg-[#030307] py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={aboutContent.title}
                element="h2"
                className="text-center text-white tracking-[0.18em] font-black"
              />
            </RevealContainer>

            <div className="mt-12 grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <ZoomContainer once className="w-full">
                <div className="relative mx-auto  max-w-2xl bg-gradient-to-br from-primary-100 to-primary-300 flex justify-center rounded-lg">
                  <Image
                    src="/imgs/profile_3.png"
                    alt="Equipe da PLS Sistemas trabalhando em projetos web"
                    width={360}
                    height={76}
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

            <div
              className="w-full flex flex-col items-center max-w-7xl mx-auto gap-4 py-8 px-4 my-8 scroll-mt-12 sm:scroll-mt-14"
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
                  speed={120}
                />
              </div>
            </div>
          </Section>
        </div>

        <div id={landingServicesContent.sectionId} className="scroll-mt-8">
          <DotGridSection
            className="relative isolate bg-[#05020b] py-20 sm:py-24"
            dotSize={8}
            gap={18}
            baseColor="#2c1247"
            activeColor="#8f3dff"
            proximity={170}
            shockRadius={220}
            shockStrength={4}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(143,61,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(27,109,255,0.12),transparent_30%)]"
            />

            <div className="relative z-10 mx-auto flex w-full flex-col items-center px-8">
              <RevealContainer once className="w-full max-w-6xl">
                <Title
                  content="Websites e Landing Pages"
                  element="h2"
                  className="text-center text-white tracking-[0.16em] font-black"
                />
                <Subtitle
                  content="Criação de sites e landing pages profissionais e otimizados para conversão."
                  className="mx-auto mt-4 max-w-4xl text-center text-white/90 text-xl sm:text-4xl !font-light"
                />
              </RevealContainer>

              <div className="mt-12 grid w-full max-w-6xl gap-6 sm:grid-cols-2 md:grid-cols-3">
                {landingServicesContent.items.map((item, index) => {
                  const Icon = landingServiceIcons[index];

                  return (
                    <FadeContainer
                      key={item.title}
                      once
                      delay={index + 1}
                      className="h-full"
                    >
                      <BorderedGlowCard
                        edgeSensitivity={300}
                        glowColor="40 80 80"
                        backgroundColor="#060010"
                        borderRadius={12}
                        glowRadius={10}
                        glowIntensity={1}
                        coneSpread={25}
                        animated={false}
                        colors={["#c084fc", "#aa08cf", "#f838bf"]}
                      >
                        <article className="flex h-full flex-col gap-4 rounded-xl border border-white/15 bg-[rgba(0,0,0,0.52)] p-8 shadow-[0_16px_45px_rgba(0,0,0,0.35)] ">
                          <div className="flex items-start justify-between gap-4">
                            <Icon
                              size={44}
                              className="text-primary-100"
                              weight="light"
                            />
                            <Link
                              href="/landing-pages#criar-site-landing-page"
                              className="flex items-center gap-2"
                            >
                              <Subtitle
                                content={item.ctaLabel}
                                className="text-primary-200 text-lg sm:text-3xl"
                              />
                            </Link>
                          </div>

                          <Subtitle
                            content={item.title}
                            element="h3"
                            className="text-white text-3xl sm:text-5xl"
                          />

                          <Paragraph
                            content={item.description}
                            className="text-white/80 text-base sm:text-2xl"
                          />
                        </article>
                      </BorderedGlowCard>
                    </FadeContainer>
                  );
                })}
              </div>
              <RevealContainer
                once
                className="w-full flex justify-center items-center mt-8 mx-auto"
              >
                <Link
                  href="/landing-pages#criar-site-landing-page"
                  className="relative isolate flex items-center justify-center overflow-hidden rounded-xl border border-primary-300/35 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 px-6 py-3 shadow-[0_14px_32px_rgba(96,61,255,0.35)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-primary-400/35 before:blur-2xl before:content-[''] hover:-translate-y-0.5 hover:from-primary-600 hover:to-primary-700 hover:shadow-[0_20px_38px_rgba(110,76,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/60"
                  id="criar-site-landing-page"
                  onClick={() =>
                    trackCtaClick({
                      ctaLabel: "Quero criar meu site ou landing page",
                      ctaLocation: "landing_pages_section",
                      destinationUrl: "/landing-pages#criar-site-landing-page",
                    })
                  }
                >
                  <Subtitle
                    content="Quero criar meu site ou landing page"
                    className="text-white text-base sm:text-2xl text-center"
                  />
                </Link>
              </RevealContainer>
            </div>
          </DotGridSection>
        </div>

        <div id={webSolutionsContent.sectionId} className="scroll-mt-8">
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-[#030307] py-20 sm:py-24"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(86,144,255,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(143,51,255,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] backdrop-blur-[3px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 top-12 h-56 w-56 rounded-full bg-primary-400/10 blur-3xl"
            />

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
                      <BorderedGlowCard
                        edgeSensitivity={300}
                        glowColor="40 80 80"
                        backgroundColor="#060010"
                        borderRadius={12}
                        glowRadius={10}
                        glowIntensity={1}
                        coneSpread={25}
                        animated={false}
                        colors={["#c084fc", "#aa08cf", "#f838bf"]}
                      >
                        <article className="flex h-full flex-col gap-4 rounded-xl border border-white/15 bg-[rgba(0,0,0,0.52)] p-8 shadow-[0_16px_45px_rgba(0,0,0,0.35)]">
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
                      </BorderedGlowCard>
                    </RevealContainer>
                  );
                })}
              </div>
            </div>
          </Section>
        </div>

        <div
          id={worksSectionContent.sectionId}
          className="scroll-mt-8 cursor-none [&_*]:cursor-none"
        >
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-gradient-to-br from-[#000000] via-[#250c48] to-[#7E1EED] py-20 sm:py-24"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,30,237,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(86,144,255,0.12),transparent_40%)]"
            />

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
                    <article className="portfolio-card-target group flex h-full flex-col gap-5 rounded-[28px] border border-white/12 bg-white/[0.04] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.32)] backdrop-blur">
                      <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black/30">
                        <Image
                          src={work.imageUrl}
                          alt={`Preview do website ${work.title}`}
                          width={1280}
                          height={820}
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
                          className="text-white/72 text-base leading-7 sm:text-xl"
                        />

                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex w-fit items-center rounded-full border border-primary-300/30 bg-primary-500/12 px-4 py-2 text-sm font-semibold text-primary-100 transition hover:border-primary-200/50 hover:bg-primary-500/20 hover:text-white sm:text-base"
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
            sectionClassName="relative isolate overflow-hidden bg-gradient-to-r from-[#2c015a] via-[#2e0344] to-[#300360] py-20 sm:py-24"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
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
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(159,70,255,0.18),transparent_34%),linear-gradient(180deg,rgba(4,3,10,0.1),rgba(4,3,10,0.76))]"
            />

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
                    className="relative isolate flex items-center justify-center overflow-hidden rounded-xl border border-success-300/35 bg-gradient-to-r from-success-500 via-success-600 to-success-500 px-6 py-3 shadow-[0_14px_32px_rgba(100,21,255,0.35)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-success-400/35 before:blur-2xl before:content-[''] hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(82, 255, 76, 0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-300/60 text-white font-bold text-lg sm:text-3xl"
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
