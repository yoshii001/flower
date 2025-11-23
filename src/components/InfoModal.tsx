import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const InfoModal = ({ isOpen, onClose, title, children }: InfoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 flex items-center justify-between z-10 rounded-t-2xl sm:rounded-t-3xl">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 hover:bg-gray-100 rounded-full transition-all hover:scale-110 duration-300 flex-shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};
