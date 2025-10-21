import { Globe, ArrowLeft, ArrowRight, RotateCw, Lock, ExternalLink, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const BrowserWindow = () => {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  const bookmarks = [
    { name: "GitHub", url: "https://github.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" },
    { name: "Dev.to", url: "https://dev.to" },
  ];

  const formatUrl = (input: string) => {
    if (!input) return "";
    if (input.startsWith("http://") || input.startsWith("https://")) {
      return input;
    }
    return `https://${input}`;
  };

  const navigateTo = (targetUrl: string) => {
    const formattedUrl = formatUrl(targetUrl);
    setIsLoading(true);
    setCurrentUrl(formattedUrl);
    setUrl(targetUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      navigateTo(url);
    }
  };

  const goHome = () => {
    setUrl("");
    setCurrentUrl("");
  };

  const reload = () => {
    if (currentUrl) {
      navigateTo(currentUrl);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-3 border-b border-primary/20">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={goHome} title="Home">
          <Home className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={reload} title="Reload" disabled={!currentUrl}>
          <RotateCw className="w-4 h-4" />
        </Button>
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="flex items-center gap-2 bg-muted/20 rounded-md px-3 py-1.5">
            <Lock className="w-3 h-3 text-primary" />
            <Input 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL or search..."
              className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 terminal-text"
            />
            <Button type="submit" variant="ghost" size="icon" className="h-6 w-6">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </form>
      </div>

      <div className="flex-1 flex flex-col">
        {currentUrl ? (
          <iframe
            ref={iframeRef}
            src={currentUrl}
            className="w-full h-full border-0"
            title="Browser Content"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
            <Globe className="w-16 h-16 text-primary/40" />
            <div className="text-center space-y-2">
              <h3 className="font-bold terminal-text">MrunBrowser</h3>
              <p className="text-sm text-muted-foreground">Your gateway to the web</p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <p className="text-xs text-muted-foreground terminal-text">Quick Links:</p>
              <div className="grid grid-cols-2 gap-2">
                {bookmarks.map((bookmark, idx) => (
                  <Button 
                    key={idx} 
                    variant="outline" 
                    size="sm" 
                    className="justify-start text-xs gap-2"
                    onClick={() => navigateTo(bookmark.url)}
                  >
                    <ExternalLink className="w-3 h-3" />
                    {bookmark.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
