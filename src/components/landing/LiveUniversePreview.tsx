import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockEchoes } from '../../data/echoes';
import { moods } from '../../types/mood';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

interface LiveUniversePreviewProps {
  onExplore: () => void;
  className?: string;
}

const previewEchoes = mockEchoes.slice(0, 5);

export function LiveUniversePreview({ onExplore, className = '' }: LiveUniversePreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full max-w-7xl mx-auto px-viewport-inset py-space-3xl ${className}`}
    >
      <div className="relative w-full rounded-3xl bg-surface-container-lowest/90 overflow-hidden p-space-xl lg:p-space-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-space-xl relative z-20 mb-space-xl">
          <div className="max-w-md">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Live Universe Preview</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mt-space-xs">Happening Right Now</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
              {previewEchoes.length} active moments. Hover to see who's inside. Click to enter.
            </p>
          </div>

          <div className="relative w-full lg:w-[500px] aspect-square rounded-2xl bg-surface-container-low/60 flex items-center justify-center p-space-xl overflow-visible">
            <motion.div
              className="relative flex items-center justify-center w-24 h-24 rounded-full bg-primary-container/20 text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-primary-container shadow-[0_0_24px_rgba(56,189,248,0.8)]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-4 rounded-full border border-dashed border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {previewEchoes.map((echo, index) => {
              const mood = moodConfig[echo.mood];
              const angle = (index / previewEchoes.length) * Math.PI * 2;
              const radius = 180;
              return (
                <motion.div
                  key={echo.id}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                    top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{ 
                    x: [0, 10, -5, 0], 
                    y: [0, -10, 5, 0] 
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                >
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(selectedIndex === index ? null : index);
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="absolute -inset-4 rounded-full blur-xl opacity-40" style={{ backgroundColor: mood?.color }} />
                    <div className={`
                      relative w-20 h-20 rounded-full backdrop-blur-xl p-[1px] flex items-center justify-center
                      shadow-[0_0_24px_rgba(0,0,0,0.5)]
                    `} style={{ boxShadow: `0 0 24px ${mood?.color}40` }}>
                      <div className="w-full h-full rounded-full bg-surface-container-lowest/80 flex items-center justify-center">
                        <span className="text-2xl">{mood?.emoji}</span>
                      </div>
                    </div>
                    
                    {selectedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute z-20 w-72"
                        style={{
                          left: index < 2 ? '50%' : 'auto',
                          right: index >= 2 ? '50%' : 'auto',
                          transform: index < 2 ? 'translateX(-50%)' : 'translateX(50%)',
                          top: index < 3 ? '100%' : 'auto',
                          bottom: index >= 3 ? '100%' : 'auto',
                          marginTop: index < 3 ? '8px' : '0',
                          marginBottom: index >= 3 ? '8px' : '0',
                        }}
                      >
                        <div className="p-3 rounded-xl glass-strong shadow-2xl">
                          <p className="font-body-sm text-body-sm text-on-surface mb-2 font-medium">{echo.content.slice(0, 40)}...</p>
                          <div className="flex items-center justify-between text-xs text-on-surface-variant">
                            <span>{echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple} souls inside</span>
                            <span className="text-primary font-medium">Enter →</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md"
        >
          {previewEchoes.map((echo, index) => {
            const mood = moodConfig[echo.mood];
            const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;
            return (
              <motion.button
                key={echo.id}
                onClick={onExplore}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-space-md rounded-2xl bg-surface-container-low/60 hover:bg-surface-container/80 backdrop-blur-xl border border-outline/10 hover:border-primary/30 transition-all text-left"
                type="button"
              >
                <div className="flex items-center gap-space-sm mb-space-sm">
                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${mood?.color}20, ${mood?.color}40)` }}>
                    <span className="text-xl">{mood?.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface truncate">{echo.content.slice(0, 30)}...</p>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: mood?.color }} />
                      <span>{totalResonance} experiencing now</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-sm border-t border-outline/10">
                  <span className="font-label-sm text-label-sm capitalize" style={{ color: mood?.color }}>{echo.mood}</span>
                  <motion.span
                    className="flex items-center gap-1 text-primary font-label-sm text-label-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span>Enter</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </motion.span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-space-xl text-center"
        >
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-space-xs px-space-2xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_40px_rgba(56,189,248,0.5)] hover:shadow-[0_0_70px_rgba(56,189,248,0.85)] hover:scale-105 transition-all"
            type="button"
          >
            <span className="relative z-10 flex items-center gap-space-sm">
              <span>EXPLORE UNIVERSE</span>
              <span className="material-symbols-outlined">wifi_tethering</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary-fixed to-tertiary"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}