import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  className?: string;
  delay?: number;
}

const GlassCard = ({ children, title, action, className = '', delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-2xl bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/40 hover:border-white/60 transition-all duration-300 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          {action}
        </div>
      )}
      <div className={title ? 'p-6' : ''}>{children}</div>
    </motion.div>
  );
};

export default GlassCard;
