import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useEcho } from '../context/EchoContext';

export function ProfilePage() {
  const { user, updatePreferences, updateProfile } = useUser();
  const { logout } = useAuth();
  const { myEchoes } = useEcho();

  const stats = {
    created: myEchoes.length,
    experienced: user?.trail?.length || 0,
    connections: user?.constellations?.length || 0,
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!user) {
    return null;
  }

  const moodColors: Record<string, string> = {
    calm: '#8ed5ff',
    nostalgic: '#ffb2b9',
    heavy: '#ff97a3',
    curious: '#4ee6aa',
    excited: '#c4e7ff',
    restless: '#ffb2b9',
  };

  const moodEmojis: Record<string, string> = {
    calm: '🌊',
    nostalgic: '🌧️',
    heavy: '🌑',
    curious: '🔭',
    excited: '✨',
    restless: '🌙',
  };

  const currentMoodColor = user.currentMood ? moodColors[user.currentMood] || '#8ed5ff' : '#8ed5ff';
  const currentMoodEmoji = user.currentMood ? moodEmojis[user.currentMood] || '✦' : '✦';

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
          <div className="relative w-28 h-28 mb-space-md">
            <motion.div
              className={`absolute inset-0 rounded-full ${user.avatarColor} flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)]`}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-5xl">{currentMoodEmoji}</span>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed"
              style={{ borderColor: currentMoodColor + '80' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-tertiary flex items-center justify-center ring-4 ring-surface-container-lowest">
              <span className="material-symbols-outlined text-on-tertiary text-[16px]">edit</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-space-xs">
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">{user.name}</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">@{user.username}</p>
            <div className="flex items-center gap-space-sm mt-space-xs px-space-md py-space-xs rounded-full bg-surface-container-low/60 backdrop-blur-xl">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentMoodColor }} />
              <span className="font-label-sm text-label-sm capitalize" style={{ color: currentMoodColor }}>{user.currentMood || 'Nostalgic'}</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-space-md mb-space-xl"
        >
          {[
            { label: 'Moments Created', value: stats.created, icon: 'auto_awesome', color: 'primary' },
            { label: 'Moments Experienced', value: stats.experienced, icon: 'favorite', color: 'secondary' },
            { label: 'Connections Formed', value: stats.connections, icon: 'people', color: 'tertiary' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className="group relative bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-space-md shadow-xl border border-outline/10 text-center"
            >
              <div className="flex items-center justify-center gap-space-xs mb-space-xs">
                <span className="material-symbols-outlined text-[24px]" style={{ color: `var(--color-${stat.color})` }}>{stat.icon}</span>
              </div>
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="font-display-md text-display-md text-on-surface block"
              >
                {stat.value}
              </motion.span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-space-xl"
        >
          <h2 className="font-headline-md text-headline-md text-on-surface mb-space-md flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-[24px]">trail_sign</span>
            Your Moment Trail
          </h2>
          <div className="space-y-space-md">
            {myEchoes.slice(0, 3).length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-space-xl bg-surface-container-low/60 backdrop-blur-xl rounded-2xl border border-outline/10"
              >
                <span className="material-symbols-outlined text-primary text-4xl mb-space-sm block">auto_awesome</span>
                <p className="font-body-md text-body-md text-on-surface-variant font-light mb-space-md">
                  Your trail is empty. Release your first moment to begin.
                </p>
                <Link
                  to="/release"
                  className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-sm shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all"
                >
                  <span>Release a Moment</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </motion.div>
            ) : (
              myEchoes.slice(0, 3).map((echo) => (
                <motion.div
                  key={echo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-space-md p-space-md bg-surface-container-low/60 backdrop-blur-xl rounded-xl border border-outline/10 hover:border-primary/30 transition-all"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: `linear-gradient(135deg, ${currentMoodColor}20, ${currentMoodColor}40)` }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">{currentMoodEmoji}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-sm text-body-sm text-on-surface truncate">{echo.content?.slice(0, 50) || 'Untitled Moment'}</p>
                    <div className="flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm mt-1">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                        {echo.resonance ? echo.resonance.resonate + echo.resonance.signal + echo.resonance.hold + echo.resonance.ripple : 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        {formatTimeRemaining(echo.expiresAt)}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-primary-container/20 text-primary hover:bg-primary-container/40 transition-all"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </motion.button>
                </motion.div>
              ))
            )}
            {myEchoes.length > 3 && (
              <Link
                to="/moments"
                className="block text-center px-space-md py-space-sm rounded-xl bg-surface-container-low/60 backdrop-blur-xl border border-outline/10 hover:border-primary/30 transition-all"
              >
                <span className="font-label-sm text-label-sm text-primary">View all {myEchoes.length} moments →</span>
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-low/60 backdrop-blur-xl rounded-2xl p-space-md shadow-xl border border-outline/10"
        >
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-md flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-[20px]">person</span>
            Profile Settings
          </h3>
          <div className="space-y-space-md">
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Name</label>
              <input
                type="text"
                defaultValue={user.name}
                onBlur={(e) => updateProfile({ name: e.target.value })}
                className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline/20 text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Username</label>
              <input
                type="text"
                defaultValue={user.username}
                onBlur={(e) => updateProfile({ username: e.target.value })}
                className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline/20 text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                onBlur={(e) => updateProfile({ email: e.target.value })}
                className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline/20 text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Alias</label>
              <input
                type="text"
                defaultValue={user.alias}
                onBlur={(e) => updateProfile({ alias: e.target.value })}
                className="w-full px-space-md py-space-sm rounded-xl bg-surface-container-lowest/80 backdrop-blur-xl border border-outline/20 text-on-surface placeholder-on-surface-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
          </div>

          <h3 className="font-headline-sm text-headline-sm text-on-surface mt-space-lg mb-space-md flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-[20px]">settings</span>
            Preferences
          </h3>
          <div className="space-y-space-md">
            <label className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface">Audio Enabled</span>
              <input
                type="checkbox"
                checked={user.preferences?.audioEnabled}
                onChange={(e) => updatePreferences({ audioEnabled: e.target.checked })}
                className="w-5 h-5 rounded border-outline/30 text-primary focus:ring-primary-container focus:ring-2 accent-primary"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface">Haptic Feedback</span>
              <input
                type="checkbox"
                checked={user.preferences?.hapticsEnabled}
                onChange={(e) => updatePreferences({ hapticsEnabled: e.target.checked })}
                className="w-5 h-5 rounded border-outline/30 text-primary focus:ring-primary-container focus:ring-2 accent-primary"
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface">Reduced Motion</span>
              <input
                type="checkbox"
                checked={user.preferences?.reducedMotion}
                onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                className="w-5 h-5 rounded border-outline/30 text-primary focus:ring-primary-container focus:ring-2 accent-primary"
              />
            </label>
          </div>
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-space-lg px-space-lg py-space-sm rounded-full bg-secondary-container/20 text-secondary font-headline-sm text-label-sm hover:bg-secondary-container/40 transition-all flex items-center justify-center gap-space-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

function formatTimeRemaining(expiresAt: number): string {
  const remaining = expiresAt - Date.now();
  if (remaining <= 0) return 'Ended';
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}