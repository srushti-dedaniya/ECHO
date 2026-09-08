import { motion } from 'framer-motion';
import { moods } from '../../types/mood';

interface UniverseControlsProps {
  activeMood?: string;
  onMoodChange?: (mood: string) => void;
  onDepthToggle?: () => void;
  onFilamentsToggle?: () => void;
  onAudioToggle?: () => void;
  isDepthEnabled?: boolean;
  isFilamentsEnabled?: boolean;
  isAudioEnabled?: boolean;
  className?: string;
}

export function UniverseControls({
  activeMood = 'all',
  onMoodChange,
  onDepthToggle,
  onFilamentsToggle,
  onAudioToggle,
  isDepthEnabled = false,
  isFilamentsEnabled = true,
  isAudioEnabled = true,
  className = '',
}: UniverseControlsProps) {
  const moodFilters = ['all', ...moods.map(m => m.id)];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`absolute bottom-space-lg left-viewport-inset z-40 pointer-events-auto ${className}`}
    >
      <div className="w-64 p-space-sm rounded-xl glass-strong shadow-xl flex flex-col gap-space-xs">
        <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
          <span className="uppercase tracking-widest">Spatial Navigation</span>
          <span className="text-primary font-headline-sm text-[11px]">Z-AXIS 2.5D</span>
        </div>
        
        <div className="grid grid-cols-2 gap-space-xs pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDepthToggle}
            className={`px-space-xs py-1.5 rounded-md font-label-sm text-label-sm transition-all flex items-center justify-center gap-1 ${
              isDepthEnabled
                ? 'bg-primary-container/20 text-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
            <span>Depth Tilt</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFilamentsToggle}
            className={`px-space-xs py-1.5 rounded-md font-label-sm text-label-sm transition-all flex items-center justify-center gap-1 ${
              isFilamentsEnabled
                ? 'bg-primary-container/20 text-primary'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">hub</span>
            <span>{isFilamentsEnabled ? 'Lines ON' : 'Lines OFF'}</span>
          </motion.button>
        </div>
        
        <div className="flex items-center justify-between pt-space-xs">
          <span className="font-label-sm text-label-sm text-on-surface-variant">Harmonic Feed</span>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAudioToggle}
            className={`px-space-xs py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 transition-all ${
              isAudioEnabled
                ? 'bg-surface-container-highest text-tertiary'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isAudioEnabled ? 'volume_up' : 'volume_off'}
            </span>
            <span>{isAudioEnabled ? '432Hz' : 'Muted'}</span>
          </motion.button>
        </div>
        
        <div className="pt-space-xs">
          <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block mb-1.5">Mood Focus</span>
          <div className="flex items-center gap-1 flex-wrap">
            {moodFilters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMoodChange?.(filter)}
                className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm transition-all ${
                  activeMood === filter
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                {filter === 'all' ? 'All' : capitalize(filter)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function SearchPortal({
  onSearch,
  onRelease,
  placeholder = 'What moment are you experiencing right now?',
}: {
  onSearch?: (query: string) => void;
  onRelease?: () => void;
  placeholder?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-space-lg left-1/2 -translate-x-1/2 z-40 pointer-events-auto max-w-xl w-[90%]"
    >
      <div className="p-space-xs rounded-full glass-strong shadow-2xl flex items-center justify-between gap-space-sm pl-space-md">
        <div className="flex items-center gap-space-xs min-w-0">
          <span className="material-symbols-outlined text-primary text-[20px] animate-pulse">explore_nearby</span>
          <input
            className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full truncate focus:ring-0"
            placeholder={placeholder}
            type="text"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearch?.(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRelease}
          className="shrink-0 flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-md hover:bg-primary transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          type="button"
        >
          <span>Release an Echo</span>
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
        </motion.button>
      </div>
    </motion.div>
  );
}