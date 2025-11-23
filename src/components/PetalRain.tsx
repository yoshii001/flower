import { useEffect, useState } from 'react';
import { useSeasonalTheme } from '../contexts/SeasonalThemeContext';

export const PetalRain = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: string; delay: string; duration: string; color: string }>>([]);
  const { config } = useSeasonalTheme();

  useEffect(() => {
    const petalArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${10 + Math.random() * 10}s`,
      color: config.petalColors[Math.floor(Math.random() * config.petalColors.length)],
    }));
    setPetals(petalArray);
  }, [config.petalColors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            background: petal.color,
          }}
        />
      ))}
    </div>
  );
};
