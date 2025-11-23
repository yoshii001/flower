import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Season = 'default' | 'valentines' | 'christmas' | 'wedding';

interface SeasonalConfig {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  petalColors: string[];
  heroText: string;
  tagline: string;
}

const seasonalConfigs: Record<Season, SeasonalConfig> = {
  default: {
    name: 'All Seasons',
    colors: {
      primary: 'from-rose-500 to-pink-500',
      secondary: 'from-rose-300/30 to-pink-300/30',
      accent: 'text-rose-500',
    },
    petalColors: ['#fecdd3', '#fb7185'],
    heroText: 'A Garden of Dreams & Blooms',
    tagline: 'Handpicked with Love',
  },
  valentines: {
    name: "Valentine's Day",
    colors: {
      primary: 'from-red-500 to-rose-500',
      secondary: 'from-red-300/30 to-rose-300/30',
      accent: 'text-red-500',
    },
    petalColors: ['#fca5a5', '#f87171', '#dc2626'],
    heroText: 'Love Blooms Here',
    tagline: 'Romance in Every Petal',
  },
  christmas: {
    name: 'Christmas',
    colors: {
      primary: 'from-green-600 to-red-600',
      secondary: 'from-green-300/30 to-red-300/30',
      accent: 'text-green-600',
    },
    petalColors: ['#86efac', '#fb7185', '#ffffff'],
    heroText: 'Festive Floral Magic',
    tagline: 'Season of Joy & Blooms',
  },
  wedding: {
    name: 'Weddings',
    colors: {
      primary: 'from-pink-300 to-purple-300',
      secondary: 'from-pink-200/30 to-purple-200/30',
      accent: 'text-pink-400',
    },
    petalColors: ['#fce7f3', '#f5d0fe', '#ffffff'],
    heroText: 'Your Perfect Day, Perfectly Bloomed',
    tagline: 'Elegant Wedding Florals',
  },
};

interface SeasonalThemeContextType {
  currentSeason: Season;
  setCurrentSeason: (season: Season) => void;
  config: SeasonalConfig;
}

const SeasonalThemeContext = createContext<SeasonalThemeContextType | undefined>(undefined);

export const SeasonalThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentSeason, setCurrentSeason] = useState<Season>('default');
  const [config, setConfig] = useState<SeasonalConfig>(seasonalConfigs.default);

  useEffect(() => {
    const detectSeason = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      if (month === 2 && day >= 1 && day <= 14) {
        return 'valentines';
      } else if (month === 12 && day >= 1 && day <= 26) {
        return 'christmas';
      }

      return 'default';
    };

    const detectedSeason = detectSeason();
    setCurrentSeason(detectedSeason);
    setConfig(seasonalConfigs[detectedSeason]);
  }, []);

  useEffect(() => {
    setConfig(seasonalConfigs[currentSeason]);
  }, [currentSeason]);

  return (
    <SeasonalThemeContext.Provider value={{ currentSeason, setCurrentSeason, config }}>
      {children}
    </SeasonalThemeContext.Provider>
  );
};

export const useSeasonalTheme = () => {
  const context = useContext(SeasonalThemeContext);
  if (!context) {
    throw new Error('useSeasonalTheme must be used within SeasonalThemeProvider');
  }
  return context;
};
