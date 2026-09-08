import { useRef, useEffect, useMemo } from 'react';
import type { Echo } from '../../types/echo';


interface ConnectionLinesProps {
  echoes: Echo[];
  orbPositions: Map<string, { x: number; y: number }>;
  activeMood?: string;
  maxConnections?: number;
}

export function ConnectionLines({ 
  echoes, 
  orbPositions, 
  activeMood,
  maxConnections = 15,
}: ConnectionLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const connections = useMemo(() => {
    const lines: Array<{ from: Echo; to: Echo; strength: number }> = [];
    const moodEchoes = activeMood && activeMood !== 'all'
      ? echoes.filter(e => e.mood === activeMood)
      : echoes;

    for (let i = 0; i < moodEchoes.length && lines.length < maxConnections; i++) {
      for (let j = i + 1; j < moodEchoes.length && lines.length < maxConnections; j++) {
        const pos1 = orbPositions.get(moodEchoes[i].id);
        const pos2 = orbPositions.get(moodEchoes[j].id);
        
        if (pos1 && pos2) {
          const dx = pos2.x - pos1.x;
          const dy = pos2.y - pos1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 400) {
            lines.push({
              from: moodEchoes[i],
              to: moodEchoes[j],
              strength: 1 - distance / 400,
            });
          }
        }
      }
    }
    return lines;
  }, [echoes, orbPositions, activeMood, maxConnections]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      connections.forEach((conn, index) => {
        const pos1 = orbPositions.get(conn.from.id);
        const pos2 = orbPositions.get(conn.to.id);
        
        if (!pos1 || !pos2) return;

        const mood1 = conn.from.mood;
        const mood2 = conn.to.mood;
        
        const hue1 = moodHue(mood1);
        const hue2 = moodHue(mood2);
        const hue = (hue1 + hue2) / 2;
        
        const pulse = Math.sin(time * 2 + index) * 0.3 + 0.7;
        const opacity = conn.strength * pulse * 0.4;

        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        
        const midX = (pos1.x + pos2.x) / 2;
        const midY = (pos1.y + pos2.y) / 2;
        const perpX = -(pos2.y - pos1.y) * 0.15 * Math.sin(time + index);
        const perpY = (pos2.x - pos1.x) * 0.15 * Math.sin(time + index);
        
        ctx.quadraticCurveTo(midX + perpX, midY + perpY, pos2.x, pos2.y);
        
        const gradient = ctx.createLinearGradient(pos1.x, pos1.y, pos2.x, pos2.y);
        gradient.addColorStop(0, `hsla(${hue1}, 80%, 60%, ${opacity})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 80%, 60%, ${opacity * 1.5})`);
        gradient.addColorStop(1, `hsla(${hue2}, 80%, 60%, ${opacity})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5 * conn.strength * pulse;
        ctx.setLineDash([8 * pulse, 12 * pulse]);
        ctx.lineDashOffset = time * 20;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [connections, orbPositions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}

function moodHue(mood: string): number {
  const hues: Record<string, number> = {
    calm: 195,
    nostalgic: 350,
    heavy: 340,
    curious: 150,
    excited: 200,
    restless: 30,
  };
  return hues[mood] || 195;
}