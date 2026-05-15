import { formatCurrency } from '../../utils/formatters.js';

export default function ReportChartCard({ title, items = [], valueKey = 'totalRevenue', labelKey = 'productName' }) {
  const max = Math.max(...items.map((item) => Number(item[valueKey] || item.revenue || item.total || 0)), 1);

  return (
    <section className="soft-card rounded-[1.75rem] p-5">
      <h3 className="text-lg font-black text-green-950">{title}</h3>
      <div className="mt-4 grid gap-3">
        {items.slice(0, 8).map((item, index) => {
          const value = Number(item[valueKey] || item.revenue || item.total || 0);
          return (
            <div key={item.id || item.productId || item.date || index}>
              <div className="mb-1 flex justify-between gap-3 text-sm">
                <span className="truncate font-bold text-slate-700">{item[labelKey] || item.productName || item.date}</span>
                <span className="font-black text-green-900">{formatCurrency(value)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-green-600" style={{ width: `${Math.max((value / max) * 100, 4)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
