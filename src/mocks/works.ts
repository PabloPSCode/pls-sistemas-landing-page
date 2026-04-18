export interface WorkItem {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export const worksSectionContent = {
  sectionId: "portfolio",
  title: "PORTFÓLIO",
  subtitle:
    "Veja alguns projetos recentes desenvolvidos pela PLS Sistemas para empresas e profissionais.",
  ctaLabel: "Acessar website",
};

export const works: WorkItem[] = [
  {
    title: "SGO Engenharia",
    description: "Site desenvolvido para a empresa de soldagem e engenharia SGO Engenharia.",
    imageUrl: "/imgs/sgo_engenharia_site.png",
    link: "https://www.sgoengenharia.com.br/",
  },
  {
    title: "MJ Contabilidade",
    description: "Site desenvolvido para o escritório de contabilidade MJ Contabilidade.",
    imageUrl: "/imgs/mj_contabilidade_site.png",
    link: "https://www.mirtescontabilidade.com.br/",
  },
  {
    title: "Camila Terapeuta TRG",
    description: "Site desenvolvido para a Camila Terapeuta TRG.",
    imageUrl: "/imgs/camila_terapeuta_trg_site.png",
    link: "https://www.camilaterapeutatrg.com.br/",
  },
  {
    title: "TreinaHub",
    description:
      "Site desenvolvido para a plataforma de treinamentos online TreinaHub.",
    imageUrl: "/imgs/treinahub_site.png",
    link: "https://www.treinahub.com.br/",
  },
];
