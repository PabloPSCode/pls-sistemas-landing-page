'use client';

import clsx from "clsx";
import React from "react";

interface TitleProps {
  /** Conteúdo do texto*/
  content: string;
  /** Elemento HTML a ser utilizado */
  element?: "h2" | "h3" | "h4" | "h5" | "h6";
  /** Peso da fonte */
  weight?: "thin" | "light" | "regular" | "medium" | "semibold" | "bold";
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Componente de subtítulo. Ideal para exibir títulos menores.
 */
export default function Subtitle({
  content,
  weight = "semibold",
  element = "h2",
  className,
}: TitleProps) {
  const lines = content.split("\n");

  return (
    <>
      {React.createElement(
        element,
        {
          className: clsx(
            `text-base sm:text-lg md:text-xl text-foreground font-${weight}`,
            className
          ),
        },
        lines.map((line, index) => (
          <React.Fragment key={`${line}-${index}`}>
            {index > 0 ? <br /> : null}
            {line}
          </React.Fragment>
        ))
      )}
    </>
  );
}

