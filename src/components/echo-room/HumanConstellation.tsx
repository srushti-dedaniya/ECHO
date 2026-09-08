import { motion } from 'framer-motion';
import type { Echo } from '../../types/echo';

interface HumanConstellationProps {
  echoes: Echo[];
  currentEchoId: string;
  className?: string;
}

export function HumanConstellation({ echoes, currentEchoId, className = '' }: HumanConstellationProps) {
  const currentEcho = echoes.find(e => e.id === currentEchoId);
  const otherEchoes = echoes.filter(e => e.id !== currentEchoId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`lg:col-span-2 rounded-xl bg-surface-container-low/70 backdrop-blur-2xl p-space-lg shadow-xl flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
            HUMAN CONSTELLATION {currentEcho ? `(${currentEcho.mood.toUpperCase()})` : ''}
          </h2>
          <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded-full bg-primary/10 text-primary">
            {otherEchoes.length + 1} STARS ACTIVE
          </span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant">Filaments denote active cognitive resonance</p>
      </div>


      <div className="relative w-full h-56 rounded-lg bg-surface-container-lowest/80 overflow-hidden flex items-center justify-center p-space-md">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line opacity="0.5" stroke="#38bdf8" strokeDasharray="3,3" strokeWidth="1" x1="20%" x2="45%" y1="30%" y2="55%" />
          <line opacity="0.6" stroke="#ffb2b9" strokeDasharray="4,4" strokeWidth="1" x1="45%" x2="70%" y1="55%" y2="25%" />
          <line opacity="0.4" stroke="#4ee6aa" strokeWidth="0.75" x1="45%" x2="52%" y1="55%" y2="80%" />
          <line opacity="0.5" stroke="#7bd0ff" strokeWidth="1" x1="70%" x2="85%" y1="25%" y2="60%" />
          <line opacity="0.3" stroke="#bdc8d1" strokeDasharray="2,5" strokeWidth="0.5" x1="20%" x2="15%" y1="30%" y2="70%" />
        </svg>

        <motion.div
          className="absolute top-[28%] left-[20%] group cursor-pointer"
          whileHover={{ scale: 1.3 }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-primary animate-ping absolute opacity-75" />
          <div className="relative w-3.5 h-3.5 rounded-full bg-primary shadow-[0_0_12px_#38bdf8]" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface-container-high text-[10px] font-label-sm text-on-surface whitespace-nowrap z-30 shadow-lg"
          >
            Soul #42 (Resonating: Chai & Monsoons)
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-[53%] left-[44%] group cursor-pointer"
          whileHover={{ scale: 1.3 }}
        >
          <div className="w-4 h-4 rounded-full bg-secondary animate-pulse absolute" />
          <div className="relative w-4 h-4 rounded-full bg-secondary shadow-[0_0_14px_#ffb2b9]" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface-container-high text-[10px] font-label-sm text-on-surface whitespace-nowrap z-30 shadow-lg"
          >
            Soul #19 (Resonating: Childhood Memory)
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-[23%] left-[69%] group cursor-pointer"
          whileHover={{ scale: 1.3 }}
        >
          <div className="w-3 h-3 rounded-full bg-tertiary shadow-[0_0_10px_#4ee6aa]" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface-container-high text-[10px] font-label-sm text-on-surface whitespace-nowrap z-30 shadow-lg"
          >
            Soul #881 (Anchoring: Iktara)
          </motion.div>
        </motion.div>

        <motion.div className="absolute top-[78%] left-[51%]">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim shadow-[0_0_8px_#7bd0ff]" />
        </motion.div>

        <motion.div className="absolute top-[58%] left-[84%]">
          <div className="w-3 h-3 rounded-full bg-secondary-fixed shadow-[0_0_8px_#ffdadc]" />
        </motion.div>

        <motion.div className="absolute top-[15%] left-[38%]">
          <div className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
        </motion.div>

        <motion.div className="absolute top-[82%] left-[18%]">
          <div className="w-2 h-2 rounded-full bg-outline-variant" />
        </motion.div>

        <motion.div className="absolute top-[40%] left-[88%]">
          <div className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
        </motion.div>

        <motion.div className="absolute top-[68%] left-[32%]">
          <div className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
        </motion.div>

        <motion.div className="absolute top-[18%] left-[82%]">
          <div className="w-2 h-2 rounded-full bg-outline-variant" />
        </motion.div>

        <motion.div
          className="absolute top-[48%] left-[47%] group cursor-pointer"
          whileHover={{ scale: 1.5 }}
        >
          <div className="w-5 h-5 rounded-full bg-primary-container/20 animate-ping absolute" />
          <div className="relative w-5 h-5 rounded-full bg-primary-container/50 border-2 border-primary shadow-[0_0_20px_#38bdf8]" />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface-container-high text-[10px] font-label-sm text-on-surface whitespace-nowrap z-30 shadow-lg"
          >
            YOU (Core Resonance)
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-space-md py-1 rounded-full bg-surface-container-high/90 backdrop-blur-md flex items-center gap-space-xs shadow-lg"
        >
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <span className="font-label-sm text-label-sm text-on-surface">
            Soul #42 and Soul #19 resonated with "It smells like childhood"
          </span>
        </motion.div>
      </div>

      <div className="flex items-center justify-between pt-space-md">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-primary text-[18px]">nature_people</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Shared presence without intrusive profiles or algorithmic friction.
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-space-md py-space-xs rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all"
          type="button"
        >
          Align Your Node
        </motion.button>
      </div>
    </motion.div>
  );
}