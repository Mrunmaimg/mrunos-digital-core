import { Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const NotesWindow = () => {
  const [notes, setNotes] = useState("");
  const [lastSaved, setLastSaved] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('mrunos-notes');
    if (saved) {
      setNotes(saved);
    } else {
      setNotes("// Quick Notes - MrunOS v1.0\n\nTODO:\n- Build amazing projects\n- Master new technologies\n- Connect with fellow developers\n\nIdeas:\n...");
    }
  }, []);

  const saveNotes = () => {
    localStorage.setItem('mrunos-notes', notes);
    setLastSaved(new Date());
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };

  return (
    <div className="h-full flex flex-col p-4 gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold terminal-text">notes.txt</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={saveNotes}>
          <Save className="w-3 h-3" />
          Save
        </Button>
      </div>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-1 font-mono text-sm resize-none terminal-text"
        placeholder="Type your notes here..."
      />
      <p className="text-xs text-muted-foreground terminal-text">
        Last saved: {lastSaved.toLocaleTimeString()}
      </p>
    </div>
  );
};
