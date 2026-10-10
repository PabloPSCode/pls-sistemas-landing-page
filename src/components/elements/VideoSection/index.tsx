"use client";

import Button from "@/components/buttons/Button";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Paragraph from "../../typography/Paragraph";
import Title from "../../typography/Title";

export interface VideoSource {
  /** URL do arquivo de vídeo */
  src: string;
  /** MIME type com codecs (ex.: `video/mp4; codecs="av01.0.05M.08"`), usado para o navegador pular formatos sem suporte */
  type?: string;
  /** Media query para escolher a fonte por tamanho de tela (ex.: `(max-width: 767px)`) */
  media?: string;
}

export interface VideoSectionProps {
  /** Largura da seção */
  size: "midle" | "full";
  /** Título principal */
  title?: string;
  /** Texto descritivo */
  description?: string;
  /** URL do vídeo de fundo (use `sources` para múltiplos formatos/resoluções) */
  videoUrl?: string;
  /** Fontes do vídeo em ordem de preferência; o navegador usa a primeira compatível */
  sources?: VideoSource[];
  /**
   * Adia o download do vídeo até a página terminar de carregar e não o baixa em
   * conexões com economia de dados ou 2G (o poster permanece visível).
   */
  lazyLoad?: boolean;
  /** Poster exibido enquanto o vídeo carrega */
  posterUrl?: string;
  /** Exibir controles nativos do player */
  showPlayPauseButton?: boolean;
  /** Renderiza apenas o vídeo, sem conteúdo sobreposto */
  backgroundOnly?: boolean;
  /** Exibe o gradiente interno sobre o vídeo */
  showOverlay?: boolean;
  /** Título do botão primário */
  primaryButtonTitle?: string;
  /** Título do botão secundário */
  secondaryButtonTitle?: string;
  /** Callback do botão primário */
  onPrimaryClick?: () => void;
  /** Callback do botão secundário */
  onSecondaryClick?: () => void;
  /** Classe adicional do botão primário */
  primaryButtonClassName?: string;
  /** Classe adicional do botão secundário */
  secondaryButtonClassName?: string;
  /** Classe adicional do título */
  titleClassName?: string;
  /** Classe adicional da descrição */
  descriptionClassName?: string;
  /** Classe adicional do container */
  containerClassName?: string;
  /** Classe adicional da overlay */
  overlayClassName?: string;
  /** Classe adicional do vídeo */
  videoClassName?: string;
  /** Conteúdo livre sobreposto ao vídeo (centralizado por padrão) */
  children?: ReactNode;
  /** Classe adicional do contêiner do conteúdo livre */
  contentClassName?: string;
}

export default function VideoSection({
  size,
  title,
  description,
  videoUrl,
  sources,
  lazyLoad = false,
  posterUrl,
  showPlayPauseButton = false,
  backgroundOnly = false,
  showOverlay = true,
  primaryButtonTitle,
  secondaryButtonTitle,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonClassName,
  secondaryButtonClassName,
  titleClassName,
  descriptionClassName,
  containerClassName,
  overlayClassName,
  videoClassName,
  children,
  contentClassName,
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(!lazyLoad);
  const [isInView, setIsInView] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSources =
    sources ?? (videoUrl ? [{ src: videoUrl, type: "video/mp4" }] : []);

  // Lazy load: wait for the page `load` event and an idle slot, skipping data-saver/2G connections.
  useEffect(() => {
    if (!lazyLoad) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData || /2g$/.test(connection?.effectiveType ?? "")) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    const startLoading = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setShouldLoad(true), {
          timeout: 2000,
        });
      } else {
        timeoutId = setTimeout(() => setShouldLoad(true), 200);
      }
    };

    if (document.readyState === "complete") {
      startLoading();
    } else {
      window.addEventListener("load", startLoading, { once: true });
    }

    return () => {
      window.removeEventListener("load", startLoading);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [lazyLoad]);

  // <source> elements added after mount are only picked up after load().
  useEffect(() => {
    if (lazyLoad && shouldLoad) videoRef.current?.load();
  }, [lazyLoad, shouldLoad]);

  // Pause decoding while the section is off-screen.
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) =>
      setIsInView(entry.isIntersecting),
    );
    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || !shouldLoad) {
      return;
    }

    if (!isPlaying || !isInView) {
      videoElement.pause();
      return;
    }

    void videoElement.play().catch((error: DOMException) => {
      // Only a blocked autoplay reflects in the play/pause button; interrupted plays are expected.
      if (error.name === "NotAllowedError") setIsPlaying(false);
    });
  }, [isPlaying, isInView, shouldLoad]);

  return (
    <section
      className={clsx(size === "full" ? "w-full" : "w-full max-w-6xl mx-auto")}
    >
      <div
        className={clsx(
          "relative  overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] w-full",
          children && "flex",
          containerClassName,
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload={shouldLoad ? "auto" : "none"}
            poster={posterUrl}
            controls={showPlayPauseButton}
            className={clsx(
              "absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]",
              showPlayPauseButton
                ? "pointer-events-auto"
                : "pointer-events-none",
              videoClassName,
            )}
          >
            {shouldLoad &&
              videoSources.map((source) => (
                <source
                  key={source.src}
                  src={source.src}
                  type={source.type}
                  media={source.media}
                />
              ))}
          </video>
        </div>

        {showOverlay && (
          <div
            className={clsx(
              "absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-black/10 to-black/15",
              overlayClassName,
            )}
          />
        )}

        {showPlayPauseButton && (
          <button
            type="button"
            aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
            onClick={() => setIsPlaying((prev) => !prev)}
            className="absolute top-3 right-3 flex items-center justify-center sm:top-4 sm:right-4 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/65 text-secondary-900 hover:bg-white/85 transition"
          >
            {isPlaying ? (
              <PauseIcon size={18} weight="fill" className="mx-auto" />
            ) : (
              <PlayIcon size={18} weight="fill" className="mx-auto" />
            )}
          </button>
        )}

        {!backgroundOnly && children && (
          <div
            className={clsx(
              "relative z-20 flex w-full flex-col items-center justify-center",
              contentClassName,
            )}
          >
            {children}
          </div>
        )}

        {!backgroundOnly && (title || description) && (
          <div className="absolute left-4 right-4 bottom-24 z-20 max-w-[82%] sm:left-8 sm:right-8 sm:bottom-10 sm:max-w-[70%]">
            {title && (
              <Title
                content={title}
                element="h2"
                className={clsx(
                  "text-white text-3xl leading-[0.95] sm:text-5xl md:text-6xl",
                  titleClassName,
                )}
              />
            )}
            {description && (
              <Paragraph
                content={description}
                className={clsx(
                  "mt-3 text-sm text-white/90 sm:mt-4 sm:text-base md:text-lg",
                  descriptionClassName,
                )}
              />
            )}
          </div>
        )}

        {!backgroundOnly && (primaryButtonTitle || secondaryButtonTitle) && (
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 sm:bottom-8 sm:left-auto sm:right-8 sm:justify-end sm:gap-3">
            {primaryButtonTitle && (
              <Button
                label={primaryButtonTitle}
                variant="filled"
                onClick={onPrimaryClick}
                className={clsx(
                  "rounded-full bg-white px-4 py-2 text-none hover:bg-white/85 sm:px-6 sm:py-3",
                  primaryButtonClassName,
                )}
              />
            )}
            {secondaryButtonTitle && (
              <Button
                label={secondaryButtonTitle}
                variant="outlined"
                onClick={onSecondaryClick}
                className={clsx(
                  "rounded-full px-4 py-2 sm:px-6 sm:py-3 border-white text-white hover:bg-white/15",
                  secondaryButtonClassName,
                )}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
