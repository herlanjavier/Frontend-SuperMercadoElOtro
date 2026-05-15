import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';

export default function SalesReportTable({ sales = [] }) {
  return (
    <section className="grid gap-3">
      {sales.map((sale) => {
        const customer = sale.customer || {};
        const items = sale.items || [];
        const customerName = [customer.firstName || customer.first_name, customer.lastName || customer.last_name].filter(Boolean).join(' ') || 'Cliente';
        return (
          <article key={sale.id} className="soft-card rounded-[1.5rem] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-green-700">{sale.receiptNumber || sale.receipt_number}</p>
                <h3 className="text-lg font-black text-green-950">{customerName}</h3>
                <p className="text-sm text-slate-500">{formatOrderDate(sale.soldAt || sale.sold_at)} | {items.length} items</p>
              </div>
              <p className="text-2xl font-black text-green-800">{formatCurrency(sale.total)}</p>
            </div>
            {items.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {items.slice(0, 5).map((item) => <span key={item.id || item.productId} className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{item.productName || item.product_name} x{item.quantity}</span>)}
              </div>
            ) : null}
            <Link to={`/sales/sales/${sale.id}`}><Button variant="ghost" className="mt-4">Ver detalle</Button></Link>
          </article>
        );
      })}
    </section>
  );
}
