import { ButtonHTMLAttributes, forwardRef } from 'react';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  pulse?: boolean;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ size = 'md', fullWidth = false, pulse = true, children, className = '', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-space-md py-space-xs text-label-md',
      md: 'px-space-lg py-space-sm text-body-sm',
      lg: 'px-space-xl py-space-md text-body-md',
      xl: 'px-space-2xl py-space-lg text-headline-sm',
    };

    return (
      <button
        ref={ref}
        className={`
          relative inline-flex items-center justify-center gap-space-xs
          font-headline-sm font-semibold tracking-wider uppercase
          rounded-full overflow-hidden
          bg-gradient-to-r from-primary via-primary-container to-secondary
          text-on-primary
          shadow-[0_0_40px_rgba(123,208,255,0.4)]
          hover:shadow-[0_0_70px_rgba(255,178,185,0.6)]
          hover:scale-105
          transition-all duration-500
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background
          ${pulse ? 'animate-pulse' : ''}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-space-sm">
          {children}
        </span>
        <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </button>
    );
  }
);

GlowButton.displayName = 'GlowButton';