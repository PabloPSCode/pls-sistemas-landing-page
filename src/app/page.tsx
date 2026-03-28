"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import StructuredData from "@/components/seo/StructuredData";
import { Section } from "@/components/elements/Section";
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

import { FadeText } from "@/components/animations-and-loading/FadeText";
import TechParticlesHeroSection from "@/components/elements/TechParticlesHeroSection";
import BrandMarquee from "@/components/marketing/BrandMarquee";
import {
  aboutContent,
  companies,
  customSolutionFormContent,
  landingServicesContent,
  landingPageTitle,
  webSolutionsContent,
} from "@/mocks/landing-page";
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
    "Sites e landing pages profissionais sob medida para empresas e profissionais.",
    "Ferramentas web prontas para facilitar o seu dia a dia.",
    "Soluções digitais personalizadas para alavancar o seu negócio.",
  ];

  return (
    <div className="overflow-x-hidden bg-[#020205] text-white">
      <StructuredData data={homePageSchemas} id="plssistemas-home-seo" />
      <main className="flex flex-col">
        <TechParticlesHeroSection className="m-auto flex w-full min-h-[50vh] items-center justify-center bg-gradient-to-br from-[#000000] via-[#250c48] to-[#7E1EED] px-4 py-20 text-center sm:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            
            <FadeText
              items={heroTexts}
              wrapper="p"
              className="mt-8 max-w-4xl text-center font-semibold tracking-wide text-white/95 text-3xl sm:text-5xl"
            />
          </div>
        </TechParticlesHeroSection>

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
          <Section
            size="full"
            sectionClassName="relative isolate overflow-hidden bg-gradient-to-br from-[#000000] via-[#250c48] to-[#7E1EED] py-20 sm:py-24"
          >
            <div className="relative z-10 flex w-full flex-col items-center">
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

              <div className="mt-12 grid w-full max-w-6xl gap-6 md:grid-cols-2">
                {landingServicesContent.items.map((item, index) => {
                  const Icon = landingServiceIcons[index];

                  return (
                    <FadeContainer
                      key={item.title}
                      once
                      delay={index + 1}
                      className="h-full"
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
                >
                  <Subtitle
                    content="Quero criar meu site ou landing page"
                    className="text-white text-lg sm:text-3xl text-center"
                  />
                </Link>
              </RevealContainer>
            </div>
          </Section>
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
                    </RevealContainer>
                  );
                })}
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
            sectionClassName="bg-gradient-to-br from-[#000000] via-[#250c48] to-[#7E1EED] py-20 sm:py-24"
          >
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
                  onClick={() => startWhatsAppChat()}
                />
              </div>
            </FadeContainer>
          </Section>
        </div>
      </main>
    </div>
  );
}
