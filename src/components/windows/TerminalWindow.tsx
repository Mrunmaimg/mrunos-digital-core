import { useState, useRef, useEffect } from "react";

const commands: Record<string, string> = {
  help: `Available commands:
  help        - Show this help message
  whoami      - Display user information
  about       - Show about information
  projects    - List all projects
  skills      - Display skills
  achievements - Show achievements
  contact     - Display contact information
  clear       - Clear terminal screen
  ls          - List available apps
  date        - Show current date and time
  uname       - System information
  bootlog     - Show system boot logs
  snake       - Play Snake game
  easter      - Display Easter egg`,
  whoami: "Mrunmai Manoj Girame - Software Developer | AI Enthusiast | Robotics Mentor",
  about: `Name: Mrunmai Manoj Girame
Education: B.Tech in Information Technology (CGPA: 8.73)
Institution: Vishwakarma Institute of Technology, Pune
Specialization: AI, Full-Stack Development, Robotics
Status: Looking for opportunities in software development`,
  projects: `Featured Projects:
1. SkillCiti - AI-Powered Smart Hiring Platform (React, Node.js, Firebase)
2. Multiprogramming OS Simulation (Java)
3. AI-Based Legal System (Python, NLP)`,
  skills: `Technical Skills:
Languages: Java, Python, C/C++, JavaScript, SQL
Frameworks: React, Node.js, Flask, TensorFlow
Tools: Git, Linux, VS Code, Docker
Specialties: AI/ML, Full-Stack, DSA`,
  achievements: `Major Achievements:
🏆 ACM TCET Code Warz '25 - Winner (600+ participants)
🥈 Citi Ada Lovelace 2025 - Finalist (400+ teams)
💻 LeetCode - 500+ problems solved, 13 badges`,
  contact: `Contact Information:
📧 Email: mrunmaimg@gmail.com
📱 Phone: +91 9179495787
💼 LinkedIn: linkedin.com/in/mrunmai-girame
🐙 GitHub: github.com/Mrunmaimg`,
  ls: `Available apps:
About.exe  Projects.app  Skills.sys  Experience.cmd
Achievements.log  Certifications.key  Contact.txt  Terminal  SystemMonitor`,
  date: new Date().toLocaleString(),
  uname: "MrunOS v1.0 - Based on ReactOS | Architecture: x64 | Kernel: Modern",
  bootlog: `[BOOT] MrunOS v1.0 initializing...
[  OK  ] Started System Logging Service
[  OK  ] Loaded Java Spring Boot Engine
[  OK  ] Loaded AI/ML TensorFlow Module
[  OK  ] Mounted LeetCode Problem Solver (500+ problems cached)
[  OK  ] Loaded Achievement System: ACM TCET Winner Badge
[  OK  ] Loaded Achievement System: Citi Ada Lovelace Finalist
[  OK  ] Started SkillCiti Platform Services
[  OK  ] Mounted GitHub Repository Sync Daemon
[  OK  ] All systems operational | Uptime: 100%`,
  snake: "Snake game launching... Type 'help' to see all commands. Use Apps menu to play Snake!",
  easter: `
    ⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣤⣤⣤⣤⣤⣀⣀⠀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣠⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⠀⠀⠀
    ⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀
    ⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷
    ⣿⣿⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⠃⠀⠀⢀⣀⣀⣀⣀⡀⠀⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⡏⠀⠀⣾⣿⣿⣿⣿⣿⣿⣷⠀⠀⢹⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⡇⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⡇⠀⠀⢿⣿⣿⣿⣿⣿⣿⡿⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⡀⠀⠀⠉⠛⠿⠿⠛⠉⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿
    ⠹⣿⣿⣿⣿⣿⣿⣦⣀⠀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⠏
    ⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀
    ⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠿⠿⠿⠿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀
    
    "The only way to do great work is to love what you do." 
    - Built with 💙 by Mrunmai Girame
  `,
};

export const TerminalWindow = () => {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'MrunOS Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[trimmedCmd] || `Command not found: ${cmd}. Type "help" for available commands.`;
    
    setHistory(prev => [
      ...prev,
      { type: 'input', text: `$ ${cmd}` },
      { type: 'output', text: output },
      { type: 'output', text: '' },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="h-full flex flex-col bg-background/95 font-mono text-sm">
      <div className="flex-1 overflow-auto p-4 space-y-1">
        {history.map((line, i) => (
          <div
            key={i}
            className={line.type === 'input' ? 'text-primary' : 'text-foreground/80'}
          >
            {line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-primary/20 p-4 flex items-center gap-2">
        <span className="text-primary">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-foreground"
          placeholder="Enter command..."
          autoFocus
        />
      </form>
    </div>
  );
};
