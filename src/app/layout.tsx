import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

import { landingPageTitle } from "@/mocks/landing-page";
//@ts-ignore
import "../styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <body className={`${oxanium.variable} antialiased overflow-x-hidden`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
