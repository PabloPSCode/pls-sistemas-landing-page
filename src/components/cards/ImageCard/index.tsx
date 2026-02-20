"use client";

import Image from "next/image";

interface ImageCardProps {
  /** URL da imagem a ser exibida. */
  imgUrl: string;
  /** Título da imagem. */
  title: string;
  /** Descrição da imagem (opcional). */
  description?: string;
  /** Função chamada ao clicar em "Ver Detalhes" (opcional). */
  onSeeDetails?: () => void;
  /** Função chamada ao selecionar o card para uso no fluxo (opcional). */
  onSelectUrl?: () => void;
  /** Texto do botão "ver". */
  seeButtonLabel?: string;
  /** Texto do botão "selecionar". */
  selectButtonLabel?: string;
}

/**
 * Card de imagem.
 * - Responsivo para ser usado em seções de landing pages ou vitrines de produtos.
 */
export default function ImageCard({
  imgUrl,
  title,
  description,
  onSeeDetails,
  onSelectUrl,
  seeButtonLabel = "Ver",
  selectButtonLabel = "Selecionar",
}: ImageCardProps) {
  const handleSeeDetails = () => {
    if (onSeeDetails) {
      onSeeDetails();
    }
  };

  const handleSelect = () => {
    if (onSelectUrl) {
      onSelectUrl();
    }
  };

  return (
    <div
      className="
        flex flex-col items-center text-center text-gray-900 bg-foreground-card 
         gap-4 shadow-md rounded-lg p-4 max-w-sm mx-auto
      "
    >
      {/* Imagem */}
      <Image
        src={imgUrl}
        alt={title}
        width={640}
        height={384}
        className="w-full h-1/2 object-cover rounded-lg mb-4"
      />

      {/* Título */}
      <h3 className="font-semibold text-md sm:text-lg text-gray-900 -mt-4">
        {title}
      </h3>

      {/* Descrição */}
      {description && (
        <p className="text-gray-700 text-xs sm:text-sm">{description}</p>
      )}

      {/* Botão "Ver Detalhes" */}
      {(onSeeDetails || onSelectUrl) && (
        <div className="flex flex-col gap-2 w-full">
          {onSeeDetails && (
            <button
              onClick={handleSeeDetails}
              className="w-full flex items-center justify-center px-3 py-2 border border-primary-300 text-primary-300 text-xs sm:text-sm rounded-lg hover:bg-primary-50"
              aria-label="Ver template"
              aria-roledescription="botão"
            >
              {seeButtonLabel}
            </button>
          )}

          {onSelectUrl && (
            <button
              onClick={handleSelect}
              className="w-full flex items-center justify-center px-3 py-2 bg-primary-600 text-white text-xs sm:text-sm rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Selecionar template"
              aria-roledescription="botão"
            >
              {selectButtonLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
