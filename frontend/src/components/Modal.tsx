import { useEffect } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 overflow-y-auto" 
      style={{ zIndex: 9999 }}
    >
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
          style={{ zIndex: 9998 }}
          onClick={onClose}
        />

        {/* Modal */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl transform transition-all w-full max-w-lg mx-auto"
          style={{ zIndex: 9999 }}
        >
          {title && (
            <div className="bg-gradient-to-r from-red-500 to-orange-500 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
          )}
          
          <div className="bg-white px-6 py-6 rounded-b-2xl max-h-[calc(100vh-12rem)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
