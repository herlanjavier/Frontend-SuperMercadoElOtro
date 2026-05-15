import { cn } from '../../utils/helpers.js';

const tones = {
  green: 'bg-green-50 text-green-700',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-700',
  blue: 'bg-blue-50 text-blue-700',
  slate: 'bg-slate-100 text-slate-700',
};

export default function AdminStatsCard({ title, value, icon: Icon, tone = 'green', helperText }) {
  return (
    <article className="soft-card rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-black text-green-950">{value ?? 0}</p>
          {helperText ? <p className="mt-1 text-xs font-semibold text-slate-500">{helperText}</p> : null}
        </div>
        {Icon ? (
          <div className={cn('grid h-12 w-12 shrink-0 place-items-center rounded-2xl', tones[tone] || tones.green)}>
            <Icon className="h-6 w-6" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
