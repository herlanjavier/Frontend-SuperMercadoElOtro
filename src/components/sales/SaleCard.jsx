import { Link } from 'react-router-dom';
import { CalendarDays, Receipt } from 'lucide-react';
import Button from '../common/Button.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';
import { getCustomerName } from '../../utils/salesHelpers.js';

export default function SaleCard({ sale }) {
  const seller = sale.seller || sale.soldByProfile || sale.sold_by_profile || {};
  const sellerName = [seller.firstName || seller.first_name, seller.lastName || seller.last_name].filter(Boolean).join(' ') || 'Vendedor';

  return (
    <article className="soft-card rounded-[1.75rem] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">{sale.receiptNumber || sale.receipt_number}</p>
          <h3 className="mt-1 text-xl font-black text-green-950">{getCustomerName(sale)}</h3>
          <p className="text-sm text-slate-500">Vendedor: {sellerName}</p>
        </div>
        <p className="text-2xl font-black text-green-800">{formatCurrency(sale.total)}</p>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm text-slate-600"><CalendarDays className="h-4 w-4 text-green-700" /> {formatOrderDate(sale.soldAt || sale.sold_at)}</p>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link to={`/sales/sales/${sale.id}`}><Button variant="secondary" className="w-full">Detalle</Button></Link>
        <Link to={`/sales/receipts/${sale.id}`}><Button icon={Receipt} className="w-full">Recibo</Button></Link>
      </div>
    </article>
  );
}
