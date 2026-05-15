const tones = {
  amber: 'bg-amber-50 text-amber-700',
  green: 'bg-green-50 text-green-700',
  blue: 'bg-blue-50 text-blue-700',
  rose: 'bg-rose-50 text-rose-700',
};

export default function SalesStatsCard({ label, value, icon: Icon, tone = 'green' }) {
  return (
    <article className="soft-card rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-green-950">{value}</p>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tones[tone] || tones.green}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}
