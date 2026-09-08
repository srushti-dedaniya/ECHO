export interface Mood {
  id: MoodType;
  label: string;
  emoji: string;
  color: string;
  gradient: string;
  icon: string;
  description: string;
  percentage: number;
}

export type MoodType = 'calm' | 'nostalgic' | 'heavy' | 'curious' | 'excited' | 'restless';

export const moods: Mood[] = [
  {
    id: 'calm',
    label: 'Calm',
    emoji: '💧',
    color: '#8ed5ff',
    gradient: 'from-surface-container-lowest via-primary/30 to-primary/60',
    icon: 'water_drop',
    description: 'Quiet waters, steady breath',
    percentage: 38,
  },
  {
    id: 'nostalgic',
    label: 'Nostalgic',
    emoji: '🌧️',
    color: '#ffb2b9',
    gradient: 'from-secondary/30 via-primary-container/20 to-surface-container-lowest',
    icon: 'lens_blur',
    description: 'Memories in rain, childhood echoes',
    percentage: 68,
  },
  {
    id: 'heavy',
    label: 'Heavy',
    emoji: '🎭',
    color: '#ff97a3',
    gradient: 'from-surface-container-high via-surface-container-low to-surface-container-lowest',
    icon: 'lens_blur',
    description: 'Deep density, unspoken weight',
    percentage: 32,
  },
  {
    id: 'curious',
    label: 'Curious',
    emoji: '🔍',
    color: '#4ee6aa',
    gradient: 'from-surface-container-lowest via-tertiary/25 to-surface-container-high',
    icon: 'all_inclusive',
    description: 'Seeking new frequencies',
    percentage: 21,
  },
  {
    id: 'excited',
    label: 'Excited',
    emoji: '⚡',
    color: '#c4e7ff',
    gradient: 'from-primary-container/40 via-surface-container to-surface-container-lowest',
    icon: 'bolt',
    description: 'High radiance, electric pulse',
    percentage: 23,
  },
  {
    id: 'restless',
    label: 'Restless',
    emoji: '🌪️',
    color: '#ffb2b9',
    gradient: 'from-surface-container-high/80',
    icon: 'grain',
    description: 'Churning, searching, moving',
    percentage: 18,
  },
];

export function getMood(id: MoodType): Mood | undefined {
  return moods.find(m => m.id === id);
}