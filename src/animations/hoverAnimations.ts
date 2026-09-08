import { Variants } from 'framer-motion';

export const hoverVariants = {
  lift: {
    initial: { y: 0 },
    hover: { y: -8, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    tap: { y: -2, transition: { duration: 0.1 } },
  } as Variants,

  scale: {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  } as Variants,

  glow: {
    initial: { boxShadow: '0 0 0 transparent' },
    hover: { boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)', transition: { duration: 0.3 } },
    tap: { boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)' },
  } as Variants,

  rotate: {
    initial: { rotate: 0 },
    hover: { rotate: 5, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    tap: { rotate: 0 },
  } as Variants,

  magnet: {
    initial: { x: 0, y: 0 },
    hover: { x: 0, y: 0 },
    transition: { duration: 0.15, ease: 'easeOut' },
  } as Variants,

  card: {
    initial: { y: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' },
    hover: { 
      y: -12, 
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
    },
    tap: { y: -4 },
  } as Variants,

  button: {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.15 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } },
  } as Variants,

  icon: {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    tap: { scale: 0.95 },
  } as Variants,

  underline: {
    initial: { width: '0%', left: '50%' },
    hover: { width: '100%', left: '0%', transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  } as Variants,

  shimmer: {
    initial: { backgroundPosition: '200% 0' },
    hover: { backgroundPosition: '-200% 0', transition: { duration: 0.8, ease: 'easeOut' } },
  } as Variants,

  float: {
    initial: { y: 0 },
    hover: { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    tap: { y: 0 },
  } as Variants,

  press: {
    initial: { scale: 1 },
    hover: { scale: 1.01 },
    tap: { scale: 0.97, transition: { duration: 0.1 } },
  } as Variants,
};

export const focusVariants = {
  ring: {
    initial: { boxShadow: '0 0 0 0 transparent' },
    focus: { boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.5)', transition: { duration: 0.2 } },
  } as Variants,

  scale: {
    initial: { scale: 1 },
    focus: { scale: 1.02, transition: { duration: 0.2 } },
  } as Variants,
};

export const magneticHover = (strength = 0.2, radius = 250) => {
  return {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        const force = (radius - distance) / radius;
        const moveX = distX * force * strength;
        const moveY = distY * force * strength;
        e.currentTarget.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.04)`;
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
      e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    },
  };
};