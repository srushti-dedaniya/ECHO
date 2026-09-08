import type { Echo } from '../types/echo';
import type { MoodType } from '../types/mood';

export const mockEchoes: Echo[] = [
  {
    id: 'echo-1',
    type: 'thought',
    content: 'Mumbai rain feels different tonight. The Arabian Sea is loud. Salt and asphalt.',
    mood: 'nostalgic',
    scope: 'universe',
    lifespan: '3h',
    createdAt: Date.now() - 3600000,
    expiresAt: Date.now() + 7200000,
    authorId: 'user-104',
    resonance: { resonate: 128, signal: 84, hold: 62, ripple: 95 },
    location: { lat: 18.9219, lng: 72.8343, label: 'Marine Drive, Mumbai' },
  },
  {
    id: 'echo-2',
    type: 'visual',
    content: 'Can\'t sleep either. Staring at ceiling shadows while ambient hums play softly.',
    mood: 'calm',
    scope: 'universe',
    lifespan: '3h',
    createdAt: Date.now() - 1800000,
    expiresAt: Date.now() + 9000000,
    authorId: 'user-42',
    resonance: { resonate: 87, signal: 45, hold: 112, ripple: 34 },
    location: { lat: 52.5200, lng: 13.4050, label: 'Berlin' },
  },
  {
    id: 'echo-3',
    type: 'question',
    content: 'Anyone else scared about the future? Placement anxiety hitting different at 3 AM.',
    mood: 'heavy',
    scope: 'students',
    lifespan: '24h',
    createdAt: Date.now() - 7200000,
    expiresAt: Date.now() + 79200000,
    authorId: 'user-91',
    resonance: { resonate: 234, signal: 156, hold: 301, ripple: 89 },
    location: { lat: 19.0760, lng: 72.8777, label: 'Mumbai' },
  },
  {
    id: 'echo-4',
    type: 'sound',
    content: 'Songs that feel like 2 AM. Iktara (Rain Rework) on loop.',
    mood: 'nostalgic',
    scope: 'universe',
    lifespan: '3h',
    createdAt: Date.now() - 900000,
    expiresAt: Date.now() + 9900000,
    authorId: 'user-881',
    resonance: { resonate: 412, signal: 203, hold: 187, ripple: 267 },
    location: { lat: 19.0596, lng: 72.8295, label: 'Bandra, Mumbai' },
  },
  {
    id: 'echo-5',
    type: 'place',
    content: 'First day of college. The energy is electric. So many new orbits intersecting.',
    mood: 'excited',
    scope: 'local',
    lifespan: '30m',
    createdAt: Date.now() - 60000,
    expiresAt: Date.now() + 1740000,
    authorId: 'user-19',
    resonance: { resonate: 56, signal: 34, hold: 23, ripple: 67 },
    location: { lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
  },
  {
    id: 'echo-6',
    type: 'visual',
    content: 'Sunday morning coffee & vinyl. The crackle of needle on wax, sunlight warming parquet.',
    mood: 'calm',
    scope: 'universe',
    lifespan: 'dawn',
    createdAt: Date.now() - 14400000,
    expiresAt: Date.now() + 43200000,
    authorId: 'user-17',
    resonance: { resonate: 203, signal: 89, hold: 156, ripple: 78 },
    location: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
  },
];

export function getEchoesByMood(mood: MoodType): Echo[] {
  return mockEchoes.filter(e => e.mood === mood);
}

export function getActiveEchoes(): Echo[] {
  const now = Date.now();
  return mockEchoes.filter(e => e.expiresAt > now);
}