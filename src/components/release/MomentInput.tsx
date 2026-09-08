import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MomentInputProps {
  value: string;
  onChange: (value: string) => void;
  onEmotionChange?: (emotion: string) => void;
  className?: string;
}

const emotions = [
  'CALM // CONTEMPLATIVE',
  'NOSTALGIC // ECHOES',
  'ELECTRIC // EXCITED',
  'DEEP // HEAVY VOID',
  'CURIOUS // PULSE',
];

export function MomentInput({ value, onChange, onEmotionChange, className = '' }: MomentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [emotionLabel, setEmotionLabel] = useState(emotions[0]);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(value.length);
    const emoIndex = Math.min(Math.floor(value.length / 35), emotions.length - 1);
    const newEmotion = emotions[emoIndex];
    setEmotionLabel(newEmotion);
    onEmotionChange?.(newEmotion);
  }, [value, onEmotionChange]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full rounded-lg bg-surface-container-low/70 backdrop-blur-2xl p-space-lg sm:p-space-2xl overflow-hidden shadow-xl group ${className}`}
    >
      <motion.div
        className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-space-xs font-label-md text-label-md text-primary tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span>Step 01 // Cosmic Frequency</span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">Telemetry: Open Band</span>
      </div>

      <label className="block font-headline-sm text-headline-sm text-on-surface uppercase mb-space-md tracking-tight">
        What's happening in your world?
      </label>

      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          className="w-full bg-transparent border-0 outline-none text-on-surface font-body-lg text-body-lg sm:text-headline-sm placeholder:text-on-surface-variant/40 placeholder:font-light resize-none selection:bg-primary-container selection:text-on-primary"
          placeholder="&ldquo;Marine Drive is completely quiet. The sea is roaring and nobody is talking...&rdquo;"
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between pt-space-md mt-space-md bg-gradient-to-r from-surface-container to-transparent px-space-md py-space-xs rounded-full">
        <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
          <span className="material-symbols-outlined text-sm text-secondary">flare</span>
          <span>EMOTIONAL RESONANCE:</span>
          <span className="text-secondary uppercase" id="emotion-label">{emotionLabel}</span>
        </div>
        <div className="font-label-sm text-label-sm text-on-surface-variant">
          <span id="char-counter">{charCount}</span> / 420 PARTICLES
        </div>
      </div>
    </motion.div>
  );
}