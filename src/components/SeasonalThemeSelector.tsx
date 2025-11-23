import { Heart, Gift, Crown, Flower2 } from 'lucide-react';
import { useSeasonalTheme, Season } from '../contexts/SeasonalThemeContext';

export const SeasonalThemeSelector = () => {
  const { currentSeason, setCurrentSeason } = useSeasonalTheme();

  const themes: Array<{ id: Season; name: string; icon: typeof Flower2; color: string }> = [
    { id: 'default', name: 'All Seasons', icon: Flower2, color: 'from-rose-500 to-pink-500' },
    { id: 'valentines', name: "Valentine's", icon: Heart, color: 'from-red-500 to-rose-500' },
    { id: 'christmas', name: 'Christmas', icon: Gift, color: 'from-green-600 to-red-600' },
    { id: 'wedding', name: 'Weddings', icon: Crown, color: 'from-pink-300 to-purple-300' },
  ];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Seasonal Themes</h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {themes.map((theme) => {
          const Icon = theme.icon;
          return (
            <button
              key={theme.id}
              onClick={() => setCurrentSeason(theme.id)}
              className={`p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 min-h-[4rem] sm:min-h-0 ${
                currentSeason === theme.id
                  ? `bg-gradient-to-r ${theme.color} text-white shadow-lg scale-105`
                  : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md active:scale-95'
              }`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2" />
              <div className="text-xs sm:text-sm font-semibold">{theme.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
