import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Echo, EchoRoom, Contribution } from '../types/echo';
import { mockEchoes } from '../data/echoes';
import { safeGetItem, safeSetItem, validateEchoArray } from '../utils/safeStorage';

interface EchoContextType {
  currentRoom: EchoRoom | null;
  setCurrentRoom: (room: EchoRoom | null) => void;
  activeEchoes: Echo[];
  addEcho: (echo: Echo) => void;
  removeEcho: (id: string) => void;
  updateResonance: (echoId: string, type: keyof Echo['resonance'], delta: number) => void;
  myEchoes: Echo[];
  addMyEcho: (echo: Echo) => void;
  addContributionToRoom: (echoId: string, contribution: Contribution) => void;
  newlyCreatedEchoId: string | null;
  setNewlyCreatedEchoId: (id: string | null) => void;
}

const EchoContext = createContext<EchoContextType | undefined>(undefined);

function loadCustomEchoes(): Echo[] {
  const custom = safeGetItem<Echo[]>('echo-custom-echoes', []);
  return validateEchoArray([...custom, ...mockEchoes]);
}

function loadMyEchoes(): Echo[] {
  return validateEchoArray(safeGetItem<Echo[]>('echo-my-created-echoes', []));
}

export function EchoProvider({ children }: { children: ReactNode }) {
  const [currentRoom, setCurrentRoom] = useState<EchoRoom | null>(null);
  const [newlyCreatedEchoId, setNewlyCreatedEchoId] = useState<string | null>(null);
  
  const [activeEchoes, setActiveEchoes] = useState<Echo[]>(loadCustomEchoes);
  const [myEchoes, setMyEchoes] = useState<Echo[]>(loadMyEchoes);

  useEffect(() => {
    safeSetItem('echo-my-created-echoes', myEchoes);
  }, [myEchoes]);

  const addEcho = (echo: Echo) => {
    setActiveEchoes(prev => [echo, ...prev]);
    setMyEchoes(prev => [echo, ...prev]);
    setNewlyCreatedEchoId(echo.id);

    const custom = safeGetItem<Echo[]>('echo-custom-echoes', []);
    safeSetItem('echo-custom-echoes', [echo, ...custom]);
  };

  const removeEcho = (id: string) => {
    setActiveEchoes(prev => prev.filter(e => e.id !== id));
  };

  const updateResonance = (echoId: string, type: keyof Echo['resonance'], delta: number) => {
    setActiveEchoes(prev => prev.map(e => {
      if (e.id === echoId) {
        return { ...e, resonance: { ...e.resonance, [type]: Math.max(0, e.resonance[type] + delta) } };
      }
      return e;
    }));
    
    if (currentRoom?.echo.id === echoId) {
      setCurrentRoom(prev => prev ? {
        ...prev,
        echo: { ...prev.echo, resonance: { ...prev.echo.resonance, [type]: Math.max(0, prev.echo.resonance[type] + delta) } }
      } : null);
    }
  };

  const addMyEcho = (echo: Echo) => {
    setMyEchoes(prev => [echo, ...prev]);
  };

  const addContributionToRoom = (echoId: string, contribution: Contribution) => {
    if (currentRoom && currentRoom.echo.id === echoId) {
      const updatedContributions = [...currentRoom.contributions, contribution];
      setCurrentRoom({
        ...currentRoom,
        contributions: updatedContributions,
      });

      const storedKey = `echo-room-contribs-${echoId}`;
      const existing = safeGetItem<Contribution[]>(storedKey, []);
      safeSetItem(storedKey, [...existing, contribution]);
    }
  };

  return (
    <EchoContext.Provider value={{
      currentRoom,
      setCurrentRoom,
      activeEchoes,
      addEcho,
      removeEcho,
      updateResonance,
      myEchoes,
      addMyEcho,
      addContributionToRoom,
      newlyCreatedEchoId,
      setNewlyCreatedEchoId,
    }}>
      {children}
    </EchoContext.Provider>
  );
}

export function useEcho() {
  const context = useContext(EchoContext);
  if (!context) {
    throw new Error('useEcho must be used within an EchoProvider');
  }
  return context;
}