'use client';

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import React, { useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper/bundle";
import { A11y, Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

export type CarouselBreakpoint = {
  /** Quantos slides por “linha” em cada breakpoint. */
  slidesPerView: number;
  /** Quantas linhas (grid) nesse breakpoint (padrão: 1). */
  rows?: number;
  /** Espaçamento em px (padrão: herda `spaceBetween`). */
  spaceBetween?: number;
};

export interface CarouselProps<T = unknown> {
  /** Itens genéricos para renderização. */
  items: T[];
  /** Renderizador de item. */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Título opcional acima do carrossel. */
  title?: string;
  /** Quantos slides por view no “base” (mobile). */
  slidesPerView?: number;
  /** Quantas linhas (grid) no “base” (mobile). */
  rows?: number;
  /** Espaçamento entre slides. */
  spaceBetween?: number;
  /** Loop infinito. */
  loop?: boolean;
  /** Exibir botões de navegação. */
  showNavigation?: boolean;
  /** Breakpoints do Swiper (xs→xl). Use chaves em px. */
  breakpoints?: Record<number, CarouselBreakpoint>;
  /** Classe aplicada ao container externo. */
  className?: string;
  /** Classe aplicada ao Swiper (ex.: padding para não cortar sombras dos cards). */
  swiperClassName?: string;
  /** Callback no slide change. */
  onSlideChange?: (swiper: SwiperType) => void;
}

/**
 * # Carousel (Swiper)
 *
 * Carrossel genérico e **flexível** baseado em `swiper`.
 * - **Responsivo** com `breakpoints` e **suporte a grid** (linhas);
 * - **Dark mode** via utilitários (`bg-background`, `text-foreground`);
 * - **Acessível**: usa módulo `A11y` e botões com `aria-label`;
 * - Navegação externa (botões) opcional.
 *
 * Exemplo simples:
 * ```tsx
 * <Carousel
 *   items={dados}
 *   renderItem={(it) => <Card {...it} />}
 *   breakpoints={{
 *     320: { slidesPerView: 1, rows: 1 },
 *     768: { slidesPerView: 2, rows: 1 },
 *     1024: { slidesPerView: 3, rows: 1 },
 *   }}
 * />
 * ```
 */
export default function Carousel<T>({
  items,
  renderItem,
  title,
  slidesPerView = 1,
  rows = 1,
  spaceBetween = 24,
  loop = false,
  showNavigation = true,
  breakpoints,
  className,
  swiperClassName,
  onSlideChange,
}: CarouselProps<T>) {
  // Elements kept in state (not refs) so Swiper binds them whether the buttons
  // render before or after the slider.
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const computedBreakpoints = useMemo(() => {
    if (!breakpoints) return undefined;
    const map: Record<number, unknown> = {};
    Object.entries(breakpoints).forEach(([px, cfg]) => {
      map[Number(px)] = {
        slidesPerView: cfg.slidesPerView,
        grid: { rows: cfg.rows ?? 1, fill: "row" as const },
        // An explicit `undefined` would override the base value and break the layout.
        ...(cfg.spaceBetween !== undefined && { spaceBetween: cfg.spaceBetween }),
      };
    });
    return map;
  }, [breakpoints]);

  const navigationButtons = (
    <>
      <button
        ref={setPrevEl}
        type="button"
        aria-label="Anterior"
        className={clsx(
          "inline-flex items-center justify-center rounded-md border px-2.5 py-2",
          "bg-background text-foreground border-foreground/20",
          "hover:bg-foreground/5 transition",
          !loop && isBeginning && "opacity-50 cursor-not-allowed"
        )}
      >
        <ArrowLeftIcon weight="bold" size={16} />
      </button>
      <button
        ref={setNextEl}
        type="button"
        aria-label="Próximo"
        className={clsx(
          "inline-flex items-center justify-center rounded-md border px-2.5 py-2",
          "bg-background text-foreground border-foreground/20",
          "hover:bg-foreground/5 transition",
          !loop && isEnd && "opacity-50 cursor-not-allowed"
        )}
      >
        <ArrowRightIcon weight="bold" size={16} />
      </button>
    </>
  );

  return (
    <>
      {title && (
        <h3 className="flex sm:hidden text-base sm:text-lg md:text-xl font-semibold text-foreground w-full text-left mb-4">
          {title}
        </h3>
      )}
      <div
        className={clsx(
          "w-full flex",
          // The title bar's controls move below the slides on mobile; bottom controls stay below.
          title ? "flex-col-reverse sm:flex-col" : "flex-col",
          className
        )}
      >
        {title && (
          <div className="w-full mb-4 flex sm:items-center justify-between">
            <h3 className="w-full hidden sm:flex text-base sm:text-lg md:text-xl font-semibold text-foreground">
              {title}
            </h3>

            {showNavigation && (
              <div className="w-full flex items-center gap-2 justify-end mt-4 sm:mt-0">
                {navigationButtons}
              </div>            )}
          </div>
        )}

        <Swiper
          modules={[Grid, Navigation, A11y]}
          // grid/base
          grid={{ rows, fill: "row" }}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          loop={loop}
          navigation={showNavigation ? { prevEl, nextEl } : false}
          onSlideChange={(s) => {
            setIsBeginning(s.isBeginning);
            setIsEnd(s.isEnd);
            onSlideChange?.(s);
          }}
          // @ts-expect-error internal Swiper types
          breakpoints={computedBreakpoints}
          className={clsx("w-full", swiperClassName)}
        >
          {items.map((item, idx) => (
            <SwiperSlide key={idx} className="!h-auto">
              {/* Card wrapper para manter padrão visual */}
              <div className="rounded-lg  h-full">{renderItem(item, idx)}</div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Without a title bar, the controls sit centered below the slides */}
        {showNavigation && !title && (
          <div className="mt-6 flex w-full items-center justify-center gap-3">
            {navigationButtons}
          </div>
        )}
      </div>
    </>
  );
}
