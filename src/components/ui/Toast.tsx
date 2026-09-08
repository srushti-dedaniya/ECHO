import { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'resonance' | 'signal' | 'hold' | 'ripple';
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type'], duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  const typeStyles: Record<Toast['type'], { bg: string; icon: string; color: string }> = {
    success: { bg: 'bg-tertiary-container/90', icon: 'check_circle', color: 'text-tertiary' },
    info: { bg: 'bg-primary-container/90', icon: 'info', color: 'text-primary' },
    resonance: { bg: 'bg-primary-container/90', icon: 'auto_awesome', color: 'text-primary' },
    signal: { bg: 'bg-secondary-container/90', icon: 'waves', color: 'text-secondary' },
    hold: { bg: 'bg-tertiary-container/90', icon: 'shield', color: 'text-tertiary' },
    ripple: { bg: 'bg-primary/90', icon: 'water_drop', color: 'text-primary' },
  };

  return (
    <AnimatePresence>
      {toasts.map((toast) => {
        const style = typeStyles[toast.type];
        return (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 lg:bottom-24 z-50 flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-outline/20 ${style.bg} ${style.color}`}
            onClick={() => onRemove(toast.id)}
            style={{ cursor: 'pointer' }}
          >
            <span className="material-symbols-outlined text-[20px] flex-shrink-0">{style.icon}</span>
            <span className="font-body-sm text-body-sm max-w-xs">{toast.message}</span>
            <motion.div
              animate={{ width: [100, 0] }}
              transition={{ duration: (toast.duration ?? 3000) / 1000, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 rounded-b-xl"
              style={{ backgroundColor: 'currentColor' }}
            />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}