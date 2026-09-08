import { useState, useEffect, useCallback, useRef } from 'react';
import type { Echo } from '../types/echo';
import { mockEchoes } from '../data/echoes';

interface UseUniverseReturn {
  echoes: Echo[];
  activeEchoes: Echo[];
  filteredEchoes: Echo[];
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
  isLoading: boolean;
  refreshEchoes: () => void;
}

export function useUniverse(): UseUniverseReturn {
  const [echoes, setEchoes] = useState<Echo[]>(mockEchoes);
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  const activeEchoes = echoes.filter(e => e.expiresAt > Date.now());

  const filteredEchoes = selectedMood === 'all'
    ? activeEchoes
    : activeEchoes.filter(e => e.mood === selectedMood);

  const refreshEchoes = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setEchoes(prev => [...prev, ...mockEchoes.slice(0, 3).map(e => ({ ...e, id: `echo-${Date.now()}-${Math.random()}` }))]);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEchoes(prev => prev.map(e => ({
        ...e,
        resonance: {
          ...e.resonance,
          resonate: e.resonance.resonate + Math.floor(Math.random() * 2),
        },
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    echoes,
    activeEchoes,
    filteredEchoes,
    selectedMood,
    setSelectedMood,
    isLoading,
    refreshEchoes,
  };
}

interface UseEchoPositionReturn {
  x: number;
  y: number;
  updatePosition: (echoId: string, x: number, y: number) => void;
  getPosition: (echoId: string) => { x: number; y: number } | undefined;
}

export function useEchoPositions(): UseEchoPositionReturn {
  const positionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());

  const updatePosition = useCallback((echoId: string, x: number, y: number) => {
    positionsRef.current.set(echoId, { x, y });
  }, []);

  const getPosition = useCallback((echoId: string) => {
    return positionsRef.current.get(echoId);
  }, []);

  return {
    x: 0,
    y: 0,
    updatePosition,
    getPosition,
  };
}