import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2 } from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';

const Messages = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      subject: 'Custom Bouquet Request',
      date: '2024-11-20',
      read: false,
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      subject: 'Wedding Flowers Inquiry',
      date: '2024-11-19',
      read: true,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      subject: 'Product Availability',
      date: '2024-11-18',
      read: true,
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james@example.com',
      subject: 'Bulk Order Discount',
      date: '2024-11-17',
      read: false,
    },
  ]);

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setShowModal(true);
    setMessages(
      messages.map((m) =>
        m.id === message.id ? { ...m, read: true } : m
      )
    );
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  const columns = [
    {
      key: 'name',
      label: 'From',
      render: (name: string, row: any) => (
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Subject',
      render: (subject: string, row: any) => (
        <span className={row.read ? 'text-gray-600' : 'font-semibold text-gray-800'}>
          {subject}
        </span>
      ),
    },
    { key: 'date', label: 'Date' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleViewMessage(row)}
            className="p-2 hover:bg-blue-100/50 rounded-lg text-blue-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDeleteMessage(row.id)}
            className="p-2 hover:bg-red-100/50 rounded-lg text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Messages</h1>
        <p className="text-gray-600">Customer messages from contact form</p>
      </motion.div>

      <GlassCard delay={0.2}>
        <Table columns={columns} data={messages} />
      </GlassCard>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="View Message"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase text-gray-500 font-semibold">From</label>
              <p className="text-lg font-semibold text-gray-800">{selectedMessage.name}</p>
              <p className="text-sm text-gray-600">{selectedMessage.email}</p>
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 font-semibold">Subject</label>
              <p className="text-lg font-semibold text-gray-800">{selectedMessage.subject}</p>
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 font-semibold">Date</label>
              <p className="text-sm text-gray-600">{selectedMessage.date}</p>
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 font-semibold block mb-2">Message</label>
              <div className="p-4 bg-white/40 rounded-lg border border-white/20">
                <p className="text-gray-700 leading-relaxed">
                  This is a sample message content from the customer. In a real application, this would display the actual message body.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Messages;
