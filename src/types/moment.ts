export interface Moment {
  id: string;
  type: 'thought' | 'visual' | 'sound' | 'place' | 'now' | 'question';
  content: string;
  media?: MediaAttachment[];
  mood: MoodType;
  scope: 'universe' | 'local' | 'students' | 'anon';
  lifespan: LifespanType;
  createdAt: number;
  expiresAt: number;
  authorId: string;
  resonance: ResonanceCounts;
  location?: GeoLocation;
}

export interface MediaAttachment {
  id: string;
  type: 'image' | 'audio' | 'video';
  url: string;
  thumbnail?: string;
  duration?: number;
  waveform?: number[];
}

export interface GeoLocation {
  lat: number;
  lng: number;
  label: string;
  radius?: number;
}

export type MoodType = 'calm' | 'nostalgic' | 'heavy' | 'curious' | 'excited' | 'restless';

export type LifespanType = '30m' | '3h' | '24h' | 'dawn';

export interface ResonanceCounts {
  resonate: number;
  signal: number;
  hold: number;
  ripple: number;
}