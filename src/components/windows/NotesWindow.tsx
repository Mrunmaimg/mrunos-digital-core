import { Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const NotesWindow = () => {
  const [notes, setNotes] = useState("// Quick Notes - MrunOS v1.0\n\nTODO:\n- Build amazing projects\n- Master new technologies\n- Connect with fellow developers\n\nIdeas:\n...");

  return (
    <div className="h-full flex flex-col p-4 gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold terminal-text">notes.txt</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
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
        Last saved: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};
