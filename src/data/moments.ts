export interface MomentTypeOption {
  id: string;
  label: string;
  emoji: string;
  icon: string;
  description: string;
  gradient: string;
}

export const momentTypes: MomentTypeOption[] = [
  {
    id: 'thought',
    label: 'Thought',
    emoji: '💭',
    icon: 'bubble_chart',
    description: 'Ethereal Haze',
    gradient: 'from-primary/10',
  },
  {
    id: 'visual',
    label: 'Visual',
    emoji: '📷',
    icon: 'lens',
    description: 'Aperture Ring',
    gradient: 'from-surface-container',
  },
  {
    id: 'sound',
    label: 'Sound',
    emoji: '🎵',
    icon: 'graphic_eq',
    description: 'Harmonic Wave',
    gradient: 'from-surface-container',
  },
  {
    id: 'place',
    label: 'Place',
    emoji: '📍',
    icon: 'near_me',
    description: 'Orbital Locus',
    gradient: 'from-surface-container',
  },
  {
    id: 'now',
    label: 'Now',
    emoji: '✨',
    icon: 'local_fire_department',
    description: 'Solar Flare',
    gradient: 'from-surface-container',
  },
  {
    id: 'question',
    label: 'Question',
    emoji: '❓',
    icon: 'explore',
    description: 'Resonance Beacon',
    gradient: 'from-surface-container',
  },
];

export const lifespanOptions = [
  { id: '30m', label: '30 Minutes', description: 'Ephemeral whisper', dash: 220, color: 'surface-variant' },
  { id: '3h', label: '3 Hours', description: 'Evening transition', dash: 188, color: 'secondary' },
  { id: '24h', label: '24 Hours', description: 'A complete sun cycle', dash: 60, color: 'surface-variant' },
  { id: 'dawn', label: 'Until Dawn', description: 'Night owls only (~5.5h)', dash: 125, color: 'surface-variant' },
];

export const scopeOptions = [
  { id: 'universe', label: 'Anyone in the Universe', description: 'Global stardust broadcast', icon: 'public', color: 'primary' },
  { id: 'local', label: 'Local Resonance', description: 'Mumbai Sector (Within 12km)', icon: 'share_location', color: 'secondary' },
  { id: 'students', label: 'Shared Realm', description: 'Verified Students & Peers', icon: 'school', color: 'tertiary' },
  { id: 'anon', label: 'Completely Anonymous', description: 'Quantum-shuffled origin tag', icon: 'theater_comedy', color: 'on-surface-variant' },
];