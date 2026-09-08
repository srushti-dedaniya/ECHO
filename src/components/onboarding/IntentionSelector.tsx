import { motion } from 'framer-motion';
import type { IntentType } from '../../types/user';

interface IntentionSelectorProps {
  selectedIntent: IntentType | null;
  onSelect: (intent: IntentType) => void;
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

const intentions = [
  {
    id: 'understanding' as IntentType,
    label: 'Someone who understands',
    emoji: '🫂',
    description: 'Raw, unfiltered resonance. Resonance nodes filtered for authentic emotional reciprocity without judgment.',
    color: 'primary',
    filament: 'CYAN FILAMENT ACTIVE',
  },
  {
    id: 'perspective' as IntentType,
    label: 'A different perspective',
    emoji: '💭',
    description: 'Challenging frequencies from distant orbits. Thought-fragments that bend existing mental frameworks.',
    color: 'secondary',
    filament: 'ETHEREAL INDIGO RING',
  },
  {
    id: 'vibe' as IntentType,
    label: 'A shared vibe',
    emoji: '🎵',
    description: 'Atmospheric drifting. Ambient audio recordings, night thoughts, and low-frequency communal resting.',
    color: 'tertiary',
    filament: 'OSCILLATING SOUNDWAVE',
  },
  {
    id: 'now' as IntentType,
    label: 'Something happening now',
    emoji: '✨',
    description: 'Instant synchronous alignment. Live transmission storms and realtime emotional pulses across the globe.',
    color: 'primary-fixed',
    filament: 'LIVE PULSING CLUSTER',
  },
] as const;

export function IntentionSelector({ 
  selectedIntent, 
  onSelect, 
  onNext, 
  onBack,
  className = '',
}: IntentionSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-space-2xl">
        <span className="font-label-sm text-label-sm uppercase tracking-[0.25em] text-primary inline-block mb-space-2xs">Gravitational Trajectory</span>
        <h2 className="font-display-xl text-display-xl text-on-surface tracking-tight leading-none mb-space-sm">
          What are you hoping to find?
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
          Set your beacon attractor. Transmissions align around mirrored desires.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        {intentions.map((intent) => (
          <motion.button
            key={intent.id}
            onClick={() => onSelect(intent.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              intent-card text-left p-space-lg rounded-2xl
              bg-surface-container-low/60 hover:bg-surface-container/80
              backdrop-blur-2xl
              shadow-[0_0_30px_rgba(56,189,248,0.1)]
              group transition-all duration-300 relative overflow-hidden
              ${selectedIntent === intent.id ? 'bg-surface-container-high/90 ring-2' : ''}
            `}
            type="button"
          >
            <motion.div
              className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full blur-2xl"
              style={{ backgroundColor: `var(--color-${intent.color})1A` }}
            />
            
            <div className="flex items-center gap-space-sm mb-space-sm">
              <span className="text-2xl">{intent.emoji}</span>
              <span className={`
                font-headline-sm text-headline-sm
                ${selectedIntent === intent.id ? 'text-primary' : 'text-on-surface'}
                group-hover:text-primary transition-colors
              `}>
                {intent.label}
              </span>
            </div>
            
            <p className="font-body-sm text-body-sm text-on-surface-variant font-light mb-space-sm">
              {intent.description}
            </p>
            
            <div className="flex items-center gap-space-xs" style={{ color: `var(--color-${intent.color})` }}>
              <span className="w-1.5 h-1.5 rounded-full" />
              <span className="font-label-sm text-label-sm">{intent.filament}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-space-md mt-space-xl">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="px-space-md py-space-xs rounded-full font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
          type="button"
        >
          ← PREVIOUS
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!selectedIntent}
          className={`group relative inline-flex items-center gap-space-xs px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.7)] transition-all ${!selectedIntent ? 'opacity-50 cursor-not-allowed' : ''}`}
          type="button"
        >
          <span>Synthesize Constellation</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">auto_awesome</span>
        </motion.button>
      </div>
    </motion.div>
  );
}