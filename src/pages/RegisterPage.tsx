import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface FormErrors {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name: string, value: string | boolean): string | undefined => {
    const stringValue = typeof value === 'boolean' ? String(value) : value;
    switch (name) {
      case 'name':
        if (!stringValue.trim()) return 'Name is required';
        if (stringValue.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'username':
        if (!stringValue.trim()) return 'Username is required';
        if (stringValue.trim().length < 3) return 'Username must be at least 3 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(stringValue)) return 'Username can only contain letters, numbers, and underscores';
        break;
      case 'email':
        if (!stringValue.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) return 'Enter a valid email address';
        break;
      case 'password':
        if (!stringValue) return 'Password is required';
        if (stringValue.length < 6) return 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (!stringValue) return 'Please confirm your password';
        if (stringValue !== formData.password) return 'Passwords do not match';
        break;
      case 'agree':
        if (!value) return 'You must agree to experience social differently';
        break;
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormErrors]) {
      const error = validateField(name, type === 'checkbox' ? String(checked) : value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const error = validateField(name, type === 'checkbox' ? String(checked) : value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let hasErrors = false;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      await register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/onboarding', { replace: true });
      }, 2000);
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="relative min-h-screen bg-surface-container-lowest flex items-center justify-center overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[140px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,14,14,0.9)_100%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-space-lg">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-container/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-dashed border-primary/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="relative w-full h-full rounded-full bg-primary-container flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.6)]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span className="text-4xl">✦</span>
            </motion.div>
          </div>
          
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mb-space-sm">
            YOUR SIGNAL HAS BEEN FOUND.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-light">
            Welcome to the living universe, {formData.name}.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-space-lg flex items-center justify-center gap-2 text-on-surface-variant font-label-sm text-label-sm"
          >
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span>Calibrating your resonance...</span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-surface-container-lowest flex items-center justify-center overflow-hidden p-space-md">
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
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-space-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-container/20 mb-space-md"
          >
            <span className="text-3xl">✦</span>
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-primary/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">Your First Moment Starts Here</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm font-light">
            No followers. No algorithms. Just resonance.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-space-md bg-surface-container-low/60 backdrop-blur-2xl rounded-3xl p-space-xl shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        >
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-space-sm rounded-xl bg-secondary-container/20 border border-secondary/30 text-secondary text-sm"
            >
              {errors.general}
            </motion.div>
          )}

          <div className="space-y-space-xs">
            <label htmlFor="name" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all ${errors.name ? 'border-secondary' : ''}`}
              placeholder="Alex Chen"
              required
              disabled={isSubmitting}
            />
            {errors.name && (
              <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-sm">{errors.name}</motion.span>
            )}
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="username" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50">@</span>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all pl-8 ${errors.username ? 'border-secondary' : ''}`}
                placeholder="alex_chen"
                required
                disabled={isSubmitting}
              />
            </div>
            {errors.username && (
              <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-sm">{errors.username}</motion.span>
            )}
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all ${errors.email ? 'border-secondary' : ''}`}
              placeholder="alex@example.com"
              required
              disabled={isSubmitting}
            />
            {errors.email && (
              <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-sm">{errors.email}</motion.span>
            )}
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all ${errors.password ? 'border-secondary' : ''}`}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
            {errors.password && (
              <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-sm">{errors.password}</motion.span>
            )}
          </div>

          <div className="space-y-space-xs">
            <label htmlFor="confirmPassword" className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full bg-surface-container-highest/50 border border-outline/20 rounded-xl px-space-md py-space-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all ${errors.confirmPassword ? 'border-secondary' : ''}`}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-secondary text-sm">{errors.confirmPassword}</motion.span>
            )}
          </div>

          <div className="space-y-space-xs pt-space-xs">
            <label className="flex items-start gap-space-sm cursor-pointer">
              <input
                name="agree"
                type="checkbox"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-outline/30 text-primary focus:ring-primary-container focus:ring-2 accent-primary"
              />
              <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                I agree to <span className="text-primary font-medium">experience social differently</span>
              </span>
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-space-xl py-space-md rounded-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:shadow-[0_0_55px_rgba(56,189,248,0.75)] hover:scale-105 transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-space-xs">
              <span>{isSubmitting ? 'Calibrating...' : 'Create My Echo'}</span>
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
            Already have a signal?
            <Link to="/login" className="ml-1 text-primary hover:text-primary-fixed font-medium transition-colors">
              Return to Echo
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}