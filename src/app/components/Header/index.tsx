"use client";

import LandingHeader from "@/components/elements/LandingHeader";
import ThemeSwitch from "@/components/miscellaneous/ThemeSwitch";
import { navItems } from "@/mocks/landing-page";
import { trackCtaClick } from "@/utils/analytics";
import { resolveSiteHref } from "@/utils/navigation";
import { startWhatsAppChat } from "@/utils/whatsapp";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <LandingHeader.Root
      bordered
      sticky
      className="bg-background/95 backdrop-blur border-foreground/10"
      size="lg"
    >
      <LandingHeader.Left>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/imgs/logo_pls_sistemas_light.png"
            alt="Logo da PLS Sistemas"
            width={180}
            height={80}
            className="w-full h-10 sm:h-12 dark:hidden"
          />
          <Image
            src="/imgs/logo_pls_sistemas.png"
            alt="Logo da PLS Sistemas"
            width={180}
            height={80}
            className="hidden w-full h-10 sm:h-12 dark:block"
          />
        </Link>
      </LandingHeader.Left>

      <LandingHeader.Center>
        <LandingHeader.Nav className="justify-center gap-8">
          {navItems.map((item) => (
            <LandingHeader.Nav.Item
              key={item.href}
              href={resolveSiteHref(pathname, item.href)}
            >
              {item.label}
            </LandingHeader.Nav.Item>
          ))}
        </LandingHeader.Nav>
      </LandingHeader.Center>

      <LandingHeader.Right className="gap-3">
        <LandingHeader.MobileMenuToggle
          open={isMobileMenuOpen}
          onToggle={setIsMobileMenuOpen as never}
          className="text-foreground"
        />

        <LandingHeader.MobileMenuPanel open={isMobileMenuOpen}>
          {navItems.map((item) => (
            <LandingHeader.Nav.Item
              key={`mobile-${item.href}`}
              href={resolveSiteHref(pathname, item.href)}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {item.label}
            </LandingHeader.Nav.Item>
          ))}
        </LandingHeader.MobileMenuPanel>

        <ThemeSwitch />

        <LandingHeader.CTA
          label="Falar com especialista"
          className="max-md:!hidden bg-[#7e2cff] text-white"
          onClick={() => {
            trackCtaClick({
              ctaLabel: "Falar com especialista",
              ctaLocation: "header",
            });
            startWhatsAppChat();
          }}
        />
      </LandingHeader.Right>
    </LandingHeader.Root>
  );
}
