import { useEcho } from '../context/EchoContext';
import type { Echo } from '../types/echo';

export function useEchoRoom(echoId: string) {
  const { activeEchoes, currentRoom, setCurrentRoom, updateResonance } = useEcho();
  const echo = activeEchoes.find(e => e.id === echoId) || currentRoom?.echo;

  const handleResonate = () => {
    if (echo) updateResonance(echo.id, 'resonate', 1);
  };

  const handleSignal = () => {
    if (echo) updateResonance(echo.id, 'signal', 1);
  };

  const handleHold = () => {
    if (echo) updateResonance(echo.id, 'hold', 1);
  };

  const handleRipple = () => {
    if (echo) updateResonance(echo.id, 'ripple', 1);
  };

  return {
    echo,
    currentRoom,
    setCurrentRoom,
    handleResonate,
    handleSignal,
    handleHold,
    handleRipple,
  };
}

export function useMyEchoes() {
  const { myEchoes, addMyEcho, addEcho } = useEcho();

  const releaseEcho = (echo: Omit<Echo, 'id' | 'createdAt' | 'expiresAt' | 'authorId' | 'resonance'>) => {
    const newEcho: Echo = {
      ...echo,
      id: `echo-${Date.now()}`,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3 * 60 * 60 * 1000,
      authorId: 'current-user',
      resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 },
    };
    addMyEcho(newEcho);
    addEcho(newEcho);
    return newEcho;
  };

  return {
    myEchoes,
    releaseEcho,
  };
}

export function useEchoFeed(mood?: string, limit = 20) {
  const { activeEchoes } = useEcho();
  
  const filtered = mood && mood !== 'all'
    ? activeEchoes.filter(e => e.mood === mood)
    : activeEchoes;

  return filtered.slice(0, limit);
}