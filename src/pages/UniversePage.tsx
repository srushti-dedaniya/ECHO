import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEcho } from '../context/EchoContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { mockEchoes } from '../data/echoes';
import { UniverseCanvas } from '../components/universe/UniverseCanvas';
import { UniverseConsole } from '../components/universe/UniverseConsole';
import { motion, AnimatePresence } from 'framer-motion';
import type { Echo } from '../types/echo';

export function UniversePage() {
  const navigate = useNavigate();
  const { activeEchoes, setCurrentRoom, newlyCreatedEchoId, setNewlyCreatedEchoId } = useEcho();
  const { user } = useUser();
  const { logout } = useAuth();
  const [showGuidance, setShowGuidance] = useState(false);
  const [newEchoToast, setNewEchoToast] = useState(false);
  const [highlightedEchoId, setHighlightedEchoId] = useState<string | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem('echo-has-seen-universe-guide');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowGuidance(true);
        localStorage.setItem('echo-has-seen-universe-guide', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (newlyCreatedEchoId) {
      setNewEchoToast(true);
      const timer = setTimeout(() => {
        setNewEchoToast(false);
        setNewlyCreatedEchoId(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newlyCreatedEchoId, setNewlyCreatedEchoId]);

  const handleOrbClick = useCallback((echo: Echo) => {
    // Load existing contributions for this echo if any exist in LocalStorage
    const storedKey = `echo-room-contribs-${echo.id}`;
    const stored = localStorage.getItem(storedKey);
    let extraContribs = [];
    if (stored) {
      try { extraContribs = JSON.parse(stored); } catch { extraContribs = []; }
    }

    setCurrentRoom({
      id: echo.id,
      title: echo.content.slice(0, 40) + (echo.content.length > 40 ? '...' : ''),
      mood: echo.mood,
      echo,
      participants: [
        { id: 'p1', name: 'Soul #4092', avatar: '✨', alias: 'Soul #4092', mood: echo.mood, joinedAt: Date.now(), resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 } },
        { id: 'p2', name: 'Soul #1102', avatar: '🌊', alias: 'Soul #1102', mood: echo.mood, joinedAt: Date.now(), resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 } },
        { id: 'p3', name: 'Soul #8891', avatar: '🌙', alias: 'Soul #8891', mood: echo.mood, joinedAt: Date.now(), resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 } },
      ],
      contributions: extraContribs,
      lifespan: { 
        remaining: Math.max(0, echo.expiresAt - Date.now()), 
        total: Math.max(1, echo.expiresAt - echo.createdAt) 
      },
    });

    navigate(`/echo/${echo.id}`);
  }, [setCurrentRoom, navigate]);

  const handleRelease = () => {
    navigate('/release');
  };

  const moodsList = ['calm', 'nostalgic', 'heavy', 'curious', 'excited', 'restless'];
  const currentMood = user?.currentMood || moodsList[Math.floor(Date.now() / 3600000) % moodsList.length];
  const moodLabels: Record<string, string> = {
    calm: 'CALM',
    nostalgic: 'NOSTALGIC',
    heavy: 'HEAVY',
    curious: 'CURIOUS',
    excited: 'EXCITED',
    restless: 'RESTLESS',
  };

  const currentEchoesList = activeEchoes.length > 0 ? activeEchoes : mockEchoes;

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background atmospheric glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[600px] bg-secondary-container/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-primary-container/15 rounded-full blur-[140px] z-0" />

      {/* Top Banner Header */}
      <div className="relative z-30 max-w-7xl mx-auto w-full pt-20 px-space-md lg:px-viewport-inset">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest/60 backdrop-blur-xl rounded-full px-space-lg py-space-xs shadow-2xl mb-space-md border border-outline/10"
        >
          <div className="flex items-center gap-space-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm tracking-[0.2em] text-on-surface-variant uppercase">
              Sector: Sol-9 Resonance Grid
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,178,185,0.8)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">
              HARMONIC LOCK 0.941
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-space-md flex items-center justify-between"
        >
          <div>
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">
              GOOD EVENING, <span className="text-primary uppercase">{user?.name?.split(' ')[0] || 'EXPLORER'}</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant font-light">
              THE UNIVERSE IS FEELING <span className="text-primary font-medium">{moodLabels[currentMood] || currentMood.toUpperCase()}</span> TONIGHT.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRelease}
            className="hidden md:flex items-center gap-space-xs px-space-xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ RELEASE A MOMENT</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { logout(); navigate('/'); }}
            className="hidden md:flex items-center gap-space-xs px-space-md py-space-md rounded-full bg-secondary-container/20 text-secondary hover:bg-secondary-container/40 transition-all font-label-sm text-label-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>

      

      {/* Main Spatial Universe Canvas */}
      <div className="relative flex-1 w-full min-h-[550px]">
        <UniverseCanvas
          activeEchoes={currentEchoesList}
          onOrbClick={handleOrbClick}
          highlightedEchoId={highlightedEchoId}
        />
      </div>

      {/* New Echo Created Toast Banner */}
      <AnimatePresence>
        {newEchoToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 pointer-events-auto"
          >
            <div className="bg-primary-container text-on-primary-container px-space-xl py-space-md rounded-2xl shadow-[0_0_40px_rgba(56,189,248,0.6)] border border-primary/40 flex items-center gap-space-sm">
              <span className="text-xl">✦</span>
              <div>
                <p className="font-headline-sm text-headline-sm font-bold">YOUR NEW MOMENT IS HERE ✦</p>
                <p className="font-body-sm text-xs text-on-primary-container/80">Your signal is now reverberating across the living universe.</p>
              </div>
              <button
                onClick={() => setNewEchoToast(false)}
                className="ml-2 text-on-primary-container/60 hover:text-on-primary-container text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* First-time User Guidance Modal */}
      <AnimatePresence>
        {showGuidance && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-space-md"
          >
            <div className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-space-xl max-w-md w-full shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-outline/20 text-center">
              <motion.div
                className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-space-md"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="material-symbols-outlined text-primary text-3xl">explore</span>
              </motion.div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">Explore the Moments Around You</h3>
              <p className="font-body-md text-body-md text-on-surface-variant font-light mb-space-lg">
                Hover or tap an Echo orb to enter a shared moment. Add your thoughts, music, or photos when you are ready.
              </p>
              <motion.button
                onClick={() => setShowGuidance(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-space-xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-md shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all font-semibold"
                type="button"
              >
                ENTER THE UNIVERSE →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UniverseConsole onOrbSelect={setHighlightedEchoId} />
    </div>
  );
}