import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import AdminButton from '../../components/admin/AdminButton';
import FormInput from '../../components/admin/FormInput';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Roses', products: 24, status: 'Active' },
    { id: 2, name: 'Bouquets', products: 18, status: 'Active' },
    { id: 3, name: 'Gifts', products: 12, status: 'Active' },
    { id: 4, name: 'Decorations', products: 8, status: 'Active' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleAddCategory = () => {
    if (formData.name) {
      setShowModal(false);
      setFormData({ name: '', description: '' });
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const columns = [
    { key: 'name', label: 'Category Name' },
    { key: 'products', label: 'Products' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100/50 text-green-700">
          {status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-blue-100/50 rounded-lg text-blue-600 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDeleteCategory(row.id)}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Categories</h1>
          <p className="text-gray-600">Manage product categories</p>
        </div>
        <AdminButton
          variant="primary"
          size="md"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setShowModal(true)}
        >
          Add Category
        </AdminButton>
      </motion.div>

      <GlassCard delay={0.2}>
        <Table columns={columns} data={categories} />
      </GlassCard>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Category"
      >
        <div className="space-y-4">
          <FormInput
            label="Category Name"
            placeholder="Enter category name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
          />
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter category description"
              className="w-full px-4 py-2.5 bg-white/40 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-rose-400 transition-all duration-300 placeholder-gray-500 text-gray-700"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <AdminButton
              variant="primary"
              size="md"
              onClick={handleAddCategory}
              className="flex-1"
            >
              Add Category
            </AdminButton>
            <AdminButton
              variant="secondary"
              size="md"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              Cancel
            </AdminButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
