import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

import { landingPageTitle } from "@/mocks/landing-page";
//@ts-ignore
import "../styles/globals.css";

const oxanium = Oxanium({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: landingPageTitle,
  description:
    "PLS Sistemas - Agência web e software de João Monlevade - MG especializada em landing pages, websites e soluções sob medida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${oxanium.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
