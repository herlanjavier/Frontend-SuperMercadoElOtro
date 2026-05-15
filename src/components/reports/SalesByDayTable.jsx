import { formatCurrency } from '../../utils/formatters.js';
import { formatReportDate } from '../../utils/reportHelpers.js';

export default function SalesByDayTable({ rows = [] }) {
  const max = Math.max(...rows.map((row) => Number(row.revenue || 0)), 1);
  return (
    <section className="grid gap-3">
      {rows.map((row) => (
        <article key={row.date} className="soft-card rounded-[1.5rem] p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-black text-green-950">{formatReportDate(row.date)}</h3>
              <p className="text-sm text-slate-500">{row.salesCount || row.sales_count || 0} ventas</p>
            </div>
            <p className="text-xl font-black text-green-800">{formatCurrency(row.revenue)}</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-green-600" style={{ width: `${Math.max((Number(row.revenue || 0) / max) * 100, 4)}%` }} /></div>
        </article>
      ))}
    </section>
  );
}
