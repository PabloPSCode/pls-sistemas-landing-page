"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import Footer from "@/components/elements/Footer";
import LandingHeader from "@/components/elements/LandingHeader";
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
  WhatsappLogoIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import {
  aboutContent,
  customSolutionFormContent,
  footerContent,
  heroContent,
  landingServicesContent,
  navItems,
  webSolutionsContent,
  whatsappFloatingLink,
} from "@/mocks/landing-page";

const landingServiceIcons = [
  TableIcon,
  PaintBrushIcon,
  MagnifyingGlassIcon,
  WrenchIcon,
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      <LandingHeader.Root
        bordered
        sticky
        className="bg-[#04050b]/95 text-white backdrop-blur border-white/10"
      >
        <LandingHeader.Left>
          <a href="#inicio" className="flex items-center gap-2">
            <Image
              src="/imgs/logo_pls_sistemas.png"
              alt="Equipe da PLS Sistemas trabalhando em projetos web"
              width={120}
              height={76}
              className="w-full"
            />
          </a>
        </LandingHeader.Left>

        <LandingHeader.Center>
          <LandingHeader.Nav className="justify-center gap-8">
            {navItems.map((item) => (
              <LandingHeader.Nav.Item key={item.href} href={item.href}>
                {item.label}
              </LandingHeader.Nav.Item>
            ))}
          </LandingHeader.Nav>
        </LandingHeader.Center>

        <LandingHeader.Right className="gap-3">
          <LandingHeader.MobileMenuToggle
            open={isMobileMenuOpen}
            onToggle={setIsMobileMenuOpen as never}
            className="text-white"
          />

          <LandingHeader.MobileMenuPanel open={isMobileMenuOpen}>
            {navItems.map((item) => (
              <LandingHeader.Nav.Item
                key={`mobile-${item.href}`}
                href={item.href}
              >
                {item.label}
              </LandingHeader.Nav.Item>
            ))}
          </LandingHeader.MobileMenuPanel>

          <LandingHeader.CTA
            label="Falar com especialista"
            className="hidden md:flex bg-[#7e2cff] text-white"
            onClick={() => {
              window.location.href = `#${customSolutionFormContent.sectionId}`;
            }}
          />
        </LandingHeader.Right>
      </LandingHeader.Root>

      <main className="flex flex-col">
        <div id="inicio">
          <VideoSection
            size="full"
            title={heroContent.title}
            description={heroContent.description}
            videoUrl="/videos/landing-pages.mov"
            primaryButtonTitle={heroContent.primaryButtonTitle}
            onPrimaryClick={handleVisitDocs}
            containerClassName="h-[calc(80vh)]"
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
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
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
                className="rounded-none border border-white/10 bg-[#2B2B2B] p-5 shadow-[0_16px_45px_rgba(0,0,0,0.28)] sm:p-7"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    id="nome"
                    label={customSolutionFormContent.nameLabel}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder={customSolutionFormContent.namePlaceholder}
                    className="border-white/25 bg-white/90 text-black placeholder:text-black/60"
                  />

                  <TextInput
                    id="telefone"
                    label={customSolutionFormContent.phoneLabel}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder={customSolutionFormContent.phonePlaceholder}
                    className="border-white/25 bg-white/90 text-black placeholder:text-black/60"
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
                    className="min-h-44 border-white/25 bg-white/90 text-black placeholder:text-black/60"
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

      <Footer.Root bordered={false} className="bg-[#030307] text-white">
        <Footer.Top
          columns={4}
          className="gap-8 border-t border-white/10 py-14"
        >
          <Footer.Column className="items-start gap-5">
            <div className="flex items-center gap-2">
              <Image
                src="/imgs/logo_pls_sistemas.png"
                alt="Equipe da PLS Sistemas trabalhando em projetos web"
                width={120}
                height={76}
                className="w-full"
              />
            </div>
            <Paragraph
              content="João Monlevade - MG."
              className="text-white/70 text-sm sm:text-xl"
            />
          </Footer.Column>

          <Footer.Column className="items-start gap-4">
            <Subtitle
              content={footerContent.navTitle}
              className="text-white text-base sm:text-2xl"
            />
            <ul className="space-y-3">
              {footerContent.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white"
                  >
                    <Paragraph
                      content={link.label}
                      className="text-sm sm:text-xl"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Footer.Column>

          <Footer.Column className="items-start gap-4">
            <Subtitle
              content={footerContent.policyTitle}
              className="text-white text-base sm:text-2xl"
            />
            <ul className="space-y-3">
              {footerContent.policyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/80 hover:text-white"
                  >
                    <Paragraph
                      content={link.label}
                      className="text-sm sm:text-xl"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Footer.Column>

          <Footer.Column className="items-start lg:items-end">
            <Image
              src="/imgs/safe_site.png"
              alt="Site seguro - certificado SSL da PLS Sistemas"
              width={240}
              height={40}
            />
          </Footer.Column>
        </Footer.Top>

        <Footer.Bottom
          bordered
          className="border-t border-white/40 py-6 flex-col items-center gap-4"
        >
          <span className="text-white text-xs sm:text-sm">
            Siga nos no Instagram
          </span>
          <Footer.SocialRow
            iconsClassName="text-foreground/80 hover:text-foreground"
            items={[
              {
                href: "https://www.instagram.com/pls.sistemas",
                iconName: "instagram",
              },
            ]}
          />
          <span className="text-white/70 text-xs sm:text-sm">
            {new Date().getFullYear()} - Desenvolvido por PLS Sistemas
          </span>
        </Footer.Bottom>
      </Footer.Root>

      <a
        href={whatsappFloatingLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#1ecd5a] p-3 text-white hover:scale-105"
      >
        <WhatsappLogoIcon size={28} weight="fill" />
      </a>
    </div>
  );
}
