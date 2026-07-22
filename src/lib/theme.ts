export type Theme = "dark" | "light";

/** Phải trùng với key dùng trong đoạn script inline ở `index.html`. */
export const THEME_STORAGE_KEY = "site-theme";

/**
 * Theme hiện tại được script inline đặt lên `<html>` trước khi React mount,
 * nên đọc từ DOM là đủ và không gây nháy giao diện.
 */
export function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // localStorage bị chặn (ví dụ chế độ riêng tư): theme vẫn đổi trong phiên này.
  }
}
