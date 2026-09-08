import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/universe', label: 'Universe', icon: 'public' },
  { path: '/explore', label: 'Explore', icon: 'explore' },
  { path: '/my-trail', label: 'My Trail', icon: 'timeline' },
  { path: '/connections', label: 'Connections', icon: 'hub' },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-viewport-inset py-space-md pointer-events-none">
      <div className="h-16 w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto glass rounded-full px-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-space-md">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-headline-sm text-headline-sm tracking-tight text-on-surface"
          >
            ECHO
          </motion.span>
          <div className="hidden xl:flex items-center gap-space-xs pl-space-sm border-l border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              Atmosphere: 68% Nostalgic · 4,892 Moments Live
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-space-xs glass-strong rounded-full px-space-xs py-space-2xs" data-active-classes="bg-surface-container-high text-primary font-headline-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                px-space-md py-space-xs rounded-full font-body-sm text-body-sm transition-all
                ${isActive
                  ? 'bg-surface-container-high text-primary font-headline-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }
              `}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-space-sm">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary-container font-headline-sm text-label-md hover:bg-primary transition-all shadow-[0_0_24px_rgba(56,189,248,0.35)] animate-pulse"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Release Moment</span>
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}