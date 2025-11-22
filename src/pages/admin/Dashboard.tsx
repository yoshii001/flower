import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ShoppingBag, Users } from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import GlassCard from '../../components/admin/GlassCard';
import Table from '../../components/admin/Table';

const Dashboard = () => {
  const recentOrders = [
    {
      id: '#ORD001',
      customer: 'Sarah Johnson',
      date: '2024-11-20',
      status: 'Delivered',
      total: '$89.99',
    },
    {
      id: '#ORD002',
      customer: 'Michael Chen',
      date: '2024-11-19',
      status: 'Processing',
      total: '$156.50',
    },
    {
      id: '#ORD003',
      customer: 'Emily Rodriguez',
      date: '2024-11-18',
      status: 'Pending',
      total: '$245.00',
    },
    {
      id: '#ORD004',
      customer: 'James Wilson',
      date: '2024-11-17',
      status: 'Delivered',
      total: '$128.75',
    },
  ];

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'Delivered'
              ? 'bg-green-100/50 text-green-700'
              : status === 'Processing'
              ? 'bg-blue-100/50 text-blue-700'
              : 'bg-yellow-100/50 text-yellow-700'
          }`}
        >
          {status}
        </span>
      ),
    },
    { key: 'total', label: 'Total' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your business overview.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="$12,456"
          change="12.5%"
          trend="up"
          icon={TrendingUp}
          delay={0}
        />
        <StatCard
          title="Total Orders"
          value="248"
          change="8.2%"
          trend="up"
          icon={ShoppingBag}
          delay={0.1}
        />
        <StatCard
          title="Total Customers"
          value="1,235"
          change="5.3%"
          trend="up"
          icon={Users}
          delay={0.2}
        />
        <StatCard
          title="Conversion Rate"
          value="3.8%"
          change="2.1%"
          trend="down"
          icon={BarChart3}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2" title="Sales Overview" delay={0.4}>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-16 h-16 text-rose-500 opacity-30" />
              </div>
              <p className="text-gray-600">Chart integration coming soon</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard title="Quick Stats" delay={0.5}>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/40 rounded-lg">
              <span className="text-sm text-gray-600">Active Products</span>
              <span className="font-semibold text-gray-800">156</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/40 rounded-lg">
              <span className="text-sm text-gray-600">Pending Orders</span>
              <span className="font-semibold text-gray-800">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/40 rounded-lg">
              <span className="text-sm text-gray-600">Low Stock Items</span>
              <span className="font-semibold text-gray-800">5</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/40 rounded-lg">
              <span className="text-sm text-gray-600">New Messages</span>
              <span className="font-semibold text-gray-800">3</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard title="Recent Orders" delay={0.6}>
        <Table columns={columns} data={recentOrders} />
      </GlassCard>
    </div>
  );
};

export default Dashboard;
