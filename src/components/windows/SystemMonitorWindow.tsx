import { useState, useEffect } from "react";
import { Cpu, HardDrive, Activity, Zap } from "lucide-react";

export const SystemMonitorWindow = () => {
  const [time, setTime] = useState(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      label: "CPU Usage",
      value: "100%",
      detail: "Building cool stuff",
      icon: Cpu,
      color: "primary",
      progress: 100,
    },
    {
      label: "Memory",
      value: "95%",
      detail: "AI Models loaded",
      icon: HardDrive,
      color: "secondary",
      progress: 95,
    },
    {
      label: "Creativity",
      value: "100%",
      detail: "Maximum capacity",
      icon: Zap,
      color: "accent",
      progress: 100,
    },
    {
      label: "Problem Solving",
      value: "98%",
      detail: "500+ LeetCode",
      icon: Activity,
      color: "primary",
      progress: 98,
    },
  ];

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="glass p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">System Monitor</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">System Time</div>
            <div className="text-lg font-mono text-primary">{time.toLocaleTimeString()}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Uptime</div>
            <div className="text-lg font-mono text-secondary">{formatUptime(uptime)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">OS Version</div>
            <div className="text-lg font-mono text-accent">MrunOS v1.0</div>
          </div>
          <div>
            <div className="text-muted-foreground">Architecture</div>
            <div className="text-lg font-mono text-primary">x64</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}/20 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{stat.label}</span>
                  <span className={`text-lg font-bold text-${stat.color}`}>{stat.value}</span>
                </div>
                <div className="text-xs text-muted-foreground">{stat.detail}</div>
              </div>
            </div>
            
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-${stat.color} rounded-full glow-${stat.color} transition-all duration-1000`}
                style={{ width: `${stat.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
        <h3 className="text-lg font-semibold text-primary mb-3">Process Status</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between">
            <span className="text-muted-foreground">innovation.exe</span>
            <span className="terminal-text">Running ✓</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">learning_ai.sys</span>
            <span className="terminal-text">Running ✓</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">code_quality.daemon</span>
            <span className="terminal-text">Running ✓</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">hackathon_mode.app</span>
            <span className="terminal-text">Running ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
