import type { Theme } from "@/types/graph";

export const applyTheme = (theme: Theme) => {
  const html = document.documentElement;

  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};
