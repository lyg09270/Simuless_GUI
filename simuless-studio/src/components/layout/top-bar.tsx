import { Play, Square, Save, FolderOpen } from "lucide-react";

export default function TopBar() {
  return (
    <div className="h-12 border-b flex items-center gap-4 px-4">
      <Play size={18} />
      <Square size={18} />
      <Save size={18} />
      <FolderOpen size={18} />
    </div>
  );
}