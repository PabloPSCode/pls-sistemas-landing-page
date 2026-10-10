import { THEME_STORAGE_KEY } from "@/constants";
import { useCallback, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

/** O tema atual é a classe `dark` no <html>, aplicada antes da hidratação pelo script do layout. */
const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

/** No servidor (e na hidratação) o tema é sempre o padrão: claro. */
const getServerSnapshot = (): Theme => "light";

/** Mantém todas as instâncias do hook em sincronia observando a classe do <html>. */
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // localStorage indisponível (ex.: modo privado): o tema vale só para esta sessão.
    }
  }, []);

  return { theme, setTheme };
};

export default useTheme;
