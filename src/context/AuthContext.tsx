import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  demoLogin: () => void;
  setUser: (user: User | null) => void;
}

interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const avatarColors = [
  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-rose-500/20 text-rose-400 border-rose-500/30',
  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'bg-amber-500/20 text-amber-400 border-amber-500/30',
];

function generateId() {
  return 'usr_' + Math.random().toString(36).substring(2, 11);
}

function getRandomAvatarColor() {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    const stored = localStorage.getItem('echo-auth-user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('echo-auth-user');
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        setUserState(null);
      }
    }
    setIsLoading(false);
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('echo-auth-user', JSON.stringify(newUser));
      localStorage.setItem('echo-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('echo-auth-user');
      localStorage.removeItem('echo-user');
    }
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const stored = localStorage.getItem('echo-registered-users');
    let usersList: any[] = [];
    if (stored) {
      try { usersList = JSON.parse(stored); } catch { usersList = []; }
    }

    const matched = usersList.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      if (password && matched.password && matched.password !== password) {
        setIsLoading(false);
        throw new Error('Incorrect password');
      }
      const userObj: User = {
        id: matched.id || generateId(),
        name: matched.name,
        username: matched.username,
        email: matched.email,
        alias: matched.alias || `Soul #${Math.floor(Math.random() * 9000) + 1000}`,
        avatarColor: matched.avatarColor || getRandomAvatarColor(),
        currentMood: matched.currentMood || 'nostalgic',
        currentIntent: matched.currentIntent || 'understanding',
        trail: matched.trail || [],
        constellations: matched.constellations || [],
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
        createdAt: matched.createdAt || Date.now(),
        lastActive: Date.now(),
      };
      setUser(userObj);
      setIsLoading(false);
      return;
    }
    
    // Fallback for mock demo user if no match found
    const newUser: User = {
      id: generateId(),
      name: email.split('@')[0] || 'Cosmic Traveler',
      username: email.split('@')[0]?.toLowerCase().replace(/[^a-z0-9_]/g, '') || 'cosmic_soul',
      email: email,
      alias: `Soul #${Math.floor(Math.random() * 9000) + 1000}`,
      avatarColor: getRandomAvatarColor(),
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
      createdAt: Date.now(),
      lastActive: Date.now(),
    };
    setUser(newUser);
    setIsLoading(false);
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    const stored = localStorage.getItem('echo-registered-users');
    let usersList: any[] = [];
    if (stored) {
      try { usersList = JSON.parse(stored); } catch { usersList = []; }
    }

    if (usersList.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      setIsLoading(false);
      throw new Error('Email is already registered');
    }
    if (usersList.some(u => u.username.toLowerCase() === data.username.toLowerCase())) {
      setIsLoading(false);
      throw new Error('Username is already taken');
    }

    const newUserObj = {
      id: generateId(),
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      alias: `Soul #${Math.floor(Math.random() * 9000) + 1000}`,
      avatarColor: getRandomAvatarColor(),
      currentMood: 'nostalgic',
      createdAt: Date.now(),
    };

    usersList.push(newUserObj);
    localStorage.setItem('echo-registered-users', JSON.stringify(usersList));

    const newUser: User = {
      id: newUserObj.id,
      name: newUserObj.name,
      username: newUserObj.username,
      email: newUserObj.email,
      alias: newUserObj.alias,
      avatarColor: newUserObj.avatarColor,
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
      createdAt: newUserObj.createdAt,
      lastActive: Date.now(),
    };

    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echo-onboarded');
    localStorage.removeItem('echo-mood');
    localStorage.removeItem('echo-intent');
    localStorage.removeItem('echo-has-seen-universe-guide');
  };

  const demoLogin = () => {
    const demoUser: User = {
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
    setUser(demoUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      demoLogin,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}