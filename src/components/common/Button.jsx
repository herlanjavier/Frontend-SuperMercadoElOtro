import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers.js';

const variants = {
  primary: 'bg-green-700 text-white shadow-lg shadow-green-900/20 hover:bg-green-800',
  secondary: 'bg-white text-green-900 ring-1 ring-green-900/10 hover:bg-green-50',
  warm: 'bg-yellow-400 text-green-950 shadow-lg shadow-yellow-500/20 hover:bg-yellow-300',
  ghost: 'bg-transparent text-green-900 hover:bg-green-50',
};

export default function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  isLoading = false,
  icon: Icon,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
