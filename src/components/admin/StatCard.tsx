import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down';
  delay?: number;
}

const StatCard = ({ title, value, change, icon: Icon, trend, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/40 p-6 hover:border-white/60 transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex items-start justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="w-10 h-10 bg-gradient-to-br from-rose-100 to-rose-50 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-rose-500" />
        </div>
      </div>

      <div className="relative z-10">
        <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
        {change && (
          <p
            className={`text-xs font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend === 'up' ? '↑' : '↓'} {change} from last month
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
