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

  const buttons = [
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "×"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="glass p-6 rounded-lg border border-primary/30">
        <div className="text-right text-3xl font-mono text-primary mb-2 h-12 overflow-hidden">
          {display}
        </div>
        {operation && (
          <div className="text-right text-sm text-muted-foreground">
            {previousValue} {operation}
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          className="flex-1 text-destructive hover:bg-destructive/20"
          onClick={handleClear}
        >
          <Delete className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((btn) => (
          <Button
            key={btn}
            variant={["÷", "×", "-", "+", "="].includes(btn) ? "default" : "outline"}
            className={`h-14 text-lg font-semibold ${
              btn === "0" ? "col-span-1" : ""
            } ${
              ["÷", "×", "-", "+"].includes(btn) 
                ? "bg-primary/20 hover:bg-primary/30 text-primary" 
                : btn === "=" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : ""
            }`}
            onClick={() => {
              if (btn === "=") handleEquals();
              else if (btn === ".") handleDecimal();
              else if (["÷", "×", "-", "+"].includes(btn)) handleOperation(btn);
              else handleNumber(btn);
            }}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  );
};
