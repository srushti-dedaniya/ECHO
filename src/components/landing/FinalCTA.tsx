import { motion } from 'framer-motion';

interface FinalCTAProps {
  className?: string;
  onEnterEcho: () => void;
}

export function FinalCTA({ className = '', onEnterEcho }: FinalCTAProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full px-viewport-inset py-space-4xl flex flex-col items-center justify-center text-center overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center mb-space-2xl"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-container/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-10 rounded-full border border-dashed border-secondary/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-20 rounded-full bg-gradient-to-tr from-primary-container via-surface to-secondary-container opacity-40 blur-md"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <motion.div
          className="relative z-10 w-28 h-28 rounded-full bg-surface-container-lowest flex flex-col items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.5)]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="material-symbols-outlined text-4xl text-primary animate-bounce">expand_circle_down</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Portal Active</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-high mb-space-md"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping" />
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight" id="live-souls-counter">12,410</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">souls sharing this exact minute</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-display-xl text-display-xl text-on-surface tracking-tight"
        >
          STEP INTO THE LIVING UNIVERSE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm mb-space-2xl max-w-xl"
        >
          No followers. No algorithms. Just moments worth experiencing together.
        </motion.p>

        <motion.button
          onClick={onEnterEcho}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="group relative px-space-3xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:shadow-[0_0_70px_rgba(56,189,248,0.85)] hover:scale-105 transition-all"
          type="button"
        >
          <span className="relative z-10 flex items-center gap-space-sm">
            <span>ENTER ECHO →</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary via-primary-fixed to-tertiary"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="font-label-sm text-label-sm text-outline uppercase tracking-widest mt-space-xl"
        >
          Decentralized Spatial Social Fabric · Free Forever · Ephemeral by Principle
        </motion.span>
      </motion.div>
    </motion.section>
  );
}