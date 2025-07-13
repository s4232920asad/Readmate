
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  {
    id: "sunset",
    name: "Sunset",
    gradient: "from-orange-400 via-red-500 to-pink-500",
    description: "Warm sunset colors"
  },
  {
    id: "ocean",
    name: "Ocean",
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    description: "Cool ocean blues"
  },
  {
    id: "forest",
    name: "Forest",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    description: "Natural forest greens"
  },
  {
    id: "lavender",
    name: "Lavender",
    gradient: "from-purple-400 via-violet-500 to-indigo-500",
    description: "Soft purple tones"
  },
  {
    id: "golden",
    name: "Golden",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    description: "Rich golden hues"
  },
  {
    id: "cherry",
    name: "Cherry",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    description: "Sweet cherry blossoms"
  }
];

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Palette className="w-5 h-5 text-blue-600" />
          Choose Your Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`relative p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                currentTheme === theme.id 
                  ? "ring-2 ring-blue-600 ring-offset-2" 
                  : "hover:ring-1 hover:ring-gray-400"
              }`}
            >
              <div className={`w-full h-16 rounded-md bg-gradient-to-r ${theme.gradient} mb-2`} />
              <p className="text-sm font-medium text-gray-800">{theme.name}</p>
              <p className="text-xs text-gray-600">{theme.description}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
