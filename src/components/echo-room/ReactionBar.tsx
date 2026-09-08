import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Echo } from '../../types/echo';
import { useEcho } from '../../context/EchoContext';

type ReactionType = 'resonate' | 'signal' | 'hold' | 'ripple';

interface ReactionBarProps {
  echo: Echo;
  onReact?: (type: ReactionType) => void;
  className?: string;
}

const reactions: { id: ReactionType; label: string; subtitle: string; symbol: string; color: string; bgColor: string; hoverColor: string; tooltip: string }[] = [
  { 
    id: 'resonate', 
    label: 'RESONATE', 
    subtitle: 'This connects with me', 
    symbol: '✦', 
    color: 'primary',
    bgColor: 'bg-primary-container/20',
    hoverColor: 'hover:bg-primary-container/40',
    tooltip: 'RESONATE — "This connects with me."',
  },
  { 
    id: 'signal', 
    label: 'SIGNAL', 
    subtitle: 'I relate', 
    symbol: '〰', 
    color: 'secondary',
    bgColor: 'bg-secondary-container/20',
    hoverColor: 'hover:bg-secondary-container/40',
    tooltip: 'SIGNAL — "I relate."',
  },
  { 
    id: 'hold', 
    label: 'HOLD SPACE', 
    subtitle: 'I\'m here with you', 
    symbol: '◯', 
    color: 'tertiary',
    bgColor: 'bg-tertiary-container/20',
    hoverColor: 'hover:bg-tertiary-container/40',
    tooltip: 'HOLD SPACE — "I\'m here with you."',
  },
  { 
    id: 'ripple', 
    label: 'RIPPLE', 
    subtitle: 'This affected me', 
    symbol: '🌊', 
    color: 'primary-fixed-dim',
    bgColor: 'bg-primary/10',
    hoverColor: 'hover:bg-primary/20',
    tooltip: 'RIPPLE — "This affected me."',
  },
];

export function ReactionBar({ echo, onReact, className = '' }: ReactionBarProps) {
  const { updateResonance } = useEcho();
  const [hoveredReaction, setHoveredReaction] = useState<ReactionType | null>(null);

  const handleReact = (type: ReactionType) => {
    updateResonance(echo.id, type, 1);
    onReact?.(type);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full flex flex-col sm:flex-row items-center justify-center gap-space-md bg-surface-container-low/70 backdrop-blur-2xl rounded-xl p-space-md shadow-2xl ${className}`}
    >
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest sm:mr-space-sm">
        EMIT FREQUENCY:
      </span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm w-full sm:w-auto relative">
        {reactions.map((reaction) => (
          <div key={reaction.id} className="relative">
            <motion.button
              onClick={() => handleReact(reaction.id)}
              onMouseEnter={() => setHoveredReaction(reaction.id)}
              onMouseLeave={() => setHoveredReaction(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group relative w-full px-space-lg py-space-sm rounded-full
                bg-surface-container-high/80
                text-on-surface
                transition-all flex items-center justify-between gap-space-sm shadow-md overflow-hidden
                ${reaction.bgColor} ${reaction.hoverColor}
              `}
              type="button"
              aria-label={reaction.tooltip}
            >
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm" style={{ color: `var(--color-${reaction.color})` }}>
                  {reaction.symbol}
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md font-semibold tracking-wider uppercase">
                    {reaction.label}
                  </span>
                  <span className="font-label-sm text-[9px] text-on-surface-variant">
                    {reaction.subtitle}
                  </span>
                </div>
              </div>
              <motion.span
                className="font-label-md text-label-md font-bold ml-space-xs"
                style={{ color: `var(--color-${reaction.color})` }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                {echo.resonance[reaction.id]}
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {hoveredReaction === reaction.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-outline/20 text-on-surface font-label-sm text-label-sm whitespace-nowrap z-10"
                >
                  {reaction.tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}