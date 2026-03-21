import { BrandLogo } from "@/components/marketing/BrandMarquee";

export interface LandingNavItem {
  label: string;
  href: string;
}

export interface LandingFeatureItem {
  title: string;
  description: string;
  ctaLabel: string;
  highlights?: string[];
  idealFor?: string;
  expectedOutcome?: string;
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

export interface LandingTemplateItem {
  templateName: string;
  templateUrl: string;
  templateImage: string;
  recommendation: string;
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
  { label: "Soluções para seu negócio", href: "#solucoes-web" },
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
  title: "DETALHES SOBRE LANDING PAGES E WEBSITES",
  subtitle:
    "Entenda um pouco mais sobre nossos serviços de criação de landing pages e websites o e os resultados que você pode esperar ao contratar nossos serviços.",
  items: [
    {
      title: "Templates pré-prontos",
      description:
        "Utilizamos templates para que você ganhe velocidade na criação da sua landing page ou site.",
      ctaLabel: "Saiba mais",
      highlights: [
        "Estrutura validada para apresentação de oferta, prova social e CTA.",
        "Personalização de textos, cores e seções conforme a sua marca.",
        "Entrega mais rápida para campanhas que precisam entrar no ar sem atraso.",
      ],
      idealFor: "Empresas com prazo curto de lançamento.",
      expectedOutcome:
        "Redução no tempo de produção e início antecipado da captação de contatos.",
    },
    {
      title: "Design moderno e responsivo",
      description:
        "Design elegante e responsivo garantindo estética e usabilidade. Seu site funciona perfeitamente em qualquer dispositivo.",
      ctaLabel: "Saiba mais",
      highlights: [
        "Layout pensado para navegação fluida em celular, tablet e desktop.",
        "Tipografia e hierarquia visual para leitura rápida e alta conversão.",
        "Páginas leves com foco em experiência do usuário e credibilidade.",
      ],
      idealFor: "Negócios que valorizam presença digital profissional.",
      expectedOutcome:
        "Mais confiança para sua marca e melhor engajamento em qualquer tela.",
    },
    {
      title: "Seu site na primeira página do Google",
      description:
        "Aplicamos técnicas de SEO para ampliar sua presença online.",
      ctaLabel: "Saiba mais",
      highlights: [
        "Configuração inicial de SEO técnico e estrutura de títulos semânticos.",
        "Boas práticas de conteúdo para aumentar relevância nas buscas.",
      ],
      idealFor:
        "Empresas que precisam gerar tráfego orgânico com previsibilidade.",
      expectedOutcome:
        "Mais visibilidade para a empresa e aumento de oportunidades comerciais.",
    },
    {
      title: "Atualização do conteúdo",
      description:
        "Oferecemos plano opcional mensal de apenas R$ 99,90 para manter o conteúdo do seu site sempre atualizado e alinhado com o mercado.",
      ctaLabel: "Saiba mais",
      highlights: [
        "Plano contínuo para manter textos, banners e seções sempre atualizados. (Não inclui novas páginas ou mudanças estruturais ou mudanças de design).",
        "Ajustes estratégicos com base em sazonalidade e mudanças do mercado.",
        "Suporte recorrente para evolução do site sem interrupções.",
      ],
      idealFor: "Empresas que não querem manter um site desatualizado.",
      expectedOutcome:
        "Conteúdo sempre relevante, com reforço de autoridade e conversão.",
    },
  ] as LandingFeatureItem[],
};

export const webSolutionsContent = {
  sectionId: "solucoes-web",
  title: "Soluções para seu negócio",
  subtitle:
    "Oferecemos soluções prontas para escalar seu negócio.",
  items: [
    {
      title: "Pic Loja",
      description:
        "Envie uma foto e receba um produto pronto para divulgar, com aparência profissional e muito menos esforço manual.",
      ctaLabel: "Saiba mais",
      imagePath: "/imgs/logo_pic_loja.png",
      url: "https://picloja.plssistemas.com.br/",
    },

    {
      title: "React Ultimate Componentes",
      description:
        "Biblioteca com +130 componentes React construída para desenvolvedores e empresas de software.",
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
    "Precisa de uma solução sob medida para seu negócio?\nChame-nos agora mesmo no Whatsapp.",
  nameLabel: "Seu nome",
  phoneLabel: "Whatsapp",
  messageLabel: "Como podemos ajudar você?",
  namePlaceholder: "João Silva",
  phonePlaceholder: "(31) 98518-7963",
  messagePlaceholder:
    "Descreva o que você precisa. Quanto mais detalhes você fornecer, melhor podemos ajudar.",
  submitLabel: "Iniciar conversa no WhatsApp",
};

export const footerContent = {
  navTitle: "NAVEGUE",
  policyTitle: "TERMOS E POLÍTICAS",
  solutionsTitle: "SOLUÇÕES PARA SEU NEGÓCIO",
  copyright: "2026, Todos os direitos reservados",
  navLinks: [
    { label: "Quem somos", href: "#quem-somos" },
    { label: "Websites e landing pages", href: "#landing-pages" },
    { label: "Soluções para seu negócio", href: "#solucoes-web" },
    { label: "Soluções sob medida", href: "#solucoes-sob-medida" },
  ] as FooterLinkItem[],
  solutions: [
    { label: "Pic Loja", href: "https://picloja.plssistemas.com.br/" },
    { label: "React Ultimate Componentes", href: "https://reactultimate.pablosilvadev.com.br/" },
  ] as FooterLinkItem[],
  policyLinks: [
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  ] as FooterLinkItem[],
  socialItems: [
    { iconName: "instagram", href: "https://www.instagram.com" },
    { iconName: "x", href: "https://x.com" },
  ] as const,
};


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

export const creationProcessSteps = [
  {
    text: "Escolha do domínio: você escolhe um domínio que irá representar o endereço do seu site, exemplo: www.seusite.com.br.",
    link: "Verificar a disponibilidade do seu domínio.",
  },
  {
    text: "Escolha do template: você escolhe o template que melhor se adapta ao seu negócio.",
    link: "Ver nossos templates disponíveis.",
  },
  {
    text: "Briefing inicial: você nos informa com detalhes o que precisa, público alvo e objetivo principal do site.",
    link: "Preencher formulário de criação de site",
  },
  {
    text: "Design e desenvolvimento: desenvolvemos e implementamos a página de acordo com o template escolhido e as informações fornecidas no briefing. Pode ficar tranquilo que vamos te mostrar tudo antes de publicar.",
    link: "",
  },
  {
    text: "Publicação e ajustes: colocamos no ar, configuramos o SEO, validamos tudo e refinamos com base nos resultados.",
    link: "",
  },
];

export const templates: LandingTemplateItem[] = [
  {
    templateName: "Solaris",
    templateUrl: "https://soller-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/solaris.png",
    recommendation: "Empresas em geral.",
  },
  {
    templateName: "Clinic",
    templateUrl: "https://flowt-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/flowt.png",
    recommendation: "Dentistas, clínicas e profissionais de saúde.",
  },
  {
    templateName: "Real State",
    templateUrl: "https://real-state-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/real-state.png",
    recommendation: "Corretores de imóveis.",
  },
  {
    templateName: "Breakio",
    templateUrl: "https://breakio-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/breakio.png",
    recommendation: "Empresas de RH, contabilidade e similares.",
  },
  {
    templateName: "Devox",
    templateUrl: "https://magnifico-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/devox.png",
    recommendation: "Empresas de tecnologia, software e inovação.",
  },
  {
    templateName: "Workout",
    templateUrl: "https://workout-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/workout.png",
    recommendation: "Profissionais de saúde e bem-estar e academias.",
  },
  {
    templateName: "Xinder",
    templateUrl: "https://xinder-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/xinder.png",
    recommendation: "Empresas em geral.",
  },
  {
    templateName: "Coolers",
    templateUrl: "https://collers-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/coolers.png",
    recommendation: "Apresentação de produtos.",
  },
  {
    templateName: "Trakor",
    templateUrl: "https://trakor-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/trakor.png",
    recommendation: "Empresas de tecnologia, software e inovação.",
  },
  {
    templateName: "Nutre",
    templateUrl: "https://mabi-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/mabi.png",
    recommendation: "Nutricionistas e profissionais de saúde.",
  },
  {
    templateName: "Builder",
    templateUrl: "https://builder-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/builder.png",
    recommendation: "Arquitetos e profissionais da construção civil.",
  },
  {
    templateName: "Psycho",
    templateUrl: "https://psycho-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/psycho.png",
    recommendation: "Psicólogos, terapeutas e profissionais de saúde mental.",
  },
  {
    templateName: "Law",
    templateUrl: "https://teach-landing-page-template.vercel.app/",
    templateImage: "/imgs/templates/teach.png",
    recommendation: "Advogados, profissionais do direito e escritórios de advocacia.",
  },
];
