import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { applyTheme, readTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme);
  const isDark = theme === "dark";

  function toggleTheme(): void {
    const next = isDark ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  return (
    <Button
      aria-label={
        isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
      }
      className="theme-toggle cursor-pointer"
      onClick={toggleTheme}
      size="icon"
      title={isDark ? "Giao diện sáng" : "Giao diện tối"}
      variant="ghost"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
