import { motion } from 'framer-motion';

interface FloatingPhotoProps {
  src: string;
  alt?: string;
  position: { x: number; y: number };
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  author?: string;
  timestamp?: string;
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-48 h-48',
  lg: 'w-64 h-64',
};

export function FloatingPhoto({ 
  src, 
  alt, 
  position, 
  onClick, 
  size = 'md',
  author,
  timestamp,
}: FloatingPhotoProps) {
  return (
    <motion.div
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`
          relative ${sizeClasses[size]} rounded-xl overflow-hidden
          bg-surface-container-high/80 backdrop-blur-xl
          shadow-[0_12px_36px_rgba(0,0,0,0.7)]
          transition-all duration-300
        `}
      >
        <img
          src={src}
          alt={alt || 'Floating photo'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
        
        {(author || timestamp) && (
          <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1">
            {author && (
              <span className="font-label-sm text-label-sm text-on-surface-variant px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm">
                {author}
              </span>
            )}
            {timestamp && (
              <span className="font-label-sm text-[10px] text-on-surface-variant/80 px-2 py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm">
                {timestamp}
              </span>
            )}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none group-hover:pointer-events-auto"
      >
        <div className="p-3 rounded-xl bg-surface-container/95 backdrop-blur-2xl shadow-2xl">
          <p className="font-body-sm text-body-sm text-on-surface">
            {alt || 'A moment captured in time'}
          </p>
          {author && (
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
              Shared by {author}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}