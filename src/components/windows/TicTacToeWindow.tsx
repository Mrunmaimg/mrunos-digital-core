import { useState } from "react";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";

type Player = "X" | "O" | null;

export const TicTacToeWindow = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 });

  const calculateWinner = (squares: Player[]): Player | "draw" => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return squares.every(square => square !== null) ? "draw" : null;
  };

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      if (winner === "draw") {
        setScore({ ...score, draws: score.draws + 1 });
      } else {
        setScore({ ...score, [winner]: score[winner] + 1 });
      }
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? winner === "draw"
      ? "It's a Draw!"
      : `Winner: ${winner}`
    : `Next Player: ${isXNext ? "X" : "O"}`;

  return (
    <div className="p-6 space-y-6">
      <div className="glass p-4 rounded-lg border border-primary/30 text-center">
        <h3 className="text-xl font-bold text-primary mb-2">{status}</h3>
        <div className="flex justify-center gap-6 text-sm">
          <div className="text-center">
            <div className="text-muted-foreground">X Wins</div>
            <div className="text-2xl font-bold text-primary">{score.X}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">Draws</div>
            <div className="text-2xl font-bold text-muted-foreground">{score.draws}</div>
          </div>
          <div className="text-center">
            <div className="text-muted-foreground">O Wins</div>
            <div className="text-2xl font-bold text-secondary">{score.O}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[300px] mx-auto">
        {board.map((cell, index) => (
          <Button
            key={index}
            variant="outline"
            className={`h-24 text-4xl font-bold hover:bg-primary/20 ${
              cell === "X" ? "text-primary" : cell === "O" ? "text-secondary" : ""
            }`}
            onClick={() => handleClick(index)}
            disabled={!!winner}
          >
            {cell}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={resetGame}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Game
      </Button>
    </div>
  );
};
