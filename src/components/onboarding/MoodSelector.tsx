import { useState } from 'react';
import { motion } from 'framer-motion';
import { moods, type MoodType } from '../../types/mood';

interface MoodSelectorProps {
  selectedMood: MoodType | null;
  onSelect: (mood: MoodType) => void;
  onNext: () => void;
  className?: string;
}

export function MoodSelector({ selectedMood, onSelect, onNext, className = '' }: MoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<MoodType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col items-center ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-space-2xl">
        <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-secondary inline-block mb-space-2xs">Presence Alignment</span>
        <h1 className="font-display-xl text-display-xl text-on-surface tracking-tight leading-none mb-space-sm">
          How are you arriving today?
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
          Select the frequency you carry into space. No names. No handles. Just pure conscious presence.
        </p>
      </div>

      <div className="relative w-full max-w-4xl h-[480px] sm:h-[440px] mx-auto">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id;
          const isHovered = hoveredMood === mood.id;
          
          return (
            <motion.button
              key={mood.id}
              onClick={() => onSelect(mood.id)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
              whileHover={{ scale: isSelected ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mood-orb group absolute cursor-pointer transition-transform duration-500 ${
                isSelected ? 'scale-110 opacity-100' : 'opacity-40'
              } ${isHovered && !isSelected ? 'scale-110 opacity-100' : ''}`}
              style={getOrbPosition(mood.id)}
              data-orb={mood.id}
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute -inset-4 rounded-full blur-xl opacity-40 transition-all duration-700"
                  style={{ backgroundColor: mood.color + '40' }}
                  animate={isSelected || isHovered ? { scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <div className={`
                  relative rounded-full backdrop-blur-3xl p-[1px] flex flex-col items-center justify-center
                  shadow-[0_0_30px_rgba(0,0,0,0.5)]
                  ${isSelected ? 'shadow-[0_0_50px_rgba(0,0,0,0.7)] ring-2' : ''}
                `} style={{ 
                  borderColor: isSelected ? mood.color : 'transparent',
                  boxShadow: `0 0 30px ${mood.color}40`,
                }}>
                  <div className={`
                    w-full h-full rounded-full flex flex-col items-center justify-center text-center
                    bg-surface-container-lowest/80
                  `} style={{ width: getOrbSize(mood.id).width, height: getOrbSize(mood.id).height }}>
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" aria-hidden="true">
                      {mood.emoji}
                    </span>
                    <span className="font-headline-sm text-body-sm font-semibold text-on-surface uppercase mt-1">
                      {mood.label}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2"
                    style={{ borderColor: mood.color }}
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {isSelected && mood.id === 'nostalgic' && (
                  <>
                    <div className="absolute -inset-8 rounded-full bg-secondary/25 blur-2xl animate-pulse" />
                    <div className="absolute -inset-4 rounded-full border border-dashed border-secondary/40 animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute -inset-1.5 rounded-full border border-primary/50 shadow-[0_0_20px_rgba(56,189,248,0.5)]" />
                  </>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isSelected || isHovered ? 1 : 0.6, y: 0 }}
                className="mt-2 text-center"
              >
                <span className={`
                  font-label-sm text-label-sm transition-colors
                  ${isSelected ? 'text-primary' : 'text-on-surface-variant'}
                  ${isHovered && !isSelected ? 'text-primary' : ''}
                `}>
                  {mood.percentage}% OF SOULS
                </span>
                {isSelected && (
                  <span className="block mt-1 px-space-xs py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm tracking-wider">
                    ACTIVE SECTOR
                  </span>
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        disabled={!selectedMood}
        className={`group relative inline-flex items-center gap-space-xs px-space-xl py-space-sm rounded-full bg-surface-container-high/80 hover:bg-surface-container-highest backdrop-blur-xl text-on-surface shadow-[0_0_30px_rgba(255,178,185,0.25)] transition-all mt-space-lg ${!selectedMood ? 'opacity-50 cursor-not-allowed' : ''}`}
        type="button"
      >
        <span className="font-label-md text-label-md tracking-widest uppercase">Calibrate Intent</span>
        <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">east</span>
      </motion.button>
    </motion.div>
  );
}

function getOrbPosition(moodId: MoodType): { left: string; top: string } {
  const positions: Record<MoodType, { left: string; top: string }> = {
    calm: { left: '6%', top: '8%' },
    nostalgic: { left: '40%', top: '28%' },
    heavy: { left: '8%', top: '60%' },
    curious: { left: '70%', top: '12%' },
    excited: { left: '75%', top: '55%' },
    restless: { left: '38%', top: '70%' },
  };
  return positions[moodId] || { left: '50%', top: '50%' };
}

function getOrbSize(moodId: MoodType): { width: string; height: string } {
  if (moodId === 'nostalgic') return { width: '144px', height: '144px' };
  if (moodId === 'calm' || moodId === 'curious') return { width: '112px', height: '112px' };
  if (moodId === 'excited') return { width: '104px', height: '104px' };
  if (moodId === 'heavy') return { width: '96px', height: '96px' };
  return { width: '64px', height: '64px' };
}