import { motion } from 'framer-motion';

export function ResonantUniverse({ className = '' }: { className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full max-w-7xl mx-auto px-viewport-inset py-space-3xl ${className}`}
    >
      <div className="relative w-full rounded-3xl bg-surface-container-lowest/90 overflow-hidden p-space-xl lg:p-space-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-space-xl relative z-20">
          <div className="max-w-md">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Orbital Telemetry</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mt-space-xs">Current Sector: Nostalgia Horizon</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
              642 human consciousness nodes are presently orbiting the frequency of "Remembering childhood summers before internet screens."
            </p>
            <div className="mt-space-lg flex flex-wrap gap-space-xs">
              <span className="px-space-md py-space-xs rounded-full bg-surface-container-high font-label-sm text-label-sm text-primary">#AnalogMemory</span>
              <span className="px-space-md py-space-xs rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary">#SuburbanDusk</span>
              <span className="px-space-md py-space-xs rounded-full bg-surface-container-high font-label-sm text-label-sm text-tertiary">#QuietStreets</span>
            </div>
          </div>

          <div className="relative w-full lg:w-96 aspect-square rounded-2xl bg-surface-container-low/60 flex items-center justify-center p-space-md overflow-hidden">
            <motion.div
              className="relative flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/20 text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-primary-container shadow-[0_0_24px_rgba(56,189,248,0.8)]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-4 rounded-full border border-dashed border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <motion.div
              className="absolute top-12 left-14 w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-secondary text-xs shadow-[0_0_15px_rgba(255,178,185,0.4)]"
              animate={{ x: [0, 10, -5, 0], y: [0, -5, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <span>Tokyo</span>
            </motion.div>

            <motion.div
              className="absolute bottom-16 right-16 w-10 h-10 rounded-full bg-tertiary/30 flex items-center justify-center text-tertiary text-xs shadow-[0_0_15px_rgba(78,230,170,0.4)]"
              animate={{ x: [0, -8, 5, 0], y: [0, 8, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            >
              <span>Berlin</span>
            </motion.div>

            <motion.div
              className="absolute top-20 right-12 w-6 h-6 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(142,213,255,0.4)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <motion.div
              className="absolute bottom-12 left-20 w-7 h-7 rounded-full bg-secondary-fixed/40 shadow-[0_0_10px_rgba(255,218,220,0.3)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}