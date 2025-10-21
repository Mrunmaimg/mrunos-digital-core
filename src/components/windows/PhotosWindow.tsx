import { Image, Folder, Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PhotosWindow = () => {
  const albums = [
    { name: "Projects", count: 24, icon: Folder },
    { name: "Screenshots", count: 156, icon: Image },
    { name: "Favorites", count: 42, icon: Heart },
  ];

  const recentPhotos = Array(6).fill(0).map((_, idx) => ({
    id: idx,
    gradient: `from-primary/${20 + idx * 5} to-secondary/${20 + idx * 5}`
  }));

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold terminal-text">Albums</h3>
        <div className="grid grid-cols-3 gap-2">
          {albums.map((album, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="h-auto flex-col gap-2 p-3"
            >
              <album.icon className="w-6 h-6 text-primary" />
              <div className="text-center">
                <p className="text-xs font-semibold">{album.name}</p>
                <p className="text-[10px] text-muted-foreground">{album.count} items</p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <h3 className="text-sm font-semibold terminal-text">Recent</h3>
        <div className="grid grid-cols-3 gap-2 h-full">
          {recentPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`aspect-square rounded-lg bg-gradient-to-br ${photo.gradient} border border-primary/20 hover:border-primary/40 transition-all cursor-pointer group relative`}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
