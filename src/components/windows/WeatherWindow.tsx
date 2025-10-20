import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye } from "lucide-react";

export const WeatherWindow = () => {
  const [weather, setWeather] = useState({
    location: "Pune, India",
    temp: "24°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h",
    visibility: "10 km",
  });

  const WeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="w-16 h-16 text-primary" />;
    if (condition.includes("cloud")) return <Cloud className="w-16 h-16 text-secondary" />;
    return <Sun className="w-16 h-16 text-accent" />;
  };

  return (
    <div className="space-y-6">
      {/* Main Weather Display */}
      <div className="glass p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="text-lg font-semibold text-primary">Weather Status</h3>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-xl text-muted-foreground mb-2">{weather.location}</div>
          <div className="flex justify-center mb-4 glow-cyan">
            <WeatherIcon />
          </div>
          <div className="text-5xl font-mono font-bold text-primary glow-cyan mb-2">
            {weather.temp}
          </div>
          <div className="text-lg text-secondary">{weather.condition}</div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass p-4 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Humidity</span>
            </div>
            <div className="text-xl font-mono text-primary">{weather.humidity}</div>
          </div>
          
          <div className="glass p-4 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-secondary" />
              <span className="text-xs text-muted-foreground">Wind Speed</span>
            </div>
            <div className="text-xl font-mono text-secondary">{weather.windSpeed}</div>
          </div>
          
          <div className="glass p-4 rounded-lg border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">Visibility</span>
            </div>
            <div className="text-xl font-mono text-accent">{weather.visibility}</div>
          </div>
        </div>
      </div>

      <div className="glass p-4 rounded-lg">
        <div className="text-xs text-muted-foreground text-center">
          <span className="text-primary">●</span> Live weather data
          <span className="mx-2">|</span>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
