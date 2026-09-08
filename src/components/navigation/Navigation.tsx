import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export function Navigation() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReleaseClick = () => {
    if (isAuthenticated) {
      navigate('/release');
    } else {
      navigate('/register');
    }
  };

  const navItems = [
    { path: '/universe', label: 'Universe', icon: 'public' },
    { path: '/moments', label: 'My Moments', icon: 'trail_sign' },
    { path: '/release', label: 'Release', icon: 'auto_awesome' },
    { path: '/profile', label: 'Profile', icon: 'person' },
  ];

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:fixed top-0 left-0 right-0 z-50 px-viewport-inset pt-space-sm pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto pointer-events-auto flex items-center justify-between"
        >
          <div className="flex items-center gap-space-xl">
            <Link to="/universe" className="flex items-center gap-space-sm group">
              <motion.span
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="font-headline-lg text-headline-lg text-on-surface tracking-wider uppercase font-bold"
              >
                ECHO
              </motion.span>
            </Link>

            <div className="flex items-center gap-space-xs bg-surface-container-lowest/80 backdrop-blur-2xl border border-outline/20 rounded-full px-space-md py-space-xs shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-space-xs px-space-md py-space-sm rounded-full
                    font-label-sm text-label-sm transition-all
                    ${isActive
                      ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}
                  `}
                >
                  <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-space-md">
            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-space-sm px-space-md py-space-sm rounded-full bg-surface-container-lowest/80 border border-outline/20 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                type="button"
              >
                <div className={`w-8 h-8 rounded-full ${user?.avatarColor || 'bg-primary-container'} flex items-center justify-center text-on-primary-container border border-primary/30`}>
                  <span className="text-sm font-bold">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface hidden sm:inline">{user?.name}</span>
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
              </motion.button>

              <div className="absolute right-0 top-full mt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] border border-outline/30 overflow-hidden p-space-xs">
                  <div className="px-space-md py-space-sm border-b border-outline/10">
                    <p className="font-headline-sm text-headline-sm text-on-surface">{user?.name}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">@{user?.username}</p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                      <span className="font-label-sm text-label-sm text-tertiary capitalize">{user?.currentMood || 'Nostalgic'}</span>
                    </div>
                  </div>
                  <NavLink
                    to="/profile"
                    className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 transition-colors block mt-1"
                  >
                    <span className="material-symbols-outlined text-[20px]">person</span>
                    <span className="font-body-sm text-body-sm">My Profile</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-secondary hover:text-secondary-fixed hover:bg-secondary/10 transition-colors w-full text-left"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span className="font-body-sm text-body-sm">Logout</span>
                  </button>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleReleaseClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-semibold shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] transition-all overflow-hidden"
              type="button"
            >
              <span className="relative z-10 flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>+ RELEASE</span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe pb-space-sm px-space-md pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto mx-auto max-w-xl bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.9)] border border-outline/20 overflow-hidden"
        >
          <div className="flex items-center justify-around py-space-xs">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex flex-col items-center gap-0.5 px-space-md py-space-xs rounded-xl
                  transition-all duration-300
                  ${isActive
                    ? 'bg-primary-container/20 text-primary'
                    : 'text-on-surface-variant'
                  }
                `}
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </motion.div>
      </nav>
    </>
  );
}