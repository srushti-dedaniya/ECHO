import type { Echo, MoodType, LifespanType, ScopeType } from '../types/echo';
import { generateId } from './helpers';


const thoughtTemplates = [
  "The rain tonight feels different. Like the city is breathing with me.",
  "Can't sleep. The weight of tomorrow presses against my ribs.",
  "Someone once told me nostalgia is just grief with better lighting.",
  "First day. New city. The anxiety is electric but so is the possibility.",
  "This song at 2 AM hits different. Every lyric feels written for this exact moment.",
  "Watching raindrops race down the window. Simple things.",
  "The space between who I was and who I'm becoming feels infinite tonight.",
  "Coffee steam rising like prayers. Sunday morning rituals.",
  "Code compiling. Heart racing. This might actually work.",
  "Why does the moon look the same from every city but feel different?",
];

const questionTemplates = [
  "What's the one memory that never fails to ground you?",
  "If you could send a message to your past self, what would it say?",
  "What does 'home' feel like when you're far from it?",
  "Which song holds a version of you that no longer exists?",
  "What would you do if you knew you couldn't fail?",
];

const placeTemplates = [
  "Marine Drive, Mumbai - where the sea meets the city's heartbeat",
  "A quiet café in Bandra, steam rising from chai cups",
  "Berlin U-Bahn at midnight, fluorescent lights and tired eyes",
  "Tokyo convenience store at 3 AM, onigiri and existential thoughts",
  "Bangalore startup garage, whiteboards covered in dreams",
  "Parisian rooftop at dawn, the city waking up below",
];

function getRandomMood(): MoodType {
  const moodIds: MoodType[] = ['calm', 'nostalgic', 'heavy', 'curious', 'excited', 'restless'];
  return moodIds[Math.floor(Math.random() * moodIds.length)];
}

function getRandomLifespan(): LifespanType {
  const lifespans: LifespanType[] = ['30m', '3h', '24h', 'dawn'];
  return lifespans[Math.floor(Math.random() * lifespans.length)];
}

function getRandomScope(): ScopeType {
  const scopes: ScopeType[] = ['universe', 'local', 'students', 'anon'];
  return scopes[Math.floor(Math.random() * scopes.length)];
}

function getRandomType(): Echo['type'] {
  const types: Echo['type'][] = ['thought', 'visual', 'sound', 'place', 'now', 'question'];
  return types[Math.floor(Math.random() * types.length)];
}

export function generateEcho(overrides: Partial<Echo> = {}): Echo {
  const type = overrides.type || getRandomType();
  const mood = overrides.mood || getRandomMood();
  
  let content = overrides.content;
  if (!content) {
    switch (type) {
      case 'thought':
        content = thoughtTemplates[Math.floor(Math.random() * thoughtTemplates.length)];
        break;
      case 'question':
        content = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
        break;
      case 'place':
        content = placeTemplates[Math.floor(Math.random() * placeTemplates.length)];
        break;
      default:
        content = thoughtTemplates[Math.floor(Math.random() * thoughtTemplates.length)];
    }
  }

  const now = Date.now();
  const lifespan = overrides.lifespan || getRandomLifespan();
  const lifespanMs = getLifespanMs(lifespan);

  return {
    id: generateId('echo'),
    type,
    content,
    mood,
    scope: overrides.scope || getRandomScope(),
    lifespan,
    createdAt: now,
    expiresAt: now + lifespanMs,
    authorId: generateId('user'),
    resonance: {
      resonate: Math.floor(Math.random() * 200),
      signal: Math.floor(Math.random() * 150),
      hold: Math.floor(Math.random() * 100),
      ripple: Math.floor(Math.random() * 200),
    },
    location: overrides.location,
    ...overrides,
  };
}

function getLifespanMs(lifespan: LifespanType): number {
  const map: Record<LifespanType, number> = {
    '30m': 30 * 60 * 1000,
    '3h': 3 * 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    'dawn': 5.5 * 60 * 60 * 1000,
  };
  return map[lifespan];
}

export function generateEchoBatch(count: number): Echo[] {
  return Array.from({ length: count }, () => generateEcho());
}

export function getActiveEchoes(echoes: Echo[]): Echo[] {
  const now = Date.now();
  return echoes.filter(e => e.expiresAt > now);
}

export function getEchoesByMood(echoes: Echo[], mood: MoodType): Echo[] {
  return echoes.filter(e => e.mood === mood);
}

export function getEchoesByType(echoes: Echo[], type: Echo['type']): Echo[] {
  return echoes.filter(e => e.type === type);
}

export function getResonantEchoes(echoes: Echo[], minResonance = 50): Echo[] {
  return echoes.filter(e => 
    e.resonance.resonate + e.resonance.signal + e.resonance.hold + e.resonance.ripple >= minResonance
  );
}