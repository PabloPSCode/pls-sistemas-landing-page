"use client";

import FooterElement from "@/components/elements/Footer";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import { footerContent, whatsappFloatingLink } from "@/mocks/landing-page";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/icons/WhatsappLogo";
import Image from "next/image";

export default function Footer() {
  return (
    <FooterElement.Root bordered={false} className="bg-[#030307] text-white">
      <FooterElement.Top
        columns={4}
        className="gap-8 border-t border-white/10 py-14"
      >
        <FooterElement.Column className="items-start gap-5">
          <div className="flex items-center gap-2">
            <Image
              src="/imgs/logo_pls_sistemas.png"
              alt="Equipe da PLS Sistemas trabalhando em projetos web"
              width={160}
              height={76}
              className="w-full"
            />
          </div>
          <Paragraph
            content="João Monlevade - MG."
            className="text-white/70 text-sm sm:text-xl"
          />
        </FooterElement.Column>

        <FooterElement.Column className="items-start gap-4">
          <Subtitle
            content={footerContent.navTitle}
            className="text-white text-base sm:text-2xl"
          />
          <ul className="space-y-3">
            {footerContent.navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-white/80 hover:text-white">
                  <Paragraph
                    content={link.label}
                    className="text-sm sm:text-xl"
                  />
                </a>
              </li>
            ))}
          </ul>
        </FooterElement.Column>

        <FooterElement.Column className="items-start gap-4">
          <Subtitle
            content={footerContent.policyTitle}
            className="text-white text-base sm:text-2xl"
          />
          <ul className="space-y-3">
            {footerContent.policyLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-white/80 hover:text-white">
                  <Paragraph
                    content={link.label}
                    className="text-sm sm:text-xl"
                  />
                </a>
              </li>
            ))}
          </ul>
        </FooterElement.Column>

        <FooterElement.Column className="items-start lg:items-end">
          <Image
            src="/imgs/safe_site.png"
            alt="Site seguro - certificado SSL da PLS Sistemas"
            width={240}
            height={40}
          />
        </FooterElement.Column>
      </FooterElement.Top>

      <FooterElement.Bottom
        bordered
        className="border-t border-white/40 py-6 flex-col items-center gap-4"
      >
        <span className="text-white text-xs sm:text-sm">
          Siga nos no Instagram
        </span>
        <FooterElement.SocialRow
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
      </FooterElement.Bottom>
            <a
        href={whatsappFloatingLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-[#1ecd5a] p-4 text-white hover:scale-105"
      >
        <WhatsappLogoIcon size={32} weight="thin" />
      </a>
    </FooterElement.Root>
  );
}
