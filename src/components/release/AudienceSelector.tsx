import { motion } from 'framer-motion';
import type { ScopeType } from '../../types/echo';

interface AudienceSelectorProps {
  selectedScope: ScopeType;
  onSelect: (scope: ScopeType) => void;
  className?: string;
}

const scopeOptions = [
  { id: 'universe' as ScopeType, label: 'Anyone in the Universe', description: 'Global stardust broadcast', icon: 'public', color: 'primary' },
  { id: 'local' as ScopeType, label: 'Local Resonance', description: 'Mumbai Sector (Within 12km)', icon: 'share_location', color: 'secondary' },
  { id: 'students' as ScopeType, label: 'Shared Realm', description: 'Verified Students & Peers', icon: 'school', color: 'tertiary' },
  { id: 'anon' as ScopeType, label: 'Completely Anonymous', description: 'Quantum-shuffled origin tag', icon: 'theater_comedy', color: 'on-surface-variant' },
] as const;

export function AudienceSelector({ selectedScope, onSelect, className = '' }: AudienceSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`lg:col-span-5 rounded-lg bg-surface-container-low/70 backdrop-blur-2xl p-space-xl flex flex-col justify-between shadow-lg ${className}`}
    >
      <div>
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-widest uppercase mb-space-md">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span>Step 04 // Resonance Scope</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase mb-space-md">
          Who can experience this?
        </h3>
        <div className="space-y-space-xs">
          {scopeOptions.map((scope) => (
            <motion.label
              key={scope.id}
              whileHover={{ scale: 1.01 }}
              className={`
                flex items-center justify-between p-space-md rounded-lg cursor-pointer transition-colors
                ${selectedScope === scope.id 
                  ? 'bg-surface-container-high ring-2 ring-primary/50' 
                  : 'bg-surface-container-low hover:bg-surface-bright'
                }
              `}
            >
              <div className="flex items-center gap-space-md">
                <span className={`
                  material-symbols-outlined
                  ${selectedScope === scope.id ? `text-${scope.color}` : 'text-on-surface-variant'}
                `}>
                  {scope.icon}
                </span>
                <div>
                  <div className={`
                    font-body-md text-body-md font-medium
                    ${selectedScope === scope.id ? 'text-on-surface' : 'text-on-surface'}
                  `}>
                    {scope.label}
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">
                    {scope.description}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="scope"
                value={scope.id}
                checked={selectedScope === scope.id}
                onChange={() => onSelect(scope.id)}
                className="w-4 h-4 accent-primary"
              />
            </motion.label>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-space-lg pt-space-md flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm"
      >
        <span className="material-symbols-outlined text-xs text-primary">security</span>
        <span>END-TO-END ZERO HARVEST ENCRYPTION</span>
      </motion.div>
    </motion.div>
  );
}