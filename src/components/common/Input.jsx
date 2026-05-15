import { cn } from '../../utils/helpers.js';

export default function Input({ label, error, className, ...props }) {
  return (
    <label className="block">
      {label ? <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span> : null}
      <input
        className={cn(
          'h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-700/10',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10',
          className,
        )}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}
