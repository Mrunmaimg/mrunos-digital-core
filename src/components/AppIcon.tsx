import { LucideIcon } from "lucide-react";

interface AppIconProps {
  icon: LucideIcon;
  title: string;
  onClick: () => void;
}

export const AppIcon = ({ icon: Icon, title, onClick }: AppIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-2 md:p-4 rounded-lg hover:bg-muted/30 transition-all group cursor-pointer"
    >
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl glass flex items-center justify-center group-hover:glow-cyan transition-all group-hover:scale-110">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      </div>
      <span className="text-xs text-foreground/80 text-center font-medium group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </span>
    </button>
  );
};
