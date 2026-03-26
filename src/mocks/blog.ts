import { IPost } from "@/types/post";

export interface BlogPost extends IPost {
  category: string;
  readingTime: string;
}

const siteId = "pls-sistemas";
const authorId = "pls-editorial";

export const blogPosts: BlogPost[] = [
  {
    id: "post-landing-pages-leads",
    siteId,
    authorId,
    category: "Landing pages",
    title: "Como uma landing page bem estruturada acelera a geração de leads",
    htmlContent:
      "<p>Uma landing page eficiente combina proposta clara, prova social e chamadas para ação objetivas. Quando esses elementos trabalham juntos, a empresa reduz fricção e aumenta o número de contatos qualificados.</p><p>O resultado é um processo comercial mais previsível, com menos desperdício de tráfego pago e mais oportunidades reais para o time de vendas.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2025-01-08T10:00:00.000Z",
    updatedAt: "2025-01-08T10:00:00.000Z",
    deletedAt: null,
    readingTime: "5 min",
  },
  {
    id: "post-seo-local",
    siteId,
    authorId,
    category: "SEO",
    title: "SEO local para empresas de João Monlevade: passos práticos para ganhar relevância",
    htmlContent:
      "<p>Empresas que atuam regionalmente precisam alinhar conteúdo, performance técnica e dados estruturados para aparecer nas buscas certas. Isso inclui página institucional consistente, textos orientados por intenção e sinais de confiança.</p><p>Com ajustes bem executados, o site passa a trabalhar como canal de aquisição e não apenas como vitrine digital.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-12-22T14:30:00.000Z",
    updatedAt: "2024-12-22T14:30:00.000Z",
    deletedAt: null,
    readingTime: "7 min",
  },
  {
    id: "post-automacao-comercial",
    siteId,
    authorId,
    category: "Automação",
    title: "Automação comercial: quando vale sair do controle manual e integrar processos",
    htmlContent:
      "<p>Planilhas isoladas, repasses via WhatsApp e retrabalho escondem gargalos operacionais. A automação ajuda a organizar atendimento, acompanhamento de propostas e histórico de relacionamento.</p><p>O ponto central é identificar tarefas repetitivas que tomam tempo da equipe e transformam crescimento em desorganização.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-11-14T09:15:00.000Z",
    updatedAt: "2024-11-14T09:15:00.000Z",
    deletedAt: null,
    readingTime: "6 min",
  },
  {
    id: "post-performance-sites",
    siteId,
    authorId,
    category: "Performance",
    title: "Sites rápidos convertem mais: otimizações que impactam experiência e SEO",
    htmlContent:
      "<p>Velocidade não é detalhe técnico isolado. Ela influencia permanência, conversão e a forma como mecanismos de busca interpretam a qualidade do site.</p><p>Imagens tratadas, estrutura de componentes enxuta e carregamento inteligente melhoram percepção de marca e desempenho comercial.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-10-28T16:45:00.000Z",
    updatedAt: "2024-10-28T16:45:00.000Z",
    deletedAt: null,
    readingTime: "4 min",
  },
  {
    id: "post-ia-atendimento",
    siteId,
    authorId,
    category: "Inteligência artificial",
    title: "IA aplicada ao atendimento: ganhos reais sem perder contexto nas conversas",
    htmlContent:
      "<p>Automatizar parte do atendimento não significa responder de forma fria. Quando bem configurada, a IA reduz espera, organiza informações e direciona a equipe humana para casos estratégicos.</p><p>O segredo está em definir limites, tom de voz e pontos de transferência para um operador.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-09-17T11:20:00.000Z",
    updatedAt: "2024-09-17T11:20:00.000Z",
    deletedAt: null,
    readingTime: "8 min",
  },
  {
    id: "post-conteudo-institucional",
    siteId,
    authorId,
    category: "Conteúdo",
    title: "Como organizar o conteúdo institucional para transmitir autoridade online",
    htmlContent:
      "<p>Uma boa página institucional precisa responder rapidamente quem é a empresa, o que ela entrega e por que confiar nela. Sem isso, o visitante chega ao site e sai sem contexto.</p><p>Estruturar narrativas, casos atendidos e diferenciais claros fortalece credibilidade e prepara o terreno para conversão.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-08-30T13:00:00.000Z",
    updatedAt: "2024-08-30T13:00:00.000Z",
    deletedAt: null,
    readingTime: "5 min",
  },
];

export const relatedBlogPosts: BlogPost[] = [
  blogPosts[1],
  blogPosts[3],
  blogPosts[5],
];
