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

import StructuredData from "@/components/seo/StructuredData";
import {
  createOrganizationSchema,
  createPageMetadata,
  createProfessionalServiceSchema,
  createWebsiteSchema,
  siteDescription,
  siteMetadataBase,
  siteName,
} from "@/lib/seo";
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

const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT?.replace(
  /\D/g,
  "",
);

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  applicationName: siteName,
  authors: [
    {
      name: siteName,
      url: siteMetadataBase.toString(),
    },
  ],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  ...createPageMetadata({
    title: landingPageTitle,
    description: siteDescription,
    path: "/",
    keywords: [
      "PLS Sistemas",
      "desenvolvimento de sistemas",
      "criação de sites",
      "landing pages",
      "soluções web",
      "João Monlevade",
    ],
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rootSchemas = [
    createOrganizationSchema(),
    createProfessionalServiceSchema(
      businessPhone ? `+${businessPhone}` : undefined,
    ),
    createWebsiteSchema(),
  ];

  return (
    <html lang="pt-BR">
      <body
        className={`${oxanium.variable} ${poppins.variable} ${montserrat.variable} ${raleway.variable} ${roboto.variable} ${inter.variable} ${openSans.variable} ${workSans.variable} ${ubuntu.variable} antialiased overflow-x-hidden`}
      >
        <StructuredData data={rootSchemas} id="plssistemas-root-seo" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
