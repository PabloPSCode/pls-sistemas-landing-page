import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criação de Landing Pages e Websites | PLS Sistemas",
  description:
    "Criação de landing pages e websites pela PLS Sistemas em João Monlevade - MG, com SEO técnico, design responsivo e foco em conversão.",
  alternates: {
    canonical: "/landing-pages",
  },
};

export default function LandingPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
