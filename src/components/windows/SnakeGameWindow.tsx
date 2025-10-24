import { useState, useEffect, useCallback } from "react";
import { Gamepad2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 15;
const CELL_SIZE = 18;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION: Direction = "RIGHT";
const GAME_SPEED = 150;

export const SnakeGameWindow = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    setIsPaused(true);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (direction) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check collision with walls
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10);
        generateFood();
        return newSnake;
      }

      return newSnake.slice(0, -1);
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isGameOver) return;

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          if (isPaused) setIsPaused(false);
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          if (isPaused) setIsPaused(false);
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          if (isPaused) setIsPaused(false);
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          if (isPaused) setIsPaused(false);
          break;
        case " ":
          setIsPaused((prev) => !prev);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, isGameOver, isPaused]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <div className="h-full flex flex-col p-2">
      <div className="glass p-3 rounded-lg flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-primary animate-pulse" />
            <h3 className="text-sm font-semibold text-primary">Snake Game</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs font-mono">
              Score: <span className="text-primary font-bold">{score}</span>
            </div>
            <Button 
              onClick={resetGame}
              size="sm"
              variant="outline"
              className="gap-1 h-7 text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </Button>
          </div>
        </div>

        <div 
          className="relative mx-auto border-2 border-primary/30 rounded-lg overflow-hidden"
          style={{ 
            width: GRID_SIZE * CELL_SIZE, 
            height: GRID_SIZE * CELL_SIZE,
            background: "rgba(0, 0, 0, 0.3)"
          }}
        >
          {/* Snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? "bg-primary glow-cyan" : "bg-secondary"} rounded-sm`}
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
            />
          ))}

          {/* Food */}
          <div
            className="absolute bg-accent glow-magenta rounded-full animate-pulse"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
          />

          {/* Game Over Overlay */}
          {isGameOver && (
            <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Game Over!</div>
                <div className="text-xl text-secondary mb-4">Score: {score}</div>
                <Button onClick={resetGame} variant="outline">
                  Play Again
                </Button>
              </div>
            </div>
          )}

          {/* Paused Overlay */}
          {isPaused && !isGameOver && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">Paused</div>
                <div className="text-sm text-muted-foreground">Press arrow keys to start</div>
              </div>
            </div>
          )}
        </div>

        <div className="text-[10px] text-muted-foreground text-center mt-2">
          Use arrow keys to play • Space to pause
        </div>
      </div>
    </div>
  );
};
