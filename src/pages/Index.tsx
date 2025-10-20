import { useState } from "react";
import { BootSequence } from "@/components/BootSequence";
import { Desktop } from "@/components/Desktop";

const Index = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      {!bootComplete ? (
        <BootSequence onBootComplete={() => setBootComplete(true)} />
      ) : (
        <Desktop />
      )}
      
      <footer className="fixed bottom-14 left-0 right-0 z-[40] text-center py-1 text-xs text-muted-foreground/60 pointer-events-none">
        <p className="terminal-text">
          © 2025 Mrunmai Girame — Running MrunOS v1.0 | Boot Successful ✅
        </p>
      </footer>
    </>
  );
};

export default Index;
