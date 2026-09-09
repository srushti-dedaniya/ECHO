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
import { moods } from '../types/mood';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

export function UniversePage() {
  const navigate = useNavigate();
  const { activeEchoes, setCurrentRoom, newlyCreatedEchoId, setNewlyCreatedEchoId } = useEcho();
  const { user } = useUser();
  const { logout } = useAuth();
  const [showGuidance, setShowGuidance] = useState(false);
  const [guidanceStep, setGuidanceStep] = useState(0);
  const [newEchoToast, setNewEchoToast] = useState(false);
  const [highlightedEchoId, setHighlightedEchoId] = useState<string | null>(null);
  const [showWhyEcho, setShowWhyEcho] = useState(false);

  const moodsList = ['calm', 'nostalgic', 'heavy', 'curious', 'excited', 'restless'];
  const currentMood = user?.currentMood || moodsList[Math.floor(Date.now() / 3600000) % moodsList.length];
  const emotionalGravity = 0.6;

  useEffect(() => {
    const seen = localStorage.getItem('echo-has-seen-universe-guide');
    if (!seen) {
      const timer = setTimeout(() => {
        setShowGuidance(true);
        setGuidanceStep(0);
        localStorage.setItem('echo-has-seen-universe-guide', 'true');
      }, 1500);
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

  const handleSurpriseMe = useCallback(() => {
    console.log('Surprise me triggered from page');
  }, []);

  const moodLabels: Record<string, string> = {
    calm: 'CALM',
    nostalgic: 'NOSTALGIC',
    heavy: 'HEAVY',
    curious: 'CURIOUS',
    excited: 'EXCITED',
    restless: 'RESTLESS',
  };

  const currentEchoesList = activeEchoes.length > 0 ? activeEchoes : mockEchoes;

  const guidanceSteps = [
    {
      title: 'These aren\'t posts.',
      description: 'Each orb is a living moment — a shared feeling that exists in time and space.',
      emoji: '✦',
      color: 'text-primary',
    },
    {
      title: 'You don\'t follow people.',
      description: 'You follow moments. When you resonate with a feeling, you enter its orbit.',
      emoji: '🌌',
      color: 'text-secondary',
    },
    {
      title: 'Find the one that feels like you.',
      description: 'Drag to explore. Click an orb to enter. Release your own moment when ready.',
      emoji: '🚀',
      color: 'text-tertiary',
    },
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background atmospheric glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[600px] bg-secondary-container/20 rounded-full blur-[160px] z-0" />
      <div className="pointer-events-none absolute bottom-12 right-1/4 w-[500px] h-[500px] bg-primary-container/15 rounded-full blur-[140px] z-0" />
      {currentMood && emotionalGravity > 0 && (
        <div className="pointer-events-none absolute center-center w-[600px] h-[600px] rounded-full blur-[200px] z-0" 
          style={{ background: `radial-gradient(ellipse at center, ${moodConfig[currentMood]?.color}15, transparent 70%)` }} 
        />
      )}

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
              <span className="relative w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-[10px]">🌧️</span>
              </span>
              <span className="relative w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px]">💧</span>
              </span>
              <span className="relative w-6 h-6 rounded-full bg-tertiary/20 flex items-center justify-center">
                <span className="text-[10px]">🔍</span>
              </span>
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

        {/* Why ECHO? Interactive comparison */}
        <AnimatePresence>
          {showWhyEcho && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-space-md overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-space-lg border border-outline/10"
              >
                <div className="flex items-center justify-between mb-space-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                    <span className="text-2xl">❓</span>
                    WHY ECHO?
                  </h3>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowWhyEcho(false)}
                    className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                    type="button"
                    aria-label="Close Why ECHO"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </motion.button>
                </div>
                
                <div className="space-y-space-md">
                  <div className="grid md:grid-cols-2 gap-space-lg">
                    <div className="p-space-md rounded-xl bg-tertiary/10 border border-tertiary/20">
                      <div className="flex items-center gap-2 mb-space-sm">
                        <span className="text-2xl">📱</span>
                        <span className="font-headline-sm text-headline-sm text-tertiary">TRADITIONAL SOCIAL</span>
                      </div>
                      <ul className="space-y-2 text-on-surface-variant font-body-sm">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-tertiary/30 flex items-center justify-center text-tertiary text-[10px]">1</span> Follow people</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-tertiary/30 flex items-center justify-center text-tertiary text-[10px]">2</span> Scroll infinite feed</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-tertiary/30 flex items-center justify-center text-tertiary text-[10px]">3</span> Like posts</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-tertiary/30 flex items-center justify-center text-tertiary text-[10px]">4</span> Chase attention</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-tertiary/30 flex items-center justify-center text-tertiary text-[10px]">5</span> Permanent profile</li>
                      </ul>
                    </div>
                    
                    <div className="p-space-md rounded-xl bg-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-space-sm">
                        <span className="text-2xl">✦</span>
                        <span className="font-headline-sm text-headline-sm text-primary">ECHO</span>
                      </div>
                      <ul className="space-y-2 text-on-surface-variant font-body-sm">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-[10px]">1</span> Find moments</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-[10px]">2</span> Explore spatial universe</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-[10px]">3</span> Resonate (4 ways)</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-[10px]">4</span> Feel connection</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary text-[10px]">5</span> Moments fade naturally</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="pt-space-md border-t border-outline/10">
                    <p className="font-body-md text-body-md text-on-surface-variant font-light text-center">
                      ECHO is a <span className="font-medium text-primary">living social universe</span> where temporary shared moments 
                      replace permanent profiles. No followers. No likes. Just resonance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Spatial Universe Canvas */}
      <div className="relative flex-1 w-full min-h-[550px]">
        <UniverseCanvas
          activeEchoes={currentEchoesList}
          onOrbClick={handleOrbClick}
          highlightedEchoId={highlightedEchoId}
          userMood={currentMood}
          emotionalGravity={emotionalGravity}
          onSurpriseMe={handleSurpriseMe}
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

      {/* First-time User Guided Experience - 3 Step Overlay */}
      <AnimatePresence>
        {showGuidance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-space-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-space-xl max-w-md w-full shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-outline/20 text-center relative"
            >
              <div className="mb-space-md">
                <span className={`text-4xl ${guidanceSteps[guidanceStep].color}`}>
                  {guidanceSteps[guidanceStep].emoji}
                </span>
                <div className="h-1 w-24 mx-auto mt-2 bg-primary/20 relative overflow-hidden">
                  <motion.div
                    className="h-full bg-primary absolute top-0 left-0"
                    initial={{ width: 0 }}
                    animate={{ width: `${((guidanceStep + 1) / guidanceSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
              
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">
                {guidanceSteps[guidanceStep].title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant font-light mb-space-lg">
                {guidanceSteps[guidanceStep].description}
              </p>
              
              <div className="flex gap-space-sm">
                {guidanceStep > 0 && (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setGuidanceStep(s => s - 1)}
                    className="flex-1 px-space-xl py-space-md rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all"
                    type="button"
                  >
                    BACK
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (guidanceStep < guidanceSteps.length - 1) {
                      setGuidanceStep(s => s + 1);
                    } else {
                      setShowGuidance(false);
                    }
                  }}
                  className={`flex-1 px-space-xl py-space-md rounded-full font-headline-sm text-body-md shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all font-semibold ${
                    guidanceStep === guidanceSteps.length - 1
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-tertiary text-tertiary'
                  }`}
                  type="button"
                >
                  {guidanceStep === guidanceSteps.length - 1 ? 'ENTER THE UNIVERSE →' : 'NEXT →'}
                </motion.button>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGuidance(false)}
                className="mt-space-sm w-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm"
                type="button"
              >
                SKIP
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Why ECHO? Trigger Button - bottom left */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowWhyEcho(true)}
        className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl border border-outline/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 transition-all"
        type="button"
        aria-label="Why ECHO? Learn the difference"
      >
        <span className="text-[20px]">❓</span>
        <motion.span 
          className="absolute -right-24 top-1/2 -translate-y-1/2 whitespace-nowrap font-label-sm text-label-sm text-on-surface-variant bg-surface-container-lowest/90 backdrop-blur-xl px-2 py-1 rounded-md shadow-lg border border-outline/20 opacity-0"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Why ECHO?
        </motion.span>
      </motion.button>

      <UniverseConsole onOrbSelect={setHighlightedEchoId} />
    </div>
  );
}