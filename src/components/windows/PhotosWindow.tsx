import { Image, Folder, Heart, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Photo {
  id: number;
  data: string;
  timestamp: number;
}

export const PhotosWindow = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = () => {
      const stored = localStorage.getItem('mrunos-photos');
      if (stored) {
        setPhotos(JSON.parse(stored));
      }
    };
    loadPhotos();
    
    // Refresh when localStorage changes
    const interval = setInterval(loadPhotos, 1000);
    return () => clearInterval(interval);
  }, []);

  const deletePhoto = (id: number) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    localStorage.setItem('mrunos-photos', JSON.stringify(updated));
  };

  const downloadPhoto = (photo: Photo) => {
    const link = document.createElement('a');
    link.download = `mrunos-photo-${photo.id}.png`;
    link.href = photo.data;
    link.click();
  };

  const albums = [
    { name: "Camera Roll", count: photos.length, icon: Image },
    { name: "Projects", count: 24, icon: Folder },
    { name: "Favorites", count: 0, icon: Heart },
  ];

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

      <div className="flex-1 space-y-2 overflow-hidden">
        <h3 className="text-sm font-semibold terminal-text">Camera Roll</h3>
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Image className="w-8 h-8 mb-2 opacity-40" />
            <p className="text-xs">No photos yet. Take some with the Camera app!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[calc(100%-2rem)]">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="aspect-square rounded-lg border border-primary/20 hover:border-primary/40 transition-all group relative overflow-hidden"
              >
                <img src={photo.data} alt="Captured" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => downloadPhoto(photo)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => deletePhoto(photo.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
