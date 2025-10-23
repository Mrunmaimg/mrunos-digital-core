import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Thermometer, Gauge, CloudDrizzle, Umbrella, Sunrise, Sunset } from "lucide-react";

export const WeatherWindow = () => {
  const [weather, setWeather] = useState({
    location: "Pune, India",
    temp: "24°C",
    condition: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h",
    visibility: "10 km",
    feelsLike: "26°C",
    pressure: "1013 hPa",
    uvIndex: "5 (Moderate)",
    precipitation: "20%",
    rainChance: "30%",
    rainAmount: "2mm",
    sunrise: "06:24 AM",
    sunset: "06:45 PM",
  });

  const WeatherIcon = () => {
    const condition = weather.condition.toLowerCase();
    if (condition.includes("rain")) return <CloudRain className="w-16 h-16 text-primary" />;
    if (condition.includes("cloud")) return <Cloud className="w-16 h-16 text-secondary" />;
    return <Sun className="w-16 h-16 text-accent" />;
  };

  return (
    <div className="space-y-4">
      {/* Main Weather Display */}
      <div className="glass p-6 rounded-2xl border border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-5 h-5 text-primary animate-pulse" />
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Weather Status</h3>
          </div>
          
          <div className="text-center mb-6">
            <div className="text-xl text-muted-foreground mb-3 font-semibold">{weather.location}</div>
            <div className="flex justify-center mb-4 glow-cyan">
              <WeatherIcon />
            </div>
            <div className="text-6xl font-mono font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow-cyan mb-2">
              {weather.temp}
            </div>
            <div className="text-lg text-secondary font-medium mb-1">{weather.condition}</div>
            <div className="text-sm text-muted-foreground">Feels like {weather.feelsLike}</div>
          </div>

          {/* Primary Weather Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="glass p-3 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Humidity</span>
              </div>
              <div className="text-lg font-mono font-bold text-primary">{weather.humidity}</div>
            </div>
            
            <div className="glass p-3 rounded-lg border border-secondary/20">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="w-4 h-4 text-secondary" />
                <span className="text-xs text-muted-foreground">Wind</span>
              </div>
              <div className="text-lg font-mono font-bold text-secondary">{weather.windSpeed}</div>
            </div>
            
            <div className="glass p-3 rounded-lg border border-accent/20">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-accent" />
                <span className="text-xs text-muted-foreground">Visibility</span>
              </div>
              <div className="text-lg font-mono font-bold text-accent">{weather.visibility}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rain & Precipitation Details */}
      <div className="glass p-5 rounded-2xl border border-blue-500/20">
        <div className="flex items-center gap-2 mb-4">
          <CloudDrizzle className="w-5 h-5 text-blue-400" />
          <h3 className="text-base font-bold text-blue-400">Rain & Precipitation</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 glass rounded-lg border border-blue-400/20">
            <Umbrella className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Rain Chance</div>
            <div className="text-xl font-bold text-blue-400">{weather.rainChance}</div>
          </div>
          <div className="text-center p-3 glass rounded-lg border border-blue-400/20">
            <CloudRain className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Amount</div>
            <div className="text-xl font-bold text-blue-400">{weather.rainAmount}</div>
          </div>
          <div className="text-center p-3 glass rounded-lg border border-blue-400/20">
            <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <div className="text-xs text-muted-foreground mb-1">Precipitation</div>
            <div className="text-xl font-bold text-blue-400">{weather.precipitation}</div>
          </div>
        </div>
      </div>

      {/* Additional Weather Info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass p-4 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Pressure</span>
          </div>
          <div className="text-xl font-mono font-bold text-primary">{weather.pressure}</div>
        </div>
        
        <div className="glass p-4 rounded-xl border border-secondary/20">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">UV Index</span>
          </div>
          <div className="text-xl font-mono font-bold text-secondary">{weather.uvIndex}</div>
        </div>
      </div>

      {/* Sunrise & Sunset */}
      <div className="glass p-5 rounded-2xl border border-accent/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Sunrise className="w-8 h-8 text-amber-400" />
            <div>
              <div className="text-xs text-muted-foreground">Sunrise</div>
              <div className="text-lg font-mono font-bold text-amber-400">{weather.sunrise}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sunset className="w-8 h-8 text-orange-400" />
            <div>
              <div className="text-xs text-muted-foreground">Sunset</div>
              <div className="text-lg font-mono font-bold text-orange-400">{weather.sunset}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass p-3 rounded-lg">
        <div className="text-xs text-muted-foreground text-center">
          <span className="text-primary">●</span> Live weather data
          <span className="mx-2">|</span>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
