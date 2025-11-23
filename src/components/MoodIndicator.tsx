import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { useMoodLighting } from '../hooks/useMoodLighting';

export const MoodIndicator = () => {
  const { currentMood } = useMoodLighting();

  const moodConfig = {
    morning: { icon: Sunrise, label: 'Morning Glow', color: 'text-amber-500' },
    afternoon: { icon: Sun, label: 'Afternoon Breeze', color: 'text-blue-500' },
    evening: { icon: Sunset, label: 'Evening Bloom', color: 'text-rose-500' },
    night: { icon: Moon, label: 'Night Serenity', color: 'text-indigo-400' },
  };

  const config = moodConfig[currentMood];
  const Icon = config.icon;

  return (
    <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
      <Icon className={`w-4 h-4 ${config.color}`} />
      <span className="text-sm font-semibold text-gray-700">{config.label}</span>
    </div>
  );
};
