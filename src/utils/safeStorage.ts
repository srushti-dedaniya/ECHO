export function safeGetItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  
  try {
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

export function safeSetItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail - quota exceeded or other storage error
  }
}

export function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch {
    // Silently fail
  }
}

export function safeParseJSON<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

export function safeArray<T>(value: unknown, fallback: T[] = []): T[] {
  if (Array.isArray(value)) return value as T[];
  return fallback;
}

export function safeObject<T extends Record<string, unknown>>(value: unknown, fallback: T): T {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }
  return fallback;
}

export function safeObjectOrNull<T extends Record<string, unknown>>(value: unknown, fallback: T | null = null): T | null {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }
  return fallback;
}

export function safeObjectOrUndefined<T extends Record<string, unknown>>(value: unknown): T | undefined {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as T;
  }
  return undefined;
}

export function safeNumber(value: unknown, fallback = 0): number {
  const num = Number(value);
  return Number.isNaN(num) ? fallback : num;
}

export function safeString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function safeBoolean(value: unknown, fallback = false): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

export interface ValidatedEcho {
  id: string;
  type: 'thought' | 'visual' | 'sound' | 'place' | 'now' | 'question';
  content: string;
  media?: Array<{ id: string; type: 'image' | 'audio' | 'video'; url: string; thumbnail?: string }>;
  mood: 'calm' | 'nostalgic' | 'heavy' | 'curious' | 'excited' | 'restless';
  scope: 'universe' | 'local' | 'students' | 'anon';
  lifespan: '30m' | '3h' | '24h' | 'dawn';
  createdAt: number;
  expiresAt: number;
  authorId: string;
  resonance: { resonate: number; signal: number; hold: number; ripple: number };
  location?: { lat: number; lng: number; label: string; radius?: number };
}

export function validateEcho(data: unknown): ValidatedEcho | null {
  const obj = safeObjectOrNull(data, null);
  if (!obj) return null;

  const validTypes = ['thought', 'visual', 'sound', 'place', 'now', 'question'] as const;
  const validMoods = ['calm', 'nostalgic', 'heavy', 'curious', 'excited', 'restless'] as const;
  const validScopes = ['universe', 'local', 'students', 'anon'] as const;
  const validLifespans = ['30m', '3h', '24h', 'dawn'] as const;

  if (!validTypes.includes(obj.type as any)) return null;
  if (!validMoods.includes(obj.mood as any)) return null;
  if (!validScopes.includes(obj.scope as any)) return null;
  if (!validLifespans.includes(obj.lifespan as any)) return null;

  const location = safeObjectOrUndefined<{ lat: number; lng: number; label: string; radius?: number }>(obj.location);

  return {
    id: safeString(obj.id),
    type: obj.type as ValidatedEcho['type'],
    content: safeString(obj.content).slice(0, 2000),
    media: safeArray(obj.media).map(m => safeObjectOrNull(m, null)).filter(Boolean) as ValidatedEcho['media'],
    mood: obj.mood as ValidatedEcho['mood'],
    scope: obj.scope as ValidatedEcho['scope'],
    lifespan: obj.lifespan as ValidatedEcho['lifespan'],
    createdAt: safeNumber(obj.createdAt, Date.now()),
    expiresAt: safeNumber(obj.expiresAt, Date.now() + 10800000),
    authorId: safeString(obj.authorId),
    resonance: safeObject(obj.resonance, { resonate: 0, signal: 0, hold: 0, ripple: 0 }),
    location: location && location.lat && location.lng && location.label ? location : undefined,
  };
}

export function validateEchoArray(data: unknown): ValidatedEcho[] {
  const arr = safeArray(data);
  return arr.map(validateEcho).filter((e): e is ValidatedEcho => e !== null);
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

export function sanitizeUrl(url: string): string {
  try {
    // Ensure URL has a proper format for parsing
    const testUrl = url.includes('://') ? url : `https://${url}`;
    const parsed = new URL(testUrl);
    if (parsed.protocol === 'javascript:' || parsed.protocol === 'data:') {
      return '';
    }
    return parsed.toString();
  } catch {
    return '';
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, WebP, and GIF images are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image must be smaller than 5MB' };
  }

  return { valid: true };
}

export function createObjectUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeObjectUrl(url: string): void {
  URL.revokeObjectURL(url);
}