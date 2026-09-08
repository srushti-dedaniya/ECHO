import { useState, useEffect, useCallback } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export interface MagnetTarget {
  element: HTMLElement;
  strength: number;
  radius: number;
}

export function useCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [magnetTargets, setMagnetTargets] = useState<MagnetTarget[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const registerMagnet = useCallback((element: HTMLElement, strength = 0.2, radius = 250) => {
    const target: MagnetTarget = { element, strength, radius };
    setMagnetTargets(prev => [...prev, target]);
    return () => {
      setMagnetTargets(prev => prev.filter(t => t.element !== element));
    };
  }, []);

  const getMagneticOffset = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = position.x - centerX;
    const distY = position.y - centerY;
    const distance = Math.hypot(distX, distY);

    for (const target of magnetTargets) {
      if (target.element === element && distance < target.radius) {
        const force = (target.radius - distance) / target.radius;
        return {
          x: distX * force * target.strength,
          y: distY * force * target.strength,
        };
      }
    }
    return { x: 0, y: 0 };
  }, [position, magnetTargets]);

  return { position, isVisible, registerMagnet, getMagneticOffset };
}