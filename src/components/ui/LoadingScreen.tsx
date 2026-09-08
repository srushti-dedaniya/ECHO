import { motion } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-container-lowest"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center gap-space-md text-center"
      >
        <div className="relative w-28 h-28">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-container/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-dashed border-primary/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="relative w-full h-full rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.6)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-5xl">✦</span>
          </motion.div>
        </div>
        
        <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">ECHO</h1>
        <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
          CONNECTING TO THE LIVING UNIVERSE...
        </p>
        
        <motion.div
          className="w-48 h-1.5 rounded-full bg-surface-container-highest overflow-hidden mt-space-md"
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
        
        <motion.span
          className="font-label-sm text-label-sm text-primary uppercase tracking-widest"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          CALIBRATING RESONANCE FREQUENCY
        </motion.span>
      </motion.div>
    </motion.div>
  );
}