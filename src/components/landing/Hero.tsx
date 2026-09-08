import { motion } from 'framer-motion';

interface HeroProps {
  className?: string;
  onEnterEcho: () => void;
  onExploreUniverse: () => void;
}

export function Hero({ className = '', onEnterEcho, onExploreUniverse }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative min-h-[942px] flex flex-col justify-center items-center px-viewport-inset py-space-3xl overflow-hidden ${className} pt-20`}
    >
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className="text-primary-container" d="M 80 180 Q 320 80 580 260 T 1100 200 T 1440 380" fill="none" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1.2" />
        <path className="text-secondary" d="M 120 720 Q 420 540 760 620 T 1380 520" fill="none" stroke="currentColor" strokeDasharray="2 6" strokeWidth="0.9" />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-16 left-6 lg:left-16 z-30 group cursor-pointer"
      >
        <div className="relative flex items-center gap-space-sm p-space-sm pr-space-lg rounded-full bg-surface-container-low/80 backdrop-blur-2xl shadow-[0_0_35px_rgba(56,189,248,0.22)] group-hover:shadow-[0_0_55px_rgba(56,189,248,0.45)] group-hover:scale-105 transition-all">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary-container/20 text-primary">
            <span className="text-lg">🌧️</span>
            <span className="absolute inset-0 rounded-full animate-ping opacity-40 bg-primary-container" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-label-md text-on-surface truncate">Mumbai rain feels different tonight.</span>
            <div className="flex items-center gap-space-2xs text-primary font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>47 souls resonant</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-28 right-4 lg:right-20 z-20 group cursor-pointer"
      >
        <div className="relative flex items-center gap-space-sm p-space-sm pr-space-lg rounded-full bg-surface-container-low/80 backdrop-blur-2xl shadow-[0_0_40px_rgba(142,213,255,0.18)] group-hover:shadow-[0_0_60px_rgba(142,213,255,0.4)] group-hover:scale-105 transition-all">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-highest text-secondary-fixed-dim">
            <span className="text-lg">🌙</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-label-md text-on-surface truncate">Can't sleep either.</span>
            <div className="flex items-center gap-space-2xs text-on-surface-variant font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>23 drifting in unison</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-36 left-4 lg:left-24 z-30 group cursor-pointer"
      >
        <div className="relative flex items-center gap-space-sm p-space-sm pr-space-lg rounded-full bg-surface-container-low/85 backdrop-blur-2xl shadow-[0_0_45px_rgba(255,178,185,0.22)] group-hover:shadow-[0_0_65px_rgba(255,178,185,0.5)] group-hover:scale-105 transition-all">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary-container/40 text-secondary">
            <span className="text-lg">✨</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-label-md text-on-surface truncate">Anyone else scared about the future?</span>
            <div className="flex items-center gap-space-2xs text-secondary-fixed-dim font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-pulse" />
              <span>82 here with you</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-24 right-8 lg:right-28 z-20 group cursor-pointer"
      >
        <div className="relative flex items-center gap-space-sm p-space-sm pr-space-lg rounded-full bg-surface-container-low/80 backdrop-blur-2xl shadow-[0_0_35px_rgba(255,151,163,0.2)] group-hover:shadow-[0_0_55px_rgba(255,151,163,0.45)] group-hover:scale-105 transition-all">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container">
            <span className="text-lg">🎵</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-label-md text-on-surface truncate">Songs that feel like 2 AM.</span>
            <div className="flex items-center gap-space-2xs text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
              <span>114 humming together</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hidden md:flex absolute top-1/2 -right-8 lg:right-10 z-10 group cursor-pointer"
      >
        <div className="relative flex items-center gap-space-xs p-space-xs pr-space-md rounded-full bg-surface-container/70 backdrop-blur-xl shadow-[0_0_30px_rgba(255,178,185,0.15)] group-hover:scale-105 transition-all">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-sm">🔥</div>
          <div className="flex flex-col">
            <span className="font-body-sm text-body-sm text-on-surface">First day of college.</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">36 igniting</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto flex flex-col items-center text-center z-30 relative px-space-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-high/80 backdrop-blur-xl mb-space-lg shadow-[0_0_20px_rgba(56,189,248,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="font-label-sm text-label-sm tracking-widest text-primary uppercase">No Archives · No Feeds · Continuous Presence</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display-xl text-display-xl max-w-4xl tracking-tight text-on-surface leading-[1.05] drop-shadow-2xl"
        >
          YOU DON'T NEED AN AUDIENCE. <br />
          <span className="text-gradient-primary font-headline-md tracking-tight">YOU NEED TO BE UNDERSTOOD.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-space-lg max-w-2xl font-body-lg text-body-lg text-on-surface-variant text-center"
        >
          ECHO is a living spatial continuum where humans align by shared emotional resonance instead of algorithmic popularity. No metrics. No profiles. Only now.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-space-2xl flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto"
        >
          <motion.button
            onClick={onEnterEcho}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-space-2xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] hover:scale-105 transition-all overflow-hidden"
            type="button"
          >
            <span className="relative z-10 flex items-center gap-space-xs">
              <span>ENTER ECHO →</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary-fixed to-tertiary"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            onClick={onExploreUniverse}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-space-xl py-space-md rounded-full bg-surface-container-high/60 hover:bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm backdrop-blur-xl transition-all hover:scale-105 flex items-center gap-space-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-primary">public</span>
            <span>EXPLORE THE IDEA</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-space-3xl flex items-center gap-space-xl text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest"
        >
          <div className="flex items-center gap-space-2xs">
            <span className="text-primary font-headline-sm">4,892</span>
            <span>Shared Realities</span>
          </div>
          <span className="text-outline-variant">/</span>
          <div className="flex items-center gap-space-2xs">
            <span className="text-tertiary font-headline-sm">0.00s</span>
            <span>Algorithmic Delay</span>
          </div>
          <span className="text-outline-variant">/</span>
          <div className="flex items-center gap-space-2xs">
            <span className="text-secondary font-headline-sm">0</span>
            <span>Permanent Footprints</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}