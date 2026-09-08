export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  alias: string;
  avatarColor: string;
  avatar?: string;
  currentMood?: MoodType;
  currentIntent?: IntentType;
  trail: TrailEcho[];
  constellations: Constellation[];
  preferences: UserPreferences;
  createdAt: number;
  lastActive: number;
}

export type MoodType = 'calm' | 'nostalgic' | 'heavy' | 'curious' | 'excited' | 'restless';

export type IntentType = 'understanding' | 'perspective' | 'vibe' | 'now';

export interface TrailEcho {
  id: string;
  echoId: string;
  type: 'released' | 'resonated' | 'signaled' | 'held' | 'rippled';
  timestamp: number;
  roomId?: string;
}

export interface Constellation {
  id: string;
  name: string;
  mood: MoodType;
  intent: IntentType;
  nodes: ConstellationNode[];
  alignmentFactor: number;
  createdAt: number;
}

export interface ConstellationNode {
  id: string;
  userId: string;
  alias: string;
  mood: MoodType;
  resonance: number;
  position: { x: number; y: number; z: number };
}

export interface UserPreferences {
  audioEnabled: boolean;
  hapticsEnabled: boolean;
  reducedMotion: boolean;
  theme: 'dark' | 'auto';
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  resonance: boolean;
  newEchoInConstellation: boolean;
  lifespanExpiring: boolean;
  weeklyTelemetry: boolean;
}