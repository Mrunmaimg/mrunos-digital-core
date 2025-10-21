import { Globe, ArrowLeft, ArrowRight, RotateCw, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const BrowserWindow = () => {
  const bookmarks = [
    "github.com/mrunmai",
    "linkedin.com/in/mrunmai-girame",
    "stackoverflow.com",
    "dev.to"
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-3 border-b border-primary/20">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RotateCw className="w-4 h-4" />
        </Button>
        <div className="flex-1 flex items-center gap-2 bg-muted/20 rounded-md px-3 py-1.5">
          <Lock className="w-3 h-3 text-primary" />
          <Input 
            defaultValue="https://mrunmai-girame.portfolio" 
            className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0 terminal-text"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6">
        <Globe className="w-16 h-16 text-primary/40" />
        <div className="text-center space-y-2">
          <h3 className="font-bold terminal-text">MrunBrowser</h3>
          <p className="text-sm text-muted-foreground">Your gateway to the web</p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <p className="text-xs text-muted-foreground terminal-text">Quick Links:</p>
          <div className="grid grid-cols-2 gap-2">
            {bookmarks.map((url, idx) => (
              <Button key={idx} variant="outline" size="sm" className="justify-start text-xs">
                {url}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
