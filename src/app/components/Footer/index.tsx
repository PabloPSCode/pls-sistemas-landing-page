"use client";

import FooterElement from "@/components/elements/Footer";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import { footerContent } from "@/mocks/landing-page";
import { resolveSiteHref } from "@/utils/navigation";
import { startWhatsAppChat } from "@/utils/whatsapp";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/icons/WhatsappLogo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <FooterElement.Root bordered={false} className="bg-[#030307] text-white">
      <FooterElement.Top
        columns={4}
        className="gap-8 border-t border-white/10 py-14 text-center sm:text-left"
      >
        <FooterElement.Column className="items-center sm:items-start gap-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 sm:justify-start"
          >
            <Image
              src="/imgs/logo_pls_sistemas.png"
              alt="Logo da PLS Sistemas"
              width={160}
              height={76}
              className="w-full h-10 sm:h-12"
            />
          </Link>
          <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
            <Paragraph
              content="CNPJ 47.463.499/0001-37"
              className="text-white/70 !text-xs !sm:text-sm"
            />
            <Paragraph
              content="João Monlevade - MG."
              className="text-white/70 !text-xs !sm:text-sm"
            />
            <Subtitle
              content="Acompanhe nossas redes sociais"
              className="text-white/70 !text-sm !sm:text-base mt-4"
            />
            <FooterElement.SocialRow
              iconsClassName="text-foreground/80 hover:text-foreground -mt-4 sm:-ml-6"
              items={[
                {
                  href: "https://www.instagram.com/pls.sistemas",
                  iconName: "instagram",
                },
              ]}
            />
          </div>
        </FooterElement.Column>

        <FooterElement.Column className="items-center sm:items-start gap-4">
          <Subtitle
            content={footerContent.navTitle}
            className="text-white text-base sm:text-2xl"
          />
          <ul className="space-y-3 text-center sm:text-left">
            {footerContent.navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={resolveSiteHref(pathname, link.href)}
                  className="text-white/80 hover:text-white"
                >
                  <Paragraph
                    content={link.label}
                    className="text-sm sm:text-xl"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </FooterElement.Column>
        <FooterElement.Column className="items-center sm:items-start gap-4">
          <Subtitle
            content={footerContent.solutionsTitle}
            className="text-white text-base sm:text-2xl"
          />
          <ul className="space-y-3 text-center sm:text-left">
            {footerContent.solutions.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
        </FooterElement.Column>

        <FooterElement.Column className="items-center sm:items-start gap-4">
          <Subtitle
            content={footerContent.policyTitle}
            className="text-white text-base sm:text-2xl"
          />
          <ul className="space-y-3 text-center sm:text-left">
            {footerContent.policyLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-white/80 hover:text-white">
                  <Paragraph
                    content={link.label}
                    className="text-sm sm:text-xl"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </FooterElement.Column>
      </FooterElement.Top>

      <FooterElement.Bottom
        bordered
        className="border-t border-white/40 py-6 flex-col items-center gap-4"
      >
        <span className="text-white/70 !text-xs !sm:text-sm w-fit">
          {new Date().getFullYear()} - Desenvolvido por PLS Sistemas
        </span>
      </FooterElement.Bottom>
      <a
        onClick={() => startWhatsAppChat()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-success-500 p-4 text-white hover:scale-105"
      >
        <WhatsappLogoIcon size={32} weight="thin" />
      </a>
    </FooterElement.Root>
  );
}
