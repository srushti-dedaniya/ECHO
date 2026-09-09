import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEcho } from '../../context/EchoContext';
import { useUser } from '../../context/UserContext';
import { moods } from '../../types/mood';
import { globalTelemetry, socialWeather } from '../../data/socialWeather';
import { safeGetItem, safeSetItem } from '../../utils/safeStorage';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

interface UniverseConsoleProps {
  onOrbSelect?: (echoId: string) => void;
}

export function UniverseConsole({ onOrbSelect }: UniverseConsoleProps) {
  const { activeEchoes } = useEcho();
  const { user } = useUser();
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeTab, setActiveTab] = useState<'live' | 'mood' | 'signal'>('live');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedEchoId, setSelectedEchoId] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([null, null, null]);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const liveEchoes = useMemo(() => activeEchoes.filter(e => e.expiresAt > Date.now()).slice(0, 5), [activeEchoes]);
  const totalResonance = useMemo(() => 
    activeEchoes.reduce((sum, e) => sum + e.resonance.resonate + e.resonance.signal + e.resonance.hold + e.resonance.ripple, 0),
    [activeEchoes]
  );
  const userMood = user?.currentMood || 'nostalgic';
  const userIntent = user?.currentIntent || 'understanding';

  useEffect(() => {
    const savedPos = safeGetItem<{x: number; y: number}>('universeConsolePosition', { x: 0, y: 0 });
    const savedMin = safeGetItem<boolean>('universeConsoleMinimized', false);
    const savedHidden = safeGetItem<boolean>('universeConsoleHidden', false);
    
    if (savedPos.x || savedPos.y) {
      setPosition(savedPos);
    }
    setIsMinimized(savedMin);
    setIsHidden(savedHidden);
    
    if ((!savedPos.x && !savedPos.y) && !isMobile) {
      setPosition({ x: window.innerWidth - 380, y: 24 });
    } else if ((!savedPos.x && !savedPos.y) && isMobile) {
      setPosition({ x: 16, y: window.innerHeight - 400 });
    }
    setHasInitialized(true);
  }, [isMobile]);

  useEffect(() => {
    if (hasInitialized) {
      safeSetItem('universeConsolePosition', position);
    }
  }, [position, hasInitialized]);

  useEffect(() => {
    if (hasInitialized) {
      safeSetItem('universeConsoleMinimized', isMinimized);
    }
  }, [isMinimized, hasInitialized]);

  useEffect(() => {
    if (hasInitialized) {
      safeSetItem('universeConsoleHidden', isHidden);
    }
  }, [isHidden, hasInitialized]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, tab: 'live' | 'mood' | 'signal') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
      setSelectedEchoId(null);
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    if ((e.target as HTMLElement).closest('.console-handle')) {
      setIsDragging(true);
      const rect = consoleRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
      e.preventDefault();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e: MouseEvent) => {
      if (!isDragging || !consoleRef.current) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const panelWidth = isMinimized ? 220 : 360;
      const panelHeight = isMinimized ? 56 : 480;
      const maxX = window.innerWidth - panelWidth - 16;
      const maxY = window.innerHeight - panelHeight - 16;
      setPosition({
        x: Math.max(16, Math.min(newX, maxX)),
        y: Math.max(16, Math.min(newY, maxY)),
      });
    };
    const handleUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDragging, dragOffset, isMinimized, isMobile]);

  const handleTabClick = useCallback((tab: 'live' | 'mood' | 'signal') => {
    setActiveTab(tab);
    setSelectedEchoId(null);
  }, []);

  const handleEchoClick = useCallback((echoId: string) => {
    setSelectedEchoId(selectedEchoId === echoId ? null : echoId);
    if (onOrbSelect) onOrbSelect(echoId);
  }, [onOrbSelect, selectedEchoId]);

  const handleMoodClick = useCallback((moodId: string) => {
    setActiveTab('mood');
    if (onOrbSelect) onOrbSelect(`mood-${moodId}`);
  }, [onOrbSelect]);

  if (isHidden) {
    return (
      <AnimatePresence>
        <motion.button
          key="reopen"
          onClick={() => setIsHidden(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed z-[9999] bottom-6 right-6 w-14 h-14 rounded-full bg-surface-container-lowest/90 backdrop-blur-3xl border border-outline/20 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex items-center justify-center cursor-pointer"
          animate={{ 
            scale: [1, 1.05, 1], 
            boxShadow: ['0 0 30px rgba(56,189,248,0.3)', '0 0 50px rgba(56,189,248,0.6)', '0 0 30px rgba(56,189,248,0.3)'] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          type="button"
          aria-label="Open Universe Console"
        >
          <span className="material-symbols-outlined text-primary text-[24px]">dashboard_customize</span>
          <motion.div className="absolute inset-0 rounded-full border border-primary/30" animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.span 
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest/90 backdrop-blur-xl px-2 py-1 rounded-md shadow-lg border border-outline/20 opacity-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Open Universe Console
          </motion.span>
        </motion.button>
      </AnimatePresence>
    );
  }

  if (isMinimized) {
    const liveCount = liveEchoes.length;
    return (
      <motion.div
        ref={consoleRef}
        style={{ left: position.x, top: position.y }}
        className="fixed z-[9999] pointer-events-auto"
      >
        <AnimatePresence>
          <motion.button
            key="minimized"
            onClick={() => setIsMinimized(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseDown={handleMouseDown}
            className="console-handle flex items-center gap-3 px-4 py-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-3xl border border-outline/20 shadow-[0_0_40px_rgba(0,0,0,0.9)] cursor-move select-none"
            type="button"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-tertiary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">ECHO CONSOLE</span>
            <span className="font-label-md text-label-md text-on-surface font-mono tabular-nums">{liveCount}</span>
            <span className="material-symbols-outlined text-tertiary text-[16px] animate-pulse">radio_button_checked</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[16px]">open_in_full</span>
          </motion.button>
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={consoleRef}
      style={{ left: isMobile ? 16 : position.x, top: isMobile ? undefined : position.y, bottom: isMobile ? 16 : undefined, right: isMobile ? 16 : undefined }}
      className={`fixed z-[9999] pointer-events-auto transition-none ${isMobile ? 'max-h-[75vh] w-full max-w-md' : ''}`}
    >
      <AnimatePresence>
        <motion.div
          key="expanded"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className={`w-[360px] bg-surface-container-lowest/95 backdrop-blur-3xl rounded-2xl border border-outline/20 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden ${isMobile ? 'w-full max-w-md rounded-t-2xl' : ''}`}
        >
          <div 
            ref={headerRef}
            className="console-handle flex items-center justify-between px-4 py-3 bg-surface-container-low/80 backdrop-blur-xl border-b border-outline/10 cursor-move select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">dashboard_customize</span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">UNIVERSE CONSOLE</span>
              <motion.div
                className="w-2 h-2 rounded-full bg-tertiary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(true)}
                className="p-1.5 rounded-full hover:bg-surface-container-highest transition-colors"
                type="button"
                aria-label="Minimize console"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">minimize</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsHidden(true)}
                className="p-1.5 rounded-full hover:bg-surface-container-highest transition-colors"
                type="button"
                aria-label="Hide console"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">close</span>
              </motion.button>
            </div>
          </div>

          <div className="flex border-b border-outline/10" role="tablist" aria-label="Universe Console tabs">
            {(['live', 'mood', 'signal'] as const).map((tab, index) => (
              <motion.button
                key={tab}
                ref={(el) => { tabRefs.current[index] = el; }}
                onClick={() => handleTabClick(tab)}
                onKeyDown={(e) => handleKeyDown(e, tab)}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-3 py-2.5 text-center font-label-sm text-label-sm uppercase tracking-wider transition-colors relative ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`panel-${tab}`}
                id={`tab-${tab}`}
              >
                {tab.toUpperCase()}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  initial={{ width: 0 }}
                  animate={{ width: activeTab === tab ? '80%' : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-4 max-h-[400px] overflow-y-auto"
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
            >
              {activeTab === 'live' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">HAPPENING NOW</span>
                    <span className="font-label-sm text-xs text-on-surface-variant">{liveEchoes.length} LIVE</span>
                  </div>
                  {liveEchoes.length === 0 ? (
                    <div className="text-center py-8 text-on-surface-variant font-body-sm">
                      No active moments right now
                    </div>
                  ) : (
                    liveEchoes.map((echo) => {
                      const mood = moodConfig[echo.mood];
                      const total = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;
                      const isSelected = selectedEchoId === echo.id;
                      return (
                        <motion.button
                          key={echo.id}
                          onClick={() => handleEchoClick(echo.id)}
                          whileHover={{ scale: isSelected ? 1 : 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className={`group relative flex items-start gap-3 p-3 rounded-xl transition-all ${
                            isSelected
                              ? 'bg-primary-container/20 border border-primary/30 shadow-[0_0_20px_rgba(56,189,248,0.15)]'
                              : 'bg-surface-container-low/60 hover:bg-surface-container/80 border border-outline/10'
                          }`}
                          type="button"
                        >
                          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${mood?.color}20, ${mood?.color}40)` }}>
                            <span className="text-lg">{mood?.emoji}</span>
                            {isSelected && (
                              <motion.div className="absolute inset-0 rounded-xl border-2" style={{ borderColor: 'var(--color-primary)' }} animate={{ boxShadow: ['0 0 0 rgba(56,189,248,0.4)', '0 0 12px rgba(56,189,248,0.8)'] }} transition={{ duration: 1, repeat: Infinity }} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-body-sm text-body-sm text-on-surface mb-1 line-clamp-2">{echo.content}</p>
                            <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: mood?.color }} />
                                <span>{total} experiencing</span>
                              </span>
                              <span className="capitalize" style={{ color: mood?.color }}>{echo.mood}</span>
                            </div>
                          </div>
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: isSelected ? 1 : 0, x: isSelected ? 0 : 10 }}
                            className="flex items-center gap-1 text-primary font-label-sm text-xs opacity-0"
                          >
                            <span>ENTER</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </motion.div>
                        </motion.button>
                      );
                    })
                  )}
                </div>
              )}

              {activeTab === 'mood' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">THE WORLD FEELS...</span>
                  </div>
                  <div className="space-y-3">
                    {socialWeather.map((data) => {
                      const mood = moodConfig[data.mood];
                      return (
                        <motion.button
                          key={data.mood}
                          onClick={() => handleMoodClick(data.mood)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="group cursor-pointer p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container/80 border border-outline/10 transition-all text-left"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{mood?.emoji}</span>
                              <span className="font-body-sm text-body-sm text-on-surface capitalize">{data.mood}</span>
                            </div>
                            <span className="font-headline-sm text-[13px]" style={{ color: mood?.color }}>{data.percentage}%</span>
                          </div>
                          <div className="h-2 bg-surface-container-highest/50 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: mood?.color, width: 0 }}
                              initial={{ width: 0 }}
                              animate={{ width: `${data.percentage}%` }}
                              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                            />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="pt-3 border-t border-outline/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">RESONANCE DRIFT</span>
                      <span className="font-label-md text-label-md text-tertiary tabular-nums">+{globalTelemetry.resonanceDrift}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>{globalTelemetry.baseFrequency} Hz</span>
                      <span className="text-tertiary font-mono">QUANTUM SYNC 99.4%</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'signal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-surface-container-low/60 border border-outline/10">
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">LIVE ECHOES</p>
                      <p className="font-headline-md text-headline-md text-on-surface mt-1 tabular-nums">{liveEchoes.length}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low/60 border border-outline/10">
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">TOTAL RESONANCE</p>
                      <p className="font-headline-md text-headline-md text-on-surface mt-1 tabular-nums">{totalResonance.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low/60 border border-outline/10">
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">YOUR MOOD</p>
                      <p className="font-headline-sm text-headline-sm text-on-surface mt-1 capitalize">{userMood}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-low/60 border border-outline/10">
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">YOUR INTENT</p>
                      <p className="font-headline-sm text-headline-sm text-on-surface mt-1 capitalize">{userIntent}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-outline/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">REALTIME SIGNAL</span>
                      <span className="font-label-md text-label-md text-tertiary tabular-nums">{globalTelemetry.baseFrequency} Hz</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        animate={{ width: [0, '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                    <p className="font-label-sm text-xs text-on-surface-variant mt-2 text-center">QUANTUM SYNC 99.4%</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}