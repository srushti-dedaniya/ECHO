import { motion } from 'framer-motion';

export function FollowMoments({ className = '' }: { className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full max-w-6xl mx-auto px-viewport-inset py-space-4xl ${className}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-space-3xl">
        <span className="font-label-md text-label-md text-tertiary uppercase tracking-widest block mb-space-xs">The Difference</span>
        <h2 className="font-display-lg text-display-lg text-on-surface uppercase leading-tight">
          WHAT IF WE DIDN'T FOLLOW PEOPLE?<br />
          <span className="text-primary">WHAT IF WE FOLLOWED MOMENTS?</span>
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm font-light">
          A fundamental shift from audience-building to shared presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
        {/* Traditional Social Media */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative p-space-2xl rounded-3xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline/10 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest block mb-space-xs">Traditional Social Media</span>
            <div className="flex items-center gap-space-sm my-space-md p-space-md rounded-2xl bg-surface-container-low/60 border border-outline/10">
              <span className="font-headline-md text-headline-sm text-on-surface font-bold">FOLLOW PEOPLE</span>
              <span className="material-symbols-outlined text-secondary">arrow_forward</span>
              <span className="font-headline-md text-headline-sm text-on-surface-variant">SEE THEIR CONTENT</span>
            </div>
            <ul className="space-y-space-sm text-on-surface-variant font-body-md text-body-md font-light mt-space-md">
              <li className="flex items-center gap-2">
                <span className="text-secondary font-bold">✕</span> Built around profiles & follower counts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary font-bold">✕</span> Permanent archives and indexed feeds
              </li>
              <li className="flex items-center gap-2">
                <span className="text-secondary font-bold">✕</span> Passive spectator scrolling
              </li>
            </ul>
          </div>
        </motion.div>

        {/* ECHO */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative p-space-2xl rounded-3xl bg-surface-container-low/90 backdrop-blur-2xl border border-primary/30 shadow-[0_0_50px_rgba(56,189,248,0.15)] flex flex-col justify-between"
        >
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest block mb-space-xs">ECHO</span>
            <div className="flex items-center gap-space-sm my-space-md p-space-md rounded-2xl bg-primary-container/20 border border-primary/30">
              <span className="font-headline-md text-headline-sm text-primary font-bold">ENTER A MOMENT</span>
              <span className="material-symbols-outlined text-primary">arrow_forward</span>
              <span className="font-headline-md text-headline-sm text-on-surface">EXPERIENCE IT TOGETHER</span>
            </div>
            <ul className="space-y-space-sm text-on-surface font-body-md text-body-md font-light mt-space-md">
              <li className="flex items-center gap-2">
                <span className="text-tertiary font-bold">✓</span> Built around shared temporary experiences
              </li>
              <li className="flex items-center gap-2">
                <span className="text-tertiary font-bold">✓</span> Ephemeral moments that dissolve with time
              </li>
              <li className="flex items-center gap-2">
                <span className="text-tertiary font-bold">✓</span> Active co-presence & emotional resonance
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}