import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEcho } from '../context/EchoContext';
import { useToast } from '../components/ui/Toast';
import { MomentInput } from '../components/release/MomentInput';
import { MomentTypeSelector } from '../components/release/MomentTypeSelector';
import { MediaUploader } from '../components/release/MediaUploader';
import { AudienceSelector } from '../components/release/AudienceSelector';
import { LifespanSelector } from '../components/release/LifespanSelector';
import { ReleaseAnimation } from '../components/release/ReleaseAnimation';
import type { Echo, ScopeType, LifespanType } from '../types/echo';

const steps = [
  { id: 1, label: 'YOUR MOMENT', description: 'What\'s happening in your world?' },
  { id: 2, label: 'TYPE', description: 'What kind of moment is this?' },
  { id: 3, label: 'ADD MEDIA', description: 'Add a piece of this moment (optional)' },
  { id: 4, label: 'AUDIENCE', description: 'Who can experience this?' },
  { id: 5, label: 'LIFESPAN', description: 'How long should this moment exist?' },
];

export function ReleaseMomentPage() {
  const navigate = useNavigate();
  const { addEcho, addMyEcho } = useEcho();
  const toast = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [content, setContent] = useState('');
  const [momentType, setMomentType] = useState('thought');
  const [scope, setScope] = useState<ScopeType>('universe');
  const [lifespan, setLifespan] = useState<LifespanType>('3h');
  const [isReleasing, setIsReleasing] = useState(false);
  const [newEcho, setNewEcho] = useState<Echo | null>(null);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return content.trim().length > 0;
      case 2: return true;
      case 3: return true;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleRelease();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRelease = async () => {
    if (!content.trim()) return;
    setIsReleasing(true);
    
    const lifespanMs = lifespan === '30m' ? 1800000 : lifespan === '3h' ? 10800000 : lifespan === '24h' ? 86400000 : 19800000;
    
    const newEchoData: Echo = {
      id: `echo-${Date.now()}`,
      type: momentType as Echo['type'],
      content,
      mood: 'nostalgic',
      scope,
      lifespan,
      createdAt: Date.now(),
      expiresAt: Date.now() + lifespanMs,
      authorId: 'current-user',
      resonance: { resonate: 0, signal: 0, hold: 0, ripple: 0 },
      location: { lat: 0, lng: 0, label: 'Unknown' },
    };
    
    setNewEcho(newEchoData);
    addEcho(newEchoData);
    addMyEcho(newEchoData);
    
    setTimeout(() => {
      setIsReleasing(false);
    }, 3000);
  };

  const handleAnimationComplete = () => {
    if (newEcho) {
      toast.addToast('Your Echo is alive. Waiting for the first signal...', 'success');
      setTimeout(() => {
        navigate('/universe');
      }, 500);
    } else {
      navigate('/universe');
    }
  };

  return (
    <div className="bg-surface-container-lowest font-body-md text-on-surface antialiased min-h-screen relative flex flex-col">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,14,14,0.9)_100%)]" />
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-40 px-viewport-inset pt-space-md lg:pt-space-lg pointer-events-none"
      >
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center flex-1 relative"
              >
                <div className="relative flex items-center justify-center">
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="absolute top-1/2 left-full right-0 h-0.5 -translate-y-1/2 -z-10"
                      style={{ background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))' }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentStep > index + 1 ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  )}
                  <motion.div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center font-headline-sm text-headline-sm font-semibold transition-all duration-300 ${
                      currentStep > step.id
                        ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                        : currentStep === step.id
                        ? 'bg-primary-container/30 text-primary ring-2 ring-primary-container/50'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                    animate={{ scale: currentStep === step.id ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: currentStep === step.id ? Infinity : 0 }}
                  >
                    {currentStep > step.id ? (
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    ) : (
                      step.id
                    )}
                  </motion.div>
                </div>
                <span className="font-label-sm text-[10px] uppercase tracking-wider mt-1 text-center max-w-[80px] text-on-surface-variant">
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <main className="w-full relative z-20 min-h-screen flex flex-col items-center justify-center p-space-md pt-32 lg:pt-40 flex-1">
        <div className="flex flex-col w-full">
          <div className="relative w-full max-w-6xl mx-auto px-space-xs sm:px-space-md lg:px-space-xl py-space-xl flex flex-col items-center">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary-container/15 rounded-full blur-[140px] pointer-events-none -z-10" />
            <div className="absolute top-[45%] -right-40 w-[480px] h-[480px] bg-secondary/10 rounded-full blur-[160px] pointer-events-none -z-10" />
            <div className="absolute bottom-10 -left-40 w-[520px] h-[520px] bg-tertiary-container/10 rounded-full blur-[150px] pointer-events-none -z-10" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center flex flex-col items-center space-y-space-xs mb-space-2xl"
            >
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-surface-container/70 backdrop-blur-xl mb-space-xs">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="w-1.5 h-1.5 -ml-2.5 rounded-full bg-primary" />
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">Portal Calibrated // Sector 09-MU</span>
              </div>
              <h1 className="font-display-xl text-display-xl text-on-surface tracking-tight uppercase">
                Release a Moment
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl font-light">
                No permanence. No algorithm. Set a feeling into orbit.
              </p>

              <div className="flex items-center gap-space-lg pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">sensors</span>
                  <span>GRAVITATIONAL DRIFT: 0.04 AU</span>
                </div>
                <span className="opacity-30">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-tertiary">blur_on</span>
                  <span>DECAY RATE: ENTROPIC ZERO</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col space-y-space-2xl"
            >
              {/* Step 1: Your Moment */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="w-full"
                  >
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-space-xs">Step 01 of 05</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{steps[0].label}</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{steps[0].description}</p>
                    </div>
                    <MomentInput
                      value={content}
                      onChange={setContent}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 2: Moment Type */}
              <AnimatePresence mode="wait">
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: currentStep > 2 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentStep > 2 ? -20 : 20 }}
                    className="w-full"
                  >
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-space-xs">Step 02 of 05</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{steps[1].label}</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{steps[1].description}</p>
                    </div>
                    <MomentTypeSelector
                      selectedType={momentType}
                      onSelect={setMomentType}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 3: Media */}
              <AnimatePresence mode="wait">
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: currentStep > 3 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentStep > 3 ? -20 : 20 }}
                    className="w-full"
                  >
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-space-xs">Step 03 of 05</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{steps[2].label}</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{steps[2].description}</p>
                    </div>
                    <MediaUploader />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-space-md text-center"
                    >
                      <motion.button
                        onClick={() => setCurrentStep(4)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all"
                        type="button"
                      >
                        SKIP FOR NOW
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 4: Audience */}
              <AnimatePresence mode="wait">
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: currentStep > 4 ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: currentStep > 4 ? -20 : 20 }}
                    className="w-full"
                  >
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-space-xs">Step 04 of 05</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{steps[3].label}</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{steps[3].description}</p>
                    </div>
                    <AudienceSelector
                      selectedScope={scope}
                      onSelect={setScope}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Step 5: Lifespan */}
              <AnimatePresence mode="wait">
                {currentStep === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="w-full"
                  >
                    <div className="mb-space-md">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary block mb-space-xs">Step 05 of 05</span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">{steps[4].label}</h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{steps[4].description}</p>
                    </div>
                    <LifespanSelector
                      selectedLifespan={lifespan}
                      onSelect={setLifespan}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Final Preview */}
              <AnimatePresence mode="wait">
                {currentStep === 5 && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full"
                  >
                    <div className="mt-space-xl p-space-lg rounded-2xl bg-surface-container-low/70 backdrop-blur-xl border border-outline/20">
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-space-md flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-[20px]">preview</span>
                        YOUR ECHO
                      </h3>
                      <div className="space-y-space-sm text-on-surface-variant font-body-sm text-body-sm">
                        <div className="flex justify-between">
                          <span>Moment</span>
                          <span className="text-on-surface font-medium truncate max-w-[60%]">{content.slice(0, 60)}...</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type</span>
                          <span className="text-on-surface font-medium capitalize">{momentType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Audience</span>
                          <span className="text-on-surface font-medium capitalize">{scope.replace('anon', 'Anonymous')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lifespan</span>
                          <span className="text-on-surface font-medium capitalize">{lifespan === 'dawn' ? 'Until Dawn' : lifespan}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center pt-space-md"
              >
                <div className="w-full flex items-center justify-between mb-space-md">
                  {currentStep > 1 && (
                    <motion.button
                      onClick={handleBack}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-space-lg py-space-sm rounded-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px] mr-1">arrow_back</span>
                      BACK
                    </motion.button>
                  )}

                  {currentStep < 5 ? (
                    <motion.button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        group relative px-space-xl py-space-sm rounded-full
                        bg-primary-container text-on-primary-container font-headline-sm text-body-sm
                        shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]
                        transition-all flex items-center gap-space-xs
                        ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      type="button"
                    >
                      <span className="relative z-10">CONTINUE</span>
                      <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={handleRelease}
                      disabled={isReleasing || !content.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        group relative px-space-2xl py-space-lg rounded-full
                        bg-gradient-to-r from-primary via-primary-container to-secondary
                        text-on-primary font-headline-md text-headline-sm tracking-wider uppercase font-semibold
                        transition-all duration-500 hover:scale-105
                        shadow-[0_0_50px_rgba(123,208,255,0.4)]
                        hover:shadow-[0_0_80px_rgba(255,178,185,0.6)]
                        flex items-center gap-space-md overflow-hidden
                        ${!content.trim() || isReleasing ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      type="button"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                      <span className="material-symbols-outlined text-2xl group-hover:rotate-45 transition-transform duration-500 relative z-10">flare</span>
                      <span className="relative z-10">✦ RELEASE THIS ECHO</span>
                      <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform relative z-10">arrow_forward</span>
                    </motion.button>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="w-full max-w-2xl p-space-md rounded-full bg-surface-container-low/90 backdrop-blur-xl shadow-lg flex items-center justify-between px-space-lg"
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
                    <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest">Simulation Active</span>
                  </div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-xs sm:max-w-md">
                    Echo orb condensing from stardust... <span className="text-primary">0 souls waiting</span> → <span className="text-secondary font-medium">3 souls tuned in</span>.
                  </div>
                  <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant/60">
                    <span className="material-symbols-outlined text-sm">wifi_tethering</span>
                    <span className="hidden sm:inline">98.2% SYNC</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <ReleaseAnimation
          isReleasing={isReleasing}
          onComplete={handleAnimationComplete}
        />
      </main>
    </div>
  );
}