import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flower2,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Layers,
  Users,
  Mail,
  Settings,
  ChevronDown,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Customers', path: '/admin/customers', icon: Users },
    { label: 'Messages', path: '/admin/messages', icon: Mail },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-white/80 to-cream-50/80 backdrop-blur-xl border-r border-white/20 z-40 md:relative md:translate-x-0 md:z-auto overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-500 rounded-xl flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif font-bold text-gray-800">Blossom Admin</span>
            </Link>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-600 hover:text-rose-500"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-rose-100/80 to-rose-50/80'
                      : 'hover:bg-white/40'
                  }`}
                >
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-rose-400 to-rose-500 rounded-r-full"
                    />
                  )}
                  <item.icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-rose-600'
                        : 'text-gray-500 group-hover:text-rose-500'
                    }`}
                  />
                  <span
                    className={`font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-gray-800'
                        : 'text-gray-600 group-hover:text-gray-700'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
