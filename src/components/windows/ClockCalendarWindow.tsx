import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock, AlarmClock, Timer, Watch, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const ClockCalendarWindow = () => {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(0);
  const [timerInput, setTimerInput] = useState("00:00");
  const [timerRunning, setTimerRunning] = useState(false);
  const [alarmTime, setAlarmTime] = useState("08:00");
  const [alarmSet, setAlarmSet] = useState(false);

  // Sound function
  const playAlertSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      
      // Check alarm
      if (alarmSet) {
        const currentTime = new Date().toTimeString().slice(0, 5);
        if (currentTime === alarmTime) {
          playAlertSound();
          toast({
            title: "⏰ Alarm!",
            description: `It's ${alarmTime}`,
          });
          setAlarmSet(false);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [alarmSet, alarmTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(prev => {
          if (prev <= 1000) {
            setTimerRunning(false);
            playAlertSound();
            toast({
              title: "⏱️ Timer Complete!",
              description: "Your timer has finished",
            });
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerTime]);

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

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    const [mins, secs] = timerInput.split(':').map(Number);
    setTimerTime((mins * 60 + secs) * 1000);
    setTimerRunning(true);
  };

  const getAnalogClockPosition = (value: number, max: number, radius: number) => {
    const angle = (value / max) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 50 + radius * Math.cos(rad),
      y: 50 + radius * Math.sin(rad)
    };
  };

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourPos = getAnalogClockPosition(hours + minutes / 60, 12, 25);
  const minutePos = getAnalogClockPosition(minutes + seconds / 60, 60, 35);
  const secondPos = getAnalogClockPosition(seconds, 60, 38);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="clock" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="clock" className="text-xs"><Clock className="w-3 h-3 mr-1" />Clock</TabsTrigger>
          <TabsTrigger value="alarm" className="text-xs"><AlarmClock className="w-3 h-3 mr-1" />Alarm</TabsTrigger>
          <TabsTrigger value="stopwatch" className="text-xs"><Watch className="w-3 h-3 mr-1" />Stopwatch</TabsTrigger>
          <TabsTrigger value="timer" className="text-xs"><Timer className="w-3 h-3 mr-1" />Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="clock" className="space-y-4">
          {/* Analog + Digital Clock */}
          <div className="glass p-6 rounded-2xl border border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse"></div>
            <div className="relative z-10">
              {/* Analog Clock */}
              <div className="flex justify-center mb-6">
                <svg viewBox="0 0 100 100" className="w-48 h-48">
                  {/* Clock face */}
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/20" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />
                  
                  {/* Hour markers */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 - 90) * Math.PI / 180;
                    const x1 = 50 + 40 * Math.cos(angle);
                    const y1 = 50 + 40 * Math.sin(angle);
                    const x2 = 50 + 45 * Math.cos(angle);
                    const y2 = 50 + 45 * Math.sin(angle);
                    return (
                      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" className="text-primary" />
                    );
                  })}
                  
                  {/* Hour hand */}
                  <line x1="50" y1="50" x2={hourPos.x} y2={hourPos.y} stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary" />
                  
                  {/* Minute hand */}
                  <line x1="50" y1="50" x2={minutePos.x} y2={minutePos.y} stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-secondary" />
                  
                  {/* Second hand */}
                  <line x1="50" y1="50" x2={secondPos.x} y2={secondPos.y} stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-accent animate-pulse" />
                  
                  {/* Center dot */}
                  <circle cx="50" cy="50" r="3" fill="currentColor" className="text-primary" />
                </svg>
              </div>
              
              {/* Digital Time */}
              <div className="text-center space-y-2">
                <div className="text-4xl font-mono font-black bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent glow-cyan tracking-wider">
                  {formatTime(time)}
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide">
                  {formatDate(time)}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alarm" className="space-y-4">
          <div className="glass p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlarmClock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-primary">Set Alarm</h3>
            </div>
            <div className="space-y-4">
              <Input
                type="time"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                className="text-center text-2xl font-mono"
              />
              <Button
                onClick={() => setAlarmSet(!alarmSet)}
                className={`w-full ${alarmSet ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'}`}
              >
                {alarmSet ? 'Cancel Alarm' : 'Set Alarm'}
              </Button>
              {alarmSet && (
                <p className="text-center text-sm text-muted-foreground animate-pulse">
                  Alarm set for {alarmTime}
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="stopwatch" className="space-y-4">
          <div className="glass p-6 rounded-2xl border border-secondary/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Watch className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-bold text-secondary">Stopwatch</h3>
            </div>
            <div className="text-center space-y-6">
              <div className="text-5xl font-mono font-bold text-secondary">
                {formatStopwatch(stopwatchTime)}
              </div>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setStopwatchRunning(!stopwatchRunning)}
                  variant={stopwatchRunning ? "destructive" : "default"}
                  className="flex-1"
                >
                  {stopwatchRunning ? 'Pause' : 'Start'}
                </Button>
                <Button
                  onClick={() => { setStopwatchTime(0); setStopwatchRunning(false); }}
                  variant="outline"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timer" className="space-y-4">
          <div className="glass p-6 rounded-2xl border border-accent/20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Timer className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold text-accent">Timer</h3>
            </div>
            <div className="text-center space-y-6">
              {timerRunning ? (
                <div className="text-5xl font-mono font-bold text-accent">
                  {formatTimerDisplay(Math.floor(timerTime / 1000))}
                </div>
              ) : (
                <Input
                  type="text"
                  placeholder="MM:SS"
                  value={timerInput}
                  onChange={(e) => setTimerInput(e.target.value)}
                  className="text-center text-3xl font-mono"
                />
              )}
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => timerRunning ? setTimerRunning(false) : startTimer()}
                  variant={timerRunning ? "destructive" : "default"}
                  className="flex-1"
                  disabled={!timerRunning && !timerInput}
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </Button>
              <Button
                onClick={() => { 
                  setTimerTime(0); 
                  setTimerRunning(false); 
                  setTimerInput("00:00");
                }}
                variant="outline"
                className="flex-1"
              >
                Reset
              </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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
        
        {/* World Clocks */}
        <div className="mt-6 pt-6 border-t border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-sm text-primary">World Time</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { city: "New York", tz: "America/New_York" },
              { city: "London", tz: "Europe/London" },
              { city: "Tokyo", tz: "Asia/Tokyo" },
              { city: "Sydney", tz: "Australia/Sydney" },
            ].map((loc) => {
              const worldTime = new Date().toLocaleTimeString('en-US', {
                timeZone: loc.tz,
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              });
              return (
                <div key={loc.city} className="glass px-3 py-2 rounded-lg border border-primary/10">
                  <div className="text-xs text-muted-foreground">{loc.city}</div>
                  <div className="font-mono text-sm font-bold text-primary">{worldTime}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Selected Date Info */}
        {date && (
          <div className="mt-4 p-3 glass rounded-lg border border-secondary/10">
            <div className="text-xs text-muted-foreground mb-1">Selected Date</div>
            <div className="text-sm font-semibold text-secondary">
              {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Day {Math.ceil((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))} of {date.getFullYear()}
            </div>
            
            {/* Festivals & Events */}
            <div className="mt-3 pt-3 border-t border-primary/10">
              <div className="text-xs font-semibold text-primary mb-2">🎉 Upcoming Events</div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">• New Year - Jan 1</div>
                <div className="text-xs text-muted-foreground">• Diwali - Nov 1</div>
                <div className="text-xs text-muted-foreground">• Christmas - Dec 25</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
