import type { QuestionItem } from "@/components/miscellaneous/Accordeon";

export const siteFaqTitle = "Perguntas frequentes";

/**
 * Perfil de cada categoria usado para gerar perguntas frequentes adaptadas ao
 * segmento, sem conteúdo específico de localidade. As perguntas comuns são
 * geradas a partir do perfil e complementadas por perguntas específicas.
 */
interface CategoryFaqProfile {
  /** Ex.: "site para empresas" */
  siteType: string;
  /** Ex.: "da sua empresa" — usado como "o site {businessPossessive}" */
  businessPossessive: string;
  /** Ex.: "da empresa" — usado como "informações {businessOf}" */
  businessOf: string;
  /** Ex.: "empresas" / "dentistas e clínicas" */
  professionals: string;
  /** Ex.: "clientes" / "pacientes" / "leads" */
  leadWord: string;
  /** Perguntas específicas do segmento */
  specific: QuestionItem[];
}

function buildCommonQuestions(profile: CategoryFaqProfile): QuestionItem[] {
  return [
    {
      question: `Como funciona o processo de criação de um ${profile.siteType}?`,
      answer:
        "Todo o processo é feito de forma 100% digital e integrada. Usamos reuniões por videoconferência, WhatsApp e relatórios online para alinhar cada etapa com agilidade, do briefing inicial até a publicação, sem necessidade de deslocamento.",
    },
    {
      question: `Quanto tempo leva para o site ${profile.businessPossessive} ficar pronto?`,
      answer: `A maioria dos sites fica pronta entre 3 e 7 dias úteis, dependendo da quantidade de páginas e do envio dos materiais necessários, como logo, fotos e informações ${profile.businessOf}.`,
    },
    {
      question: "O site funciona bem no celular?",
      answer:
        "Sim. Todos os nossos sites são desenvolvidos para funcionar perfeitamente em celulares, tablets e computadores, com carregamento rápido e uma ótima experiência para o visitante.",
    },
    {
      question: `Como um site profissional ajuda ${profile.professionals} a conseguir mais ${profile.leadWord}?`,
      answer:
        "Um site profissional transmite confiança, melhora sua presença no Google e facilita o contato pelo WhatsApp. Muitas pessoas pesquisam antes de contratar, e ter um site bem estruturado aumenta bastante suas chances de ser escolhido.",
    },
    {
      question: "Vocês cuidam de domínio, hospedagem e manutenção?",
      answer:
        "Sim. Podemos cuidar de toda a parte técnica, incluindo domínio, hospedagem, segurança, backups e suporte, para que você não precise se preocupar com nada.",
    },
    {
      question: "Meu site vai aparecer nas buscas do Google?",
      answer:
        "Sim. Desenvolvemos todos os sites com boas práticas de SEO técnico e semântico, ajudando o seu negócio a ter mais chances de aparecer nas pesquisas relacionadas aos seus serviços.",
    },
    {
      question: "O atendimento e o contrato são seguros mesmo a distância?",
      answer:
        "Totalmente. O atendimento é feito por videoconferência e WhatsApp, e todos os projetos são formalizados com contratos digitais de validade jurídica, assinados eletronicamente por ambas as partes.",
    },
    {
      question: "Vocês oferecem suporte e atualizações após a entrega?",
      answer:
        "Sim. Oferecemos planos de manutenção para manter o site atualizado, seguro e funcionando corretamente, além de suporte para alterações e melhorias futuras via WhatsApp.",
    },
    {
      question: "Preciso já ter logo e textos prontos para começar?",
      answer:
        "Não necessariamente. Podemos orientar você durante todo o processo e ajudar na organização dos textos, imagens e da estrutura do conteúdo do site.",
    },
  ];
}

const categoryFaqProfiles: Record<string, CategoryFaqProfile> = {
  "empresas-em-geral": {
    siteType: "site para empresas",
    businessPossessive: "da sua empresa",
    businessOf: "da empresa",
    professionals: "empresas",
    leadWord: "clientes",
    specific: [
      {
        question: "Vocês criam sites para quais tipos de empresa?",
        answer:
          "Atendemos empresas de diversos segmentos, de prestadores de serviços a comércios e negócios locais que querem fortalecer a presença digital e gerar mais contatos pela internet.",
      },
      {
        question:
          "O site pode ter integração com WhatsApp e formulários de contato?",
        answer:
          "Sim. Incluímos integração com WhatsApp, formulários de contato e chamadas para ação estratégicas para transformar visitantes em clientes.",
      },
    ],
  },
  "dentistas-e-clinicas": {
    siteType: "site para clínicas e consultórios",
    businessPossessive: "da sua clínica",
    businessOf: "da clínica",
    professionals: "dentistas e clínicas",
    leadWord: "pacientes",
    specific: [
      {
        question: "Os pacientes conseguem agendar consultas pelo site?",
        answer:
          "Sim. Podemos incluir botões de agendamento e integração com WhatsApp para que os pacientes marquem consultas de forma rápida e prática.",
      },
      {
        question: "É possível apresentar os tratamentos e especialidades no site?",
        answer:
          "Com certeza. Criamos páginas específicas para tratamentos, especialidades e a estrutura da clínica, ajudando a transmitir confiança e autoridade.",
      },
    ],
  },
  "corretores-de-imoveis": {
    siteType: "site para Imobiliárias e corretores de imóveis",
    businessPossessive: "do seu negócio",
    businessOf: "do seu trabalho",
    professionals: "Imobiliárias e corretores de imóveis",
    leadWord: "clientes interessados",
    specific: [
      {
        question: "Consigo divulgar meus imóveis no site?",
        answer:
          "Sim. Estruturamos o site para exibir seus imóveis com fotos, descrições e filtros, facilitando que os interessados encontrem as opções ideais e entrem em contato.",
      },
      {
        question: "O site ajuda a reduzir a dependência de portais imobiliários?",
        answer:
          "Sim. Com site próprio e presença no Google, você constrói sua autoridade e capta interessados diretamente, sem depender apenas de portais e redes sociais.",
      },
    ],
  },
  "rh-e-contabilidade": {
    siteType: "site para empresas de RH e contabilidade",
    businessPossessive: "da sua empresa",
    businessOf: "da empresa",
    professionals: "empresas de RH e contabilidade",
    leadWord: "clientes",
    specific: [
      {
        question: "É possível explicar serviços mais técnicos de forma clara no site?",
        answer:
          "Sim. Organizamos o conteúdo para apresentar serviços especializados de maneira clara e objetiva, ajudando a construir confiança com decisores e potenciais clientes.",
      },
      {
        question: "O site ajuda a captar empresas como clientes?",
        answer:
          "Sim. Com páginas de serviços bem estruturadas, provas de autoridade e chamadas de contato, o site facilita a geração de contatos qualificados.",
      },
    ],
  },
  "academias-e-bem-estar": {
    siteType: "site para academias e negócios de bem-estar",
    businessPossessive: "da sua academia",
    businessOf: "da academia",
    professionals: "academias e negócios de bem-estar",
    leadWord: "alunos",
    specific: [
      {
        question: "É possível mostrar planos, modalidades e horários no site?",
        answer:
          "Sim. Criamos seções para planos, modalidades, horários e diferenciais, ajudando os visitantes a decidirem antes mesmo de entrar em contato.",
      },
      {
        question: "Os alunos conseguem falar com a academia pelo site?",
        answer:
          "Sim. Incluímos integração com WhatsApp e formulários para facilitar matrículas, dúvidas e agendamento de aulas experimentais.",
      },
    ],
  },
  nutricionistas: {
    siteType: "site para nutricionistas",
    businessPossessive: "do seu consultório",
    businessOf: "do consultório",
    professionals: "nutricionistas",
    leadWord: "pacientes",
    specific: [
      {
        question: "Os pacientes conseguem agendar consultas presenciais ou online?",
        answer:
          "Sim. Podemos incluir agendamento e integração com WhatsApp para consultas presenciais ou online, facilitando o contato com novos pacientes.",
      },
      {
        question: "Posso apresentar minhas especialidades e abordagem no site?",
        answer:
          "Com certeza. Criamos páginas para explicar sua abordagem, especialidades e diferenciais, transmitindo mais confiança para quem procura ajuda.",
      },
    ],
  },
  "arquitetos-e-construcao-civil": {
    siteType: "site para arquitetos e construção civil",
    businessPossessive: "do seu escritório",
    businessOf: "do escritório",
    professionals: "arquitetos e empresas de construção",
    leadWord: "clientes",
    specific: [
      {
        question: "Consigo exibir meu portfólio de projetos e obras no site?",
        answer:
          "Sim. Damos destaque ao seu portfólio com galerias de projetos e obras, ajudando a demonstrar qualidade e gerar confiança em novos clientes.",
      },
      {
        question: "O site ajuda a captar clientes para projetos e reformas?",
        answer:
          "Sim. Com portfólio, provas sociais e chamadas de contato, o site facilita a captação de interessados em projetos, obras e reformas.",
      },
    ],
  },
  "psicologos-e-terapeutas": {
    siteType: "site para psicólogos e terapeutas",
    businessPossessive: "do seu consultório",
    businessOf: "do consultório",
    professionals: "psicólogos e terapeutas",
    leadWord: "pacientes",
    specific: [
      {
        question: "É possível oferecer atendimento online e agendamento pelo site?",
        answer:
          "Sim. Podemos incluir informações sobre atendimento online e presencial e integração com WhatsApp para facilitar o agendamento com segurança e discrição.",
      },
      {
        question: "Como o site transmite segurança para quem busca ajuda?",
        answer:
          "Com um visual acolhedor e conteúdo claro sobre sua abordagem, especialidades e formato de atendimento, o site ajuda a transmitir confiança para novos pacientes.",
      },
    ],
  },
  "advogados-e-escritorios": {
    siteType: "site para Advogados e Escritórios de Advocacia",
    businessPossessive: "do seu escritório",
    businessOf: "do escritório",
    professionals: "Advogados e Escritórios de Advocacia",
    leadWord: "clientes",
    specific: [
      {
        question: "É possível apresentar as áreas de atuação no site?",
        answer:
          "Sim. Criamos páginas para cada área de atuação, reforçando autoridade e ajudando potenciais clientes a entenderem como você pode ajudá-los.",
      },
      {
        question: "O site segue um visual profissional e institucional?",
        answer:
          "Sim. Desenvolvemos um site com visual sóbrio e profissional, adequado ao setor jurídico, transmitindo credibilidade e confiança.",
      },
    ],
  },
  "agencias-de-veiculos": {
    siteType: "site para agências e revendas de veículos",
    businessPossessive: "da sua agência",
    businessOf: "da agência",
    professionals: "agências e revendas de veículos",
    leadWord: "clientes interessados",
    specific: [
      {
        question: "Consigo exibir meu estoque de veículos no site?",
        answer:
          "Sim. Estruturamos o site para exibir seu estoque com fotos, detalhes e destaques, facilitando que os interessados encontrem o veículo ideal.",
      },
      {
        question: "Os interessados conseguem entrar em contato rapidamente?",
        answer:
          "Sim. Incluímos integração com WhatsApp e botões de contato em cada veículo, agilizando o atendimento e a negociação.",
      },
    ],
  },
};

const fallbackProfile = categoryFaqProfiles["empresas-em-geral"];

/**
 * Retorna as perguntas frequentes adaptadas à categoria informada. Combina
 * perguntas comuns (geradas a partir do perfil) com perguntas específicas do
 * segmento.
 */
export function getSiteFaqQuestions(slug: string): QuestionItem[] {
  const profile = categoryFaqProfiles[slug] ?? fallbackProfile;

  return [...buildCommonQuestions(profile), ...profile.specific];
}
