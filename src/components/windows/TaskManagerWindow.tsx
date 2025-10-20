import { useState, useEffect } from "react";
import { Activity, Cpu, HardDrive, Zap } from "lucide-react";

interface Process {
  id: number;
  name: string;
  status: "running" | "idle" | "active";
  cpu: number;
  memory: number;
}

export const TaskManagerWindow = () => {
  const [processes, setProcesses] = useState<Process[]>([
    { id: 1, name: "SkillCiti.exe", status: "running", cpu: 45, memory: 128 },
    { id: 2, name: "AI-LegalSystem.app", status: "running", cpu: 38, memory: 256 },
    { id: 3, name: "MultiprogrammingOS.sys", status: "active", cpu: 22, memory: 512 },
    { id: 4, name: "LeetCode-Solver.cmd", status: "running", cpu: 67, memory: 64 },
    { id: 5, name: "Spring-Boot-API.jar", status: "active", cpu: 31, memory: 384 },
    { id: 6, name: "React-Portfolio.app", status: "running", cpu: 52, memory: 192 },
    { id: 7, name: "TensorFlow-Model.py", status: "idle", cpu: 12, memory: 896 },
    { id: 8, name: "GitHub-Sync.daemon", status: "active", cpu: 8, memory: 32 },
  ]);

  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 68,
    disk: 72,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setProcesses(prev => prev.map(p => ({
        ...p,
        cpu: Math.max(5, Math.min(95, p.cpu + (Math.random() - 0.5) * 10)),
      })));
      
      setSystemStats({
        cpu: Math.max(20, Math.min(80, systemStats.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(40, Math.min(90, systemStats.memory + (Math.random() - 0.5) * 3)),
        disk: Math.max(60, Math.min(85, systemStats.disk + (Math.random() - 0.5) * 2)),
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "text-primary";
      case "active": return "text-secondary";
      case "idle": return "text-muted-foreground";
      default: return "text-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="glass p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold text-primary">System Resources</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm">CPU Usage</span>
              </div>
              <span className="text-sm font-mono text-primary">{systemStats.cpu.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full glow-cyan transition-all duration-500"
                style={{ width: `${systemStats.cpu}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-secondary" />
                <span className="text-sm">Memory</span>
              </div>
              <span className="text-sm font-mono text-secondary">{systemStats.memory.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-accent rounded-full glow-purple transition-all duration-500"
                style={{ width: `${systemStats.memory}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-accent" />
                <span className="text-sm">Disk Usage</span>
              </div>
              <span className="text-sm font-mono text-accent">{systemStats.disk.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full glow-magenta transition-all duration-500"
                style={{ width: `${systemStats.disk}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Running Processes */}
      <div className="glass p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-secondary mb-4">Running Processes</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin">
          {processes.map((process) => (
            <div key={process.id} className="glass p-3 rounded border border-primary/10 hover:border-primary/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(process.status)} animate-pulse`} />
                  <span className="text-sm font-mono">{process.name}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-primary">{process.cpu.toFixed(1)}%</span>
                  <span className="text-secondary">{process.memory}MB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
