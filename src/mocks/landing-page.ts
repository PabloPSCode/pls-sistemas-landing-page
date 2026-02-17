import { BrandLogo } from "@/components/marketing/BrandMarquee";

export interface LandingNavItem {
  label: string;
  href: string;
}

export interface LandingFeatureItem {
  title: string;
  description: string;
  ctaLabel: string;
}

export interface WebSolutionItem {
  title: string;
  description: string;
  ctaLabel: string;
  url: string;
  imagePath: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  avatarUrl: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
}

export const landingPageTitle = "PLS Sistemas | Landing Pages e Websites";

export const heroContent = {
  title: "Landing pages, websites e ferramentas para sua empresa crescer",
  description:
    "Oferecemos soluções modernas e eficazes para melhorar e facilitar a vida de pessoas e empresas.",
  primaryButtonTitle: "Explorar documentação",
};

export const navItems: LandingNavItem[] = [
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Websites e landing pages", href: "#landing-pages" },
  { label: "Soluções web", href: "#solucoes-web" },
  { label: "Soluções sob medida", href: "#solucoes-sob-medida" },
];

export const aboutContent = {
  sectionId: "quem-somos",
  title: "QUEM SOMOS",
  paragraphs: [
    "Com o propósito de trazer soluções modernas e eficazes para melhorar e facilitar a vida de pessoas e empresas, nasce a PLS Sistemas.",
    "Alinhada com o cenário atual da tecnologia, criamos ferramentas e software aplicando o poder da IA para transformar sua marca e seu negócio.",
    "Realizamos serviços de criação de landing pages, websites, software personalizado e além disso possuímos ferramentas prontas para alavancar seu negócio.",
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
};

export const landingServicesContent = {
  sectionId: "landing-pages",
  title: "WEBSITES E LANDING PAGES",
  subtitle:
    "Além de landing pages e websites modernos, seguros e responsivos, também criamos soluções que convertem e trazem resultados reais.",
  items: [
    {
      title: "Templates pré-prontos",
      description:
        "Utilizamos templates para que você ganhe velocidade na criação da sua landing page ou site.",
      ctaLabel: "Saiba mais",
    },
    {
      title: "Design moderno e responsivo",
      description:
        "Design elegante e responsivo garantindo estética e usabilidade. Seu site funciona perfeitamente em qualquer dispositivo.",
      ctaLabel: "Saiba mais",
    },
    {
      title: "Seu site na primeira página do Google",
      description:
        "Integramos seu site ou landing page com Google Analytics e aplicamos técnicas de SEO para ampliar sua presença online.",
      ctaLabel: "Saiba mais",
    },
    {
      title: "Atualização do conteúdo",
      description:
        "Oferecemos plano mensal e acessível para manter o conteúdo do seu site sempre atualizado e alinhado com o mercado.",
      ctaLabel: "Saiba mais",
    },
  ] as LandingFeatureItem[],
};

export const webSolutionsContent = {
  sectionId: "solucoes-web",
  title: "SOLUÇÕES WEB",
  subtitle:
    "Além da criação de landing pages e websites, também oferecemos soluções para escalar seu negócio.",
  items: [
    {
      title: "Mostra Loja",
      description:
        "Exiba produtos da sua loja em uma vitrine virtual profissional e combine pagamento e envio com o cliente.",
      ctaLabel: "Saiba mais",
      imagePath: "/imgs/logo_mostra_loja.png",
      url: "https://tirestore.mostraloja.com.br",
    },
    {
      title: "Encarte Oferta",
      description:
        "Crie encartes e promoções para seu comércio de maneira simples e profissional, com foco em conversão.",
      ctaLabel: "Saiba mais",
      imagePath: "/imgs/logo_encarte_oferta.png",
      url: "https://www.plssistemas.com.br",
    },
    {
      title: "React Ultimate Componentes",
      description:
        "Biblioteca com +130 componentes React para desenvolvimento ágil de software, com suporte no Brasil.",
      ctaLabel: "Saiba mais",
      imagePath: "/imgs/logo_react_ultimate.png",
      url: "https://reactultimate.pablosilvadev.com.br/",
    },
  ] as WebSolutionItem[],
};

export const customSolutionFormContent = {
  sectionId: "solucoes-sob-medida",
  title: "SOLUÇÕES SOB MEDIDA",
  description:
    "Precisa de uma solução sob medida para seu negócio? Preencha o formulário abaixo e nos conte o que você precisa. Iremos analisar seu caso cuidadosamente e retornar o contato.",
  nameLabel: "Seu nome",
  phoneLabel: "Whatsapp",
  messageLabel: "Como podemos ajudar você?",
  namePlaceholder: "João Silva",
  phonePlaceholder: "(31) 98518-7963",
  messagePlaceholder:
    "Descreva o que você precisa. Quanto mais detalhes você fornecer, melhor podemos ajudar.",
  submitLabel: "Quero receber contato",
};

const whatsAppContact =
  process.env.NEXT_PUBLIC_WHATSAPP_CONTACT || "5531999999999";

export const footerContent = {
  navTitle: "NAVEGUE",
  policyTitle: "TERMOS E POLÍTICAS",
  copyright: "2026, Todos os direitos reservados",
  navLinks: [
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Websites e landing pages", href: "#landing-pages" },
    { label: "Soluções web", href: "#solucoes-web" },
    { label: "Soluções sob medida", href: "#solucoes-sob-medida" },
  ] as FooterLinkItem[],
  policyLinks: [
    { label: "Política de Privacidade", href: "#" },
  ] as FooterLinkItem[],
  socialItems: [
    { iconName: "instagram", href: "https://www.instagram.com" },
    { iconName: "whatsapp", href: `https://wa.me/${whatsAppContact}` },
    { iconName: "x", href: "https://x.com" },
  ] as const,
};

export const whatsappFloatingLink = `https://wa.me/${whatsAppContact}`;

export const companies: BrandLogo[] = [
  {
    href: "https://www.ajxcapital.com.br",
    src: "/companies/ajx.png",
    alt: "Ajx",
  },
  {
    href: "https://www.mirtescontabilidade.com.br",
    src: "/companies/mj_contabilidade.png",
    alt: "MJ Contabilidade",
  },
  {
    href: "https://www.agsistemas.com.br",
    src: "/companies/agsistemas.png",
    alt: "Ag Sistemas",
  },
  {
    href: "https://www.avodtech.com",
    src: "/companies/avod.png",
    alt: "Avod",
  },
  {
    href: "https://www.buybye.com.br",
    src: "/companies/buybye.png",
    alt: "Buybye",
  },
  {
    href: "https://www.instagram.com/terraizsacolao/?hl=en",
    src: "/companies/terraiz.png",
    alt: "Terraiz",
  },
  {
    href: "https://www.optimizeit.com.br",
    src: "/companies/optimizeit.png",
    alt: "Buybye",
  },
  {
    href: "https://www.instagram.com/hygiasaude/",
    src: "/companies/hygia.png",
    alt: "Hygia",
  },
];
