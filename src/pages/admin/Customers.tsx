import { motion } from 'framer-motion';
import GlassCard from '../../components/admin/GlassCard';
import Table from '../../components/admin/Table';

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      orders: 5,
      spent: '$456.75',
      joined: '2024-01-15',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      orders: 3,
      spent: '$289.50',
      joined: '2024-02-20',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      orders: 8,
      spent: '$678.90',
      joined: '2023-12-10',
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james@example.com',
      orders: 2,
      spent: '$145.00',
      joined: '2024-03-05',
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      orders: 6,
      spent: '$567.25',
      joined: '2024-01-30',
    },
  ];

  const columns = [
    { key: 'name', label: 'Customer Name' },
    { key: 'email', label: 'Email' },
    { key: 'orders', label: 'Orders' },
    { key: 'spent', label: 'Total Spent' },
    { key: 'joined', label: 'Joined' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Customers</h1>
        <p className="text-gray-600">View and manage your customers</p>
      </motion.div>

      <GlassCard delay={0.2}>
        <Table columns={columns} data={customers} />
      </GlassCard>
    </div>
  );
};

export default Customers;
