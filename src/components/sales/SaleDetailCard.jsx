import { Link } from 'react-router-dom';
import { Download, Receipt } from 'lucide-react';
import Button from '../common/Button.jsx';
import SalesOrderItemsList from './SalesOrderItemsList.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';
import { getCustomerName } from '../../utils/salesHelpers.js';

export default function SaleDetailCard({ sale, onDownload }) {
  const items = sale?.items || sale?.saleItems || sale?.sale_items || [];

  return (
    <div className="grid gap-5">
      <section className="soft-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-wide text-green-700">{sale?.receiptNumber || sale?.receipt_number}</p>
        <h2 className="mt-2 text-3xl font-black text-green-950">{formatCurrency(sale?.total)}</h2>
        <div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          <p><span className="font-black text-green-950">Cliente:</span> {getCustomerName(sale)}</p>
          <p><span className="font-black text-green-950">Fecha:</span> {formatOrderDate(sale?.soldAt || sale?.sold_at)}</p>
          <p><span className="font-black text-green-950">Pedido:</span> {sale?.orderId || sale?.order_id || '-'}</p>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link to={`/sales/receipts/${sale.id}`}><Button icon={Receipt} className="w-full">Ver recibo</Button></Link>
          <Button variant="secondary" icon={Download} className="w-full" onClick={onDownload}>Descargar PDF</Button>
        </div>
      </section>
      <SalesOrderItemsList items={items} />
    </div>
  );
}
