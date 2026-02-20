"use client";

import { useState, type FormEvent } from "react";

import Button from "@/components/buttons/Button";
import ImageCard from "@/components/cards/ImageCard";
import ColorInput from "@/components/inputs/ColorInput";
import MaskedTextInput from "@/components/inputs/MaskedTextInput";
import SelectInput, { type Option } from "@/components/inputs/SelectInput";
import TextInput from "@/components/inputs/TextInput";
import GenericModal from "@/components/modals/GenericModal";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import { MIN_MESSAGE_LENGTH } from "@/constants";
import {
  creationProcessSteps,
  landingServicesContent,
  templates,
} from "@/mocks/landing-page";
import { brazilianPhoneMask } from "@/utils/masks";
import { startWhatsAppChat } from "@/utils/whatsapp";

const fontOptions: Option[] = [
  { label: "Poppins", value: "Poppins" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Raleway", value: "Raleway" },
  { label: "Oxanium", value: "Oxanium" },
  { label: "Roboto", value: "Roboto" },
  { label: "Inter", value: "Inter" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Works Sans", value: "Works Sans" },
  { label: "Ubuntu", value: "Ubuntu" },
];

const fontFamilyMap: Record<string, string> = {
  Poppins: "var(--font-poppins), sans-serif",
  Montserrat: "var(--font-montserrat), sans-serif",
  Raleway: "var(--font-raleway), sans-serif",
  Oxanium: "var(--font-oxanium), sans-serif",
  Roboto: "var(--font-roboto), sans-serif",
  Inter: "var(--font-inter), sans-serif",
  "Open Sans": "var(--font-open-sans), sans-serif",
  "Works Sans": "var(--font-work-sans), sans-serif",
  Ubuntu: "var(--font-ubuntu), sans-serif",
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const TEMPLATE_ITEMS_PER_PAGE = 4;

export default function Page() {
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [currentTemplatePage, setCurrentTemplatePage] = useState(1);
  const [isWebsiteFormModalOpen, setIsWebsiteFormModalOpen] = useState(false);
  const [websiteFormSelectorContext, setWebsiteFormSelectorContext] = useState<
    "domain" | "template" | null
  >(null);
  const [domainQuery, setDomainQuery] = useState("");
  const [domainStatus, setDomainStatus] = useState<
    "available" | "unavailable" | null
  >(null);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [isSubmittingWebsiteForm, setIsSubmittingWebsiteForm] = useState(false);
  const [websiteFormError, setWebsiteFormError] = useState<string | null>(null);
  const [websiteFormSuccess, setWebsiteFormSuccess] = useState<string | null>(
    null,
  );

  const [websiteCreationFormData, setWebsiteCreationFormData] = useState({
    name: "",
    whatsapp: "",
    domain: "",
    templateName: "",
    templateUrl: "",
    primaryColor: "#5b2cf5",
    secondaryColor: "#0f172a",
    font: "Oxanium",
    additionalInfo: "",
  });

  const handleCloseDomainModal = () => {
    setIsDomainModalOpen(false);
    setDomainQuery("");
    setDomainStatus(null);
    setDomainError(null);

    if (websiteFormSelectorContext === "domain") {
      setIsWebsiteFormModalOpen(true);
      setWebsiteFormSelectorContext(null);
    }
  };

  const handleCloseTemplateModal = () => {
    setIsTemplateModalOpen(false);
    setCurrentTemplatePage(1);

    if (websiteFormSelectorContext === "template") {
      setIsWebsiteFormModalOpen(true);
      setWebsiteFormSelectorContext(null);
    }
  };

  const handleCloseWebsiteFormModal = () => {
    setIsWebsiteFormModalOpen(false);
    setWebsiteFormError(null);
    setWebsiteFormSuccess(null);
    setWebsiteFormSelectorContext(null);
  };

  const checkDomainAvailability = async (domain: string) => {
    const normalizedInput = domain.trim();

    if (!normalizedInput) {
      setDomainStatus(null);
      setDomainError("Informe um domínio para consulta.");
      return;
    }

    setDomainError(null);
    setDomainStatus(null);
    setIsCheckingDomain(true);

    try {
      const response = await fetch(
        `/api/fetch-domain?domain=${encodeURIComponent(normalizedInput)}`,
      );
      const data = (await response.json()) as {
        available?: boolean;
        error?: string;
      };

      if (!response.ok) {
        setDomainError(
          data.error || "Não foi possível verificar este domínio.",
        );
        return;
      }

      if (typeof data.available !== "boolean") {
        setDomainError("Resposta inválida da verificação de domínio.");
        return;
      }

      setDomainStatus(data.available ? "available" : "unavailable");
    } catch (error) {
      console.error("Erro ao verificar domínio:", error);
      setDomainError("Falha de conexão ao consultar disponibilidade.");
      setDomainStatus(null);
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleMockDomainCheck = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkDomainAvailability(domainQuery);
  };

  const handleSelectDomain = () => {
    if (domainStatus === "available") {
      setWebsiteCreationFormData((prev) => ({
        ...prev,
        domain: domainQuery.trim(),
      }));
      setIsDomainModalOpen(false);
      setDomainQuery("");
      setDomainStatus(null);
      setDomainError(null);

      if (websiteFormSelectorContext === "domain") {
        setIsWebsiteFormModalOpen(true);
        setWebsiteFormSelectorContext(null);
      }
    }
  };

  const handleSelectTemplate = (templateName: string, templateUrl: string) => {
    setWebsiteCreationFormData((prev) => ({
      ...prev,
      templateName,
      templateUrl,
    }));
    setIsTemplateModalOpen(false);
    setCurrentTemplatePage(1);

    if (websiteFormSelectorContext === "template") {
      setIsWebsiteFormModalOpen(true);
      setWebsiteFormSelectorContext(null);
    }
  };

  const handleOpenTemplateModal = () => {
    setCurrentTemplatePage(1);
    setIsTemplateModalOpen(true);
  };

  const handleOpenDomainModalFromWebsiteForm = () => {
    setWebsiteFormSelectorContext("domain");
    setDomainQuery(websiteCreationFormData.domain);
    setDomainStatus(null);
    setDomainError(null);
    setIsWebsiteFormModalOpen(false);
    setIsDomainModalOpen(true);
  };

  const handleOpenTemplateModalFromWebsiteForm = () => {
    setWebsiteFormSelectorContext("template");
    setIsWebsiteFormModalOpen(false);
    handleOpenTemplateModal();
  };

  const handleWebsiteFormFieldChange = (
    field:
      | "name"
      | "whatsapp"
      | "additionalInfo"
      | "primaryColor"
      | "secondaryColor"
      | "font",
    value: string,
  ) => {
    setWebsiteCreationFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateWebsiteForm = () => {
    if (!websiteCreationFormData.domain) {
      return "Escolha um domínio antes de enviar o formulário.";
    }

    if (!websiteCreationFormData.templateName) {
      return "Escolha um template antes de enviar o formulário.";
    }

    if (!websiteCreationFormData.name.trim()) {
      return "Informe seu nome.";
    }

    if (!websiteCreationFormData.whatsapp.trim()) {
      return "Informe seu WhatsApp.";
    }

    if (!websiteCreationFormData.additionalInfo.trim()) {
      return "Descreva brevemente o que você precisa.";
    }

    return null;
  };

  const handleWebsiteFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWebsiteFormError(null);
    setWebsiteFormSuccess(null);

    const validationError = validateWebsiteForm();
    if (validationError) {
      setWebsiteFormError(validationError);
      return;
    }

    setIsSubmittingWebsiteForm(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const completeMessage = `
        <h2>Novo pedido de website/landing page</h2>
        <p><strong>Nome:</strong> ${escapeHtml(websiteCreationFormData.name)}</p>
        <p><strong>WhatsApp:</strong> ${escapeHtml(websiteCreationFormData.whatsapp)}</p>
        <p><strong>Mensagem:</strong><br />${escapeHtml(websiteCreationFormData.additionalInfo)}</p>
        <p><strong>Informações técnicas do projeto:</strong></p>
        <ul>
          <li><strong>Domínio escolhido:</strong> ${escapeHtml(websiteCreationFormData.domain || "não selecionado")}</li>
          <li><strong>Template escolhido:</strong> ${escapeHtml(websiteCreationFormData.templateName || "não selecionado")}</li>
          <li><strong>Cor primária:</strong> ${escapeHtml(websiteCreationFormData.primaryColor)}</li>
          <li><strong>Cor secundária:</strong> ${escapeHtml(websiteCreationFormData.secondaryColor || "não informada")}</li>
          <li><strong>Fonte escolhida:</strong> ${escapeHtml(websiteCreationFormData.font)}</li>
        </ul>
      `.trim();
      startWhatsAppChat(completeMessage);

      setWebsiteFormSuccess("Solicitação enviada com sucesso (simulação).");
    } catch {
      setWebsiteFormError("Não foi possível enviar agora. Tente novamente.");
    } finally {
      setIsSubmittingWebsiteForm(false);
    }
  };

  const selectedFontOption =
    fontOptions.find(
      (option) => option.value === websiteCreationFormData.font,
    ) || null;
  const selectedFontFamily =
    fontFamilyMap[websiteCreationFormData.font] || "sans-serif";
  const totalTemplatePages = Math.max(
    1,
    Math.ceil(templates.length / TEMPLATE_ITEMS_PER_PAGE),
  );
  const canGoToPreviousTemplatePage = currentTemplatePage > 1;
  const canGoToNextTemplatePage = currentTemplatePage < totalTemplatePages;
  const paginatedTemplates = templates.slice(
    (currentTemplatePage - 1) * TEMPLATE_ITEMS_PER_PAGE,
    currentTemplatePage * TEMPLATE_ITEMS_PER_PAGE,
  );

  return (
    <main className="overflow-x-hidden bg-foreground">
      <section
        className="w-full py-16 sm:py-20 max-w-7xl mx-auto"
        id="criar-site-landing-page"
      >
        <div className="mx-auto w-full max-w-4xl px-8">
          <Title
            content="PROCESSO DE CRIAÇÃO DE WEBSITES E LANDING PAGES"
            element="h3"
            className="text-gray-900  text-xl sm:text-2xl text-center"
          />
          <Subtitle
            content={`Em apenas 5 passos o seu negócio já está disponível para o mundo. \n\n \n Conte nos o que você precisa e deixe o resto por nossa conta (:`}
            className="text-gray-700 mt-4"
          />

          <ol className="mt-10">
            {creationProcessSteps.map((step, index) => (
              <li
                key={step.text}
                className="relative flex gap-4 pb-10 last:pb-0 sm:gap-6"
              >
                <span className="w-8 shrink-0 text-center text-4xl font-black leading-none text-black sm:w-10 sm:text-5xl">
                  {index + 1}
                </span>

                <div className="max-w-3xl pt-1">
                  <Paragraph
                    content={step.text}
                    className="text-gray-900 text-xl sm:text-4xl"
                  />
                  {step.link &&
                  step.link.includes("domínio") &&
                  websiteCreationFormData.domain ? (
                    <span className="text-base sm:text-lg font-bold">
                      Domínio selecionado: {websiteCreationFormData.domain}
                    </span>
                  ) : step.link && step.link.includes("domínio") ? (
                    <button
                      onClick={() => setIsDomainModalOpen(true)}
                      className="mt-2 inline-block text-base font-semibold text-[#1873ff] underline underline-offset-2 hover:text-[#0e5dd0] sm:text-lg"
                    >
                      {step.link}
                    </button>
                  ) : step.link &&
                    step.link.toLowerCase().includes("templates") &&
                    websiteCreationFormData.templateName ? (
                    <div className="mt-2 flex flex-col gap-2">
                      <span className="text-base sm:text-lg font-bold">
                        Template selecionado:{" "}
                        {websiteCreationFormData.templateName}
                      </span>
                      <button
                        onClick={handleOpenTemplateModal}
                        className="w-fit text-base font-semibold text-[#1873ff] underline underline-offset-2 hover:text-[#0e5dd0] sm:text-lg"
                      >
                        Trocar template
                      </button>
                    </div>
                  ) : step.link &&
                    step.link.toLowerCase().includes("templates") ? (
                    <button
                      onClick={handleOpenTemplateModal}
                      className="mt-2 inline-block text-base font-semibold text-[#1873ff] underline underline-offset-2 hover:text-[#0e5dd0] sm:text-lg"
                    >
                      {step.link}
                    </button>
                  ) : step.link &&
                    step.link.toLowerCase().includes("formul") ? (
                    <button
                      onClick={() => setIsWebsiteFormModalOpen(true)}
                      className="mt-2 inline-block text-base font-semibold text-[#1873ff] underline underline-offset-2 hover:text-[#0e5dd0] sm:text-lg"
                    >
                      {step.link}
                    </button>
                  ) : step.link ? (
                    <a
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-base font-semibold text-[#1873ff] underline underline-offset-2 hover:text-[#0e5dd0] sm:text-lg"
                    >
                      {step.link}
                    </a>
                  ) : null}
                </div>

                {index < creationProcessSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[1rem] top-12 h-4 w-[3px] bg-primary-500 sm:left-[1.2rem] sm:top-14 sm:h-6"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-8 py-12" id="detalhes">
        <Title
          content={landingServicesContent.title}
          element="h1"
          className="text-center text-gray-900 tracking-[0.16em] font-black text-2xl sm:text-4xl"
        />
        <Subtitle
          content={landingServicesContent.subtitle}
          className="mx-auto mt-5 max-w-4xl text-center text-gray-900/90 text-base sm:text-3xl"
        />

        <div className="w-full mt-14 space-y-12 max-w-7xl mx-auto flex flex-col items-center">
          {landingServicesContent.items.map((item, index) => {
            return (
              <article key={item.title} className="w-[80%] sm:w-[70%] mx-auto">
                <Subtitle
                  content={`${index + 1}. ${item.title}`}
                  element="h2"
                  className="text-gray-900 text-2xl sm:text-4xl"
                />

                <Paragraph
                  content={item.description}
                  className="mt-3 text-gray-900/85 text-base sm:text-2xl"
                />

                {item.highlights && (
                  <ul className="mt-3 list-disc">
                    {item.highlights.map((detail) => (
                      <li key={detail}>
                        <Paragraph
                          content={detail}
                          className="text-gray-900/80 text-sm sm:text-lg"
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <GenericModal
        open={isDomainModalOpen}
        onClose={handleCloseDomainModal}
        title="Consulta de disponibilidade de domínio"
        size="xl"
        className="bg-white text-gray-900"
        showCloseButton
      >
        <div className="overflow-hidden rounded-lg border border-foreground/15">
          <form
            onSubmit={handleMockDomainCheck}
            className="space-y-4 bg-white px-4 pt-2 sm:px-5"
          >
            <label
              htmlFor="domain-query"
              className="block text-sm font-semibold text-gray-900"
            >
              Digite o domínio que deseja consultar
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="domain-query"
                type="text"
                value={domainQuery}
                onChange={(event) => setDomainQuery(event.target.value)}
                placeholder="exemplo.com.br"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-300/30 disabled:cursor-not-allowed disabled:opacity-70"
              />
              <button
                type="submit"
                disabled={isCheckingDomain}
                className="rounded-md bg-[#1873ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e5dd0] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isCheckingDomain ? "Verificando..." : "Verificar"}
              </button>
            </div>
            {domainError && (
              <div className="rounded-md border border-orange-200 bg-orange-50 px-3 py-2">
                <Paragraph
                  content={domainError}
                  className="text-orange-700 text-sm"
                />
              </div>
            )}
            {domainStatus === "available" && (
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
                <Paragraph
                  content="Disponível nesta simulação. Você pode seguir com o registro."
                  className="text-green-700 text-sm"
                />
              </div>
            )}
            {domainStatus === "unavailable" && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
                <Paragraph
                  content="Indisponível nesta simulação. Tente outra opção de domínio."
                  className="text-red-700 text-sm"
                />
              </div>
            )}
            <Button
              label="Utilizar este domínio"
              className="text-white font-bold w-full"
              onClick={handleSelectDomain}
              disabled={domainStatus !== "available"}
            />
          </form>
        </div>
      </GenericModal>

      <GenericModal
        open={isTemplateModalOpen}
        onClose={handleCloseTemplateModal}
        title="Selecione o template desejado"
        size="xl"
        className="bg-white text-gray-900 overflow-x-hidden"
        showCloseButton
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paginatedTemplates.map((template) => (
            <ImageCard
              key={template.templateUrl}
              title={template.templateName}
              imgUrl={template.templateImage}
              description={`Recomendado para ${template.recommendation}`}
              onSeeDetails={() =>
                window.open(
                  template.templateUrl,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              onSelectUrl={() =>
                handleSelectTemplate(
                  template.templateName,
                  template.templateUrl,
                )
              }
              seeButtonLabel="Ver"
              selectButtonLabel="Selecionar"
            />
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center gap-2">
          <Paragraph
            content={`Página ${currentTemplatePage} de ${totalTemplatePages}`}
            className="text-sm text-gray-900"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setCurrentTemplatePage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={!canGoToPreviousTemplatePage}
              className="rounded-md border border-[#1873ff] px-4 py-2 text-sm font-semibold text-[#1873ff] transition-colors hover:bg-[#e8f1ff] disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentTemplatePage((prevPage) =>
                  Math.min(prevPage + 1, totalTemplatePages),
                )
              }
              disabled={!canGoToNextTemplatePage}
              className="rounded-md border border-[#1873ff] px-4 py-2 text-sm font-semibold text-[#1873ff] transition-colors hover:bg-[#e8f1ff] disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
            >
              Próximo
            </button>
          </div>
        </div>
      </GenericModal>

      <GenericModal
        open={isWebsiteFormModalOpen}
        onClose={handleCloseWebsiteFormModal}
        title="Formulário de criação de website/landing page"
        size="lg"
        className="bg-white text-gray-900 overflow-x-hidden"
        showCloseButton
      >
        <form
          onSubmit={handleWebsiteFormSubmit}
          className="space-y-4 text-gray-900 [--color-bg:#ffffff] [--color-border:#d1d5db] [--color-foreground:#111827]"
        >
          <Subtitle content="Informações do site" />
          <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <p className="text-sm text-gray-900">
              <strong>Domínio selecionado:</strong>{" "}
              {websiteCreationFormData.domain || "Não selecionado"}
            </p>
            <p className="mt-1 text-sm text-gray-900">
              <strong>Template selecionado:</strong>{" "}
              {websiteCreationFormData.templateName || "Não selecionado"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleOpenDomainModalFromWebsiteForm}
                className="rounded-md border border-primary-400 px-3 py-1.5 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                {websiteCreationFormData.domain
                  ? "Trocar domínio"
                  : "Selecionar domínio"}
              </button>
              <button
                type="button"
                onClick={handleOpenTemplateModalFromWebsiteForm}
                className="rounded-md border border-primary-400 px-3 py-1.5 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                {websiteCreationFormData.templateName
                  ? "Trocar template"
                  : "Selecionar template"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-8 w-full">
            <ColorInput
              id="website-creation-primary-color"
              label="Cor primária"
              className="bg-white w-[80px]"
              containerClassName="[&>label]:text-gray-900 [&>p]:text-gray-900 max-w-[280px]"
              value={websiteCreationFormData.primaryColor}
              onChange={(event) =>
                handleWebsiteFormFieldChange("primaryColor", event.target.value)
              }
            />

            <ColorInput
              id="website-creation-secondary-color"
              label="Cor secundária (opcional)"
              className="bg-white w-[80px]"
              containerClassName="[&>label]:text-gray-900 [&>p]:text-gray-900 w-fit max-w-[280px]"
              value={websiteCreationFormData.secondaryColor}
              onChange={(event) =>
                handleWebsiteFormFieldChange(
                  "secondaryColor",
                  event.target.value,
                )
              }
            />
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <p
              className="text-lg font-bold text-gray-900"
              style={{
                fontFamily: selectedFontFamily,
              }}
            >
              Prévia da fonte selecionada - {selectedFontOption?.label || ""}
            </p>
            <p
              className="mt-2 text-sm text-gray-900"
              style={{
                fontFamily: selectedFontFamily,
              }}
            >
              Este texto demonstra como títulos e conteúdos podem aparecer com a
              fonte e as cores escolhidas para seu website/landing page.
            </p>
          </div>

          <SelectInput
            id="website-creation-font"
            label="Fonte"
            options={fontOptions}
            value={selectedFontOption}
            onSelectOption={(selected) =>
              handleWebsiteFormFieldChange(
                "font",
                String(selected?.value ?? ""),
              )
            }
            placeholder="Selecione uma fonte"
            isSearchable={false}
            notFoundOptionsMessage="Nenhuma fonte disponível."
            containerClassName="[--color-border:#d1d5db] [--color-foreground:#111827] [--color-placeholder:#111827]"
            labelClassName="text-gray-900"
          />

          <Subtitle content="Informações do solicitante" className="mt-8" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <TextInput
              id="website-creation-name"
              label="Nome"
              value={websiteCreationFormData.name}
              onChange={(event) =>
                handleWebsiteFormFieldChange("name", event.target.value)
              }
              placeholder="João Silva"
              className="mt-1 bg-white text-gray-900 placeholder:text-gray-500"
              containerClassName="[&>label]:text-gray-900 [&>p]:text-gray-900"
            />
            <MaskedTextInput
              id="website-creation-whatsapp"
              label="WhatsApp"
              mask={brazilianPhoneMask}
              value={websiteCreationFormData.whatsapp}
              onChange={(event) =>
                handleWebsiteFormFieldChange("whatsapp", event.target.value)
              }
              placeholder="(31) 99999-9999"
              className="mt-1 bg-white text-gray-900 placeholder:text-gray-500"
              containerClassName="[&>label]:text-gray-900 [&>p]:text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="website-creation-message"
              className="block text-sm font-semibold text-gray-900"
            >
              Mensagem
            </label>
            <textarea
              id="website-creation-message"
              value={websiteCreationFormData.additionalInfo}
              onChange={(event) =>
                handleWebsiteFormFieldChange(
                  "additionalInfo",
                  event.target.value,
                )
              }
              placeholder="Descreva o seu projeto, quanto mais detalhes, melhor! Quais funcionalidades deseja? Qual o objetivo do site/landing page? Para que tipo de público?"
              rows={5}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-900 outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-300/30"
            />
          </div>

          {websiteFormError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2">
              <Paragraph
                content={websiteFormError}
                className="text-red-700 text-sm"
              />
            </div>
          )}

          {websiteFormSuccess && (
            <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
              <Paragraph
                content={websiteFormSuccess}
                className="text-green-700 text-sm"
              />
            </div>
          )}

          <Button
            type="submit"
            label={
              isSubmittingWebsiteForm ? "Enviando..." : "Enviar solicitação"
            }
            loading={isSubmittingWebsiteForm}
            className="w-full text-white font-bold"
            disabled={
              isSubmittingWebsiteForm ||
              !websiteCreationFormData.domain ||
              !websiteCreationFormData.templateName ||
              !websiteCreationFormData.name.trim() ||
              !websiteCreationFormData.whatsapp.trim() ||
              !websiteCreationFormData.additionalInfo.trim() ||
              websiteCreationFormData.additionalInfo.length < MIN_MESSAGE_LENGTH
            }
          />
        </form>
      </GenericModal>
    </main>
  );
}
