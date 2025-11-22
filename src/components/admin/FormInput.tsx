import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  error?: string;
  required?: boolean;
}

const FormInput = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  icon,
  error,
  required,
}: FormInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 bg-white/40 backdrop-blur-sm border ${
            error ? 'border-red-300' : 'border-white/20'
          } rounded-lg focus:outline-none focus:border-rose-400 transition-all duration-300 placeholder-gray-500 text-gray-700 ${
            icon ? 'pl-11' : ''
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </motion.div>
  );
};

export default FormInput;
