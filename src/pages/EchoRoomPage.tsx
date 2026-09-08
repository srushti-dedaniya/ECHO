import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { EchoHeader } from '../components/echo-room/EchoHeader';
import { MomentCanvas } from '../components/echo-room/MomentCanvas';
import { ReactionBar } from '../components/echo-room/ReactionBar';
import { HumanConstellation } from '../components/echo-room/HumanConstellation';
import { AddContribution } from '../components/echo-room/AddContribution';
import { mockEchoes } from '../data/echoes';
import { useEcho } from '../context/EchoContext';
import { useToast } from '../components/ui/Toast';

export function EchoRoomPage() {
  const { id } = useParams<{ id: string }>();
  const { activeEchoes, setCurrentRoom, updateResonance } = useEcho();
  const toast = useToast();
  const echo = activeEchoes.find(e => e.id === id) || mockEchoes[0];
  const [showGuidance, setShowGuidance] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(`echo-guidance-${id}`);
    if (!seen) {
      setTimeout(() => {
        setShowGuidance(true);
        localStorage.setItem(`echo-guidance-${id}`, 'true');
      }, 1000);
    }
  }, [id]);

  useEffect(() => {
    setCurrentRoom({
      id: echo.id,
      title: echo.content.slice(0, 30) + '...',
      mood: echo.mood,
      echo,
      participants: [],
      contributions: [],
      lifespan: { 
        remaining: echo.expiresAt - Date.now(), 
        total: echo.expiresAt - echo.createdAt 
      },
    });
  }, [echo, setCurrentRoom]);

  const handleContributionSubmit = (_data: { content: string; media: string[]; type: 'photo' | 'thought' | 'voice' | 'music' }) => {
    toast.addToast('Your piece is now part of this moment', 'success');
  };

  const handleReact = (type: 'resonate' | 'signal' | 'hold' | 'ripple') => {
    updateResonance(echo.id, type, 1);
    const messages: Record<string, string> = {
      resonate: 'You resonated ✦',
      signal: 'You signaled 〰',
      hold: 'You\'re holding space ◯',
      ripple: 'You rippled 🌊',
    };
    // Map reaction types to toast types
    const toastTypeMap: Record<string, 'success' | 'info' | 'resonance' | 'signal' | 'hold' | 'ripple'> = {
      resonate: 'resonance',
      signal: 'signal',
      hold: 'hold',
      ripple: 'ripple',
    };
    toast.addToast(messages[type], toastTypeMap[type]);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="w-full pt-20 relative z-20 min-h-screen">
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary-container/10 rounded-full blur-[140px] mix-blend-screen animate-pulse" style={{ animationDuration: '1000ms' }} />
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-secondary-container/15 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[520px] h-[520px] bg-tertiary-container/10 rounded-full blur-[130px] mix-blend-screen" />
        
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="90" id="rain-pattern" patternTransform="rotate(18)" patternUnits="userSpaceOnUse" width="60">
              <line opacity="0.6" stroke="#7bd0ff" strokeDasharray="8,12" strokeLinecap="round" strokeWidth="0.75" x1="10" x2="10" y1="0" y2="24" />
              <line opacity="0.4" stroke="#ffb2b9" strokeDasharray="6,16" strokeLinecap="round" strokeWidth="0.5" x1="38" x2="38" y1="20" y2="48" />
              <line opacity="0.5" stroke="#ffffff" strokeDasharray="4,20" strokeLinecap="round" strokeWidth="0.6" x1="52" x2="52" y1="45" y2="78" />
            </pattern>
          </defs>
          <rect fill="url(#rain-pattern)" height="100%" width="100%" />
        </svg>
      </div>

      <EchoHeader
        title={echo.content.slice(0, 40).toUpperCase()}
        mood={echo.mood}
        soulsCount={echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple}
        lifespan={{ remaining: echo.expiresAt - Date.now(), total: echo.expiresAt - echo.createdAt }}
      />

      <main className="w-full pt-20 relative z-20 min-h-screen">
        <div className="flex flex-col w-full relative overflow-hidden text-on-surface select-none">
          <div className="relative z-20 max-w-7xl mx-auto w-full px-space-md lg:px-viewport-inset py-space-md flex flex-col gap-space-xl">
            <MomentCanvas echo={echo} />

            <ReactionBar echo={echo} onReact={handleReact} />

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-space-md">
              <HumanConstellation echoes={mockEchoes} currentEchoId={echo.id} />
              
              <div className="flex flex-col gap-space-md">
                <AddContribution onSubmit={handleContributionSubmit} onCancel={() => {}} />
              </div>
            </div>

            <div className="w-full rounded-xl bg-gradient-to-r from-surface-container-low/90 via-secondary-container/20 to-surface-container-low/90 backdrop-blur-2xl p-space-lg shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center text-secondary shrink-0 shadow-lg">
                  <span className="material-symbols-outlined text-[24px]">hourglass_bottom</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">This moment dissolves into stardust in {formatTime(echo.expiresAt - Date.now())}.</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Nothing here is permanent or indexed. Leave an echo before the rain stops.
                  </p>
                </div>
              </div>
              <Link
                to="/release"
                className="flex items-center gap-space-sm w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-md shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-space-xs"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_fix</span>
                  <span>+ Release a Moment</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showGuidance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-space-md pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="relative w-full max-w-md bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-space-xl shadow-[0_0_60px_rgba(0,0,0,0.9)] border border-outline/20 text-center pointer-events-auto"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto mb-space-md"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="material-symbols-outlined text-primary text-3xl">touch_app</span>
              </motion.div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">You've Entered a Shared Moment</h3>
              <p className="font-body-md text-body-md text-on-surface-variant font-light mb-space-lg">
                Explore what others have added. Add something when you're ready. Your presence is already felt.
              </p>
              <motion.button
                onClick={() => setShowGuidance(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-space-xl py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all"
                type="button"
              >
                ENTER THE MOMENT
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="fixed bottom-space-md left-space-md lg:left-viewport-inset z-40 pointer-events-none hidden sm:block">
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-lg">
          <span className="material-symbols-outlined text-primary text-[16px] animate-spin">graphic_eq</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">432Hz HARMONIC RESONANCE</span>
        </div>
      </aside>
      <aside className="fixed bottom-space-md right-space-md lg:right-viewport-inset z-40 pointer-events-none hidden sm:block">
        <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-lg">
          <span className="material-symbols-outlined text-secondary text-[16px]">explore</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">SPATIAL: 37.7749° N · ORBIT 108</span>
        </div>
      </aside>
    </div>
  );
}