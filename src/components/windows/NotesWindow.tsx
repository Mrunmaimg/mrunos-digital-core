import { Save, FileText, Plus, Trash2, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Note {
  id: number;
  title: string;
  content: string;
  timestamp: number;
}

export const NotesWindow = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [lastSaved, setLastSaved] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('mrunos-notes-v2');
    if (saved) {
      const parsedNotes = JSON.parse(saved);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setSelectedNoteId(parsedNotes[0].id);
        setCurrentTitle(parsedNotes[0].title);
        setCurrentContent(parsedNotes[0].content);
      }
    } else {
      // Create default note
      const defaultNote: Note = {
        id: Date.now(),
        title: "Welcome",
        content: "// Quick Notes - MrunOS v1.0\n\nTODO:\n- Build amazing projects\n- Master new technologies\n- Connect with fellow developers\n\nIdeas:\n...",
        timestamp: Date.now(),
      };
      setNotes([defaultNote]);
      setSelectedNoteId(defaultNote.id);
      setCurrentTitle(defaultNote.title);
      setCurrentContent(defaultNote.content);
      localStorage.setItem('mrunos-notes-v2', JSON.stringify([defaultNote]));
    }
  }, []);

  const saveCurrentNote = () => {
    if (selectedNoteId === null) return;

    const updatedNotes = notes.map(note =>
      note.id === selectedNoteId
        ? { ...note, title: currentTitle, content: currentContent, timestamp: Date.now() }
        : note
    );
    setNotes(updatedNotes);
    localStorage.setItem('mrunos-notes-v2', JSON.stringify(updatedNotes));
    setLastSaved(new Date());
    toast({
      title: "✓ Note saved",
      description: currentTitle || "Untitled note",
    });
  };

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: "New Note",
      content: "",
      timestamp: Date.now(),
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    setSelectedNoteId(newNote.id);
    setCurrentTitle(newNote.title);
    setCurrentContent(newNote.content);
    localStorage.setItem('mrunos-notes-v2', JSON.stringify(updatedNotes));
    toast({
      title: "📝 New note created",
    });
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('mrunos-notes-v2', JSON.stringify(updatedNotes));
    
    if (selectedNoteId === id) {
      if (updatedNotes.length > 0) {
        setSelectedNoteId(updatedNotes[0].id);
        setCurrentTitle(updatedNotes[0].title);
        setCurrentContent(updatedNotes[0].content);
      } else {
        setSelectedNoteId(null);
        setCurrentTitle("");
        setCurrentContent("");
      }
    }
    
    toast({
      title: "🗑️ Note deleted",
    });
  };

  const selectNote = (note: Note) => {
    setSelectedNoteId(note.id);
    setCurrentTitle(note.title);
    setCurrentContent(note.content);
  };

  const getPreview = (content: string) => {
    return content.split('\n')[0].slice(0, 40) || "Empty note...";
  };

  return (
    <div className="h-full flex gap-2 p-2">
      {/* Sidebar */}
      <div className="w-48 flex flex-col gap-2">
        <Button 
          onClick={createNewNote}
          size="sm"
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-3 h-3" />
          New Note
        </Button>
        
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`group p-2 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                  selectedNoteId === note.id 
                    ? 'border-primary/50 bg-primary/10' 
                    : 'border-primary/20 bg-muted/30'
                }`}
                onClick={() => selectNote(note)}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <StickyNote className="w-3 h-3 text-primary flex-shrink-0" />
                      <h4 className="text-xs font-semibold truncate">{note.title || "Untitled"}</h4>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {getPreview(note.content)}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
                <div className="text-[9px] text-muted-foreground mt-1">
                  {new Date(note.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Editor */}
      {selectedNoteId ? (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="flex-1 h-8 text-sm font-semibold"
              placeholder="Note title..."
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 h-8"
              onClick={saveCurrentNote}
            >
              <Save className="w-3 h-3" />
              Save
            </Button>
          </div>
          
          <Textarea
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            className="flex-1 font-mono text-xs resize-none"
            placeholder="Start typing your note..."
          />
          
          <p className="text-[10px] text-muted-foreground">
            Last saved: {lastSaved.toLocaleTimeString()} • {currentContent.length} characters
          </p>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No notes yet</p>
            <p className="text-xs">Create a new note to get started</p>
          </div>
        </div>
      )}
    </div>
  );
};
