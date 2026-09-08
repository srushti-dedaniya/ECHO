import { motion } from 'framer-motion';
import type { Echo } from '../../types/echo';
import type { MoodType } from '../../types/mood';
import { moods } from '../../types/mood';

interface EchoOrbProps {
  echo: Echo;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  isActive?: boolean;
  showPreview?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<MoodType, typeof moods[0]>);

function formatTimeRemaining(expiresAt: number): string {
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) return 'Ended';
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function EchoOrb({ echo, size = 'md', onClick, isActive, showPreview = true }: EchoOrbProps) {
  const mood = moodConfig[echo.mood];
  const glowColor = mood?.color || 'var(--color-primary)';
  const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;

  const orbStyle = {
    '--orb-glow': glowColor,
  } as React.CSSProperties;

  return (
    <motion.button
      onClick={onClick}
      disabled={!onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative group cursor-pointer flex flex-col items-center
        ${sizeClasses[size]}
        transition-all duration-500
        ${isActive ? 'scale-110' : ''}
      `}
      style={orbStyle}
      aria-label={`Enter ${echo.type} moment: ${echo.content.slice(0, 50)}...`}
    >
      <div className="relative flex items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full blur-[60px] opacity-30"
          style={{ backgroundColor: glowColor }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <motion.div
          className={`
            relative rounded-full backdrop-blur-2xl p-[1px] flex flex-col items-center justify-center
            shadow-[0_0_30px_rgba(0,0,0,0.5)]
            ${isActive ? 'shadow-[0_0_50px_rgba(0,0,0,0.7)] ring-2' : ''}
          `}
          style={{ 
            borderColor: isActive ? glowColor : 'transparent',
            boxShadow: `0 0 30px ${glowColor}40`,
          }}
          animate={{ 
            boxShadow: [
              `0 0 30px ${glowColor}40`,
              `0 0 50px ${glowColor}60`,
              `0 0 30px ${glowColor}40`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className={`
            w-full h-full rounded-full flex flex-col items-center justify-center text-center
            bg-surface-container-lowest/80
          `}>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" aria-hidden="true">
              {mood?.emoji}
            </span>
            <span className="font-headline-sm text-body-sm font-semibold mt-1 text-on-surface">
              {mood?.label}
            </span>
          </div>
        </motion.div>

        {isActive && (
          <motion.div
            className="absolute -inset-2 rounded-full border-2"
            style={{ borderColor: glowColor }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 max-w-[200px] text-center"
        >
          <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 mb-1">
            {echo.content}
          </p>
          <div className="flex items-center justify-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: glowColor }} />
            <span>{totalResonance} souls</span>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

export function FloatingOrb({ 
  echo, 
  position, 
  onClick,
  drift = true,
}: { 
  echo: Echo; 
  position: { x: number; y: number };
  onClick?: () => void;
  drift?: boolean;
}) {
  const mood = moodConfig[echo.mood];
  const glowColor = mood?.color || 'var(--color-primary)';
  const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;

  return (
    <motion.div
      style={{ left: position.x, top: position.y }}
      className="absolute group cursor-pointer"
      animate={drift ? { 
        x: [0, 10, -5, 0], 
        y: [0, -10, 5, 0] 
      } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute -inset-3 rounded-full blur-xl opacity-40" style={{ backgroundColor: glowColor }} />
        <div className={`
          relative w-16 h-16 rounded-full backdrop-blur-xl p-[1px] flex items-center justify-center
          shadow-[0_0_20px_rgba(0,0,0,0.5)]
        `} style={{ boxShadow: `0 0 20px ${glowColor}40` }}>
          <div className="w-full h-full rounded-full bg-surface-container-lowest/80 flex items-center justify-center">
            <span className="text-xl">{mood?.emoji}</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-auto"
        >
          <div className="p-4 rounded-2xl glass-strong shadow-2xl border border-outline/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}40)` }}>
                <span className="text-2xl">{mood?.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline-sm text-headline-sm text-on-surface mb-1 line-clamp-1">{echo.content.slice(0, 50)}...</p>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: glowColor }} />
                    <span>{totalResonance} experiencing now</span>
                  </span>
                  <span className="text-primary font-medium capitalize">{mood?.label}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
              <span>Ends in: <span className="text-primary font-medium">{formatTimeRemaining(echo.expiresAt)}</span></span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-3 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-1"
              type="button"
            >
              <span>ENTER MOMENT →</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}