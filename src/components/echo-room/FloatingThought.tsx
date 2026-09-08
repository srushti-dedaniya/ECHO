import { motion } from 'framer-motion';

interface FloatingThoughtProps {
  content: string;
  position: { x: number; y: number };
  author?: string;
  mood?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-[200px] p-3',
  md: 'max-w-[280px] p-4',
  lg: 'max-w-[360px] p-5',
};

const moodColors: Record<string, string> = {
  calm: 'bg-primary/10 border-primary/20',
  nostalgic: 'bg-secondary/10 border-secondary/20',
  heavy: 'bg-on-secondary-fixed-variant/10 border-on-secondary-fixed-variant/20',
  curious: 'bg-tertiary/10 border-tertiary/20',
  excited: 'bg-primary-container/10 border-primary-container/20',
  restless: 'bg-secondary-container/10 border-secondary-container/20',
};

export function FloatingThought({ 
  content, 
  position, 
  author, 
  mood = 'nostalgic',
  onClick, 
  size = 'md',
}: FloatingThoughtProps) {
  const moodClass = moodColors[mood] || moodColors.nostalgic;

  return (
    <motion.div
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`
          relative rounded-2xl ${sizeClasses[size]}
          bg-surface-container-high/90 backdrop-blur-2xl
          shadow-[0_16px_40px_rgba(0,0,0,0.5)]
          border ${moodClass}
          transition-all duration-300
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-${mood})` }} />
            <span className="font-label-sm text-label-sm uppercase tracking-widest" style={{ color: `var(--color-${mood})` }}>
              {mood.toUpperCase()}
            </span>
          </div>
          {author && (
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {author}
            </span>
          )}
        </div>
        
        <blockquote className="font-body-md text-body-md text-on-surface font-light leading-relaxed italic">
          "{content}"
        </blockquote>
        
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-outline-variant/20">
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {Math.floor(Math.random() * 50) + 10} aligned
          </span>
          <span className="material-symbols-outlined text-[16px]" style={{ color: `var(--color-${mood})` }}>
            bubble_chart
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto"
      >
        <div className="p-3 rounded-xl bg-surface-container/95 backdrop-blur-2xl shadow-2xl">
          <p className="font-body-sm text-body-sm text-on-surface">"{content}"</p>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
            Resonated by {author || 'a soul'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}