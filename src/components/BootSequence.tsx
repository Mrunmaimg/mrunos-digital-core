import { useState, useEffect } from "react";

interface BootSequenceProps {
  onBootComplete: () => void;
}

const bootMessages = [
  { text: "MrunOS v1.0 Initializing...", delay: 100 },
  { text: "Loading BIOS...", delay: 300 },
  { text: "Checking system memory... [OK]", delay: 400 },
  { text: "Initializing core modules...", delay: 500 },
  { text: "├── AI Module... ✅", delay: 600 },
  { text: "├── Robotics Module... ✅", delay: 700 },
  { text: "├── Web Development Module... ✅", delay: 800 },
  { text: "├── Machine Learning Module... ✅", delay: 900 },
  { text: "└── Full-Stack Module... ✅", delay: 1000 },
  { text: "Loading user profile: Mrunmai Girame", delay: 1100 },
  { text: "Mounting file systems...", delay: 1200 },
  { text: "Starting network services... [OK]", delay: 1300 },
  { text: "Initializing GUI environment...", delay: 1400 },
  { text: "System ready. Welcome to MrunOS!", delay: 1500 },
  { text: "Boot successful ✅", delay: 1600 },
];

export const BootSequence = ({ onBootComplete }: BootSequenceProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootMessages.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, bootMessages[currentIndex].text]);
        setCurrentIndex(prev => prev + 1);
      }, bootMessages[currentIndex].delay);

      return () => clearTimeout(timer);
    } else {
      const finalTimer = setTimeout(() => {
        onBootComplete();
      }, 800);
      return () => clearTimeout(finalTimer);
    }
  }, [currentIndex, onBootComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-3xl p-8">
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="terminal-text text-sm md:text-base font-mono animate-boot-text"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {message}
            </div>
          ))}
          {currentIndex < bootMessages.length && (
            <div className="terminal-text text-sm md:text-base font-mono">
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
