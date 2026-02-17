"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";

import { Section } from "@/components/elements/Section";
import VideoSection from "@/components/elements/VideoSection";
import TextAreaInput from "@/components/inputs/TextAreaInput";
import TextInput from "@/components/inputs/TextInput";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import {
  MagnifyingGlassIcon,
  PaintBrushIcon,
  TableIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import MaskedTextInput from "@/components/inputs/MaskedTextInput";
import BrandMarquee from "@/components/marketing/BrandMarquee";
import {
  aboutContent,
  companies,
  customSolutionFormContent,
  heroContent,
  landingServicesContent,
  webSolutionsContent,
} from "@/mocks/landing-page";
import { brazilianPhoneMask } from "@/utils/masks";

const landingServiceIcons = [
  TableIcon,
  PaintBrushIcon,
  MagnifyingGlassIcon,
  WrenchIcon,
];

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleVisitDocs = () => {
    window.open("https://docs.reactultimate.pablosilvadev.com.br", "_blank");
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="overflow-x-hidden bg-[#020205] text-white">
      <main className="flex flex-col">
        <div id="inicio">
          <VideoSection
            size="full"
            title={heroContent.title}
            description={heroContent.description}
            videoUrl="/videos/landing-pages.mov"
            primaryButtonTitle={heroContent.primaryButtonTitle}
            onPrimaryClick={handleVisitDocs}
            containerClassName="h-[90vh]"
            titleClassName="max-w-4xl"
            primaryButtonClassName="bg-white text-black"
          />
        </div>

        <div id={aboutContent.sectionId}>
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
                <div className="relative mx-auto w-full max-w-2xl">
                  <Image
                    src="/imgs/devices.png"
                    alt="Equipe da PLS Sistemas trabalhando em projetos web"
                    width={1200}
                    height={760}
                  />
                </div>
              </ZoomContainer>

              <RevealContainer once className="w-full">
                <div className="space-y-5">
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
              className="flex flex-col items-center max-w-7xl mx-auto gap-4 py-8 px-4 my-8 scroll-mt-12 sm:scroll-mt-14"
              id="empresas"
            >
              <Title content="Empresas assistidas" />
              <Subtitle
                content="Empresas que já foram impactadas pelos nossos serviços"
                weight="light"
              />
              <div className="flex w-full mt-4">
                <BrandMarquee logos={companies} imageFilter="grayscale" speed={120}/>
              </div>
            </div>
          </Section>
        </div>

        <div id={landingServicesContent.sectionId}>
          <Section
            size="full"
            sectionClassName="bg-gradient-to-b from-[#0f0327] via-[#3a126f] to-[#8f33ff] py-20 sm:py-24"
          >
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={landingServicesContent.title}
                element="h2"
                className="text-center text-white tracking-[0.16em] font-black"
              />
              <Subtitle
                content={landingServicesContent.subtitle}
                className="mx-auto mt-4 max-w-4xl text-center text-white/90 text-xl sm:text-4xl"
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
                    <article className="flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-[#2B2B2B] p-8 shadow-[0_16px_45px_rgba(0,0,0,0.35)]">
                      <div className="flex items-start justify-between gap-4">
                        <Icon
                          size={44}
                          className="text-primary-100"
                          weight="light"
                        />
                        <a href="#">
                          <Subtitle
                            content={item.ctaLabel}
                            className="text-primary-200 text-lg sm:text-3xl"
                          />
                        </a>
                      </div>

                      <Subtitle
                        content={item.title}
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
          </Section>
        </div>

        <div id={webSolutionsContent.sectionId}>
          <Section size="full" sectionClassName="bg-[#030307] py-20 sm:py-24">
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={webSolutionsContent.title}
                element="h2"
                className="text-center text-white tracking-[0.16em] font-black"
              />
              <Subtitle
                content={webSolutionsContent.subtitle}
                className="mx-auto mt-4 max-w-4xl text-center text-white/90 text-xl sm:text-4xl"
              />
            </RevealContainer>

            <div className="mt-12 grid w-full max-w-6xl gap-6 lg:grid-cols-3">
              {webSolutionsContent.items.map((item, index) => {
                return (
                  <RevealContainer
                    key={item.title}
                    once
                    delay={index + 1}
                    className="h-full"
                  >
                    <article className="flex h-full flex-col gap-4 rounded-xl border border-white/10 bg-[#2B2B2B] p-7 shadow-[0_16px_45px_rgba(0,0,0,0.32)]">
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

        <div id={customSolutionFormContent.sectionId}>
          <Section
            size="full"
            sectionClassName="bg-gradient-to-b from-[#0f0327] via-[#3a126f] to-[#8f33ff] py-20 sm:py-24"
          >
            <RevealContainer once className="w-full max-w-6xl">
              <Title
                content={customSolutionFormContent.title}
                element="h2"
                className="text-center text-white tracking-[0.16em] font-black"
              />

              <Subtitle
                content={customSolutionFormContent.description}
                className="mx-auto mt-5 max-w-5xl text-center text-white/90 text-xl sm:text-4xl"
              />
            </RevealContainer>

            <FadeContainer once className="mt-12 w-full max-w-4xl">
              <form
                onSubmit={handleFormSubmit}
                className="rounded-xl border border-white/10 bg-[#2B2B2B] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.28)] sm:p-7"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    id="nome"
                    label={customSolutionFormContent.nameLabel}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={customSolutionFormContent.namePlaceholder}
                  />

                  <MaskedTextInput
                    mask={brazilianPhoneMask}
                    id="telefone"
                    label={customSolutionFormContent.phoneLabel}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder={customSolutionFormContent.phonePlaceholder}
                  />
                </div>

                <div className="mt-3">
                  <TextAreaInput
                    id="mensagem"
                    label={customSolutionFormContent.messageLabel}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={customSolutionFormContent.messagePlaceholder}
                    maxTextLength={1000}
                    currentTextLength={message.length}
                    className="min-h-44"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    type="submit"
                    label={customSolutionFormContent.submitLabel}
                    variant="filled"
                    className="bg-[#7e2cff] px-6 py-3 text-white"
                  />
                </div>
              </form>
            </FadeContainer>
          </Section>
        </div>
      </main>
    </div>
  );
}
