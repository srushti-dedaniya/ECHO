import { motion } from 'framer-motion';
import type { MoodType } from '../../types/mood';
import { globalTelemetry, socialWeather as socialWeatherData } from '../../data/socialWeather';

interface SocialWeatherProps {
  className?: string;
  compact?: boolean;
}

export function SocialWeather({ className = '', compact = false }: SocialWeatherProps) {
  const totalSouls = globalTelemetry.totalActiveSouls;
  const frequency = globalTelemetry.baseFrequency;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl p-space-lg shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between mb-space-md">
        <div className="flex items-center gap-space-2xs">
          <span className="material-symbols-outlined text-primary text-[18px]">routine</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Global Telemetry</span>
        </div>
        <span className="font-label-sm text-label-sm text-tertiary">Live Synced</span>
      </div>

      {!compact && (
        <div className="mb-space-lg">
          <h4 className="font-headline-sm text-headline-sm text-on-surface tracking-tight mb-space-2xs">
            The World Feels...
          </h4>
          <p className="font-label-sm text-label-sm text-outline">
            Collective Emotional Frequency Barometer
          </p>
        </div>
      )}

      <div className="space-y-space-xs">
        {socialWeatherData.map((data, index) => (
          <motion.div
            key={data.mood}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col gap-1"
          >
            <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
              <span className="flex items-center gap-1.5">
                <span 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: moodColor(data.mood) }}
                />
                {capitalize(data.mood)}
              </span>
              <span className="font-headline-sm text-[13px]" style={{ color: moodColor(data.mood) }}>
                {data.percentage}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: moodColor(data.mood) }}
                initial={{ width: 0 }}
                animate={{ width: `${data.percentage}%` }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {!compact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase"
        >
          <span>Resonance Drift: <span className="text-tertiary font-headline-sm">+{globalTelemetry.resonanceDrift}%</span></span>
          <span className="text-primary font-headline-sm">{frequency} Hz</span>
        </motion.div>
      )}

      {compact && (
        <div className="mt-space-md flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            {totalSouls.toLocaleString()} souls active
          </span>
          <span className="text-primary font-headline-sm">{frequency} Hz</span>
        </div>
      )}
    </motion.div>
  );
}

function moodColor(mood: MoodType): string {
  const colors: Record<MoodType, string> = {
    calm: '#8ed5ff',
    nostalgic: '#ffb2b9',
    heavy: '#ff97a3',
    curious: '#4ee6aa',
    excited: '#c4e7ff',
    restless: '#ffb2b9',
  };
  return colors[mood];
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function LivePulse({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`fixed bottom-space-md right-space-md lg:right-viewport-inset z-40 pointer-events-none hidden sm:block ${className}`}
      animate={{ opacity: [1, 0.6, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-lg">
        <span className="material-symbols-outlined text-primary text-[16px] animate-spin">graphic_eq</span>
        <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">432Hz HARMONIC RESONANCE</span>
      </div>
    </motion.div>
  );
}