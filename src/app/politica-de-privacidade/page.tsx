import type { Metadata } from "next";

import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";

const lastUpdated = "17 de fevereiro de 2026";

export const metadata: Metadata = {
  title: "Política de Privacidade | PLS Sistemas",
  description:
    "Política de Privacidade da PLS Sistemas, empresa de desenvolvimento de sistemas web e software em João Monlevade - MG.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
};

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-[#2B2B2B] p-5 sm:p-7">
      <Subtitle
        content={title}
        className="text-white text-xl sm:text-3xl tracking-wide"
      />
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-8 sm:mb-10">
          <Title
            content="Política de Privacidade"
            element="h1"
            className="text-gray-900 text-3xl sm:text-6xl tracking-[0.08em]"
          />
          <Paragraph
            content={`Última atualização: ${lastUpdated}`}
            className="mt-3 text-gray-700 text-sm sm:text-lg"
          />
          <Paragraph
            content="A presente Política de Privacidade descreve como a PLS Sistemas coleta, utiliza, armazena, compartilha e protege dados pessoais no contexto de seus serviços digitais, websites e sistemas web. Atuamos em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), com foco em transparência, segurança e respeito aos direitos dos titulares."
            className="mt-4 text-gray-700 text-base sm:text-xl"
          />
        </header>

        <div className="space-y-5">
          <PolicySection title="1. Quem somos">
            <Paragraph
              content="A PLS Sistemas é uma empresa de desenvolvimento de software, websites e Soluções para seu negócio, inscrita no CNPJ 47.463.499/0001-37 e sediada em João Monlevade - Minas Gerais. Para fins da LGPD, a PLS Sistemas poderá atuar como Controladora ou Operadora de dados pessoais, conforme a natureza de cada serviço contratado."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="2. Quais dados pessoais podemos tratar">
            <Paragraph
              content="Dependendo da sua interação com nosso site e nossos serviços, podemos tratar:"
              className="text-white/90 text-sm sm:text-lg"
            />
            <ul className="list-disc space-y-2 pl-5 text-white/85">
              <li className="text-sm sm:text-lg">
                Dados de contato: nome, telefone, e-mail e empresa.
              </li>
              <li className="text-sm sm:text-lg">
                Dados de atendimento: conteúdo de mensagens enviadas em
                formulários e canais oficiais.
              </li>
              <li className="text-sm sm:text-lg">
                Dados técnicos: IP, data e hora de acesso, navegador, sistema
                operacional, páginas visitadas e identificadores de sessão.
              </li>
              <li className="text-sm sm:text-lg">
                Dados de cookies e tecnologias similares, quando habilitados no
                navegador.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="3. Como coletamos os dados">
            <ul className="list-disc space-y-2 pl-5 text-white/85">
              <li className="text-sm sm:text-lg">
                Diretamente do titular, ao preencher formulários ou solicitar
                contato.
              </li>
              <li className="text-sm sm:text-lg">
                Automaticamente, por meio de logs de acesso, cookies e
                ferramentas de análise.
              </li>
              <li className="text-sm sm:text-lg">
                De fontes públicas e parceiros, quando necessário para execução
                contratual e dentro dos limites legais.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Finalidades do tratamento">
            <Paragraph
              content="Tratamos dados pessoais para finalidades legítimas e específicas, tais como:"
              className="text-white/90 text-sm sm:text-lg"
            />
            <ul className="list-disc space-y-2 pl-5 text-white/85">
              <li className="text-sm sm:text-lg">
                Responder solicitações e prestar suporte técnico/comercial.
              </li>
              <li className="text-sm sm:text-lg">
                Elaborar propostas, contratos e executar serviços contratados.
              </li>
              <li className="text-sm sm:text-lg">
                Melhorar desempenho, usabilidade e segurança dos nossos sistemas
                e websites.
              </li>
              <li className="text-sm sm:text-lg">
                Cumprir obrigações legais, regulatórias e auditorias.
              </li>
              <li className="text-sm sm:text-lg">
                Prevenir fraudes e incidentes de segurança.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Bases legais (LGPD)">
            <Paragraph
              content="O tratamento de dados pessoais pode ocorrer com base em uma ou mais hipóteses legais previstas na LGPD, incluindo: execução de contrato, cumprimento de obrigação legal/regulatória, legítimo interesse, exercício regular de direitos e, quando aplicável, consentimento do titular."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="6. Compartilhamento de dados">
            <Paragraph
              content="A PLS Sistemas pode compartilhar dados pessoais, quando necessário e proporcional, com:"
              className="text-white/90 text-sm sm:text-lg"
            />
            <ul className="list-disc space-y-2 pl-5 text-white/85">
              <li className="text-sm sm:text-lg">
                Provedores de infraestrutura, hospedagem, analytics e
                comunicação.
              </li>
              <li className="text-sm sm:text-lg">
                Parceiros técnicos e prestadores que auxiliam na execução dos
                serviços.
              </li>
              <li className="text-sm sm:text-lg">
                Autoridades públicas e órgãos reguladores, quando houver
                obrigação legal.
              </li>
            </ul>
            <Paragraph
              content="Não comercializamos dados pessoais."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="7. Cookies e tecnologias similares">
            <Paragraph
              content="Utilizamos cookies e tecnologias correlatas para funcionamento do site, análise de tráfego, melhorias de experiência e segurança. Você pode gerenciar as preferências de cookies no navegador. A desativação pode impactar funcionalidades específicas."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="8. Armazenamento e retenção">
            <Paragraph
              content="Os dados pessoais são armazenados pelo período necessário ao cumprimento das finalidades previstas nesta política, respeitando prazos legais e regulatórios. Após esse período, os dados são eliminados ou anonimizados, salvo hipóteses legais de conservação."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="9. Segurança da informação">
            <Paragraph
              content="Adotamos medidas técnicas e administrativas razoáveis para proteção dos dados pessoais contra acessos não autorizados, uso indevido, perda, alteração ou destruição. Entre elas: controle de acesso, monitoramento, boas práticas de desenvolvimento e revisão periódica de segurança."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="10. Direitos do titular de dados">
            <Paragraph
              content="Nos termos da LGPD, você pode solicitar, quando aplicável:"
              className="text-white/90 text-sm sm:text-lg"
            />
            <ul className="list-disc space-y-2 pl-5 text-white/85">
              <li className="text-sm sm:text-lg">
                Confirmação da existência de tratamento.
              </li>
              <li className="text-sm sm:text-lg">
                Acesso, correção e atualização de dados incompletos ou
                desatualizados.
              </li>
              <li className="text-sm sm:text-lg">
                Anonimização, bloqueio ou eliminação de dados desnecessários.
              </li>
              <li className="text-sm sm:text-lg">
                Portabilidade, quando cabível e tecnicamente viável.
              </li>
              <li className="text-sm sm:text-lg">
                Informações sobre compartilhamentos e revogação de consentimento
                (quando essa for a base legal).
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="11. Como exercer seus direitos">
            <Paragraph
              content="Para exercer direitos relacionados à privacidade, utilize os canais oficiais de atendimento da PLS Sistemas disponibilizados em nosso site. Poderemos solicitar informações adicionais para validar sua identidade e proteger seus dados."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="12. Transferência internacional de dados">
            <Paragraph
              content="Alguns fornecedores de tecnologia podem manter infraestrutura fora do Brasil. Nesses casos, adotamos salvaguardas contratuais e medidas adequadas para assegurar proteção compatível com a LGPD."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="13. Dados de crianças e adolescentes">
            <Paragraph
              content="Nossos serviços não são direcionados intencionalmente a crianças. Caso identifiquemos tratamento indevido de dados de menores sem base legal adequada, adotaremos as medidas necessárias para exclusão ou regularização."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="14. Alterações desta política">
            <Paragraph
              content="Esta Política de Privacidade poderá ser atualizada periodicamente para refletir mudanças legais, técnicas ou operacionais. A versão vigente estará sempre disponível nesta página, com data da última atualização."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>

          <PolicySection title="15. Foro e legislação aplicável">
            <Paragraph
              content="Esta política é regida pela legislação brasileira. Eventuais controvérsias serão tratadas no foro da comarca de João Monlevade - MG, salvo disposição legal em contrário."
              className="text-white/90 text-sm sm:text-lg"
            />
          </PolicySection>
        </div>
      </div>
    </main>
  );
}
