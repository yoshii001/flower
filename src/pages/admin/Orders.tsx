import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/admin/GlassCard';
import Table from '../../components/admin/Table';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: '#ORD001',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      date: '2024-11-20',
      status: 'Delivered',
      total: '$89.99',
    },
    {
      id: '#ORD002',
      customer: 'Michael Chen',
      email: 'michael@example.com',
      date: '2024-11-19',
      status: 'Processing',
      total: '$156.50',
    },
    {
      id: '#ORD003',
      customer: 'Emily Rodriguez',
      email: 'emily@example.com',
      date: '2024-11-18',
      status: 'Pending',
      total: '$245.00',
    },
    {
      id: '#ORD004',
      customer: 'James Wilson',
      email: 'james@example.com',
      date: '2024-11-17',
      status: 'Delivered',
      total: '$128.75',
    },
    {
      id: '#ORD005',
      customer: 'Lisa Anderson',
      email: 'lisa@example.com',
      date: '2024-11-16',
      status: 'Pending',
      total: '$99.50',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string, row: any) => (
        <select
          value={status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/40 border border-white/20 focus:outline-none focus:border-rose-400 transition-all"
        >
          <option>Pending</option>
          <option>Processing</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      ),
    },
    { key: 'total', label: 'Total' },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Orders</h1>
        <p className="text-gray-600">Manage customer orders</p>
      </motion.div>

      <GlassCard delay={0.2}>
        <Table columns={columns} data={orders} />
      </GlassCard>
    </div>
  );
};

export default Orders;
