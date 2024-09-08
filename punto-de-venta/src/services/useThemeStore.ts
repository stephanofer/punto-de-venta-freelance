// import { Theme, ThemeState } from "@/types";
import { create } from "zustand";

type Theme = "dark" | "light" | "system";

type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const root = window.document.documentElement;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

const themeSystem = (theme: Theme) => {
  if (theme === "system") {
    const systemTheme = mediaQuery.matches ? "dark" : "light";
    return systemTheme;
  } else {
    return theme;
  }
};

const initialStateTheme = (): Theme => {
  const defaultTheme = "system";
  const currentTheme = (localStorage.getItem("theme") as Theme) || defaultTheme;
  return currentTheme;
};

const theme = initialStateTheme();

root.classList.add(themeSystem(theme));

export const useThemeStore = create<ThemeState>((set) => ({
  theme: theme,
  setTheme: (theme) =>
    set(() => {
      localStorage.setItem("theme", theme);
      root.classList.remove("light", "dark");
      root.classList.add(themeSystem(theme));
      return { theme: theme };
    }),
}));
