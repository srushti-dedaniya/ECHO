import { motion } from 'framer-motion';

interface PersonalConstellationProps {
  mood: string;
  intent: string;
  onEnter: () => void;
  onRecalibrate: () => void;
  className?: string;
}

export function PersonalConstellation({ mood, intent, onEnter, onRecalibrate, className = '' }: PersonalConstellationProps) {
  const moodLabels: Record<string, string> = {
    calm: 'CALM',
    nostalgic: 'NOSTALGIC',
    heavy: 'HEAVY',
    curious: 'CURIOUS',
    excited: 'EXCITED',
    restless: 'RESTLESS',
  };

  const intentLabels: Record<string, string> = {
    understanding: 'UNDERSTANDING',
    perspective: 'PERSPECTIVE',
    vibe: 'SHARED VIBE',
    now: 'LIVE NOW',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-space-lg">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="font-label-sm text-label-sm uppercase tracking-[0.3em] text-tertiary inline-block mb-space-2xs animate-pulse"
        >
          Synthesis Harmonized
        </motion.span>
        <h2 className="font-display-xl text-display-xl text-on-surface tracking-tight leading-none mb-space-2xs">
          Your universe is ready.
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
          Resonance linked to Sector 108. An orbit of 4,892 conscious souls awaiting your signal.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative max-w-2xl mx-auto h-[340px] rounded-3xl bg-surface-container-lowest/80 backdrop-blur-3xl flex items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12)_0%,transparent_70%)]" />
        
        <svg className="w-full h-full" fill="none" viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            className="text-secondary/50"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1.5"
            x1="300" x2="160" y1="170" y2="100"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.line
            className="text-primary/50"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1.5"
            x1="300" x2="440" y1="170" y2="110"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          <motion.line
            className="text-tertiary/40"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1.5"
            x1="300" x2="220" y1="170" y2="250"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
          <motion.line
            className="text-secondary-container/60"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1.5"
            x1="300" x2="390" y1="170" y2="240"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <motion.line
            className="text-on-surface"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="1"
            x1="160" x2="440" y1="100" y2="110"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />

          <motion.circle
            className="fill-surface-container-high"
            cx="160" cy="100" r="16"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-secondary"
            cx="160" cy="100" r="5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-surface-container-high"
            cx="440" cy="110" r="14"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-primary"
            cx="440" cy="110" r="4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-surface-container-high"
            cx="220" cy="250" r="12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-tertiary"
            cx="220" cy="250" r="3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-surface-container-high"
            cx="390" cy="240" r="12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="fill-primary-fixed"
            cx="390" cy="240" r="3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
          />

          <motion.circle
            className="fill-primary-container/10"
            cx="300" cy="170" r="42"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.circle
            className="fill-surface-container-lowest stroke-secondary"
            cx="300" cy="170" r="32"
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
          />
          <motion.circle
            className="stroke-primary-container stroke-dashed"
            cx="300" cy="170" r="22"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          <motion.circle
            className="fill-on-surface"
            cx="300" cy="170" r="8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 300 }}
          />

          <text className="fill-on-surface-variant font-label-sm" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }} textAnchor="middle" x="300" y="215">SYNCHRONIZED CORE</text>
          <text className="fill-secondary font-label-sm" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }} textAnchor="middle" x="160" y="74">{moodLabels[mood] || mood.toUpperCase()}</text>
          <text className="fill-primary font-label-sm" style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }} textAnchor="middle" x="440" y="84">{intentLabels[intent] || intent.toUpperCase()}</text>
        </svg>

        <div className="absolute top-4 left-4 flex items-center gap-space-2xs bg-surface-container-low/70 backdrop-blur-md px-space-sm py-1 rounded-full">
          <span className="material-symbols-outlined text-secondary text-[14px]">stream</span>
          <span className="font-label-sm text-label-sm text-on-surface">TRAIL ID: #ECHO-8902-X</span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-space-2xs bg-surface-container-low/70 backdrop-blur-md px-space-sm py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
          <span className="font-label-sm text-label-sm text-on-surface-variant">ALIGNMENT FACTOR 99.4%</span>
        </div>
      </motion.div>

      <div className="flex flex-col items-center justify-center gap-space-sm mt-space-xl">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => { e.preventDefault(); onEnter(); }}
          className="group relative inline-flex items-center gap-space-sm px-space-2xl py-space-md rounded-full bg-gradient-to-r from-primary-container via-primary to-primary-container text-on-primary-container font-headline-sm text-headline-sm font-semibold shadow-[0_0_50px_rgba(56,189,248,0.6)] hover:shadow-[0_0_70px_rgba(56,189,248,0.9)] hover:scale-105 transition-all"
        >
          <span>Enter Your Universe</span>
          <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1.5 transition-transform">rocket_launch</span>
        </motion.a>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRecalibrate}
          className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface uppercase tracking-widest transition-colors mt-space-xs"
          type="button"
        >
          Recalibrate Vector
        </motion.button>
      </div>
    </motion.div>
  );
}