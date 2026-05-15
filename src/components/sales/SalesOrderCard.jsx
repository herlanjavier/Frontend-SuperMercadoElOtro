import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Phone } from 'lucide-react';
import Button from '../common/Button.jsx';
import OrderStatusBadge from '../customer/OrderStatusBadge.jsx';
import OrderStatusActions from './OrderStatusActions.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';
import { getCustomerName, getCustomerPhone, getSalesOrderItemsCount, getShortOrderId } from '../../utils/salesHelpers.js';

export default function SalesOrderCard({ order, onChanged }) {
  return (
    <article className="soft-card rounded-[1.75rem] p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">{getShortOrderId(order.id)}</p>
          <h3 className="mt-1 text-xl font-black text-green-950">{getCustomerName(order)}</h3>
          <p className="text-sm text-slate-500">{getSalesOrderItemsCount(order)} productos | {formatCurrency(order.total)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-700" /> {getCustomerPhone(order)}</p>
        <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-green-700" /> {formatOrderDate(order.createdAt || order.created_at)}</p>
        <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-green-700" /> {order.deliveryAddress || order.delivery_address || 'Sin direccion'}</p>
      </div>
      <div className="mt-5 grid gap-3">
        <Link to={`/sales/orders/${order.id}`}><Button variant="secondary" className="w-full">Ver detalle</Button></Link>
        <OrderStatusActions order={order} onChanged={onChanged} />
      </div>
    </article>
  );
}
