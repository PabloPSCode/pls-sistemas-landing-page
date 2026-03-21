import type { Metadata } from "next";
import {
  Inter,
  Montserrat,
  Open_Sans,
  Oxanium,
  Poppins,
  Raleway,
  Roboto,
  Ubuntu,
  Work_Sans,
} from "next/font/google";

import { landingPageTitle } from "@/mocks/landing-page";
//@ts-ignore
import "../styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const siteUrl = new URL("https://www.plssistemas.com.br");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  alternates: {
    canonical: "/",
  },
  title: landingPageTitle,
  description:
    "PLS Sistemas é uma empresa de desenvolvimento de sistemas em João Monlevade - MG. Criamos sites, landing pages, soluções web e software sob medida para empresas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "PLS Sistemas",
    title: landingPageTitle,
    description:
      "Empresa de desenvolvimento de sistemas em João Monlevade - MG, com criação de sites, landing pages e soluções web sob medida.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PLS Sistemas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: landingPageTitle,
    description:
      "Desenvolvimento de sistemas, sites, landing pages e soluções web em João Monlevade - MG.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${oxanium.variable} ${poppins.variable} ${montserrat.variable} ${raleway.variable} ${roboto.variable} ${inter.variable} ${openSans.variable} ${workSans.variable} ${ubuntu.variable} antialiased overflow-x-hidden`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
