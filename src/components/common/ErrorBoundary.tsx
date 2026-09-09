import { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ECHO ErrorBoundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full text-center border border-outline/20 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
            <motion.div
              className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mx-auto mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="material-symbols-outlined text-tertiary text-3xl">error</span>
            </motion.div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Signal Interrupted</h3>
            <p className="font-body-md text-body-md text-on-surface-variant font-light mb-6">
              Something disrupted the resonance. The universe is still there, waiting.
            </p>
            <motion.button
              onClick={this.handleRetry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-md shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all font-semibold"
              type="button"
            >
              RETURN TO UNIVERSE →
            </motion.button>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-3xl p-8 max-w-md w-full text-center border border-outline/20 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        <div className="w-16 h-16 rounded-full bg-tertiary/20 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-tertiary text-3xl">wifi_off</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Connection Lost</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="w-full px-6 py-3 rounded-full bg-primary-container text-on-primary-container font-headline-sm text-body-md shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all font-semibold"
        >
          RECONNECT
        </button>
      </div>
    </div>
  );
}