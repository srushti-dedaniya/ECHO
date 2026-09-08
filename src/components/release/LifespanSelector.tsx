import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { LifespanType } from '../../types/echo';

interface LifespanSelectorProps {
  selectedLifespan: LifespanType;
  onSelect: (lifespan: LifespanType) => void;
  className?: string;
}

const lifespanOptions = [
  { id: '30m' as LifespanType, label: '30 Minutes', description: 'Ephemeral whisper', dash: 220, color: 'surface-variant' },
  { id: '3h' as LifespanType, label: '3 Hours', description: 'Evening transition', dash: 188, color: 'secondary' },
  { id: '24h' as LifespanType, label: '24 Hours', description: 'A complete sun cycle', dash: 60, color: 'surface-variant' },
  { id: 'dawn' as LifespanType, label: 'Until Dawn', description: 'Night owls only (~5.5h)', dash: 125, color: 'surface-variant' },
] as const;

export function LifespanSelector({ selectedLifespan, onSelect, className = '' }: LifespanSelectorProps) {
  const gaugeRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const option = lifespanOptions.find(o => o.id === selectedLifespan);
    if (option && gaugeRef.current) {
      gaugeRef.current.style.strokeDashoffset = option.dash.toString();
    }
  }, [selectedLifespan]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`lg:col-span-7 rounded-lg bg-surface-container-low/70 backdrop-blur-2xl p-space-xl flex flex-col justify-between shadow-lg relative overflow-hidden ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span>Step 05 // Orbital Lifespan</span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary uppercase">ENTROPY CONTROL</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-lg">
          How long should this moment exist?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg items-center">
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" fill="none" r="40" stroke="#2a2a2a" strokeWidth="6" />
              <motion.circle
                ref={gaugeRef}
                className="transition-all duration-700"
                cx="50" cy="50" fill="none" r="40"
                stroke="#ffb2b9"
                strokeDasharray="251.2"
                strokeDashoffset={lifespanOptions.find(o => o.id === selectedLifespan)?.dash || 188}
                strokeLinecap="round"
                strokeWidth="6"
              />
              <motion.circle
                className="shadow-lg"
                cx="50" cy="10" fill="#ffffff" r="4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display-lg text-headline-md font-bold text-on-surface">
                {selectedLifespan === 'dawn' ? '~5.5h' : selectedLifespan}
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Orbital Orbit</span>
            </div>
          </div>

          <div className="flex flex-col space-y-space-xs">
            {lifespanOptions.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => onSelect(option.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`
                  life-btn w-full text-left p-space-sm rounded-lg transition-all flex items-center justify-between
                  ${selectedLifespan === option.id 
                    ? 'active bg-secondary/15' 
                    : 'bg-surface-container-high/40 hover:bg-surface-container-high'
                  }
                `}
                type="button"
              >
                <div>
                  <span className={`
                    font-headline-sm text-body-md block
                    ${selectedLifespan === option.id ? `text-${option.color}` : 'text-on-surface'}
                  `}>
                    {option.label}
                  </span>
                  <span className={`
                    font-label-sm text-label-sm
                    ${selectedLifespan === option.id ? `text-${option.color}` : 'text-on-surface-variant'}
                  `}>
                    {option.description}
                  </span>
                </div>
                <motion.span
                  className="w-3 h-3 rounded-full transition-all"
                  initial={{ scale: 0 }}
                  animate={{ scale: selectedLifespan === option.id ? 1 : 0 }}
                >
                  <span className={`
                    w-full h-full rounded-full
                    ${selectedLifespan === option.id ? `bg-${option.color}` : 'bg-surface-variant'}
                  `} />
                </motion.span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-space-lg p-space-md rounded-lg bg-surface-container-lowest/80 flex items-start gap-space-sm"
      >
        <span className="material-symbols-outlined text-secondary text-lg mt-0.5">auto_delete</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          When the timer strikes zero, every fragment dissolves back into stardust.{' '}
          <strong className="text-on-surface font-medium">No archives. No digital footprint.</strong>
        </p>
      </motion.div>
    </motion.div>
  );
}