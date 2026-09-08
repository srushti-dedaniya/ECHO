import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/universe', label: 'Universe', icon: 'public' },
  { path: '/explore', label: 'Explore', icon: 'explore' },
  { path: '/my-trail', label: 'My Trail', icon: 'timeline' },
  { path: '/connections', label: 'Connections', icon: 'hub' },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button
        className="fixed bottom-space-lg right-space-lg z-40 lg:hidden w-14 h-14 rounded-full glass-strong flex items-center justify-center shadow-2xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open navigation"
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-on-surface text-2xl">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl flex flex-col items-center justify-center gap-space-lg"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex flex-col items-center gap-space-md">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-space-md px-space-xl py-space-md rounded-full text-headline-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary-container text-on-primary-container shadow-[0_0_24px_rgba(56,189,248,0.4)]'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container hover:text-on-surface'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsOpen(false)}
              className="mt-space-lg flex items-center gap-space-xs px-space-xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_24px_rgba(56,189,248,0.35)]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Release Moment</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}