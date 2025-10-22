import { Play, SkipBack, SkipForward, Music2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export const MusicWindow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const playlist = [
    { 
      title: "Lofi Hip Hop Radio", 
      artist: "ChilledCow", 
      videoId: "jfKfPfyJRdk",
      thumbnail: "https://i.ytimg.com/vi/jfKfPfyJRdk/default.jpg"
    },
    { 
      title: "Peaceful Piano", 
      artist: "Relaxing Music", 
      videoId: "lTRiuFIWV54",
      thumbnail: "https://i.ytimg.com/vi/lTRiuFIWV54/default.jpg"
    },
    { 
      title: "Jazz Cafe Music", 
      artist: "Coffee Shop Jazz", 
      videoId: "Dx5qFachd3A",
      thumbnail: "https://i.ytimg.com/vi/Dx5qFachd3A/default.jpg"
    },
    { 
      title: "Deep Focus", 
      artist: "Ambient Study Music", 
      videoId: "5qap5aO4i9A",
      thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/default.jpg"
    },
    { 
      title: "Synthwave Mix", 
      artist: "Electronic Dreams", 
      videoId: "4xDzrJKXOOY",
      thumbnail: "https://i.ytimg.com/vi/4xDzrJKXOOY/default.jpg"
    },
  ];

  const currentSong = playlist[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Now Playing Section */}
      <div className="space-y-4">
        {/* Album Art / Video Player */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-primary/30 shadow-xl">
          <iframe
            src={`https://www.youtube.com/embed/${currentSong.videoId}?autoplay=1&controls=1&rel=0`}
            title={currentSong.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* Song Info */}
        <div className="text-center space-y-1 px-4">
          <h3 className="font-bold text-xl text-primary truncate">{currentSong.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{currentSong.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 px-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 hover:text-primary"
            onClick={handlePrev}
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button 
            variant="default" 
            size="icon" 
            className="w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          >
            <Play className="w-6 h-6 fill-current" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-primary/10 hover:text-primary"
            onClick={handleNext}
          >
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className={`hover:bg-primary/10 ${favorites.includes(currentIndex) ? 'text-red-500' : 'text-muted-foreground'}`}
            onClick={() => toggleFavorite(currentIndex)}
          >
            <Heart className={`w-5 h-5 ${favorites.includes(currentIndex) ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Playlist */}
      <div className="border-t border-primary/20 pt-4 flex-1 min-h-0">
        <div className="flex items-center gap-2 mb-3 px-4">
          <Music2 className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Playlist</h4>
        </div>
        <ScrollArea className="h-full px-4">
          <div className="space-y-1">
            {playlist.map((song, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                  idx === currentIndex 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'hover:bg-muted/20 border border-transparent'
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                <img 
                  src={song.thumbnail} 
                  alt={song.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    idx === currentIndex ? 'text-primary' : 'text-foreground'
                  }`}>
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
                {favorites.includes(idx) && (
                  <Heart className="w-4 h-4 text-red-500 fill-current flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
