import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const MusicWindow = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { title: "Terminal Beats", artist: "SysAdmin", duration: "3:42" },
    { title: "Code Flow", artist: "Dev Loops", duration: "4:15" },
    { title: "Binary Dreams", artist: "Quantum Dev", duration: "3:58" },
    { title: "Stack Overflow", artist: "Bug Hunters", duration: "5:23" },
  ];

  return (
    <div className="h-full flex flex-col p-6 gap-4">
      <div className="flex-1 space-y-4">
        <div className="text-center space-y-2">
          <div className="w-32 h-32 mx-auto rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center">
            <Volume2 className="w-12 h-12 text-primary" />
          </div>
          <h3 className="font-bold text-lg terminal-text">Terminal Beats</h3>
          <p className="text-sm text-muted-foreground">SysAdmin</p>
        </div>

        <div className="space-y-2">
          <Slider defaultValue={[33]} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground terminal-text">
            <span>1:23</span>
            <span>3:42</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon">
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button 
            variant="default" 
            size="icon" 
            className="w-12 h-12"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button variant="ghost" size="icon">
            <SkipForward className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="border-t border-primary/20 pt-4">
        <h4 className="text-xs font-semibold mb-2 terminal-text">Queue</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {playlist.map((song, idx) => (
            <div key={idx} className="flex justify-between text-xs py-1 hover:bg-muted/20 px-2 rounded">
              <span className="terminal-text">{song.title} - {song.artist}</span>
              <span className="text-muted-foreground">{song.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
