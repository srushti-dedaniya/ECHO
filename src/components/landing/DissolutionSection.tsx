import { motion } from 'framer-motion';

interface DissolutionSectionProps {
  className?: string;
}

const dissolutionTokens = [
  { id: 'followers', title: 'Followers', sub: 'Social metrics of vanity', color: 'primary', icon: 'group_add', dust: '✨ Dissolved' },
  { id: 'likes', title: 'Likes', sub: 'Dopamine micro-spikes', color: 'secondary', icon: 'favorite', dust: '✨ Vaporized' },
  { id: 'feeds', title: 'Feeds', sub: 'Endless algorithmic scrolls', color: 'tertiary', icon: 'feed', dust: '✨ Cleared' },
  { id: 'algorithms', title: 'Algorithms', sub: 'Manipulated attention', color: 'primary', icon: 'auto_awesome', dust: '✨ Neutralized' },
] as const;

export function DissolutionSection({ className = '' }: DissolutionSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full max-w-6xl mx-auto px-viewport-inset py-space-4xl ${className}`}
    >
      <div className="text-center max-w-3xl mx-auto mb-space-3xl">
        <span className="font-label-md text-label-md text-primary uppercase tracking-widest block mb-space-xs">The Problem</span>
        <h2 className="font-display-lg text-display-lg text-on-surface leading-tight uppercase">
          SOCIAL MEDIA CONNECTED US.<br />
          <span className="text-secondary">SO WHY DO WE FEEL ALONE?</span>
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm font-light">
          Hover or touch the relics of traditional social platforms to dissolve them into harmless stardust.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md" id="dissolution-grid">
        {dissolutionTokens.map((token) => (
          <motion.div
            key={token.id}
            whileHover={{ y: -8, scale: 1.05 }}
            className="dissolve-card group relative p-space-xl rounded-3xl bg-surface-container-low/70 backdrop-blur-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 hover:bg-surface-container-lowest border border-outline/10 hover:border-primary/30"
          >
            <motion.div
              whileHover={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-surface-container-highest/80 flex items-center justify-center text-on-surface mb-space-md"
            >
              <span className="material-symbols-outlined text-2xl" style={{ color: `var(--color-${token.color})` }}>
                {token.icon}
              </span>
            </motion.div>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{token.title}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant mt-space-2xs">{token.sub}</span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-label-sm text-label-sm tracking-widest uppercase mt-space-xs opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: `var(--color-${token.color})` }}
            >
              {token.dust}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}