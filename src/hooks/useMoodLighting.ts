import { useState, useEffect } from 'react';

export type MoodTheme = 'morning' | 'afternoon' | 'evening' | 'night';

interface MoodColors {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

const moodThemes: Record<MoodTheme, MoodColors> = {
  morning: {
    primary: 'from-amber-100 via-orange-50 to-rose-100',
    secondary: 'from-amber-200/30 to-orange-200/30',
    accent: 'from-amber-400 to-orange-400',
    glow: 'rgba(251, 146, 60, 0.15)',
  },
  afternoon: {
    primary: 'from-blue-50 via-cyan-50 to-teal-50',
    secondary: 'from-blue-200/30 to-cyan-200/30',
    accent: 'from-blue-400 to-cyan-400',
    glow: 'rgba(56, 189, 248, 0.15)',
  },
  evening: {
    primary: 'from-rose-100 via-pink-100 to-purple-100',
    secondary: 'from-rose-300/30 to-pink-300/30',
    accent: 'from-rose-500 to-pink-500',
    glow: 'rgba(244, 114, 182, 0.2)',
  },
  night: {
    primary: 'from-slate-800 via-blue-900 to-indigo-900',
    secondary: 'from-slate-700/30 to-blue-800/30',
    accent: 'from-blue-400 to-indigo-400',
    glow: 'rgba(99, 102, 241, 0.2)',
  },
};

export const useMoodLighting = () => {
  const [currentMood, setCurrentMood] = useState<MoodTheme>('morning');
  const [colors, setColors] = useState<MoodColors>(moodThemes.morning);

  useEffect(() => {
    const updateMood = () => {
      const hour = new Date().getHours();

      let mood: MoodTheme;
      if (hour >= 5 && hour < 12) {
        mood = 'morning';
      } else if (hour >= 12 && hour < 17) {
        mood = 'afternoon';
      } else if (hour >= 17 && hour < 21) {
        mood = 'evening';
      } else {
        mood = 'night';
      }

      setCurrentMood(mood);
      setColors(moodThemes[mood]);
    };

    updateMood();
    const interval = setInterval(updateMood, 60000);

    return () => clearInterval(interval);
  }, []);

  return { currentMood, colors };
};
