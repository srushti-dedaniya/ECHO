import { motion } from 'framer-motion';

interface MusicMomentProps {
  title: string;
  artist: string;
  duration: number;
  waveform: number[];
  contributors: string[];
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

export function MusicMoment({ 
  title, 
  artist, 
  duration, 
  waveform, 
  contributors, 
  isPlaying = false, 
  onPlay, 
  onPause,
  className = '',
}: MusicMomentProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl bg-surface-container-high/80 backdrop-blur-xl p-space-md shadow-xl ${className}`}
    >
      <div className="flex items-start gap-space-md">
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-container to-secondary flex items-center justify-center flex-shrink-0"
        >
          <span className="material-symbols-outlined text-on-primary text-3xl animate-spin" style={{ animationDuration: isPlaying ? '6s' : '0', animationPlayState: isPlaying ? 'running' : 'paused' }}>
            music_note
          </span>
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-space-2xs mb-1">
            <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider">🎵 {formatTime(duration)}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">· {contributors.length} in harmony</span>
          </div>
          
          <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant truncate">by {artist}</p>

          <div className="flex items-center gap-1 mt-2 h-6 overflow-hidden">
            {waveform.map((height, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-primary"
                style={{ height: `${Math.max(height, 4)}px` }}
                animate={{ height: `${Math.max(height * (isPlaying ? 1.3 : 1), 4)}px` }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
              />
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={isPlaying ? onPause : onPlay}
          className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg flex-shrink-0"
          type="button"
        >
          <span className="material-symbols-outlined text-[24px]">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </motion.button>
      </div>

      {contributors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-space-md pt-space-md border-t border-outline-variant/20"
        >
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-2">
            <span className="material-symbols-outlined text-[16px]">people</span>
            <span>Contributors:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {contributors.map((contributor, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm"
              >
                {contributor}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}