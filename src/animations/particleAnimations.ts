import { Variants } from 'framer-motion';

export const particleVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
};

export const particleFloatVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const particleDriftVariants: Variants = {
  animate: {
    x: [0, 30, -20, 0],
    y: [0, -30, 20, 0],
    transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const particleBurstVariants: Variants = {
  initial: { scale: 0, opacity: 1 },
  animate: { scale: 1, opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { scale: 0, opacity: 0 },
};

export const starfieldVariants: Variants = {
  animate: {
    opacity: [0.3, 1, 0.3],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const meteorVariants: Variants = {
  initial: { x: -100, y: -100, opacity: 0 },
  animate: { x: 200, y: 200, opacity: [0, 1, 0], transition: { duration: 2, ease: 'easeOut' } },
  exit: { opacity: 0 },
};

export const rainDropVariants: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: '100vh', opacity: [0, 1, 0], transition: { duration: 1, ease: 'linear' } },
};

export const dustVariants: Variants = {
  animate: {
    x: [0, 5, -5, 0],
    y: [0, 3, -3, 0],
    opacity: [0.2, 0.5, 0.2],
    scale: [1, 1.2, 1],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const sparkleVariants: Variants = {
  animate: {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    rotate: [0, 180],
    transition: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const waveParticleVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    opacity: [0.4, 1, 0.4],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const constellationLineVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { pathLength: 0, opacity: 0 },
};

export const nodePulseVariants: Variants = {
  animate: {
    scale: [1, 1.3, 1],
    boxShadow: [
      '0 0 10px rgba(56, 189, 248, 0.5)',
      '0 0 20px rgba(56, 189, 248, 0.8)',
      '0 0 10px rgba(56, 189, 248, 0.5)',
    ],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const filamentVariants: Variants = {
  animate: {
    strokeDashoffset: [100, -100],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 4, repeat: Infinity, ease: 'linear' },
  },
};