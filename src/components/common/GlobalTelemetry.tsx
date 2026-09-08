import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEcho } from '../../context/EchoContext';
import { useUser } from '../../context/UserContext';

export function GlobalTelemetry() {
  const { activeEchoes } = useEcho();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 120 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('echo-telemetry-position');
    if (saved) {
      try { setPosition(JSON.parse(saved)); } catch {}
    }
    const savedOpen = localStorage.getItem('echo-telemetry-open');
    if (savedOpen) { setIsOpen(JSON.parse(savedOpen)); }
  }, []);

  useEffect(() => {
    localStorage.setItem('echo-telemetry-position', JSON.stringify(position));
  }, [position]);

  useEffect(() => {
    localStorage.setItem('echo-telemetry-open', JSON.stringify(isOpen));
  }, [isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.telemetry-handle')) {
      setIsDragging(true);
      const rect = telemetryRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging || !telemetryRef.current) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const maxX = window.innerWidth - 280;
      const maxY = window.innerHeight - (isOpen ? 320 : 60);
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
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
  }, [isDragging, dragOffset, isOpen]);

  const totalResonance = activeEchoes.reduce((sum, e) => 
    sum + e.resonance.resonate + e.resonance.signal + e.resonance.hold + e.resonance.ripple, 0);
  const activeCount = activeEchoes.filter(e => e.expiresAt > Date.now()).length;
  const userMood = user?.currentMood || 'nostalgic';
  const userIntent = user?.currentIntent || 'understanding';

  return (
    <motion.div
      ref={telemetryRef}
      style={{ left: position.x, top: position.y }}
      className="fixed z-[9999] pointer-events-auto transition-none"
      drag={false}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="open"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="w-72 bg-surface-container-lowest/95 backdrop-blur-3xl rounded-2xl border border-outline/20 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            <div 
              className="telemetry-handle flex items-center justify-between px-space-md py-space-sm bg-surface-container-low/80 backdrop-blur-xl border-b border-outline/10 cursor-move select-none"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">satellite_alt</span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">GLOBAL TELEMETRY</span>
                <motion.div
                  className="w-2 h-2 rounded-full bg-tertiary"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-surface-container-highest transition-colors"
                type="button"
                aria-label="Minimize telemetry"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">minimize</span>
              </motion.button>
            </div>

            <div className="p-space-md space-y-space-md">
              <div className="grid grid-cols-2 gap-space-md">
                <TelemetryCard 
                  label="LIVE ECHOES" 
                  value={activeCount} 
                  icon="public" 
                  color="primary"
                  trend="+2" 
                />
                <TelemetryCard 
                  label="TOTAL RESONANCE" 
                  value={totalResonance.toLocaleString()} 
                  icon="auto_awesome" 
                  color="secondary"
                  trend="+47" 
                />
                <TelemetryCard 
                  label="YOUR MOOD" 
                  value={userMood.toUpperCase()} 
                  icon="psychology" 
                  color="tertiary"
                  smallValue
                />
                <TelemetryCard 
                  label="INTENT" 
                  value={userIntent.toUpperCase()} 
                  icon="explore" 
                  color="primary-fixed"
                  smallValue
                />
              </div>

              <div className="pt-space-xs border-t border-outline/10">
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">REALTIME FEED</span>
                  <span className="font-label-sm text-label-sm text-tertiary tabular-nums">432Hz</span>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {activeEchoes.slice(0, 4).map((echo) => (
                    <motion.div
                      key={echo.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container/80 transition-colors"
                    >
                      <span className="text-lg">{getMoodEmoji(echo.mood)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-label-sm text-label-sm text-on-surface truncate">{echo.content.slice(0, 30)}...</p>
                        <div className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                          <span className="w-1 h-1 rounded-full bg-tertiary animate-pulse" />
                          <span>{echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-space-xs border-t border-outline/10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-label-sm text-label-sm text-primary">QUANTUM SYNC</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-mono">99.4%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="closed"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={handleMouseDown}
            className="telemetry-handle flex items-center gap-2 px-space-md py-space-xs bg-surface-container-lowest/95 backdrop-blur-3xl rounded-full border border-outline/20 shadow-[0_0_40px_rgba(0,0,0,0.9)] cursor-move select-none"
            type="button"
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-tertiary"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">TELEMETRY</span>
            <span className="font-label-md text-label-md text-on-surface font-mono tabular-nums">{activeCount}</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[16px]">open_in_full</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TelemetryCard({ label, value, icon, color, trend, smallValue }: { 
  label: string; 
  value: string | number; 
  icon: string; 
  color: string; 
  trend?: string; 
  smallValue?: boolean;
}) {
  return (
    <div className="p-space-sm rounded-xl bg-surface-container-low/60 backdrop-blur-xl border border-outline/10">
      <div className="flex items-center justify-between mb-1">
        <span className="material-symbols-outlined text-[16px]" style={{ color: `var(--color-${color})` }}>{icon}</span>
        {trend && <span className="font-label-sm text-[10px] text-tertiary">+{trend}</span>}
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</p>
      <p className={`
        font-headline-md text-headline-md text-on-surface mt-1 tabular-nums
        ${smallValue ? 'text-sm' : ''}
      `} style={{ color: `var(--color-${color})` }}>
        {value}
      </p>
    </div>
  );
}

function getMoodEmoji(mood: string): string {
  const emojis: Record<string, string> = {
    calm: '🌊', nostalgic: '🌧️', heavy: '🌑',
    curious: '🔭', excited: '✨', restless: '🌙',
  };
  return emojis[mood] || '✦';
}