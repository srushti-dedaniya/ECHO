import type { Echo } from '../types/echo';

export const DEMO_ECHOES: Echo[] = [
  {
    id: 'demo-echo-1',
    type: 'thought',
    content: 'Mumbai rain feels different tonight. The Arabian Sea is loud. Salt and asphalt.',
    mood: 'nostalgic',
    scope: 'universe',
    lifespan: '3h',
    createdAt: Date.now() - 3600000,
    expiresAt: Date.now() + 7200000,
    authorId: 'demo-user-1',
    resonance: { resonate: 128, signal: 84, hold: 62, ripple: 95 },
    location: { lat: 18.9219, lng: 72.8343, label: 'Marine Drive, Mumbai' },
  },
  {
    id: 'demo-echo-2',
    type: 'visual',
    content: 'Can\'t sleep either. Staring at ceiling shadows while ambient hums play softly.',
    mood: 'calm',
    scope: 'universe',
    lifespan: '3h',
    createdAt: Date.now() - 1800000,
    expiresAt: Date.now() + 9000000,
    authorId: 'demo-user-2',
    resonance: { resonate: 87, signal: 45, hold: 112, ripple: 34 },
    location: { lat: 52.5200, lng: 13.4050, label: 'Berlin' },
  },
  {
    id: 'demo-echo-3',
    type: 'question',
    content: 'Anyone else scared about the future? Placement anxiety hitting different at 3 AM.',
    mood: 'heavy',
    scope: 'students',
    lifespan: '24h',
    createdAt: Date.now() - 7200000,
    expiresAt: Date.now() + 79200000,
    authorId: 'demo-user-3',
    resonance: { resonate: 234, signal: 156, hold: 301, ripple: 89 },
    location: { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
  },
  {
    id: 'demo-echo-4',
    type: 'sound',
    content: 'Songs that feel like 2 AM. Iktara (Rain Rework) on loop.',
    mood: 'nostalgic',
    scope: 'universe',
    lifespan: '3h',
    createdAt: Date.now() - 900000,
    expiresAt: Date.now() + 9900000,
    authorId: 'demo-user-4',
    resonance: { resonate: 412, signal: 203, hold: 187, ripple: 267 },
    location: { lat: 19.0596, lng: 72.8295, label: 'Bandra, Mumbai' },
  },
  {
    id: 'demo-echo-5',
    type: 'place',
    content: 'First day of college. The energy is electric. So many new orbits intersecting.',
    mood: 'excited',
    scope: 'local',
    lifespan: '30m',
    createdAt: Date.now() - 60000,
    expiresAt: Date.now() + 1740000,
    authorId: 'demo-user-5',
    resonance: { resonate: 56, signal: 34, hold: 23, ripple: 67 },
    location: { lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
  },
  {
    id: 'demo-echo-6',
    type: 'visual',
    content: 'Sunday morning coffee & vinyl. The crackle of needle on wax, sunlight warming parquet.',
    mood: 'calm',
    scope: 'universe',
    lifespan: 'dawn',
    createdAt: Date.now() - 14400000,
    expiresAt: Date.now() + 43200000,
    authorId: 'demo-user-6',
    resonance: { resonate: 203, signal: 89, hold: 156, ripple: 78 },
    location: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  },
];

export const DEMO_CONTRIBUTIONS: Record<string, Array<{
  id: string;
  echoRoomId: string;
  authorId: string;
  type: 'photo' | 'thought' | 'voice' | 'music';
  content: string;
  createdAt: number;
  resonance: { resonate: number; signal: number; hold: number; ripple: number };
}>> = {
  'demo-echo-1': [
    {
      id: 'contrib-1',
      echoRoomId: 'demo-echo-1',
      authorId: 'soul-1',
      type: 'thought',
      content: 'The monsoon always brings back memories of college nights at Marine Drive.',
      createdAt: Date.now() - 1800000,
      resonance: { resonate: 12, signal: 3, hold: 8, ripple: 5 },
    },
    {
      id: 'contrib-2',
      echoRoomId: 'demo-echo-1',
      authorId: 'soul-2',
      type: 'photo',
      content: 'Marine Drive at 2 AM',
      createdAt: Date.now() - 900000,
      resonance: { resonate: 24, signal: 8, hold: 15, ripple: 12 },
    },
  ],
  'demo-echo-2': [
    {
      id: 'contrib-3',
      echoRoomId: 'demo-echo-2',
      authorId: 'soul-3',
      type: 'thought',
      content: 'Same here. The city never really sleeps, does it?',
      createdAt: Date.now() - 1200000,
      resonance: { resonate: 8, signal: 2, hold: 5, ripple: 3 },
    },
  ],
  'demo-echo-3': [
    {
      id: 'contrib-4',
      echoRoomId: 'demo-echo-3',
      authorId: 'soul-4',
      type: 'thought',
      content: 'You\'re not alone. This phase passes. Trust the process.',
      createdAt: Date.now() - 3600000,
      resonance: { resonate: 45, signal: 12, hold: 28, ripple: 18 },
    },
    {
      id: 'contrib-5',
      echoRoomId: 'demo-echo-3',
      authorId: 'soul-5',
      type: 'voice',
      content: 'Voice message of support',
      createdAt: Date.now() - 1800000,
      resonance: { resonate: 32, signal: 15, hold: 22, ripple: 10 },
    },
  ],
  'demo-echo-4': [
    {
      id: 'contrib-6',
      echoRoomId: 'demo-echo-4',
      authorId: 'soul-6',
      type: 'music',
      content: 'Rain Rework playlist',
      createdAt: Date.now() - 2400000,
      resonance: { resonate: 56, signal: 23, hold: 34, ripple: 19 },
    },
  ],
  'demo-echo-5': [
    {
      id: 'contrib-7',
      echoRoomId: 'demo-echo-5',
      authorId: 'soul-7',
      type: 'thought',
      content: 'Welcome to the adventure! The first day jitters are the best part.',
      createdAt: Date.now() - 30000,
      resonance: { resonate: 12, signal: 5, hold: 8, ripple: 6 },
    },
  ],
  'demo-echo-6': [
    {
      id: 'contrib-8',
      echoRoomId: 'demo-echo-6',
      authorId: 'soul-8',
      type: 'photo',
      content: 'My morning setup ☕️🎵',
      createdAt: Date.now() - 7200000,
      resonance: { resonate: 18, signal: 7, hold: 12, ripple: 5 },
    },
  ],
};

export function setupDemoMode(): void {
  // Set up demo user
  const demoUser = {
    id: 'demo-user-1',
    name: 'Demo Explorer',
    username: 'demo_explorer',
    email: 'demo@echo.universe',
    alias: 'Demo Soul #0001',
    avatarColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    currentMood: 'nostalgic',
    currentIntent: 'understanding',
    trail: [],
    constellations: [],
    preferences: {
      audioEnabled: true,
      hapticsEnabled: true,
      reducedMotion: false,
      theme: 'dark',
      notifications: {
        resonance: true,
        newEchoInConstellation: true,
        lifespanExpiring: true,
        weeklyTelemetry: false,
      },
    },
    createdAt: Date.now() - 86400000,
    lastActive: Date.now(),
  };
  localStorage.setItem('echo-auth-user', JSON.stringify(demoUser));
  localStorage.setItem('echo-user', JSON.stringify(demoUser));

  // Set up demo echoes
  localStorage.setItem('echo-custom-echoes', JSON.stringify([]));
  
  // Set up demo contributions
  Object.entries(DEMO_CONTRIBUTIONS).forEach(([echoId, contributions]) => {
    localStorage.setItem(`echo-room-contribs-${echoId}`, JSON.stringify(contributions));
  });

  // Mark onboarding as complete
  localStorage.setItem('echo-onboarded', 'true');
  localStorage.setItem('echo-has-seen-universe-guide', 'true');
}

export function isDemoMode(): boolean {
  const user = localStorage.getItem('echo-auth-user');
  if (!user) return false;
  try {
    const parsed = JSON.parse(user);
    return parsed.id === 'demo-user-1' || parsed.email === 'demo@echo.universe';
  } catch {
    return false;
  }
}

export function clearDemoMode(): void {
  localStorage.removeItem('echo-auth-user');
  localStorage.removeItem('echo-user');
  localStorage.removeItem('echo-custom-echoes');
  localStorage.removeItem('echo-my-created-echoes');
  localStorage.removeItem('echo-onboarded');
  localStorage.removeItem('echo-mood');
  localStorage.removeItem('echo-intent');
  localStorage.removeItem('echo-has-seen-universe-guide');
  Object.keys(DEMO_CONTRIBUTIONS).forEach(echoId => {
    localStorage.removeItem(`echo-room-contribs-${echoId}`);
  });
}