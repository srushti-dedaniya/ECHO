import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';

interface CustomCursorProps {
  enabled?: boolean;
}

export function CustomCursor({ enabled = true }: CustomCursorProps) {
  const { position, isVisible } = useCursor();
  const [cursorScale, setCursorScale] = useState(1);
  const [cursorColor] = useState<'primary' | 'secondary' | 'tertiary' | 'default'>('default');

  useEffect(() => {
    if (!enabled) return;

    const handleMouseDown = () => setCursorScale(0.8);
    const handleMouseUp = () => setCursorScale(1);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled]);

  const cursorStyle = {
    transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(${cursorScale})`,
    pointerEvents: 'none' as const,
    zIndex: 9999,
    transition: 'transform 0.05s linear',
  };

  const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: cursorColor === 'default' ? 'var(--color-primary)' : `var(--color-${cursorColor})`,
    transition: 'background-color 0.2s, width 0.2s, height 0.2s',
  };

  const ringStyle = {
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: `2px solid ${cursorColor === 'default' ? 'var(--color-primary)' : `var(--color-${cursorColor})`}`,
    transition: 'border-color 0.2s, transform 0.2s',
    transform: `scale(${cursorScale === 0.8 ? 1.5 : 1})`,
  };

  if (!enabled || typeof window === 'undefined') return null;

  return (
    <AnimatePresence mode="popLayout">
      {isVisible && (
        <motion.div
          style={cursorStyle}
          className="fixed pointer-events-none"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
          <motion.div
            style={dotStyle}
            className="fixed -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={ringStyle}
            className="fixed -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function MagneticElement({ 
  children, 
  strength = 0.2, 
  radius = 250,
}: { 
  children: React.ReactElement; 
  strength?: number; 
  radius?: number;
}) {
  const { registerMagnet, getMagneticOffset } = useCursor();
  const elementRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;
    const unregister = registerMagnet(elementRef.current, strength, radius);
    return unregister;
  }, [registerMagnet, strength, radius]);

  const magneticOffset = elementRef.current ? getMagneticOffset(elementRef.current) : { x: 0, y: 0 };

  const child = React.Children.only(children);
  
  return React.cloneElement(child, {
    ref: elementRef,
    style: {
      ...child.props.style,
      transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
      transition: 'transform 0.15s ease-out',
    },
  });
}