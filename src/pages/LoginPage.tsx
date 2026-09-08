import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, demoLogin, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as { from?: Location })?.from?.pathname || '/universe';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    demoLogin();
    navigate(from, { replace: true });
  };

  return (
    <div className="relative min-h-screen bg-surface-container-lowest flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,14,14,0.9)_100%)]" />
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="starfield" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill="white" opacity="0.6"/>
              <circle cx="50" cy="30" r="0.8" fill="white" opacity="0.4"/>
              <circle cx="80" cy="70" r="0.4" fill="white" opacity="0.5"/>
              <circle cx="20" cy="80" r="0.6" fill="white" opacity="0.3"/>
              <circle cx="90" cy="20" r="0.3" fill="white" opacity="0.7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#starfield)" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-space-md"
      >
        <div className="text-center mb-space-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/20 mb-space-md"
          >
            <span className="text-3xl">🌧️</span>
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-primary/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Welcome Back</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm font-light">
            The universe remembers your frequency.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-space-md bg-surface-container-low/60 backdrop-blur-2xl rounded-3xl p-space-xl shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-space-sm rounded-xl bg-secondary-container/20 border border-secondary/30 text-secondary text-sm"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-space-xs">
            <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="you@domain.com"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-space-xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] hover:scale-105 transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-space-xs">
              <span>{isSubmitting ? 'Connecting...' : 'Return to Echo'}</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary-fixed to-tertiary"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-space-lg text-center"
        >
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            New here?
            <Link to="/register" className="ml-1 text-primary hover:text-primary-fixed font-medium transition-colors">
              Create your first Echo
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-space-xl"
        >
          <motion.button
            onClick={handleDemoLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-space-xl py-space-md rounded-full bg-surface-container-high/60 hover:bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm backdrop-blur-xl transition-all hover:scale-105 flex items-center justify-center gap-space-xs"
            type="button"
            disabled={isLoading}
          >
            <span className="material-symbols-outlined text-tertiary">science</span>
            <span>Enter Demo Universe</span>
          </motion.button>
          <p className="font-label-sm text-label-sm text-on-surface-variant/60 text-center mt-space-xs">
            No account needed · Full access · Resets on refresh
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}