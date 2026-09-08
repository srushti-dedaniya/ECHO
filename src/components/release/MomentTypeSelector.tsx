import { motion } from 'framer-motion';

interface MomentTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
  className?: string;
}

const momentTypes = [
  { id: 'thought', label: 'Thought', icon: 'bubble_chart', description: 'Ethereal Haze', color: 'primary' },
  { id: 'visual', label: 'Visual', icon: 'lens', description: 'Aperture Ring', color: 'outline' },
  { id: 'sound', label: 'Sound', icon: 'graphic_eq', description: 'Harmonic Wave', color: 'tertiary' },
  { id: 'place', label: 'Place', icon: 'near_me', description: 'Orbital Locus', color: 'primary' },
  { id: 'now', label: 'Now', icon: 'local_fire_department', description: 'Solar Flare', color: 'secondary' },
  { id: 'question', label: 'Question', icon: 'explore', description: 'Resonance Beacon', color: 'tertiary' },
] as const;

export function MomentTypeSelector({ selectedType, onSelect, className = '' }: MomentTypeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full flex flex-col space-y-space-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span>Step 02 // Waveform Modality</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant/70">SELECT GLYPH</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm">
        {momentTypes.map((type) => (
          <motion.button
            key={type.id}
            onClick={() => onSelect(type.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              glyph-btn group flex flex-col items-center justify-center p-space-md rounded-lg transition-all duration-300 shadow-md
              ${selectedType === type.id 
                ? 'active bg-surface-container-high/90 text-on-surface' 
                : 'bg-surface-container-low/60 hover:bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface'
              }
            `}
            type="button"
          >
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-space-xs
              group-hover:scale-110 transition-transform
              ${selectedType === type.id 
                ? `bg-${type.color}/10 text-${type.color}` 
                : 'bg-surface-container text-on-surface-variant group-hover:text-primary'
              }
            `}>
              <span className="material-symbols-outlined">{type.icon}</span>
            </div>
            <span className="font-headline-sm text-body-md font-medium">{type.label}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant opacity-70 mt-1">{type.description}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}