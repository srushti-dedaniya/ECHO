import { motion } from 'framer-motion';

interface ReleaseAnimationProps {
  isReleasing: boolean;
  onComplete: () => void;
  className?: string;
}

export function ReleaseAnimation({ isReleasing, onComplete, className = '' }: ReleaseAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm ${className}`}
    >
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-64 h-64 sm:w-96 sm:h-96 flex items-center justify-center mb-space-xl">
          <motion.div
            className="absolute inset-0 rounded-full bg-primary-container/20 blur-[50px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-6 rounded-full bg-secondary/15 blur-[40px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />

          <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200">
            <circle cx="100" cy="100" fill="none" r="92" stroke="#7bd0ff" strokeDasharray="6 8" strokeOpacity="0.6" strokeWidth="3" />
            <circle cx="100" cy="100" fill="none" r="92" stroke="#ffb2b9" strokeDasharray="4 22" strokeDashoffset="10" strokeOpacity="0.8" strokeWidth="3" />
          </svg>

          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-br from-primary-fixed via-primary-container/40 to-surface-container-lowest p-[4px] shadow-[0_0_40px_rgba(56,189,248,0.5)]"
            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 40px rgba(56,189,248,0.5)', '0 0 80px rgba(255,178,185,0.7)', '0 0 40px rgba(56,189,248,0.5)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-container/30 via-primary-fixed-dim/20 to-surface-container-lowest backdrop-blur-3xl flex items-center justify-center" />
          </motion.div>

          <motion.div
            className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center shadow-inner"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.svg
              className="w-24 h-24 sm:w-28 sm:h-28 text-primary"
              fill="none"
              viewBox="0 0 100 100"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" />
              <line stroke="currentColor" strokeWidth="5" x1="50" x2="50" y1="8" y2="92" />
              <line stroke="currentColor" strokeWidth="5" x1="8" x2="92" y1="50" y2="50" />
              <circle cx="50" cy="50" fill="currentColor" r="14" />
            </motion.svg>
          </motion.div>

          <motion.div
            className="absolute inset-0 animate-[spin_6s_linear_infinite] pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_16px_#ffffff] -translate-x-2 translate-y-12" />
            <div className="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_12px_#4ee6aa] translate-x-14 translate-y-8" />
            <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#ffb2b9] translate-x-16 translate-y-[-4px]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <motion.h2
            className="font-display-xl text-display-xl text-on-surface tracking-tight"
            animate={{ letterSpacing: ['-0.03em', '-0.01em', '-0.03em'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦ ECHO TRANSMITTED ✦
          </motion.h2>
          <motion.p
            className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm max-w-md"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Dissolving into Sector 09... 14 souls attuned.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-space-xl w-full max-w-md p-space-md rounded-full bg-surface-container-low/90 backdrop-blur-xl shadow-lg flex items-center justify-between px-space-lg"
        >
          <div className="flex items-center gap-space-sm">
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-tertiary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Transmission Complete</span>
          </div>
          <motion.div
            className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="material-symbols-outlined text-sm">wifi_tethering</span>
            <span className="hidden sm:inline">100% SYNC</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {isReleasing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="group relative inline-flex items-center gap-space-sm px-space-xl py-space-md rounded-full bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary font-headline-sm text-headline-sm font-semibold shadow-[0_0_40px_rgba(123,208,255,0.4)] hover:shadow-[0_0_70px_rgba(255,178,185,0.6)] hover:scale-105 transition-all"
            type="button"
          >
            <span>Enter the Universe</span>
            <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">rocket_launch</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}