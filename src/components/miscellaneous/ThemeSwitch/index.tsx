'use client';

import useTheme from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import clsx from "clsx";

export interface ThemeSwitchProps {
  /** Classe opcional para o botão (trilho do switch). */
  className?: string;
}

/**
 * Switch de tema claro/escuro.
 * - **Sol** = tema claro, **lua** = tema escuro.
 * - A posição do botão e os ícones são guiados pelas variantes `dark:` do CSS,
 *   então o switch já aparece correto antes da hidratação (sem "piscar").
 * - O tema escolhido é salvo no localStorage pelo hook `useTheme`.
 */
export default function ThemeSwitch({ className }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Modo escuro"
      title={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={clsx(
        "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-[3px] cursor-pointer",
        "border border-foreground/15 bg-foreground/[0.06]",
        "transition-colors duration-200 hover:border-primary-400/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300/60",
        className
      )}
    >
      {/* Ícones do trilho: indicam a opção inativa */}
      <SunIcon
        aria-hidden
        weight="bold"
        className="pointer-events-none absolute left-[7px] h-3.5 w-3.5 text-foreground/45 opacity-0 dark:opacity-100"
      />
      <MoonIcon
        aria-hidden
        weight="bold"
        className="pointer-events-none absolute right-[7px] h-3.5 w-3.5 text-foreground/45 dark:opacity-0"
      />

      {/* Botão deslizante com o ícone do tema ativo */}
      <span
        aria-hidden
        className={clsx(
          "relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-sm",
          "bg-white text-amber-500 transition-transform duration-300 ease-out",
          "dark:translate-x-6 dark:bg-primary-500 dark:text-white"
        )}
      >
        <SunIcon weight="fill" className="h-4 w-4 dark:hidden" />
        <MoonIcon weight="fill" className="hidden h-4 w-4 dark:block" />
      </span>
    </button>
  );
}
