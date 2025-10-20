import { useState } from "react";
import { Folder, FileCode, FileText, FolderOpen, ChevronRight } from "lucide-react";

interface FileItem {
  name: string;
  type: "folder" | "file";
  icon: any;
  items?: FileItem[];
  content?: string;
}

export const FileExplorerWindow = () => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["Projects"]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const fileSystem: FileItem[] = [
    {
      name: "Projects",
      type: "folder",
      icon: FolderOpen,
      items: [
        {
          name: "SkillCiti",
          type: "folder",
          icon: Folder,
          items: [
            { name: "README.md", type: "file", icon: FileText, content: "AI-Powered Smart Hiring Platform built with React, Node.js, and Firebase" },
            { name: "src", type: "folder", icon: Folder },
          ]
        },
        {
          name: "AI-Legal-System",
          type: "folder",
          icon: Folder,
          items: [
            { name: "main.py", type: "file", icon: FileCode, content: "AI-Based Legal System using NLP and Python" },
          ]
        },
        {
          name: "Multiprogramming-OS",
          type: "folder",
          icon: Folder,
          items: [
            { name: "Simulator.java", type: "file", icon: FileCode, content: "OS Simulation with Java" },
          ]
        },
        {
          name: "Chat-Application",
          type: "folder",
          icon: Folder,
          items: [
            { name: "server.js", type: "file", icon: FileCode, content: "Realtime Chat with Socket.io" },
          ]
        },
      ]
    },
    {
      name: "Documents",
      type: "folder",
      icon: Folder,
      items: [
        { name: "Resume.pdf", type: "file", icon: FileText, content: "Mrunmai Girame - Software Developer Resume" },
        { name: "Achievements.log", type: "file", icon: FileText, content: "ACM TCET Winner | Citi Ada Lovelace Finalist | LeetCode 500+" },
      ]
    },
    {
      name: "Skills",
      type: "folder",
      icon: Folder,
      items: [
        { name: "languages.txt", type: "file", icon: FileText, content: "Java, Python, C/C++, JavaScript, SQL" },
        { name: "frameworks.txt", type: "file", icon: FileText, content: "Spring Boot, React, Flask, TensorFlow" },
      ]
    }
  ];

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderName) 
        ? prev.filter(f => f !== folderName)
        : [...prev, folderName]
    );
  };

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map((item, index) => {
      const isExpanded = expandedFolders.includes(item.name);
      const isSelected = selectedItem === item.name;
      const Icon = item.icon;

      return (
        <div key={`${item.name}-${index}`}>
          <div
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all hover:bg-primary/10 ${
              isSelected ? "bg-primary/20 border border-primary/30" : ""
            }`}
            style={{ paddingLeft: `${depth * 20 + 8}px` }}
            onClick={() => {
              if (item.type === "folder") {
                toggleFolder(item.name);
              }
              setSelectedItem(item.name);
            }}
          >
            {item.type === "folder" && (
              <ChevronRight 
                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
              />
            )}
            <Icon className={`w-4 h-4 ${
              item.type === "folder" ? "text-accent" : "text-secondary"
            }`} />
            <span className="text-sm font-mono">{item.name}</span>
          </div>
          {item.type === "folder" && isExpanded && item.items && (
            <div>{renderFileTree(item.items, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  const getSelectedContent = (items: FileItem[]): string | null => {
    for (const item of items) {
      if (item.name === selectedItem) {
        return item.content || null;
      }
      if (item.items) {
        const found = getSelectedContent(item.items);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedContent = getSelectedContent(fileSystem);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* File Tree */}
      <div className="glass p-4 rounded-lg overflow-y-auto scrollbar-thin">
        <div className="flex items-center gap-2 mb-4">
          <Folder className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold text-primary">File System</h3>
        </div>
        <div className="space-y-1">
          {renderFileTree(fileSystem)}
        </div>
      </div>

      {/* Content Preview */}
      <div className="glass p-4 rounded-lg overflow-y-auto scrollbar-thin">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-secondary animate-pulse" />
          <h3 className="text-lg font-semibold text-secondary">Preview</h3>
        </div>
        {selectedContent ? (
          <div className="font-mono text-sm text-foreground/80 whitespace-pre-wrap">
            {selectedContent}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-8">
            Select a file to preview its content
          </div>
        )}
      </div>
    </div>
  );
};
