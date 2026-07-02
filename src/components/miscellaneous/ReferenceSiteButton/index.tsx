"use client";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/icons/ArrowSquareOut";
import { XIcon } from "@phosphor-icons/react/dist/icons/X";
import { useEffect, useState } from "react";

interface ReferenceSiteButtonProps {
  /** URL do site de referência exibido dentro do modal. */
  url: string;
  /** Rótulo do botão que abre o modal. */
  label?: string;
  /** Título exibido no cabeçalho do modal. */
  title?: string;
  /** Classe extra para o botão de abertura. */
  className?: string;
}

/**
 * Botão que abre o site de referência dentro de um modal quase em tela cheia,
 * usando um iframe. Fechável pelo overlay, pelo botão X e pela tecla Esc.
 * Oferece um link de fallback para abrir em nova aba caso o site bloqueie
 * a exibição em iframe (X-Frame-Options / CSP).
 */
export default function ReferenceSiteButton({
  url,
  label = "Ver site de referência",
  title,
  className,
}: ReferenceSiteButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#030307] transition hover:bg-white/86"
        }
      >
        {label}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Site de referência"}
          className="fixed inset-0 top-4 z-[120] flex flex-col items-center justify-start gap-4 bg-black/90 px-2 pb-2 pt-4 backdrop-blur-sm sm:px-4 sm:pb-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-3 text-base font-bold text-[#030307] shadow-lg transition hover:bg-white/86"
          >
            <XIcon size={20} weight="bold" />
            Fechar
          </button>

          <div
            className="flex h-[84vh] w-[96vw] max-w-[1600px] flex-col overflow-hidden rounded-xl border-2 border-white/70 bg-white shadow-2xl ring-1 ring-white/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-[#030307] px-4 py-2.5 text-white">
              <p className="min-w-0 truncate text-sm font-semibold">
                {title ?? "Site de referência"}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <ArrowSquareOutIcon size={16} weight="bold" />
                  <span className="hidden sm:inline">Abrir em nova aba</span>
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="inline-flex items-center justify-center rounded-full p-1 bg-red-500 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <XIcon size={18} weight="bold" />
                </button>
              </div>
            </div>

            <iframe
              src={url}
              title={title ?? "Site de referência"}
              className="h-full w-full flex-1 border-0 bg-white"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
