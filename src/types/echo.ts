export interface Echo {
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

export type ScopeType = 'universe' | 'local' | 'students' | 'anon';

export interface ResonanceCounts {
  resonate: number;
  signal: number;
  hold: number;
  ripple: number;
}

export interface EchoRoom {
  id: string;
  title: string;
  mood: MoodType;
  echo: Echo;
  participants: Participant[];
  contributions: Contribution[];
  lifespan: { remaining: number; total: number };
  audioTrack?: AudioTrack;
}

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  alias: string;
  mood: MoodType;
  joinedAt: number;
  resonance: ResonanceCounts;
}

export interface Contribution {
  id: string;
  echoRoomId: string;
  authorId: string;
  type: 'photo' | 'thought' | 'voice' | 'music';
  content: string;
  media?: MediaAttachment;
  createdAt: number;
  resonance: ResonanceCounts;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  waveform: number[];
  duration: number;
  contributors: string[];
}