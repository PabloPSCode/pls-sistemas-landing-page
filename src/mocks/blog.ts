import { IPost } from "@/types/post";
import { formatSlug } from "@/utils/slug";

export interface BlogPost extends IPost {
  slug: string;
  category: string;
  readingTime: string;
  tags: string[];
  authorName: string;
  authorAvatarUrl: string;
}

const siteId = "pls-sistemas";
const authorId = "pls-editorial";
const authorName = "Equipe PLS Sistemas";
const authorAvatarUrl = "/imgs/profile_1.png";
const baseBlogRoute = "/blog";

type BlogPostSeed = Omit<BlogPost, "slug">;

const blogPostSeeds: BlogPostSeed[] = [
  {
    id: "post-landing-pages-leads",
    siteId,
    authorId,
    authorName,
    authorAvatarUrl,
    category: "Landing pages",
    title: "Como uma landing page bem estruturada acelera a geração de leads",
    htmlContent:
      "<h2>Fundamentos que fazem a página converter</h2><p>Uma landing page eficiente combina proposta clara, prova social e chamadas para ação objetivas. Quando esses elementos trabalham juntos, a empresa reduz fricção e aumenta o número de contatos qualificados.</p><p>O visitante precisa entender em segundos qual problema está sendo resolvido, por que vale a pena continuar na página e o que ele deve fazer em seguida.</p><h2>Elementos que sustentam a decisão</h2><p>Seções curtas, benefícios concretos, depoimentos e CTAs bem distribuídos tornam a navegação mais previsível. Isso evita páginas bonitas, mas confusas, que perdem oportunidade por excesso de informação ou falta de hierarquia.</p><ul><li>Headline com proposta de valor direta.</li><li>Blocos visuais que reforçam credibilidade.</li><li>CTA recorrente em pontos estratégicos da leitura.</li></ul><h2>Impacto comercial</h2><p>O resultado é um processo comercial mais previsível, com menos desperdício de tráfego pago e mais oportunidades reais para o time de vendas. A página deixa de ser apenas institucional e passa a operar como um canal de captação.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2025-01-08T10:00:00.000Z",
    updatedAt: "2025-01-08T10:00:00.000Z",
    deletedAt: null,
    readingTime: "5 min",
    tags: ["Landing Pages", "Captação de Leads", "Conversão"],
  },
  {
    id: "post-seo-local",
    siteId,
    authorId,
    authorName,
    authorAvatarUrl,
    category: "SEO",
    title: "SEO local para empresas de João Monlevade: passos práticos para ganhar relevância",
    htmlContent:
      "<h2>Relevância regional começa na estrutura</h2><p>Empresas que atuam regionalmente precisam alinhar conteúdo, performance técnica e dados estruturados para aparecer nas buscas certas. Isso inclui página institucional consistente, textos orientados por intenção e sinais de confiança.</p><p>Não basta citar a cidade uma vez. O site precisa construir contexto local com páginas bem nomeadas, títulos úteis e sinais claros sobre área de atendimento.</p><h2>O que priorizar primeiro</h2><p>Os maiores ganhos normalmente aparecem quando a empresa organiza informações básicas com rigor e evita conteúdo genérico. Endereço, áreas atendidas, descrições de serviço e páginas específicas ajudam o Google a entender o negócio.</p><blockquote>SEO local funciona melhor quando o site responde com clareza quem você atende, onde você atende e por que sua empresa merece aparecer.</blockquote><h2>Resultado esperado</h2><p>Com ajustes bem executados, o site passa a trabalhar como canal de aquisição e não apenas como vitrine digital. Isso melhora a qualidade do tráfego e aumenta a chance de contato qualificado.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-12-22T14:30:00.000Z",
    updatedAt: "2024-12-22T14:30:00.000Z",
    deletedAt: null,
    readingTime: "7 min",
    tags: ["SEO Local", "Google", "Tráfego Orgânico"],
  },
  {
    id: "post-automacao-comercial",
    siteId,
    authorId,
    authorName,
    authorAvatarUrl,
    category: "Automação",
    title: "Automação comercial: quando vale sair do controle manual e integrar processos",
    htmlContent:
      "<h2>O custo invisível do processo manual</h2><p>Planilhas isoladas, repasses via WhatsApp e retrabalho escondem gargalos operacionais. A automação ajuda a organizar atendimento, acompanhamento de propostas e histórico de relacionamento.</p><p>Quando o negócio cresce, o improviso deixa de ser solução rápida e passa a comprometer prazo, previsibilidade e experiência do cliente.</p><h2>Como identificar o momento certo</h2><p>O ponto central é identificar tarefas repetitivas que tomam tempo da equipe e transformam crescimento em desorganização. Entradas duplicadas, perda de histórico e dependência de uma pessoa são sinais claros.</p><ul><li>Centralização de dados comerciais.</li><li>Padronização de etapas de atendimento.</li><li>Menos retrabalho entre vendas e operação.</li></ul><h2>Automação com critério</h2><p>Automatizar não é apenas substituir pessoas por sistema. É criar um fluxo em que a equipe trabalha com mais contexto, menos ruído e mais capacidade de acompanhar oportunidades em escala.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-11-14T09:15:00.000Z",
    updatedAt: "2024-11-14T09:15:00.000Z",
    deletedAt: null,
    readingTime: "6 min",
    tags: ["Automação", "Processos", "Eficiência Operacional"],
  },
  {
    id: "post-performance-sites",
    siteId,
    authorId,
    authorName,
    authorAvatarUrl,
    category: "Performance",
    title: "Sites rápidos convertem mais: otimizações que impactam experiência e SEO",
    htmlContent:
      "<h2>Velocidade afeta percepção e resultado</h2><p>Velocidade não é detalhe técnico isolado. Ela influencia permanência, conversão e a forma como mecanismos de busca interpretam a qualidade do site.</p><p>Quando uma página demora a responder, o visitante perde confiança antes mesmo de consumir a oferta. Em campanhas, isso impacta diretamente o custo de aquisição.</p><h2>Onde os ganhos costumam aparecer</h2><p>Imagens tratadas, estrutura de componentes enxuta e carregamento inteligente melhoram percepção de marca e desempenho comercial. Muitas vezes, pequenas correções geram diferença visível na experiência.</p><ul><li>Compressão e dimensionamento correto de imagens.</li><li>Remoção de dependências desnecessárias.</li><li>Renderização mais eficiente acima da dobra.</li></ul><h2>Performance como ativo competitivo</h2><p>Um site rápido comunica organização, cuidado e maturidade digital. Isso fortalece a marca e melhora a chance de o usuário avançar para o contato ou para a próxima etapa da jornada.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-10-28T16:45:00.000Z",
    updatedAt: "2024-10-28T16:45:00.000Z",
    deletedAt: null,
    readingTime: "4 min",
    tags: ["Performance Web", "Experiência do Usuário", "SEO Técnico"],
  },
  {
    id: "post-ia-atendimento",
    siteId,
    authorId,
    authorName,
    authorAvatarUrl,
    category: "Inteligência artificial",
    title: "IA aplicada ao atendimento: ganhos reais sem perder contexto nas conversas",
    htmlContent:
      "<h2>Atendimento mais ágil sem virar resposta genérica</h2><p>Automatizar parte do atendimento não significa responder de forma fria. Quando bem configurada, a IA reduz espera, organiza informações e direciona a equipe humana para casos estratégicos.</p><p>O valor real está em remover etapas repetitivas sem sacrificar contexto, clareza ou confiança no contato com o cliente.</p><h2>Definição de limites importa</h2><p>O segredo está em definir limites, tom de voz e pontos de transferência para um operador. A IA deve resolver o que é previsível e encaminhar rapidamente o que exige análise humana.</p><blockquote>IA útil no atendimento não é a que responde tudo. É a que sabe o que responder, como responder e quando escalar.</blockquote><h2>Ganhos operacionais</h2><p>Com uma boa configuração, a equipe ganha tempo para tratar negociações, exceções e demandas de maior impacto, enquanto o cliente recebe respostas iniciais com mais velocidade e consistência.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-09-17T11:20:00.000Z",
    updatedAt: "2024-09-17T11:20:00.000Z",
    deletedAt: null,
    readingTime: "8 min",
    tags: ["IA", "Atendimento", "Produtividade"],
  },
  {
    id: "post-conteudo-institucional",
    siteId,
    authorId,
    authorName,
    authorAvatarUrl,
    category: "Conteúdo",
    title: "Como organizar o conteúdo institucional para transmitir autoridade online",
    htmlContent:
      "<h2>Autoridade nasce de clareza</h2><p>Uma boa página institucional precisa responder rapidamente quem é a empresa, o que ela entrega e por que confiar nela. Sem isso, o visitante chega ao site e sai sem contexto.</p><p>Antes de pensar em volume de texto, a empresa precisa organizar sua narrativa principal, diferenciais e provas que sustentam a promessa feita no topo da página.</p><h2>O que não pode faltar</h2><p>Estruturar narrativas, casos atendidos e diferenciais claros fortalece credibilidade e prepara o terreno para conversão. A página institucional deve orientar o visitante sem obrigá-lo a interpretar demais.</p><ul><li>Apresentação objetiva da empresa.</li><li>Serviços ou soluções explicados com linguagem clara.</li><li>Provas de experiência, cases ou contexto de atuação.</li></ul><h2>Conteúdo que prepara a conversão</h2><p>Quando o institucional é bem construído, ele reduz insegurança e encurta o caminho até o contato. O site passa a funcionar como argumento comercial contínuo, mesmo fora do horário de atendimento.</p>",
    backgroundUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
    createdAt: "2024-08-30T13:00:00.000Z",
    updatedAt: "2024-08-30T13:00:00.000Z",
    deletedAt: null,
    readingTime: "5 min",
    tags: ["Conteúdo Institucional", "Autoridade", "Marca"],
  },
];

export const blogPosts: BlogPost[] = blogPostSeeds.map((post) => ({
  ...post,
  slug: formatSlug(post.title),
}));

export function getBlogPostHref(post: Pick<BlogPost, "slug">): string {
  return `${baseBlogRoute}/${post.slug}`;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(
  slug: string,
  limit = 3,
): BlogPost[] {
  const currentPost = getBlogPostBySlug(slug);

  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== slug)
    .sort((postA, postB) => {
      const scoreA = getRelatedScore(postA, currentPost);
      const scoreB = getRelatedScore(postB, currentPost);

      if (scoreA !== scoreB) return scoreB - scoreA;

      return (
        new Date(postB.createdAt).getTime() -
        new Date(postA.createdAt).getTime()
      );
    })
    .slice(0, limit);
}

function getRelatedScore(post: BlogPost, currentPost: BlogPost): number {
  const sharedTags = post.tags.filter((tag) =>
    currentPost.tags.includes(tag),
  ).length;

  return sharedTags + (post.category === currentPost.category ? 3 : 0);
}
