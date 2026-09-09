import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import type { Echo } from '../../types/echo';
import type { MoodType } from '../../types/mood';
import { moods } from '../../types/mood';

interface EchoOrbProps {
  echo: Echo;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  isActive?: boolean;
  isHighlighted?: boolean;
  showPreview?: boolean;
  lifecycle?: 'born' | 'gathering' | 'resonating' | 'fading' | 'archived';
  gravitationalPull?: number;
  showParticles?: boolean;
}

const sizeClasses = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-40 h-40',
};

const sizeValues = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

const lifecycleConfig = {
  born: { scale: 0.8, opacity: 0.6, particleIntensity: 0.3, pulseSpeed: 1.5 },
  gathering: { scale: 1, opacity: 0.8, particleIntensity: 0.5, pulseSpeed: 2 },
  resonating: { scale: 1.1, opacity: 1, particleIntensity: 1, pulseSpeed: 1 },
  fading: { scale: 0.9, opacity: 0.5, particleIntensity: 0.2, pulseSpeed: 3 },
  archived: { scale: 0.7, opacity: 0.3, particleIntensity: 0, pulseSpeed: 0 },
};

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<MoodType, typeof moods[0]>);

function formatTimeRemaining(expiresAt: number): string {
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) return 'Ended';
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

function getLifecycle(echo: Echo): 'born' | 'gathering' | 'resonating' | 'fading' | 'archived' {
  const now = Date.now();
  const age = now - echo.createdAt;
  const remaining = echo.expiresAt - now;
  const totalLife = echo.expiresAt - echo.createdAt;
  const lifeProgress = age / totalLife;
  const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;

  if (remaining <= 0) return 'archived';
  if (age < 300000) return 'born'; // First 5 minutes
  if (lifeProgress > 0.85) return 'fading'; // Last 15% of life
  if (totalResonance > 500) return 'resonating';
  if (totalResonance > 100) return 'gathering';
  return 'gathering';
}

function ParticleField({ count, color, intensity, size }: { count: number; color: string; intensity: number; size: number }) {
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; radius: number; opacity: number }>>([]);
  
  useEffect(() => {
    particles.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * size,
      y: (Math.random() - 0.5) * size,
      vx: (Math.random() - 0.5) * 0.5 * intensity,
      vy: (Math.random() - 0.5) * 0.5 * intensity,
      radius: Math.random() * 2 * intensity + 1,
      opacity: Math.random() * 0.5 * intensity + 0.1,
    }));
  }, [count, intensity, size]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Gravitational pull toward center
        const dx = size / 2 - p.x;
        const dy = size / 2 - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          const force = (intensity * 0.02) / (dist * 0.1 + 0.1);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        
        // Boundary wrap
        if (p.x < 0) p.x = size;
        if (p.x > size) p.x = 0;
        if (p.y < 0) p.y = size;
        if (p.y > size) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, color, intensity, size]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ borderRadius: '50%' }} />;
}

export function EchoOrb({ 
  echo, 
  size = 'md', 
  onClick, 
  isActive, 
  isHighlighted, 
  showPreview = true, 
  lifecycle,
  gravitationalPull = 0,
  showParticles = true 
}: EchoOrbProps) {
  const mood = moodConfig[echo.mood];
  const glowColor = mood?.color || 'var(--color-primary)';
  const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;
  const computedLifecycle = lifecycle || getLifecycle(echo);
  const lifecycleState = lifecycleConfig[computedLifecycle];
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  const gravitationalX = useTransform(springX, x => x * gravitationalPull * 0.1);
  const gravitationalY = useTransform(springY, y => y * gravitationalPull * 0.1);

  const orbStyle = {
    '--orb-glow': glowColor,
  } as React.CSSProperties;

  const isEmphasized = isActive || isHighlighted;

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { mouseX.set(0); mouseY.set(0); }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      disabled={!onClick}
      whileHover={{ scale: isEmphasized ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative group cursor-pointer flex flex-col items-center
        ${sizeClasses[size]}
        transition-all duration-500
        ${isEmphasized ? 'scale-110' : ''}
      `}
      style={orbStyle}
      aria-label={`Enter ${echo.type} moment: ${echo.content.slice(0, 50)}...`}
    >
      <div className="relative flex items-center justify-center" style={{ 
        transform: `translate(${gravitationalPull ? 0 : 0}px, ${gravitationalPull ? 0 : 0}px)` 
      }}>
        {showParticles && (
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
            <ParticleField 
              count={Math.floor(15 * lifecycleState.particleIntensity)} 
              color={glowColor} 
              intensity={lifecycleState.particleIntensity} 
              size={(sizeValues[size] ?? 24) * 1.5}
            />
          </div>
        )}

        <motion.div
          className="absolute inset-0 rounded-full blur-[60px] opacity-30"
          style={{ backgroundColor: glowColor }}
          animate={{ 
            scale: [1, 1 + 0.2 * lifecycleState.particleIntensity, 1], 
            opacity: [0.3 * lifecycleState.opacity, 0.5 * lifecycleState.opacity, 0.3 * lifecycleState.opacity] 
          }}
          transition={{ duration: 3 / lifecycleState.pulseSpeed, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <motion.div
          className={`
            relative rounded-full backdrop-blur-2xl p-[1px] flex flex-col items-center justify-center
            shadow-[0_0_30px_rgba(0,0,0,0.5)]
            ${isEmphasized ? 'shadow-[0_0_50px_rgba(0,0,0,0.7)] ring-2' : ''}
            ${computedLifecycle === 'born' ? 'animate-pulse' : ''}
          `}
          style={{ 
            borderColor: isEmphasized ? glowColor : (computedLifecycle === 'born' ? glowColor : 'transparent'),
            boxShadow: `0 0 30px ${glowColor}40`,
            transform: `translateX(${gravitationalX.get()}px) translateY(${gravitationalY.get()}px)`
          }}
          animate={{ 
            boxShadow: [
              `0 0 30px ${glowColor}${Math.floor(40 * lifecycleState.opacity).toString(16).padStart(2, '0')}`,
              `0 0 50px ${glowColor}${Math.floor(60 * lifecycleState.opacity).toString(16).padStart(2, '0')}`,
              `0 0 30px ${glowColor}${Math.floor(40 * lifecycleState.opacity).toString(16).padStart(2, '0')}`,
            ],
          }}
          transition={{ duration: 4 / lifecycleState.pulseSpeed, repeat: Infinity }}
        >
          <div className={`
            w-full h-full rounded-full flex flex-col items-center justify-center text-center
            bg-surface-container-lowest/80
          `}>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" aria-hidden="true">
              {mood?.emoji}
            </span>
            <span className="font-headline-sm text-body-sm font-semibold mt-1 text-on-surface">
              {mood?.label}
            </span>
            {computedLifecycle === 'born' && (
              <motion.span className="text-xs text-primary mt-1 font-mono" initial={{ opacity: 0, y: 5 }} animate={{ opacity: [1, 0.5, 1], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                NEW
              </motion.span>
            )}
            {computedLifecycle === 'fading' && (
              <motion.span className="text-xs text-tertiary mt-1 font-mono" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                FADING
              </motion.span>
            )}
            {computedLifecycle === 'archived' && (
              <span className="text-xs text-on-surface-variant mt-1 font-mono">ARCHIVED</span>
            )}
          </div>
        </motion.div>

        {isActive && (
          <motion.div
            className="absolute -inset-2 rounded-full border-2"
            style={{ borderColor: glowColor }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Resonance pulse ring when highly active */}
        {totalResonance > 300 && (
          <motion.div
            className="absolute -inset-4 rounded-full border"
            style={{ borderColor: glowColor, borderWidth: 1 }}
            animate={{ 
              scale: [1, 1.3, 1], 
              opacity: [0.6, 0, 0.6] 
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        )}
      </div>

      {showPreview && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 max-w-[200px] text-center"
        >
          <p className="font-body-sm text-body-sm text-on-surface line-clamp-2 mb-1">
            {echo.content}
          </p>
          <div className="flex items-center justify-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: glowColor }} />
            <span>{totalResonance} souls</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1 text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${computedLifecycle === 'fading' ? 'animate-pulse' : ''}`} style={{ backgroundColor: glowColor }} />
              <span>{computedLifecycle.toUpperCase()}</span>
            </span>
            <span>{formatTimeRemaining(echo.expiresAt)}</span>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}

export function FloatingOrb({ 
  echo, 
  position, 
  onClick,
  drift = true,
}: { 
  echo: Echo; 
  position: { x: number; y: number };
  onClick?: () => void;
  drift?: boolean;
}) {
  const mood = moodConfig[echo.mood];
  const glowColor = mood?.color || 'var(--color-primary)';
  const totalResonance = echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple;
  const lifecycle = getLifecycle(echo);

  return (
    <motion.div
      style={{ left: position.x, top: position.y }}
      className="absolute group cursor-pointer"
      animate={drift ? { 
        x: [0, 10, -5, 0], 
        y: [0, -10, 5, 0] 
      } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center justify-center"
      >
        <div className="absolute -inset-3 rounded-full blur-xl opacity-40" style={{ backgroundColor: glowColor }} />
        <div className={`
          relative w-16 h-16 rounded-full backdrop-blur-xl p-[1px] flex items-center justify-center
          shadow-[0_0_20px_rgba(0,0,0,0.5)]
        `} style={{ boxShadow: `0 0 20px ${glowColor}40` }}>
          <div className="w-full h-full rounded-full bg-surface-container-lowest/80 flex items-center justify-center">
            <span className="text-xl">{mood?.emoji}</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-auto"
        >
          <div className="p-4 rounded-2xl glass-strong shadow-2xl border border-outline/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${glowColor}20, ${glowColor}40)` }}>
                <span className="text-2xl">{mood?.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-headline-sm text-headline-sm text-on-surface mb-1 line-clamp-1">{echo.content.slice(0, 50)}...</p>
                <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: glowColor }} />
                    <span>{totalResonance} experiencing now</span>
                  </span>
                  <span className="text-primary font-medium capitalize">{mood?.label}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant mb-3">
              <span>Ends in: <span className="text-primary font-medium">{formatTimeRemaining(echo.expiresAt)}</span></span>
              <span className={`px-2 py-0.5 rounded text-xs font-mono ${lifecycle === 'fading' ? 'bg-tertiary/20 text-tertiary' : lifecycle === 'born' ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                {lifecycle.toUpperCase()}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-3 py-2 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all flex items-center justify-center gap-1"
              type="button"
            >
              <span>ENTER MOMENT →</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}