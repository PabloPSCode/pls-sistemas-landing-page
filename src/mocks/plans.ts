export interface Plan {
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  installmentValue: string;
  installmentLabel: string;
  installments: string;
  totalValue: string;
  footnote: string;
  buttonTitle: string;
  highlighted?: boolean;
  features: string[];
}

export const promotionalSectionContent = {
  title: "Planos para colocar o seu negócio no digital",
  subtitle:
    "Escolha o plano ideal para o seu negócio. Sem surpresas, com suporte e resultados que você acompanha de perto.",
};

export const plans: Plan[] = [
  {
    id: "site-essencial",
    eyebrow: "Presença digital",
    name: "Site Essencial",
    description: "Seu negócio com presença profissional na internet.",
    installmentValue: "R$ 59,90",
    installmentLabel: "/parcela",
    installments: "Em até 12x",
    totalValue: "Valor total: R$ 718,80",
    footnote: "Sem mensalidade obrigatória. Suporte opcional.",
    buttonTitle: "Quero este plano",
    features: [
      "Site profissional de página única",
      "Layout adaptado ao celular",
      "Seções de serviços, sobre e contato",
      "Botão de WhatsApp e redes sociais",
      "Integração com Google Maps",
      "SEO técnico inicial",
      "Domínio .com.br e hospedagem por 1 ano",
      "Certificado SSL",
      "1 rodada de ajustes",
    ],
  },
  {
    id: "site-profissional",
    eyebrow: "Presença e captação",
    name: "Site Profissional",
    description:
      "Apresente seus serviços e facilite os pedidos de orçamento.",
    installmentValue: "R$ 99,90",
    installmentLabel: "/parcela",
    installments: "Em até 12x",
    totalValue: "Valor total: R$ 1.198,80",
    footnote: "Sem mensalidade obrigatória. Suporte opcional.",
    buttonTitle: "Quero este plano",
    highlighted: true,
    features: [
      "Tudo do plano Essencial",
      "Até 5 páginas institucionais",
      "Estrutura de conteúdo por serviço",
      "Formulário de orçamento",
      "Botões estratégicos para WhatsApp",
      "Google Analytics e Search Console",
      "SEO técnico inicial por página",
      "Domínio .com.br e hospedagem por 1 ano",
      "2 rodadas de ajustes",
    ],
  },
];

export const landingPagePlans: Plan[] = [
  {
    id: "landing-page-essencial",
    eyebrow: "Presença digital",
    name: "Landing Page Essencial",
    description: "Uma página focada em transformar visitantes em contatos.",
    installmentValue: "R$ 59,90",
    installmentLabel: "/parcela",
    installments: "Em até 12x",
    totalValue: "Valor total: R$ 718,80",
    footnote: "Sem mensalidade obrigatória. Suporte opcional.",
    buttonTitle: "Quero este plano",
    features: [
      "Landing page profissional de página única",
      "Layout adaptado ao celular",
      "Seções de oferta, benefícios e depoimentos",
      "Botões de WhatsApp e chamadas para ação",
      "Integração com redes sociais",
      "SEO técnico inicial",
      "Domínio .com.br e hospedagem por 1 ano",
      "Certificado SSL",
      "1 rodada de ajustes",
    ],
  },
];
