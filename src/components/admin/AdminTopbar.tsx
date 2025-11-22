import { motion } from 'framer-motion';
import { Menu, Search, Bell, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';

interface AdminTopbarProps {
  onMenuClick: () => void;
}

const AdminTopbar = ({ onMenuClick }: AdminTopbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="border-b border-white/20 bg-gradient-to-r from-white/50 to-cream-50/50 backdrop-blur-xl">
      <div className="flex items-center justify-between h-20 px-6 md:px-8">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600 hover:text-rose-500 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex-1 max-w-md mx-4 md:mx-0">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full pl-12 pr-4 py-2.5 bg-white/40 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:border-rose-400 transition-all duration-300 placeholder-gray-500 text-gray-700"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative text-gray-600 hover:text-rose-500 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"
            />
          </motion.button>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Admin</span>
            </motion.button>

            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@blossomhaven.com</p>
                </div>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:text-rose-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:text-rose-600 transition-colors border-t border-gray-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
