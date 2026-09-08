import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Echo } from '../../types/echo';
import { mockEchoes } from '../../data/echoes';
import { moods } from '../../types/mood';
import { EchoOrb } from './EchoOrb';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

interface UniverseCanvasProps {
  activeEchoes?: Echo[];
  onOrbClick?: (echo: Echo) => void;
  selectedMood?: string;
  className?: string;
}

export function UniverseCanvas({ 
  activeEchoes = mockEchoes, 
  onOrbClick, 
  selectedMood,
  className = ''
}: UniverseCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [orbPositions, setOrbPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

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

  const filteredEchoes = selectedMood && selectedMood !== 'all'
    ? activeEchoes.filter(e => e.mood === selectedMood)
    : activeEchoes;

  return (
    <div
      ref={canvasRef}
      className={`relative w-full h-[70vh] min-h-[500px] overflow-hidden ${className}`}
      style={{ background: 'radial-gradient(ellipse at center, var(--color-surface-container-lowest) 0%, var(--color-surface-container-lowest) 100%)' }}
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
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {filteredEchoes.map((echo) => {
          const pos = orbPositions.get(echo.id) || { x: 0, y: 0 };
          
          return (
            <motion.div
              key={echo.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.random() * 0.5, duration: 0.6 }}
              style={{ left: pos.x, top: pos.y }}
              className="absolute group cursor-pointer"
            >
              <EchoOrb
                echo={echo}
                size="md"
                onClick={() => onOrbClick?.(echo)}
                showPreview={true}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-surface-container-lowest/85 backdrop-blur-xl rounded-full px-4 py-1.5 shadow-2xl">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider hidden sm:inline">COLLECTIVE PERSPECTIVE</span>
        <div className="flex -space-x-2 overflow-hidden">
          {filteredEchoes.slice(0, 5).map((echo) => (
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