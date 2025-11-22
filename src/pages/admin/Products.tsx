import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
import Table from '../../components/admin/Table';
import Modal from '../../components/admin/Modal';
import AdminButton from '../../components/admin/AdminButton';
import FormInput from '../../components/admin/FormInput';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Romantic Rose Bouquet',
      category: 'Roses',
      price: '$89.99',
      stock: 45,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Pastel Dream Arrangement',
      category: 'Bouquets',
      price: '$75.00',
      stock: 32,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Elegant White Lilies',
      category: 'Bouquets',
      price: '$95.00',
      stock: 18,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Luxury Gift Box',
      category: 'Gifts',
      price: '$120.00',
      stock: 8,
      status: 'Low Stock',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  const handleAddProduct = () => {
    if (formData.name && formData.price) {
      setShowModal(false);
      setFormData({ name: '', category: '', price: '', description: '' });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'stock', label: 'Stock' },
    {
      key: 'status',
      label: 'Status',
      render: (status: string) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'Active'
              ? 'bg-green-100/50 text-green-700'
              : 'bg-yellow-100/50 text-yellow-700'
          }`}
        >
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
            onClick={() => handleDeleteProduct(row.id)}
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
          <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Products</h1>
          <p className="text-gray-600">Manage your flower collection</p>
        </div>
        <AdminButton
          variant="primary"
          size="md"
          icon={<Plus className="w-5 h-5" />}
          onClick={() => setShowModal(true)}
        >
          Add Product
        </AdminButton>
      </motion.div>

      <GlassCard delay={0.2}>
        <Table columns={columns} data={products} />
      </GlassCard>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Product" size="lg">
        <div className="space-y-4">
          <FormInput
            label="Product Name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
          />
          <FormInput
            label="Category"
            placeholder="Select category"
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            required
          />
          <FormInput
            label="Price"
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={(value) => setFormData({ ...formData, price: value })}
            required
          />
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product description"
              className="w-full px-4 py-2.5 bg-white/40 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-rose-400 transition-all duration-300 placeholder-gray-500 text-gray-700"
              rows={4}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <AdminButton
              variant="primary"
              size="md"
              onClick={handleAddProduct}
              className="flex-1"
            >
              Add Product
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

export default Products;
