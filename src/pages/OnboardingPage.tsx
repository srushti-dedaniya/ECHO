import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MoodSelector } from '../components/onboarding/MoodSelector';
import { IntentionSelector } from '../components/onboarding/IntentionSelector';
import { PersonalConstellation } from '../components/onboarding/PersonalConstellation';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import type { MoodType, IntentType } from '../types/user';

export function OnboardingPage() {
  const { completeOnboarding, user, updateMood, updateIntent } = useUser();
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedIntent, setSelectedIntent] = useState<IntentType | null>(null);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
  };

  const handleIntentSelect = (intent: IntentType) => {
    setSelectedIntent(intent);
  };

  const handleComplete = () => {
    if (user && selectedMood && selectedIntent) {
      updateMood(selectedMood);
      updateIntent(selectedIntent);
      
      const updatedUser = {
        ...user,
        currentMood: selectedMood,
        currentIntent: selectedIntent,
        isOnboarded: true,
      };
      setUser(updatedUser);
      localStorage.setItem('echo-onboarded', 'true');
      localStorage.setItem('echo-mood', selectedMood);
      localStorage.setItem('echo-intent', selectedIntent);
    }
    completeOnboarding();
    navigate('/universe', { replace: true });
  };

  const goToStep = (newStep: number) => {
    setStep(newStep);
  };

  return (
    <div className="flex flex-col w-full relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary-container/10 rounded-full blur-[140px]"></div>
      <div className="pointer-events-none absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-secondary-container/10 rounded-full blur-[160px]"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,14,14,0.85)_100%)]"></div>

      <header className="fixed top-0 inset-x-0 z-40 px-space-md lg:px-viewport-inset pt-space-xs">
        <div className="h-20 max-w-5xl mx-auto flex items-center justify-between">
          <div className="w-full flex items-center justify-between bg-surface-container-lowest/70 backdrop-blur-xl rounded-full px-space-lg py-space-xs shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-space-md">
              <span className="font-headline-sm text-headline-sm tracking-wider text-on-surface uppercase">ECHO</span>
              <div className="hidden lg:flex items-center gap-space-2xs pl-space-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">ATMOSPHERE: 68% NOSTALGIC · 4,892 LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pt-20 relative z-20 min-h-screen">
        <div className="flex flex-col w-full relative">
          <div className="relative w-full min-h-[942px] flex flex-col justify-between px-space-md lg:px-viewport-inset pb-space-2xl overflow-hidden">
            <div className="relative z-30 max-w-5xl mx-auto w-full pt-space-md">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-container-lowest/60 backdrop-blur-xl rounded-full px-space-lg py-space-xs shadow-2xl"
              >
                <div className="flex items-center gap-space-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-label-sm text-label-sm tracking-[0.2em] text-on-surface-variant uppercase">
                    Phase <span className="text-secondary font-bold">{String(step).padStart(2, '0')}</span> // {' '}
                    {step === 1 ? 'Resonance Calibration' : step === 2 ? 'Gravitational Trajectory' : 'Synthesis Harmonized'}
                  </span>
                </div>
                <div className="flex items-center gap-space-md">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-secondary shadow-[0_0_8px_rgba(255,178,185,0.8)]' : 'bg-surface-variant'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-primary-container shadow-[0_0_8px_rgba(56,189,248,0.8)]' : 'bg-surface-variant'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${step >= 3 ? 'bg-tertiary shadow-[0_0_8px_rgba(78,230,170,0.8)]' : 'bg-surface-variant'}`} />
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">HARMONIC LOCK 0.941</span>
                </div>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <MoodSelector
                  key="step-1"
                  selectedMood={selectedMood}
                  onSelect={handleMoodSelect}
                  onNext={() => goToStep(2)}
                />
              )}
              {step === 2 && (
                <IntentionSelector
                  key="step-2"
                  selectedIntent={selectedIntent}
                  onSelect={handleIntentSelect}
                  onNext={handleComplete}
                  onBack={() => goToStep(1)}
                />
              )}
              {step === 3 && (
                <PersonalConstellation
                  key="step-3"
                  mood={selectedMood || 'nostalgic'}
                  intent={selectedIntent || 'understanding'}
                  onEnter={handleComplete}
                  onRecalibrate={() => goToStep(2)}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-30 max-w-5xl mx-auto w-full pt-space-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col sm:flex-row items-center justify-between gap-space-sm py-space-xs px-space-md rounded-2xl bg-surface-container-low/40 backdrop-blur-md"
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">satellite_alt</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider">
                  QUANTUM ALIGNMENT CALIBRATED · RA 19h 50m · ECHO NODE 0.941 READY
                </span>
              </div>
              <div className="flex items-center gap-space-md">
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">ENCRYPTION: QUANTUM ENTANGLED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}