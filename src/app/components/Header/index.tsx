"use client";

import LandingHeader from "@/components/elements/LandingHeader";
import { customSolutionFormContent, navItems } from "@/mocks/landing-page";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const resolveHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <LandingHeader.Root
      bordered
      sticky
      className="bg-[#04050b]/95 text-white backdrop-blur border-white/10"
      size="lg"
    >
      <LandingHeader.Left>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/imgs/logo_pls_sistemas.png"
            alt="Equipe da PLS Sistemas trabalhando em projetos web"
            width={132}
            height={64}
            className="w-full"
          />
        </Link>
      </LandingHeader.Left>

      <LandingHeader.Center>
        <LandingHeader.Nav className="justify-center gap-8">
          {navItems.map((item) => (
            <LandingHeader.Nav.Item key={item.href} href={resolveHref(item.href)}>
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
  );
}
