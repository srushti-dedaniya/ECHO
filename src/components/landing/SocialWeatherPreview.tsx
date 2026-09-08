import { motion } from 'framer-motion';
import { socialWeather as socialWeatherData } from '../../data/socialWeather';

interface SocialWeatherPreviewProps {
  className?: string;
}

function moodColor(mood: string): string {
  const colors: Record<string, string> = {
    calm: '#8ed5ff',
    nostalgic: '#ffb2b9',
    heavy: '#ff97a3',
    curious: '#4ee6aa',
    excited: '#c4e7ff',
    restless: '#ffb2b9',
  };
  return colors[mood] || '#8ed5ff';
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function SocialWeatherPreview({ className = '' }: SocialWeatherPreviewProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full max-w-6xl mx-auto px-viewport-inset py-space-4xl ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-space-3xl">
        <span className="font-label-md text-label-md text-primary uppercase tracking-widest block mb-space-xs">Live Atmospheric Reading</span>
        <h2 className="font-display-lg text-display-lg text-on-surface">THE WORLD FEELS...</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
          Real-time collective emotional frequency barometer. No surveys. No sampling. Pure resonance.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto rounded-2xl bg-surface-container-low/70 backdrop-blur-2xl p-space-lg shadow-xl"
      >
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-2xs">
            <span className="material-symbols-outlined text-primary text-[18px]">routine</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Global Telemetry</span>
          </div>
          <span className="font-label-sm text-label-sm text-tertiary">Live Synced</span>
        </div>

        <div className="space-y-space-xs">
          {socialWeatherData.map((data, index) => (
            <motion.div
              key={data.mood}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-1"
            >
              <div className="flex justify-between font-label-md text-label-md text-on-surface mb-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: moodColor(data.mood) }} />
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
                  whileInView={{ width: `${data.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm uppercase"
        >
          <span>Resonance Drift: <span className="text-tertiary font-headline-sm">+4.2%</span></span>
          <span className="text-primary font-headline-sm">432.08 Hz</span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}