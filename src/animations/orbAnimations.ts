import { Variants } from 'framer-motion';

export const orbVariants: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
  active: { scale: 1.1 },
};

export const orbPulseVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    boxShadow: [
      '0 0 30px rgba(56, 189, 248, 0.4)',
      '0 0 50px rgba(56, 189, 248, 0.7)',
      '0 0 30px rgba(56, 189, 248, 0.4)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const orbGlowVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const orbOrbitVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

export const orbDriftVariants: Variants = {
  animate: {
    x: [0, 15, -10, 0],
    y: [0, -15, 10, 0],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const orbMagneticVariants: Variants = {
  initial: { x: 0, y: 0 },
  animate: { x: 0, y: 0 },
};

export const coreOrbVariants: Variants = {
  animate: {
    scale: [1, 1.08, 1],
    boxShadow: [
      '0 0 50px rgba(56, 189, 248, 0.5)',
      '0 0 80px rgba(56, 189, 248, 0.8)',
      '0 0 50px rgba(56, 189, 248, 0.5)',
    ],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const emitterVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 6, repeat: Infinity, ease: 'linear' },
  },
};

export const ringVariants: Variants = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.5, 0.2, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const particleBurstVariants: Variants = {
  initial: { scale: 0, opacity: 1 },
  animate: { scale: 1, opacity: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  exit: { scale: 0, opacity: 0 },
};

export const sonarVariants: Variants = {
  animate: {
    scale: [0.5, 2],
    opacity: [0.6, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeOut' },
  },
};

export const waveVariants: Variants = {
  animate: {
    pathLength: [0, 1],
    opacity: [1, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
};