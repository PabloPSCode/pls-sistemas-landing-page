import { templates, type LandingTemplateItem } from "@/mocks/landing-page";

export interface BusinessCategoryRelatedArticle {
  label: string;
  href: string;
}

/**
 * Definição base de uma categoria de negócio. As categorias são associadas aos
 * templates reais (por nome) existentes em `@/mocks/landing-page`, de forma que
 * imagens de capa e nomes de template venham sempre da fonte de verdade dos
 * templates — e não de valores duplicados.
 */
export interface BusinessCategoryDefinition {
  slug: string;
  title: string;
  shortName: string;
  problemContext: string;
  /** Nomes dos templates (em `templates`) recomendados para a categoria. */
  templateNames: string[];
  relatedArticles: BusinessCategoryRelatedArticle[];
}

/** Categoria já resolvida com os templates reais e a capa derivada deles. */
export interface ResolvedBusinessCategory
  extends Omit<BusinessCategoryDefinition, "templateNames"> {
  path: string;
  templates: LandingTemplateItem[];
  coverUrl: string;
}

export const BUSINESS_CATEGORIES_BASE_PATH = "/sites";

function relatedArticle(href: string): BusinessCategoryRelatedArticle {
  const slug = href.split("/").filter(Boolean).pop() ?? "";
  const label = slug
    .replace(/-/g, " ")
    .replace(/^\s*\w/, (character) => character.toUpperCase());

  return { label, href };
}

const businessCategoryDefinitions: BusinessCategoryDefinition[] = [
  {
    slug: "empresas-em-geral",
    title: "Site para Empresas",
    shortName: "Empresas em geral",
    problemContext:
      "Empresas em geral precisam de um site profissional para apresentar seus serviços, gerar credibilidade, captar contatos e serem encontradas no Google por clientes que pesquisam soluções antes de comprar.",
    templateNames: ["Solaris", "Xinder"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/como-um-site-profissional-ajuda-sua-empresa-a-vender-mais",
      ),
    ],
  },
  {
    slug: "dentistas-e-clinicas",
    title: "Site para Dentistas e Clínicas",
    shortName: "Dentistas e clínicas",
    problemContext:
      "Dentistas e clínicas precisam de um site para transmitir confiança, apresentar tratamentos, facilitar agendamentos e aparecer no Google quando pacientes pesquisam por serviços odontológicos ou médicos.",
    templateNames: ["Clinic"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-para-minha-clinica",
      ),
    ],
  },
  {
    slug: "corretores-de-imoveis",
    title: "Site para Corretores de Imóveis",
    shortName: "Corretores de imóveis",
    problemContext:
      "Corretores de imóveis precisam de um site para divulgar imóveis, captar interessados, fortalecer sua autoridade local e reduzir a dependência de portais imobiliários e redes sociais.",
    templateNames: ["Real State"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-corretor-de-imoveis",
      ),
    ],
  },
  {
    slug: "rh-e-contabilidade",
    title: "Site para RH e Contabilidade",
    shortName: "RH e contabilidade",
    problemContext:
      "Empresas de RH e contabilidade precisam de um site para apresentar serviços especializados, captar empresas interessadas, explicar soluções complexas e construir confiança com decisores.",
    templateNames: ["Breakio"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-escritorio-de-contabilidade",
      ),
    ],
  },
  {
    slug: "tecnologia-e-software",
    title: "Site para Empresas de Tecnologia e Software",
    shortName: "Tecnologia e software",
    problemContext:
      "Empresas de tecnologia e software precisam de um site para explicar seus produtos, gerar leads qualificados, demonstrar autoridade técnica e transformar visitantes em oportunidades comerciais.",
    templateNames: ["Devox", "Trakor"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-empresa-de-software",
      ),
    ],
  },
  {
    slug: "academias-e-bem-estar",
    title: "Site para Academias e Bem-estar",
    shortName: "Academias e bem-estar",
    problemContext:
      "Academias e negócios de bem-estar precisam de um site para apresentar planos, modalidades, diferenciais, horários e captar alunos que pesquisam opções próximas antes de se matricular.",
    templateNames: ["Workout"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-para-minha-academia",
      ),
    ],
  },
  {
    slug: "nutricionistas",
    title: "Site para Nutricionistas",
    shortName: "Nutricionistas",
    problemContext:
      "Nutricionistas precisam de um site para apresentar especialidades, explicar abordagens, transmitir confiança e facilitar o agendamento de consultas presenciais ou online.",
    templateNames: ["Nutre"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-nutricionista",
      ),
    ],
  },
  {
    slug: "arquitetos-e-construcao-civil",
    title: "Site para Arquitetos e Construção Civil",
    shortName: "Arquitetos e construção civil",
    problemContext:
      "Arquitetos e empresas da construção civil precisam de um site para exibir portfólio, apresentar projetos, gerar confiança e captar clientes interessados em obras, reformas ou projetos personalizados.",
    templateNames: ["Builder"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-arquiteto",
      ),
    ],
  },
  {
    slug: "psicologos-e-terapeutas",
    title: "Site para Psicólogos e Terapeutas",
    shortName: "Psicólogos e terapeutas",
    problemContext:
      "Psicólogos e terapeutas precisam de um site para apresentar sua abordagem, especialidades, formato de atendimento e transmitir segurança para pessoas que buscam ajuda profissional.",
    templateNames: ["Psycho"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-psicologo",
      ),
    ],
  },
  {
    slug: "advogados-e-escritorios",
    title: "Site para Advogados e Escritórios",
    shortName: "Advogados e escritórios",
    problemContext:
      "Advogados e escritórios precisam de um site institucional para apresentar áreas de atuação, fortalecer autoridade, gerar confiança e facilitar o contato de potenciais clientes de forma profissional.",
    templateNames: ["Law"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-advogado",
      ),
    ],
  },
  {
    slug: "agencias-de-veiculos",
    title: "Site para Agências de Veículos",
    shortName: "Agências de veículos",
    problemContext:
      "Agências e revendas de veículos precisam de um site para exibir o estoque, apresentar ofertas, gerar confiança e captar interessados que pesquisam por carros à venda na região antes de visitar a loja.",
    templateNames: ["Motors"],
    relatedArticles: [
      relatedArticle(
        "https://www.plssistemas.com.br/blog/por-que-criar-um-site-em-2026",
      ),
      relatedArticle(
        "https://www.plssistemas.com.br/blog/site-para-agencia-de-veiculos",
      ),
    ],
  },
];

function resolveTemplates(templateNames: string[]): LandingTemplateItem[] {
  return templateNames
    .map((name) => templates.find((template) => template.templateName === name))
    .filter((template): template is LandingTemplateItem => Boolean(template));
}

function resolveCategory(
  definition: BusinessCategoryDefinition,
): ResolvedBusinessCategory {
  const { templateNames, ...rest } = definition;
  const resolvedTemplates = resolveTemplates(templateNames);

  return {
    ...rest,
    path: `${BUSINESS_CATEGORIES_BASE_PATH}/${definition.slug}`,
    templates: resolvedTemplates,
    coverUrl: resolvedTemplates[0]?.templateImage ?? "",
  };
}

export const businessCategories: ResolvedBusinessCategory[] =
  businessCategoryDefinitions.map(resolveCategory);

export function getBusinessCategory(slug: string) {
  return businessCategories.find((category) => category.slug === slug);
}

export function getRelatedBusinessCategories(
  category: ResolvedBusinessCategory,
  limit = 4,
) {
  return businessCategories
    .filter((item) => item.slug !== category.slug)
    .slice(0, limit);
}
