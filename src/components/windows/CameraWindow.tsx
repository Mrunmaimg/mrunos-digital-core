import { Camera, Video, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CameraWindow = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 gap-4">
      <div className="w-full max-w-md aspect-video rounded-lg bg-muted/20 border border-primary/20 flex items-center justify-center">
        <Camera className="w-16 h-16 text-primary/40" />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Camera className="w-4 h-4" />
          Photo
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Video className="w-4 h-4" />
          Video
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Image className="w-4 h-4" />
          Gallery
        </Button>
      </div>
      <p className="text-xs text-muted-foreground terminal-text">Camera interface - MrunOS v1.0</p>
    </div>
  );
};
