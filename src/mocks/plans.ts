export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  setupLabel: string;
  setupValue: string;
  monthlyLabel: string;
  monthlyValue: string;
  buttonTitle: string;
  highlighted?: boolean;
  badge?: string;
  features: PlanFeature[];
}

export const promotionalSectionContent = {
  title: "Planos para colocar o seu negócio no digital",
  subtitle:
    "Escolha o plano ideal para o seu negócio. Sem surpresas, com suporte e resultados que você acompanha de perto.",
};

export const plans: Plan[] = [
  // {
  //   id: "google-meu-negocio",
  //   name: "Google Meu Negócio (GMN)",
  //   description:
  //     "Ideal para negócios locais que querem dominar o Google e Google Maps.",
  //   setupLabel: "Desenvolvimento (taxa única)",
  //   setupValue: "R$ 299",
  //   monthlyLabel: "Mensalidade",
  //   monthlyValue: "R$ 120/mês",
  //   buttonTitle: "Quero o GMN",
  //   features: [
  //     { label: "Otimização do Google Meu Negócio", included: true },
  //     { label: "Cadastro nas principais listas locais", included: true },
  //     { label: "Estratégia de Palavras-chave Locais", included: true },
  //     {
  //       label: "Cadastro de Serviços, Produtos, Ofertas Fotos e Atualizações",
  //       included: true,
  //     },
  //     { label: "Gestão e Respostas de Avaliações", included: true },
  //     { label: "Relatório de Posicionamento Mensal do GMN", included: true },
  //     { label: "Sites Institucionais", included: false },
  //   ],
  // },
  // {
  //   id: "sites-gmn",
  //   name: "Sites + GMN",
  //   description:
  //     "O pacote completo: Site profissional ultra-rápido + SEO completo + GMN.",
  //   setupLabel: "Desenvolvimento (taxa única)",
  //   setupValue: "Grátis",
  //   monthlyLabel: "Mensalidade",
  //   monthlyValue: "R$ 199/mês",
  //   buttonTitle: "Quero Tudo",
  //   highlighted: true,
  //   badge: "Mais Completo",
  //   features: [
  //     { label: "Tudo do Google Meu Negócio (GMN)", included: true },
  //     { label: "Tudo do Sites Institucionais", included: true },
  //     { label: "Domínio próprio (.com.br) incluso", included: true },
  //     { label: "Atualizações e Suporte Mensal", included: true },
  //     { label: "Hospedagem de Alta Performance", included: true },
  //     { label: "Certificado de Segurança SSL", included: true },
  //     { label: "Backups Automáticos", included: true },
  //     { label: "Atualizações de Sistema e Segurança", included: true },
  //     { label: "Suporte Técnico via WhatsApp", included: true },
  //     { label: "Criação de Páginas Extras", included: true },
  //     { label: "Blog e Artigos dinâmicos", included: true },
  //     { label: "Relatório de Posicionamento Mensal do Site", included: true },
  //   ],
  // },
  {
    id: "sites-institucionais",
    name: "Sites Institucionais",
    description: "Sites profissionais de alta perfomance",
    setupLabel: "Desenvolvimento (taxa única)",
    setupValue: "R$ 799",
    monthlyLabel: "Mensalidade",
    monthlyValue: "Sem mensalidade",
    buttonTitle: "Quero um site",
    features: [
      { label: "Até 3 páginas", included: true },
      { label: "Site Institucional Ultra-rápido", included: true },
      { label: "Domínio próprio (.com.br) incluso", included: true },
      { label: "Hospedagem de Alta Performance", included: true },
      { label: "Certificado de Segurança SSL", included: true },
      { label: "Design Moderno", included: true },
      { label: "SEO completo", included: true },
      { label: "Integrações com Redes Sociais", included: true },
      { label: "Integrações com WhatsApp", included: true },
      { label: "Integrações com Google Maps", included: true },
      { label: "Blog e artigos dinâmicos", included: false },
      { label: "Construção de Páginas Extras", included: false },
    ],
  },
  {
    id: "sites-institucionais-blog-acompanhamento",
    name: "Sites Institucionais + Blog + Acompanhamento técnico",
    description:
      "Sites profissionais de alta perfomance com blog e acompanhamento técnico",
    setupLabel: "Desenvolvimento (taxa única)",
    setupValue: "R$ 1.199",
    monthlyLabel: "Mensalidade",
    monthlyValue: "R$ 149/mês",
    buttonTitle: "Quero um site",
    highlighted: true,
    badge: "Mais Completo",
    features: [
      { label: "Até 5 páginas", included: true },
      { label: "Site Institucional Ultra-rápido", included: true },
      { label: "Domínio próprio (.com.br) incluso", included: true },
      { label: "Hospedagem de Alta Performance", included: true },
      { label: "Certificado de Segurança SSL", included: true },
      { label: "Design Moderno", included: true },
      { label: "SEO completo", included: true },
      { label: "Integrações com Redes Sociais", included: true },
      { label: "Integrações com WhatsApp", included: true },
      { label: "Integrações com Google Maps", included: true },
      { label: "Blog e artigos dinâmicos", included: true },
      { label: "Construção de Páginas Extras", included: true },
      { label: "Acompanhamento Mensal", included: true },
      { label: "Melhorias Contínuas de SEO", included: true },
      { label: "Configuração Google Meu Negócio", included: true },
    ],
  },
  {
    id: "sites-institucionais-blog",
    name: "Sites Institucionais + Blog",
    description: "Sites profissionais de alta perfomance com blog",
    setupLabel: "Desenvolvimento (taxa única)",
    setupValue: "R$ 1.199",
    monthlyLabel: "Mensalidade",
    monthlyValue: "Sem mensalidade",
    buttonTitle: "Quero um site",
    features: [
      { label: "Até 5 páginas", included: true },
      { label: "Site Institucional Ultra-rápido", included: true },
      { label: "Domínio próprio (.com.br) incluso", included: true },
      { label: "Hospedagem de Alta Performance", included: true },
      { label: "Certificado de Segurança SSL", included: true },
      { label: "Design Moderno", included: true },
      { label: "SEO completo", included: true },
      { label: "Integrações com Redes Sociais", included: true },
      { label: "Integrações com WhatsApp", included: true },
      { label: "Integrações com Google Maps", included: true },
      { label: "Blog e artigos dinâmicos", included: true },
      { label: "Construção de Páginas Extras", included: false },
    ],
  },
];
