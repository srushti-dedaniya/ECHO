import { motion } from 'framer-motion';

export function EchoHeader({ 
  title, 
  mood, 
  soulsCount, 
  lifespan, 
  onBack,
}: {
  title: string;
  mood: string;
  soulsCount: number;
  lifespan: { remaining: number; total: number };
  onBack?: () => void;
}) {


  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-space-md lg:px-viewport-inset pt-space-xs">
      <div className="h-20 max-w-5xl mx-auto flex items-center justify-between">
        <div className="w-full flex items-center justify-between bg-surface-container-lowest/70 backdrop-blur-xl rounded-full px-space-lg py-space-xs shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-space-md">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack || (() => window.history.back())}
              className="p-1.5 rounded-full bg-surface-container-low hover:bg-surface-container transition-all"
              type="button"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-on-surface text-[20px]">chevron_left</span>
            </motion.button>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-headline-sm text-headline-sm tracking-wider text-on-surface uppercase"
            >
              ECHO
            </motion.div>
            <div className="hidden lg:flex items-center gap-space-2xs pl-space-sm border-l border-outline-variant/30">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
                ATMOSPHERE: 68% NOSTALGIC · 4,892 LIVE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-0.5 rounded-full bg-surface-container-high hover:bg-primary-container transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-space-md lg:px-viewport-inset pt-space-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low/70 backdrop-blur-2xl rounded-lg p-space-md shadow-2xl"
        >
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-secondary-container/30 text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-widest">
                {mood.toUpperCase()} FREQUENCY
              </span>
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md tracking-tight text-on-surface">
                {title.toUpperCase()}
              </h1>
              <p className="font-label-sm text-label-sm text-primary flex items-center gap-space-2xs mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {soulsCount} SOULS BREATHING TOGETHER RIGHT NOW
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-lg self-start md:self-auto">
            <div className="hidden sm:flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-high/60 backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-[20px] animate-spin" style={{ animationDuration: '8s' }}>
                album
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[190px]">
                  IKTARA (RAIN REWORK)
                </span>
                <span className="font-label-sm text-label-sm text-tertiary">
                  432Hz · 19 IN HARMONY
                </span>
              </div>
            </div>

            <div className="flex items-center gap-space-xs pl-space-xs">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-variant"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${(lifespan.remaining / lifespan.total) * 100}, 100`}
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
                <span className="absolute material-symbols-outlined text-secondary text-[16px]">timelapse</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">LIFESPAN</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                  {formatTime(lifespan.remaining)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}