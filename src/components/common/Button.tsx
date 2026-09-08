import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, children, className = '', disabled, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-headline-sm transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-primary-container text-on-primary-container shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:shadow-[0_0_35px_rgba(56,189,248,0.55)] hover:scale-105 active:scale-95',
      secondary: 'bg-surface-container-high/60 hover:bg-surface-container-highest text-on-surface backdrop-blur-xl',
      ghost: 'bg-transparent hover:bg-surface-container-highest/50 text-on-surface',
      glow: 'bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary shadow-[0_0_40px_rgba(123,208,255,0.4)] hover:shadow-[0_0_60px_rgba(255,178,185,0.6)] hover:scale-105',
    };
    
    const sizeClasses = {
      sm: 'px-space-md py-space-xs text-label-md',
      md: 'px-space-lg py-space-sm text-body-sm',
      lg: 'px-space-xl py-space-md text-body-md',
      xl: 'px-space-2xl py-space-lg text-headline-sm',
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';