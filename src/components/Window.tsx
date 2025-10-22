import { useState, useRef, useEffect, ReactNode } from "react";
import { X, Minus, Maximize2, LucideIcon } from "lucide-react";
import { Button } from "./ui/button";

interface WindowProps {
  id: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
}

export const Window = ({
  id,
  title,
  icon: Icon,
  children,
  position,
  size,
  zIndex,
  onClose,
  onFocus,
  onPositionChange,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevPosition, setPrevPosition] = useState(position);
  const [prevSize, setPrevSize] = useState(size);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height));
        onPositionChange({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, position, onPositionChange, size]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      onPositionChange(prevPosition);
    } else {
      setPrevPosition(position);
      setPrevSize(size);
      onPositionChange({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

  const currentWidth = isMaximized ? window.innerWidth : size.width;
  const currentHeight = isMaximized ? window.innerHeight - 48 : size.height;

  if (isMinimized) {
    return null;
  }

  return (
    <div
      ref={windowRef}
      className="fixed glass rounded-lg shadow-2xl border border-primary/30 overflow-hidden transition-all duration-200"
      style={{
        left: position.x,
        top: position.y,
        width: currentWidth,
        height: currentHeight,
        zIndex,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-10 bg-muted/50 border-b border-primary/20 flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        
        <div className="window-controls flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              handleMinimize();
            }}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation();
              handleMaximize();
            }}
          >
            <Maximize2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 hover:bg-destructive hover:text-destructive-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="h-[calc(100%-2.5rem)] overflow-auto p-4 md:p-6 bg-card/50">
        {children}
      </div>
    </div>
  );
};
