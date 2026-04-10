import {
  Play,
  Square,
  Save,
  FolderOpen,
  Moon,
  Sun,
  Globe,
  Menu,
} from "lucide-react";
import { useStudioStore } from "@/store/studio-store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function TopBar() {
  const theme = useStudioStore((state) => state.theme);
  const toggleTheme = useStudioStore((state) => state.toggleTheme);
  const language = useStudioStore((state) => state.language);
  const setLanguage = useStudioStore((state) => state.setLanguage);
  const mode = useStudioStore((state) => state.mode);

  const handleSave = () => {
    console.log("[CLI] Saving...");
  };

  const handleRun = () => {
    console.log("[CLI] Running simulation...");
  };

  const handleStop = () => {
    console.log("[CLI] Stopping simulation...");
  };

  return (
    <div className="h-12 border-b border-border bg-background flex items-center justify-between px-4 gap-4">
      {/* Left: Menu & Title */}
      <div className="flex items-center gap-3">
        <button className="p-1 rounded hover:bg-sidebar-accent transition-colors text-foreground">
          <Menu size={18} />
        </button>
        <span className="text-sm font-medium text-foreground hidden sm:inline">
          Simuless Studio
        </span>
      </div>

      {/* Center: Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          title={t("topbar.play", language)}
        >
          <Play size={16} />
          <span className="hidden sm:inline">{t("topbar.play", language)}</span>
        </button>

        <button
          onClick={handleStop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm font-medium"
          title={t("topbar.stop", language)}
        >
          <Square size={16} />
          <span className="hidden sm:inline">{t("topbar.stop", language)}</span>
        </button>

        <div className="w-px h-6 bg-border" />

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-sidebar-accent transition-colors text-sm text-foreground"
          title={t("topbar.save", language)}
        >
          <Save size={16} />
          <span className="hidden sm:inline">{t("topbar.save", language)}</span>
        </button>

        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-sidebar-accent transition-colors text-sm text-foreground"
          title={t("topbar.open", language)}
        >
          <FolderOpen size={16} />
          <span className="hidden sm:inline">{t("topbar.open", language)}</span>
        </button>
      </div>

      {/* Right: Settings & Theme & Language */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLanguage(language === "en" ? "zh" : "en")}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-sidebar-accent transition-colors text-sm text-foreground"
          title={t("topbar.toggleLanguage", language)}
        >
          <Globe size={16} />
          <span className="hidden sm:inline text-xs font-medium">
            {language.toUpperCase()}
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded hover:bg-sidebar-accent transition-colors text-sm text-foreground"
          title={t("topbar.toggleDarkMode", language)}
        >
          {theme === "light" ? (
            <Moon size={16} />
          ) : (
            <Sun size={16} />
          )}
          <span className="hidden sm:inline text-xs font-medium">
            {theme === "light" ? "Dark" : "Light"}
          </span>
        </button>
      </div>
    </div>
  );
}
