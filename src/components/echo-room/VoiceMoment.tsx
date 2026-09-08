import { motion } from 'framer-motion';


interface VoiceMomentProps {
  duration: string;
  waveform: number[];
  author?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

export function VoiceMoment({ 
  duration, 
  waveform, 
  author, 
  isPlaying = false, 
  onPlay, 
  onPause,
  className = '',
}: VoiceMomentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-full px-space-md py-space-sm bg-surface-container-highest/90 backdrop-blur-xl shadow-[0_0_24px_rgba(78,230,170,0.2)] flex items-center gap-space-sm ${className}`}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isPlaying ? onPause : onPlay}
        className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-lg flex-shrink-0"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </motion.button>
      
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-space-2xs">
          <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider">🎙️ {duration}</span>
          {author && (
            <span className="font-label-sm text-label-sm text-on-surface-variant">· {author}</span>
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-1 h-4 overflow-hidden">
          {waveform.map((height, i) => (
            <motion.div
              key={i}
              className="w-1 rounded-full bg-tertiary"
              style={{ height: `${Math.max(height, 2)}px` }}
              animate={{ height: `${Math.max(height * (isPlaying ? 1.2 : 1), 2)}px` }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: isPlaying ? 0.8 : 0, repeat: isPlaying ? Infinity : 0 }}
        className="w-2 h-2 rounded-full bg-tertiary flex-shrink-0"
      />
    </motion.div>
  );
}

export function VoiceRecorder({ 
  onRecord, 
  onStop, 
  isRecording, 
  duration,
  className = '',
}: {
  onRecord: () => void;
  onStop: () => void;
  isRecording: boolean;
  duration: number;
  className?: string;
}) {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className={`rounded-2xl bg-surface-container-low/80 backdrop-blur-2xl p-space-lg ${className}`}
    >
      <div className="flex items-center justify-center gap-space-md mb-space-lg">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={isRecording ? onStop : onRecord}
          className={`
            w-20 h-20 rounded-full flex items-center justify-center
            ${isRecording 
              ? 'bg-secondary text-on-secondary animate-pulse shadow-[0_0_30px_rgba(255,178,185,0.6)]' 
              : 'bg-tertiary text-on-tertiary shadow-lg'
            }
            transition-all
          `}
          type="button"
        >
          <span className="material-symbols-outlined text-[32px]">
            {isRecording ? 'stop' : 'mic'}
          </span>
        </motion.button>
      </div>
      
      <div className="text-center">
        <motion.span
          className="font-display-lg text-display-lg text-on-surface tabular-nums"
          animate={{ scale: isRecording ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
        >
          {formatTime(duration)}
        </motion.span>
        <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
          {isRecording ? 'Recording...' : 'Tap to start recording'}
        </p>
      </div>
      
      {isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-space-lg h-8 flex items-center gap-1"
        >
          {Array.from({ length: 32 }, (_, i) => (
            <motion.div
              key={i}
              className="w-1 flex-1 rounded-full bg-tertiary"
              animate={{ height: [4, 16, 32, 16, 4] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.02, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}