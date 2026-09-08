import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEcho } from '../context/EchoContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import { mockEchoes } from '../data/echoes';

export function MomentsPage() {
  const { myEchoes } = useEcho();
  const { user } = useUser();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'created' | 'experienced' | 'constellations'>('created');

  const trail = user?.trail || [];
  const constellations = user?.constellations || [];
  const createdEchoes = myEchoes.length > 0 ? myEchoes : (isAuthenticated ? [] : mockEchoes.slice(0, 2));
  const experiencedEchoes = trail.length > 0 ? trail : (isAuthenticated ? [] : mockEchoes.slice(2, 4));

  useEffect(() => {
    if (!isAuthenticated) {
      toast.addToast('Sign in to see your moment trail', 'info');
    }
  }, [isAuthenticated, toast]);

  return (
    <div className="relative min-h-screen bg-surface-container-lowest flex flex-col overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,14,14,0.85)_100%)]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 w-full max-w-5xl mx-auto px-space-md lg:px-viewport-inset pt-28 pb-space-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center mb-space-xl"
        >
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-tertiary inline-block mb-space-xs animate-pulse">
            Moment Trail
          </span>
          <h1 className="font-display-xl text-display-xl text-on-surface tracking-tight">My Moment Trail</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm font-light max-w-xl">
            Every moment you've created and experienced. A constellation of your presence across the universe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-space-xs mb-space-xl bg-surface-container-low/60 backdrop-blur-xl rounded-full p-1 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {[
            { id: 'created', label: 'Created', count: createdEchoes.length },
            { id: 'experienced', label: 'Experienced', count: experiencedEchoes.length },
            { id: 'constellations', label: 'Constellations', count: constellations.length },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-space-xs px-space-md py-space-sm rounded-full font-label-sm text-label-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
              type="button"
            >
              <span>{tab.label}</span>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center text-[10px] font-medium"
              >
                {tab.count}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'created' && (
              <motion.div
                key="created"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-space-md"
              >
                {createdEchoes.length === 0 ? (
                  <EmptyState
                    title="No Moments Created Yet"
                    description="Your trail begins with a single release. Set a feeling into orbit and watch it find its resonance."
                    actionLabel="+ Release a Moment"
                    onAction={() => navigate('/release')}
                  />
                ) : (
                  createdEchoes.map((echo) => (
                    <MomentTrailCard key={echo.id} echo={echo} type="created" />
                  ))
                )}
              </motion.div>
            )}
            {activeTab === 'experienced' && (
              <motion.div
                key="experienced"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-space-md"
              >
                {experiencedEchoes.length === 0 ? (
                  <EmptyState
                    title="No Moments Experienced Yet"
                    description="Enter an echo from the universe. Your presence becomes part of someone else's moment, and theirs becomes part of yours."
                    actionLabel="Explore Universe"
                    onAction={() => navigate('/universe')}
                  />
                ) : (
                  experiencedEchoes.map((echo) => (
                    <MomentTrailCard key={echo.id} echo={echo} type="experienced" />
                  ))
                )}
              </motion.div>
            )}
            {activeTab === 'constellations' && (
              <motion.div
                key="constellations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-space-md"
              >
                {constellations.length === 0 ? (
                  <EmptyState
                    title="No Constellations Formed"
                    description="Constellations form when you repeatedly resonate with the same souls. Keep returning to moments that matter."
                    actionLabel="Explore Universe"
                    onAction={() => navigate('/universe')}
                  />
                ) : (
                  constellations.map((constellation) => (
                    <ConstellationCard key={constellation.id} constellation={constellation} />
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MomentTrailCard({ echo, type }: { echo: any; type: 'created' | 'experienced' }) {
  const moodColors: Record<string, string> = {
    calm: '#8ed5ff',
    nostalgic: '#ffb2b9',
    heavy: '#ff97a3',
    curious: '#4ee6aa',
    excited: '#c4e7ff',
    restless: '#ffb2b9',
  };

  const color = moodColors[echo.mood] || '#8ed5ff';
  const totalResonance = echo.resonance 
    ? echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple
    : 0;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="group relative bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-space-md shadow-xl border border-outline/10 hover:border-primary/30 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-space-md">
        <div className="flex items-start gap-space-md flex-1 min-w-0">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0" style={{ background: `linear-gradient(135deg, ${color}20, ${color}40)` }}>
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">{getMoodEmoji(echo.mood)}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-space-sm mb-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface truncate block">
                {echo.content?.slice(0, 60) || 'Untitled Moment'}{echo.content?.length > 60 ? '...' : ''}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
                {echo.type?.toUpperCase() || 'THOUGHT'}
              </span>
            </div>
            <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                {echo.mood}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                {totalResonance} resonance
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {formatTimeRemaining(echo.expiresAt)}
              </span>
            </div>
            {type === 'created' && (
              <div className="mt-space-xs flex items-center gap-space-sm text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">star</span>
                <span>You created this moment</span>
              </div>
            )}
            {type === 'experienced' && (
              <div className="mt-space-xs flex items-center gap-space-sm text-tertiary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">favorite</span>
                <span>You experienced this moment</span>
              </div>
            )}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 px-space-md py-space-sm rounded-full bg-primary-container/20 text-primary font-label-sm text-label-sm hover:bg-primary-container/40 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </motion.button>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl"
        style={{ backgroundColor: color }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </motion.div>
  );
}

function ConstellationCard({ constellation }: { constellation: any }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="group relative bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-space-md shadow-xl border border-outline/10 hover:border-tertiary/30 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-tertiary/20 to-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-tertiary text-3xl">stars</span>
            <motion.div
              className="absolute inset-0 rounded-2xl border border-tertiary/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{constellation.name || 'Unnamed Constellation'}</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {constellation.members?.length || 0} souls · {constellation.sharedEchoes || 0} shared moments
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 px-space-md py-space-sm rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm hover:bg-tertiary-container/40 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel: string; onAction: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-space-3xl px-space-lg"
    >
      <div className="relative w-24 h-24 mx-auto mb-space-lg">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-container/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-dashed border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative w-full h-full rounded-full bg-surface-container-lowest flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-3xl">trail_sign</span>
        </div>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-space-sm">{title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant font-light max-w-md mx-auto mb-space-xl">{description}</p>
      <motion.button
        onClick={onAction}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-space-xs px-space-xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] hover:scale-105 transition-all"
        type="button"
      >
        <span>{actionLabel}</span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </motion.button>
    </motion.div>
  );
}

function getMoodEmoji(mood: string): string {
  const emojis: Record<string, string> = {
    calm: '🌊',
    nostalgic: '🌧️',
    heavy: '🌑',
    curious: '🔭',
    excited: '✨',
    restless: '🌙',
  };
  return emojis[mood] || '✦';
}

function formatTimeRemaining(expiresAt: number): string {
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) return 'Ended';
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}