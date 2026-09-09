import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import { useAuth } from '../context/AuthContext';
import { Hero } from '../components/landing/Hero';
import { DissolutionSection } from '../components/landing/DissolutionSection';
import { FollowMoments } from '../components/landing/FollowMoments';
import { FinalCTA } from '../components/landing/FinalCTA';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LiveUniversePreview } from '../components/landing/LiveUniversePreview';
import { setupDemoMode, isDemoMode } from '../utils/demoMode';


export function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/universe', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleEnterEcho = () => {
    if (isAuthenticated) {
      navigate('/universe');
    } else {
      navigate('/register');
    }
  };

  const handleExploreUniverse = () => {
    if (isAuthenticated) {
      navigate('/universe');
    } else {
      navigate('/register');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Public Header with Login/Register */}
      <header className="fixed top-0 left-0 right-0 z-40 px-viewport-inset pt-space-sm">
        <div className="max-w-7xl mx-auto pointer-events-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-space-sm group" onClick={handleEnterEcho}>
            <motion.span
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="font-headline-lg text-headline-lg text-on-surface tracking-wider uppercase font-bold"
            >
              ECHO
            </motion.span>
          </Link>

          {!isAuthenticated && (
            <div className="flex items-center gap-space-sm">
              <Link
                to="/login"
                className="px-space-md py-space-sm rounded-full bg-surface-container-high/60 hover:bg-surface-container-highest text-on-surface font-label-sm text-label-sm backdrop-blur-xl transition-all hover:scale-105"
              >
                Login
              </Link>
              <motion.button
                onClick={handleEnterEcho}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-semibold shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] transition-all overflow-hidden"
                type="button"
              >
                <span className="relative z-10 flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Register</span>
                </span>
              </motion.button>
            </div>
          )}

          {/* Demo Mode Button for Hackathon Judges */}
          {!isAuthenticated && !isDemoMode() && (
            <motion.button
              onClick={() => {
                setupDemoMode();
                navigate('/universe', { replace: true });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-space-sm px-space-md py-space-sm rounded-full bg-tertiary/20 text-tertiary border border-tertiary/30 font-label-sm text-label-sm uppercase tracking-wider backdrop-blur-xl transition-all hover:bg-tertiary/30 hover:scale-105"
              type="button"
              title="Quick demo access for judges - pre-populated universe with echoes, contributions, and resonance"
            >
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                <span>EXPLORE DEMO UNIVERSE</span>
              </span>
            </motion.button>
          )}
        </div>
      </header>

      <Hero onEnterEcho={handleEnterEcho} onExploreUniverse={handleExploreUniverse} />
      <DissolutionSection />
      <FollowMoments />
      <HowItWorks />
      <LiveUniversePreview onExplore={handleExploreUniverse} />
      <FinalCTA onEnterEcho={handleEnterEcho} />
    </div>
  );
}