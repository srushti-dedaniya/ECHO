import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
  progress?: number;
  onComplete?: () => void;
}

export function LoadingScreen({ message = 'Calibrating frequency...', progress, onComplete }: LoadingScreenProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (progress !== undefined) {
      setInternalProgress(progress);
      return;
    }

    const interval = setInterval(() => {
      setInternalProgress(prev => {
        const next = prev + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          if (onComplete) setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-space-lg">
        <div className="relative w-32 h-32">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-secondary border-r-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container text-3xl">auto_awesome</span>
          </div>
        </div>
        
        <div className="text-center">
          <motion.p
            className="font-headline-sm text-headline-sm text-on-surface"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
          
          <div className="mt-space-md w-64 h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary-container to-tertiary rounded-full"
              animate={{ width: `${internalProgress}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          
          <motion.span
            className="mt-space-xs font-label-md text-label-md text-primary tabular-nums"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {Math.floor(internalProgress)}%
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export function OrbLoader({ size = 48, color = 'primary' }: { size?: number; color?: 'primary' | 'secondary' | 'tertiary' }) {
  const colorMap = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  };

  return (
    <div className={`relative w-[${size}px] h-[${size}px] ${colorMap[color]}`}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-current/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-current border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-current/60 border-r-transparent"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}