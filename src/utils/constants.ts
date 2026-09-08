export const ECHO_CONSTANTS = {
  MAX_ECHO_LENGTH: 420,
  MAX_MEDIA_FILES: 5,
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  SUPPORTED_AUDIO_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4'],
  SUPPORTED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/quicktime'],
  DEFAULT_LIFESPAN: '3h',
  DEFAULT_SCOPE: 'universe',
  BASE_FREQUENCY: 432.08,
  RESONANCE_DECAY_RATE: 0.04,
} as const;

export const REACTION_TYPES = ['resonate', 'signal', 'hold', 'ripple'] as const;
export type ReactionType = typeof REACTION_TYPES[number];

export const MOOD_TYPES = ['calm', 'nostalgic', 'heavy', 'curious', 'excited', 'restless'] as const;
export type MoodType = typeof MOOD_TYPES[number];

export const INTENT_TYPES = ['understanding', 'perspective', 'vibe', 'now'] as const;
export type IntentType = typeof INTENT_TYPES[number];

export const LIFESPAN_TYPES = ['30m', '3h', '24h', 'dawn'] as const;
export type LifespanType = typeof LIFESPAN_TYPES[number];

export const SCOPE_TYPES = ['universe', 'local', 'students', 'anon'] as const;
export type ScopeType = typeof SCOPE_TYPES[number];