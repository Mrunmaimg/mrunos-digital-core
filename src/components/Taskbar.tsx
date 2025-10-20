import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Wifi, Volume2, Battery, Github, Linkedin, FileText } from "lucide-react";

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string; icon: any }>;
  onWindowClick: (id: string) => void;
}

export const Taskbar = ({ openWindows, onWindowClick }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 md:h-14 glass border-t border-primary/30 flex items-center justify-between px-2 md:px-4 z-50">
      {/* Start Menu */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-primary hover:bg-muted/50 font-bold text-base md:text-lg px-2 md:px-4"
        >
          MrunOS
        </Button>
      </div>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1 md:gap-2 px-2 md:px-4 overflow-x-auto">
        {openWindows.map((window) => (
          <Button
            key={window.id}
            variant="ghost"
            className="flex items-center gap-1 md:gap-2 hover:bg-muted/50 px-2 md:px-3"
            onClick={() => onWindowClick(window.id)}
          >
            <window.icon className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm hidden sm:inline truncate max-w-[100px]">{window.title}</span>
          </Button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* System Shortcuts */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-all"
            onClick={() => window.open("https://github.com/Mrunmaimg", "_blank")}
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-all"
            onClick={() => window.open("https://linkedin.com/in/mrunmai-girame", "_blank")}
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-all"
            onClick={() => window.open("https://drive.google.com/file/d/1okz1Q_5hcRB2H69GJNP3EfwdlmRalZ7t/view?usp=drive_link", "_blank")}
            title="Resume"
          >
            <FileText className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="h-6 w-px bg-primary/20 hidden md:block" />
        
        {/* System Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <Wifi className="w-3 h-3 md:w-4 md:h-4 text-primary hidden sm:inline" />
          <Volume2 className="w-3 h-3 md:w-4 md:h-4 text-primary hidden sm:inline" />
          <Battery className="w-3 h-3 md:w-4 md:h-4 text-primary hidden md:inline" />
          <div className="text-xs md:text-sm text-foreground/80 font-mono">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};
