import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

export const ClockCalendarWindow = () => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Digital Clock */}
      <div className="glass p-8 rounded-2xl border border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              System Time
            </h3>
          </div>
          <div className="text-center space-y-4">
            <div className="text-6xl md:text-7xl font-mono font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent glow-cyan tracking-wider animate-pulse">
              {formatTime(time)}
            </div>
            <div className="text-base text-muted-foreground font-medium tracking-wide">
              {formatDate(time)}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="glass p-6 rounded-2xl border border-secondary/20">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CalendarIcon className="w-6 h-6 text-secondary animate-pulse" />
          <h3 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Calendar
          </h3>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border-0"
        />
      </div>
    </div>
  );
};
