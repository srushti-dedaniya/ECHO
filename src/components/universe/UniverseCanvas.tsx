import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Echo } from '../../types/echo';
import { mockEchoes } from '../../data/echoes';
import { moods } from '../../types/mood';
import { EchoOrb } from './EchoOrb';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

interface UniverseCanvasProps {
  activeEchoes?: Echo[];
  onOrbClick?: (echo: Echo) => void;
  highlightedEchoId?: string | null;
  className?: string;
}

export function UniverseCanvas({ 
  activeEchoes = mockEchoes, 
  onOrbClick, 
  highlightedEchoId,
  className = ''
}: UniverseCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [orbPositions, setOrbPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [focusedEcho, setFocusedEcho] = useState<Echo | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setViewport({ width: rect.width, height: rect.height });
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    if (!viewport.width || !viewport.height) return;

    const positions = new Map<string, { x: number; y: number }>();
    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2;

    activeEchoes.forEach((echo, index) => {
      const angle = (index / activeEchoes.length) * Math.PI * 2;
      const radius = Math.min(viewport.width, viewport.height) * 0.35;
      const jitterX = (Math.random() - 0.5) * 80;
      const jitterY = (Math.random() - 0.5) * 80;
      
      positions.set(echo.id, {
        x: centerX + Math.cos(angle) * radius + jitterX,
        y: centerY + Math.sin(angle) * radius + jitterY,
      });
    });

    setOrbPositions(positions);
  }, [activeEchoes, viewport.width, viewport.height]);

  useEffect(() => {
    if (highlightedEchoId) {
      const echo = activeEchoes.find(e => e.id === highlightedEchoId);
      if (echo) {
        setFocusedEcho(echo);
      }
    } else {
      setFocusedEcho(null);
    }
  }, [highlightedEchoId, activeEchoes]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale(prev => Math.max(0.5, Math.min(2, prev - e.deltaY * 0.001)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.echo-orb')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
    e.preventDefault();
  }, [translate]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setTranslate({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
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
  }, [isDragging, dragStart]);

  const getFocusedTransform = useCallback(() => {
    if (!focusedEcho || !viewport.width || !viewport.height) return { x: 0, y: 0, scale: 1 };
    
    const pos = orbPositions.get(focusedEcho.id);
    if (!pos) return { x: 0, y: 0, scale: 1 };
    
    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2;
    const focusScale = 1.5;
    
    return {
      x: centerX - pos.x * focusScale,
      y: centerY - pos.y * focusScale,
      scale: focusScale,
    };
  }, [focusedEcho, viewport, orbPositions]);

  const transform = focusedEcho ? getFocusedTransform() : { x: translate.x, y: translate.y, scale };

  return (
    <div
      ref={canvasRef}
      className={`relative w-full h-[70vh] min-h-[500px] overflow-hidden ${className}`}
      style={{ background: 'radial-gradient(ellipse at center, var(--color-surface-container-lowest) 0%, var(--color-surface-container-lowest) 100%)' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="absolute top-2/3 left-10 w-[550px] h-[550px] rounded-full bg-tertiary/5 blur-[160px]" />
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="8%" cy="14%" fill="#fff" opacity="0.3" r="1" />
        <circle cx="15%" cy="38%" fill="#fff" opacity="0.5" r="1.5" />
        <circle cx="28%" cy="75%" fill="#fff" opacity="0.2" r="1" />
        <circle cx="44%" cy="20%" fill="url(#starGlow)" opacity="0.6" r="2" />
        <circle cx="62%" cy="65%" fill="#fff" opacity="0.4" r="1" />
        <circle cx="78%" cy="25%" fill="#fff" opacity="0.6" r="1.5" />
        <circle cx="88%" cy="80%" fill="#fff" opacity="0.3" r="1" />
        <circle cx="94%" cy="42%" fill="url(#starGlow)" opacity="0.6" r="2" />
        <circle cx="52%" cy="88%" fill="#fff" opacity="0.4" r="1.2" />
        <circle cx="35%" cy="50%" fill="#fff" opacity="0.2" r="1" />
      </svg>

      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: 'center center',
        }}
        animate={{ opacity: 1 }}
        transition={{ duration: focusedEcho ? 0.8 : 0.3, ease: 'easeOut' }}
      >
        {activeEchoes.map((echo) => {
          const pos = orbPositions.get(echo.id) || { x: 0, y: 0 };
          const isHighlighted = highlightedEchoId === echo.id;
          const isFocused = focusedEcho?.id === echo.id;
          const mood = moodConfig[echo.mood];
          const glowColor = mood?.color || 'var(--color-primary)';
          
          return (
            <motion.div
              key={echo.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: isHighlighted || isFocused ? 1 : 1, scale: isHighlighted || isFocused ? 1.1 : 1 }}
              transition={{ delay: Math.random() * 0.5, duration: isHighlighted || isFocused ? 0.4 : 0.6, type: isHighlighted || isFocused ? 'spring' : undefined, stiffness: 300, damping: 20 }}
              style={{ left: pos.x, top: pos.y }}
              className="absolute group cursor-pointer"
            >
              <EchoOrb
                echo={echo}
                size="md"
                onClick={() => onOrbClick?.(echo)}
                showPreview={true}
                isHighlighted={isHighlighted || isFocused}
              />
              
              {(isHighlighted || isFocused) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 z-20 pointer-events-auto"
                >
                  <div className="p-4 rounded-2xl glass-strong shadow-2xl border border-outline/20">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}40)` }}>
                        <span className="text-2xl">{mood?.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-headline-sm text-headline-sm text-on-surface mb-1 line-clamp-1">{echo.content.slice(0, 60)}...</p>
                        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: glowColor }} />
                            <span>{echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple} experiencing now</span>
                          </span>
                          <span className="text-primary font-medium capitalize">{mood?.label}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
                      <span>Ends in: <span className="text-primary font-medium">
                        {(() => {
                          const remaining = echo.expiresAt - Date.now();
                          if (remaining <= 0) return 'Ended';
                          const hours = Math.floor(remaining / 3600000);
                          const minutes = Math.floor((remaining % 3600000) / 60000);
                          if (hours > 0) return `${hours}h ${minutes}m`;
                          return `${minutes}m`;
                        })()}
                      </span></span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOrbClick?.(echo)}
                      className="w-full px-3 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-1"
                      type="button"
                    >
                      <span>ENTER MOMENT →</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-surface-container-lowest/85 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-2xl">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden sm:inline">COLLECTIVE PERSPECTIVE</span>
        <div className="flex -space-x-2 overflow-hidden">
          {activeEchoes.slice(0, 5).map((echo) => (
            <motion.div
              key={echo.id}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              className="w-8 h-8 rounded-full overflow-hidden shadow-md"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-xs">{moodConfig[echo.mood]?.emoji}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOrbClick?.(activeEchoes[0])}
          className="ml-2 flex items-center gap-1 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm"
          type="button"
        >
          <span className="material-symbols-outlined text-[14px]">add_photo_alternate</span>
          <span>Add Lens</span>
        </motion.button>
      </div>
    </div>
  );
}