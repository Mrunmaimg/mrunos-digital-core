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
      <div className="glass p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold text-primary">System Time</h3>
        </div>
        <div className="text-center">
          <div className="text-5xl md:text-6xl font-mono font-bold text-primary glow-cyan mb-2">
            {formatTime(time)}
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(time)}
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="glass p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-secondary animate-pulse" />
          <h3 className="text-lg font-semibold text-secondary">Calendar</h3>
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
