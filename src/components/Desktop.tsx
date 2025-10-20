import { useState } from "react";
import { AppIcon } from "./AppIcon";
import { Window } from "./Window";
import { Taskbar } from "./Taskbar";
import { AboutWindow } from "./windows/AboutWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { SkillsWindow } from "./windows/SkillsWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { AchievementsWindow } from "./windows/AchievementsWindow";
import { CertificationsWindow } from "./windows/CertificationsWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { TerminalWindow } from "./windows/TerminalWindow";
import { SystemMonitorWindow } from "./windows/SystemMonitorWindow";
import { User, FolderCode, Award, Settings, Briefcase, FileText, Mail, Terminal, Activity } from "lucide-react";

interface OpenWindow {
  id: string;
  title: string;
  icon: any;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const apps = [
    { id: "about", title: "About.exe", icon: User, component: <AboutWindow /> },
    { id: "projects", title: "Projects.app", icon: FolderCode, component: <ProjectsWindow /> },
    { id: "skills", title: "Skills.sys", icon: Settings, component: <SkillsWindow /> },
    { id: "experience", title: "Experience.cmd", icon: Briefcase, component: <ExperienceWindow /> },
    { id: "achievements", title: "Achievements.log", icon: Award, component: <AchievementsWindow /> },
    { id: "certifications", title: "Certifications.key", icon: FileText, component: <CertificationsWindow /> },
    { id: "contact", title: "Contact.txt", icon: Mail, component: <ContactWindow /> },
    { id: "terminal", title: "Terminal", icon: Terminal, component: <TerminalWindow /> },
    { id: "sysmonitor", title: "System Monitor", icon: Activity, component: <SystemMonitorWindow /> },
  ];

  const openApp = (app: typeof apps[0]) => {
    if (openWindows.find(w => w.id === app.id)) {
      bringToFront(app.id);
      return;
    }

    const newWindow: OpenWindow = {
      ...app,
      position: { 
        x: window.innerWidth > 768 ? 100 + openWindows.length * 30 : 20,
        y: window.innerWidth > 768 ? 80 + openWindows.length * 30 : 60
      },
      size: { 
        width: Math.min(700, window.innerWidth - 40), 
        height: Math.min(500, window.innerHeight - 120) 
      },
      zIndex: maxZIndex + 1,
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    setOpenWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: newZIndex } : w))
    );
  };

  const updateWindowPosition = (id: string, position: { x: number; y: number }) => {
    setOpenWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, position } : w))
    );
  };

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

      {/* Desktop Icons */}
      <div className="relative z-0 p-4 md:p-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 content-start h-[calc(100vh-4rem)]">
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            icon={app.icon}
            title={app.title}
            onClick={() => openApp(app)}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          position={window.position}
          size={window.size}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onFocus={() => bringToFront(window.id)}
          onPositionChange={(pos) => updateWindowPosition(window.id, pos)}
        >
          {window.component}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows} onWindowClick={bringToFront} />
    </div>
  );
};
