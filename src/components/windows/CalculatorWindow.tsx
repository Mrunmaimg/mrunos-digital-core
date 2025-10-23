import { useState } from "react";
import { Button } from "../ui/button";
import { Delete } from "lucide-react";

export const CalculatorWindow = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
      setNewNumber(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center p-2">
      <div className="w-full max-w-[260px] space-y-1.5">
        {/* Display */}
        <div className="glass p-2 rounded-xl border border-primary/30 shadow-lg">
          <div className="text-right text-2xl font-mono text-primary mb-0.5 h-8 overflow-hidden flex items-center justify-end">
            {display}
          </div>
          {operation && (
            <div className="text-right text-[9px] text-muted-foreground opacity-70">
              {previousValue} {operation}
            </div>
          )}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-1">
          {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="h-10 text-base font-semibold glass hover:bg-primary/10 border-primary/20"
              onClick={() => handleNumber(num)}
            >
              {num}
            </Button>
          ))}
          <Button
            variant="outline"
            className="h-10 text-base font-semibold col-span-2 glass hover:bg-primary/10 border-primary/20"
            onClick={() => handleNumber("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="h-10 text-base font-semibold glass hover:bg-primary/10 border-primary/20"
            onClick={handleDecimal}
          >
            .
          </Button>
        </div>

        {/* Operations */}
        <div className="grid grid-cols-4 gap-1">
          {["÷", "×", "-", "+"].map((op) => (
            <Button
              key={op}
              variant="default"
              className="h-9 text-base font-semibold bg-primary/20 hover:bg-primary/30 text-primary border border-primary/40"
              onClick={() => handleOperation(op)}
            >
              {op}
            </Button>
          ))}
        </div>

        {/* Equals Button */}
        <Button
          variant="default"
          className="w-full h-9 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          onClick={handleEquals}
        >
          =
        </Button>

        {/* Clear Button */}
        <Button
          variant="outline"
          className="w-full h-8 text-sm text-destructive hover:bg-destructive/20 border-destructive/30"
          onClick={handleClear}
        >
          <Delete className="w-3 h-3 mr-1.5" />
          Clear
        </Button>
      </div>
    </div>
  );
};
