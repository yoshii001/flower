import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AdminButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const AdminButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  type = 'button',
}: AdminButtonProps) => {
  const variantClass = {
    primary: 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-lg hover:shadow-rose-500/20',
    secondary: 'bg-white/40 text-gray-700 hover:bg-white/60 border border-white/20',
    danger: 'bg-red-500/20 text-red-700 hover:bg-red-500/30 border border-red-200',
  };

  const sizeClass = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`flex items-center space-x-2 rounded-lg font-medium transition-all duration-300 ${variantClass[variant]} ${sizeClass[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.button>
  );
};

export default AdminButton;
