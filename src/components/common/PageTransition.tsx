import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
  mode?: 'fade' | 'slide' | 'scale' | 'blur';
  duration?: number;
}

const transitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' },
  },
};

export function PageTransition({ children, mode = 'fade', duration = 0.4 }: PageTransitionProps) {
  const transition = transitions[mode];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerContainer({ children, stagger = 0.1, className, style }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className={className}
      style={style}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerItem({ children, delay = 0, className, style }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}