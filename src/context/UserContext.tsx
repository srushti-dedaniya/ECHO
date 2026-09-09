import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, MoodType, IntentType, UserPreferences } from '../types/user';
import { safeGetItem, safeSetItem, safeObjectOrNull } from '../utils/safeStorage';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateMood: (mood: MoodType) => void;
  updateIntent: (intent: IntentType) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updateProfile: (data: Partial<Pick<User, 'name' | 'username' | 'email' | 'alias' | 'avatarColor'>>) => void;
  addTrailEcho: (trail: User['trail'][0]) => void;
  addConstellation: (constellation: User['constellations'][0]) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultPreferences: UserPreferences = {
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
};

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

function loadStoredUser(): User | null {
  const stored = safeGetItem<string>('echo-user', '');
  if (!stored) return null;
  try {
    const parsed = JSON.parse(stored);
    return safeObjectOrNull(parsed, null) as User | null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(loadStoredUser);

  const isOnboarded = !!user;

  useEffect(() => {
    if (user) {
      safeSetItem('echo-user', user);
    }
  }, [user]);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const updateMood = (mood: MoodType) => {
    setUserState(prev => prev ? { ...prev, currentMood: mood, lastActive: Date.now() } : null);
  };

  const updateIntent = (intent: IntentType) => {
    setUserState(prev => prev ? { ...prev, currentIntent: intent, lastActive: Date.now() } : null);
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUserState(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
      lastActive: Date.now()
    } : null);
  };

  const addTrailEcho = (trail: User['trail'][0]) => {
    setUserState(prev => prev ? {
      ...prev,
      trail: [trail, ...prev.trail].slice(0, 50),
      lastActive: Date.now()
    } : null);
  };

  const addConstellation = (constellation: User['constellations'][0]) => {
    setUserState(prev => prev ? {
      ...prev,
      constellations: [constellation, ...prev.constellations],
      lastActive: Date.now()
    } : null);
  };

  const updateProfile = (data: Partial<Pick<User, 'name' | 'username' | 'email' | 'alias' | 'avatarColor'>>) => {
    setUserState(prev => prev ? {
      ...prev,
      ...data,
      lastActive: Date.now()
    } : null);
  };

  const completeOnboarding = () => {
    const newUser: User = {
      id: generateId(),
      name: 'Explorer',
      username: `explorer_${Math.floor(Math.random() * 10000)}`,
      email: `explorer${Math.floor(Math.random() * 10000)}@echo.universe`,
      alias: `Soul #${Math.floor(Math.random() * 9000) + 1000}`,
      avatarColor: 'bg-primary-container',
      currentMood: 'nostalgic',
      currentIntent: 'understanding',
      trail: [],
      constellations: [],
      preferences: defaultPreferences,
      createdAt: Date.now(),
      lastActive: Date.now(),
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      updateMood,
      updateIntent,
      updatePreferences,
      updateProfile,
      addTrailEcho,
      addConstellation,
      isOnboarded,
      completeOnboarding,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}