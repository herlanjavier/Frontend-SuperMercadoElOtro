import { formatCurrency } from '../../utils/formatters.js';

export default function TopProductsTable({ products = [] }) {
  const max = Math.max(...products.map((item) => Number(item.totalQuantitySold || item.total_quantity_sold || 0)), 1);
  return (
    <section className="grid gap-3">
      {products.map((item, index) => {
        const quantity = Number(item.totalQuantitySold || item.total_quantity_sold || 0);
        return (
          <article key={item.productId || item.product_id || index} className="soft-card rounded-[1.5rem] p-5">
            <div className="flex items-center gap-4">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl font-black ${index < 3 ? 'bg-yellow-300 text-green-950' : 'bg-green-50 text-green-700'}`}>#{index + 1}</div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-black text-green-950">{item.productName || item.product_name}</h3>
                <p className="text-sm text-slate-500">{quantity} vendidos | {formatCurrency(item.totalRevenue || item.total_revenue)}</p>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-green-600" style={{ width: `${Math.max((quantity / max) * 100, 4)}%` }} /></div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
