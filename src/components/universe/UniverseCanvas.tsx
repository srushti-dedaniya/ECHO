import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Echo } from '../../types/echo';
import { mockEchoes } from '../../data/echoes';
import { moods } from '../../types/mood';
import { EchoOrb } from './EchoOrb';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

function getLifecycle(echo: Echo): 'born' | 'gathering' | 'resonating' | 'fading' | 'archived' {
  const now = Date.now();
  const age = now - echo.createdAt;
  const remaining = echo.expiresAt - now;
  const totalLife = echo.expiresAt - echo.createdAt;
  const lifeProgress = age / totalLife;
  const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;

  if (remaining <= 0) return 'archived';
  if (age < 300000) return 'born';
  if (lifeProgress > 0.85) return 'fading';
  if (totalResonance > 500) return 'resonating';
  if (totalResonance > 100) return 'gathering';
  return 'gathering';
}

function getMoodSimilarity(mood1: string, mood2: string): number {
  const moodGroups = {
    calm: ['calm', 'nostalgic'],
    heavy: ['heavy', 'nostalgic'],
    excited: ['excited', 'curious'],
    curious: ['curious', 'excited'],
    nostalgic: ['nostalgic', 'calm', 'heavy'],
    restless: ['restless', 'heavy'],
  };
  return moodGroups[mood1 as keyof typeof moodGroups]?.includes(mood2) ? 0.8 : 0.1;
}

interface UniverseCanvasProps {
  activeEchoes?: Echo[];
  onOrbClick?: (echo: Echo) => void;
  highlightedEchoId?: string | null;
  userMood?: string;
  emotionalGravity?: number;
  className?: string;
  onSurpriseMe?: () => void;
  onFocusMode?: (echo: Echo | null) => void;
}

export function UniverseCanvas({ 
  activeEchoes = mockEchoes, 
  onOrbClick, 
  highlightedEchoId,
  userMood,
  emotionalGravity = 0,
  className = '',
  onSurpriseMe,
  onFocusMode,
}: UniverseCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [orbPositions, setOrbPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [focusedEcho, setFocusedEcho] = useState<Echo | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [constellationLines, setConstellationLines] = useState<Array<{ from: string; to: string; strength: number }>>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showSurpriseHint, setShowSurpriseHint] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

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
      let angle = (index / activeEchoes.length) * Math.PI * 2;
      let radius = Math.min(viewport.width, viewport.height) * 0.35;
      
      if (userMood && emotionalGravity > 0) {
        const similarity = getMoodSimilarity(echo.mood, userMood);
        const pullStrength = emotionalGravity * similarity;
        radius = radius * (1 - pullStrength * 0.4);
      }
      
      const jitterX = (Math.random() - 0.5) * 80;
      const jitterY = (Math.random() - 0.5) * 80;
      
      positions.set(echo.id, {
        x: centerX + Math.cos(angle) * radius + jitterX,
        y: centerY + Math.sin(angle) * radius + jitterY,
      });
    });

    setOrbPositions(positions);
  }, [activeEchoes, viewport.width, viewport.height, userMood, emotionalGravity]);

  useEffect(() => {
    if (!viewport.width || !viewport.height) return;
    
    const lines: Array<{ from: string; to: string; strength: number }> = [];
    const positions = Array.from(orbPositions.entries());
    
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const [id1, pos1] = positions[i];
        const [id2, pos2] = positions[j];
        const echo1 = activeEchoes.find(e => e.id === id1);
        const echo2 = activeEchoes.find(e => e.id === id2);
        
        if (!echo1 || !echo2) continue;
        
        const moodSim = getMoodSimilarity(echo1.mood, echo2.mood);
        const keywordSim = echo1.content.toLowerCase().split(' ').some(w => 
          echo2.content.toLowerCase().includes(w) && w.length > 3
        ) ? 0.3 : 0;
        
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = Math.min(viewport.width, viewport.height) * 0.6;
        
        if (distance < maxDistance) {
          const strength = (moodSim + keywordSim) * (1 - distance / maxDistance);
          if (strength > 0.15) {
            lines.push({ from: id1, to: id2, strength });
          }
        }
      }
    }
    
    setConstellationLines(lines);
  }, [orbPositions, activeEchoes, viewport]);

  useEffect(() => {
    if (highlightedEchoId) {
      const echo = activeEchoes.find(e => e.id === highlightedEchoId);
      if (echo) {
        setFocusedEcho(echo);
        if (focusMode) onFocusMode?.(echo);
      }
    } else {
      setFocusedEcho(null);
      if (focusMode) onFocusMode?.(null);
    }
  }, [highlightedEchoId, activeEchoes, focusMode, onFocusMode]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale(prev => Math.max(0.3, Math.min(3, prev - e.deltaY * 0.001)));
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const getFocusedTransform = useCallback(() => {
    if (!focusedEcho || !viewport.width || !viewport.height) return { x: 0, y: 0, scale: 1 };
    
    const pos = orbPositions.get(focusedEcho.id);
    if (!pos) return { x: 0, y: 0, scale: 1 };
    
    const centerX = viewport.width / 2;
    const centerY = viewport.height / 2;
    const focusScale = 2;
    
    return {
      x: centerX - pos.x * focusScale,
      y: centerY - pos.y * focusScale,
      scale: focusScale,
    };
  }, [focusedEcho, viewport, orbPositions]);

  const transform = focusedEcho ? getFocusedTransform() : { x: translate.x, y: translate.y, scale };

  const handleSurpriseMe = useCallback(() => {
    const liveEchoes = activeEchoes.filter(e => e.expiresAt > Date.now());
    if (liveEchoes.length === 0) return;
    
    const weights = liveEchoes.map(echo => {
      let weight = 1;
      const lifecycle = getLifecycle(echo);
      if (lifecycle === 'born') weight *= 3;
      if (lifecycle === 'resonating') weight *= 2;
      if (userMood && getMoodSimilarity(echo.mood, userMood) > 0.5) weight *= 1.5;
      return weight;
    });
    
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    const selectedEcho = liveEchoes[selectedIndex];
    setShowSurpriseHint(true);
    setTimeout(() => setShowSurpriseHint(false), 3000);
    onOrbClick?.(selectedEcho);
    onSurpriseMe?.();
  }, [activeEchoes, userMood, onOrbClick, onSurpriseMe]);

  const gravitationalPullX = useTransform(springX, x => x * 0.02);
  const gravitationalPullY = useTransform(springY, y => y * 0.02);

  return (
    <div
      ref={canvasRef}
      className={`relative w-full h-[70vh] min-h-[500px] overflow-hidden ${className}`}
      style={{ background: 'radial-gradient(ellipse at center, var(--color-surface-container-lowest) 0%, var(--color-surface-container-lowest) 100%)' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      {/* Background atmospheric layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[150px]" />
        <div className="absolute top-2/3 left-10 w-[550px] h-[550px] rounded-full bg-tertiary/5 blur-[160px]" />
        
        {/* Emotional gravity visualization */}
        {userMood && emotionalGravity > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: `radial-gradient(ellipse at center, ${moodConfig[userMood]?.color}10, transparent 70%)` 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: emotionalGravity * 0.3 }}
            transition={{ duration: 1 }}
          />
        )}
      </div>

      {/* Star field */}
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

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        {constellationLines.map((line, index) => {
          const pos1 = orbPositions.get(line.from);
          const pos2 = orbPositions.get(line.to);
          if (!pos1 || !pos2) return null;
          
          const echo1 = activeEchoes.find(e => e.id === line.from);
          const echo2 = activeEchoes.find(e => e.id === line.to);
          const color = echo1 && echo2 
            ? (moodConfig[echo1.mood]?.color || moodConfig[echo2.mood]?.color || '#38bdf8')
            : '#38bdf8';
          
          return (
            <motion.line
              key={index}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={color}
              strokeWidth={Math.max(0.5, line.strength * 2)}
              strokeDasharray="4 8"
              strokeOpacity={0}
              initial={{ strokeOpacity: 0 }}
              animate={{ strokeOpacity: focusedEcho ? (line.from === focusedEcho.id || line.to === focusedEcho.id ? line.strength * 0.8 : 0) : line.strength * 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
            />
          );
        })}
      </svg>

      {/* Main universe layer with transform */}
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
          const lifecycle = getLifecycle(echo);
          const gravitationalPull = userMood && emotionalGravity > 0 && getMoodSimilarity(echo.mood, userMood) > 0.5 ? emotionalGravity : 0;
          
          return (
            <motion.div
              key={echo.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: isHighlighted || isFocused ? 1 : 1, 
                scale: isHighlighted || isFocused ? 1.15 : 1 
              }}
              transition={{ 
                delay: Math.random() * 0.5, 
                duration: isHighlighted || isFocused ? 0.4 : 0.6, 
                type: isHighlighted || isFocused ? 'spring' : undefined, 
                stiffness: 300, 
                damping: 20 
              }}
              style={{ left: pos.x, top: pos.y }}
              className="absolute group cursor-pointer"
              onMouseEnter={() => setShowSurpriseHint(false)}
            >
              <EchoOrb
                echo={echo}
                size="md"
                onClick={() => onOrbClick?.(echo)}
                showPreview={true}
                isHighlighted={isHighlighted || isFocused}
                lifecycle={lifecycle}
                gravitationalPull={gravitationalPull}
                showParticles={true}
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
                      <span className={`px-2 py-0.5 rounded text-xs font-mono ${lifecycle === 'fading' ? 'bg-tertiary/20 text-tertiary' : lifecycle === 'born' ? 'bg-primary/20 text-primary' : lifecycle === 'resonating' ? 'bg-tertiary/20 text-tertiary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                        {lifecycle.toUpperCase()}
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { onOrbClick?.(echo); if (focusMode) { setFocusMode(false); onFocusMode?.(null); } }}
                      className="w-full px-3 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-1"
                      type="button"
                    >
                      <span>{focusMode ? 'EXIT FOCUS' : 'ENTER MOMENT'} →</span>
                      <span className="material-symbols-outlined text-[16px]">{focusMode ? 'close' : 'arrow_forward'}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Focus mode overlay */}
      {focusMode && focusedEcho && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center p-4 pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative max-w-2xl w-full max-h-[80vh] overflow-hidden glass-strong rounded-3xl border border-primary/30 shadow-[0_0_60px_rgba(56,189,248,0.3)]"
          >
            <div className="absolute top-4 right-4 z-10">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => { setFocusMode(false); onFocusMode?.(null); }}
                className="p-2 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                type="button"
                aria-label="Exit focus mode"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </motion.button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${moodConfig[focusedEcho.mood]?.color}20, ${moodConfig[focusedEcho.mood]?.color}40)` }}>
                  <span className="text-4xl">{moodConfig[focusedEcho.mood]?.emoji}</span>
                </div>
                <div>
                  <p className="font-headline-lg text-headline-lg text-on-surface">{focusedEcho.content}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: moodConfig[focusedEcho.mood]?.color }} />
                      <span>{focusedEcho.resonance.resonate + focusedEcho.resonance.signal + focusedEcho.resonance.hold + focusedEcho.resonance.ripple} souls</span>
                    </span>
                    <span className="text-primary font-medium capitalize">{focusedEcho.mood}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-primary/20 text-primary">{getLifecycle(focusedEcho).toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="h-px bg-primary/20 mb-4" />
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                This moment is alive with {focusedEcho.resonance.resonate + focusedEcho.resonance.signal + focusedEcho.resonance.hold + focusedEcho.resonance.ripple} souls sharing the same frequency. 
                Your presence adds to the resonance field.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { onOrbClick?.(focusedEcho); setFocusMode(false); onFocusMode?.(null); }}
                className="w-full px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-2"
                type="button"
              >
                <span>ENTER THIS MOMENT</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 bg-surface-container-lowest/85 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-2xl">
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

        {/* Surprise Me button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSurpriseMe}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary/20 text-tertiary border border-tertiary/30 font-label-sm text-label-sm uppercase tracking-wider backdrop-blur-xl transition-all hover:bg-tertiary/30 hover:border-tertiary/50 shadow-[0_0_20px_rgba(78,230,170,0.2)]"
          type="button"
          aria-label="Discover random resonance"
        >
          <motion.span className="text-[16px]" animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
            🎲
          </motion.span>
          <span>SURPRISE ME</span>
          <motion.span className="text-[14px]" animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
            →
          </motion.span>
        </motion.button>

        {/* Surprise hint toast */}
        <AnimatePresence>
          {showSurpriseHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-tertiary/20 text-tertiary border border-tertiary/30 px-4 py-2 rounded-full text-sm font-label-sm backdrop-blur-xl shadow-[0_0_20px_rgba(78,230,170,0.3)]"
            >
              THE UNIVERSE FOUND SOMETHING FOR YOU
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mouse-following particle trail */}
      <motion.div
        style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          transform: `translateX(${gravitationalPullX.get()}px) translateY(${gravitationalPullY.get()}px)`,
          backgroundColor: 'var(--color-primary)',
          opacity: 0.3,
        }}
        className="absolute w-1 h-1 rounded-full pointer-events-none"
        animate={{ 
          scale: [1, 2, 1], 
          opacity: [0.3, 0, 0.3] 
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}