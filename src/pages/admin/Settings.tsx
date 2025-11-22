import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
import FormInput from '../../components/admin/FormInput';
import AdminButton from '../../components/admin/AdminButton';

const Settings = () => {
  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Blossom Haven',
    email: 'hello@blossomhaven.com',
    phone: '(555) 123-4567',
    address: '123 Garden Street, Floral District, CA 90210',
  });

  const [theme, setTheme] = useState({
    primaryColor: '#f43f5e',
    secondaryColor: '#fef9f3',
  });

  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://facebook.com/blossomhaven',
    instagram: 'https://instagram.com/blossomhaven',
    twitter: 'https://twitter.com/blossomhaven',
  });

  const handleSave = () => {
    console.log('Settings saved:', { storeInfo, theme, socialLinks });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600">Manage store settings and preferences</p>
      </motion.div>

      <GlassCard title="Store Information" delay={0.2}>
        <div className="space-y-4">
          <FormInput
            label="Store Name"
            value={storeInfo.storeName}
            onChange={(value) => setStoreInfo({ ...storeInfo, storeName: value })}
          />
          <FormInput
            label="Email"
            type="email"
            value={storeInfo.email}
            onChange={(value) => setStoreInfo({ ...storeInfo, email: value })}
          />
          <FormInput
            label="Phone"
            value={storeInfo.phone}
            onChange={(value) => setStoreInfo({ ...storeInfo, phone: value })}
          />
          <FormInput
            label="Address"
            value={storeInfo.address}
            onChange={(value) => setStoreInfo({ ...storeInfo, address: value })}
          />
        </div>
      </GlassCard>

      <GlassCard title="Theme Customization" delay={0.3}>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-3">
              Primary Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                className="w-20 h-20 rounded-lg cursor-pointer"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">{theme.primaryColor}</p>
                <p className="text-xs text-gray-500">Used for buttons and accents</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-3">
              Secondary Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={theme.secondaryColor}
                onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                className="w-20 h-20 rounded-lg cursor-pointer"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">{theme.secondaryColor}</p>
                <p className="text-xs text-gray-500">Used for backgrounds</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard title="Social Media Links" delay={0.4}>
        <div className="space-y-4">
          <FormInput
            label="Facebook"
            value={socialLinks.facebook}
            onChange={(value) => setSocialLinks({ ...socialLinks, facebook: value })}
          />
          <FormInput
            label="Instagram"
            value={socialLinks.instagram}
            onChange={(value) => setSocialLinks({ ...socialLinks, instagram: value })}
          />
          <FormInput
            label="Twitter"
            value={socialLinks.twitter}
            onChange={(value) => setSocialLinks({ ...socialLinks, twitter: value })}
          />
        </div>
      </GlassCard>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex space-x-4"
      >
        <AdminButton
          variant="primary"
          size="lg"
          icon={<Save className="w-5 h-5" />}
          onClick={handleSave}
        >
          Save Changes
        </AdminButton>
        <AdminButton variant="secondary" size="lg">
          Cancel
        </AdminButton>
      </motion.div>
    </div>
  );
};

export default Settings;
