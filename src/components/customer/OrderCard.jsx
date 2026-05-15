import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, ShoppingBag, Trash2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import OrderStatusBadge from './OrderStatusBadge.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { canCustomerCancelOrder, formatOrderDate, getOrderItemsCount, getOrderShortId } from '../../utils/orderHelpers.js';

export default function OrderCard({ order, onCancel }) {
  const itemsCount = getOrderItemsCount(order);

  return (
    <article className="soft-card rounded-[1.75rem] p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">{getOrderShortId(order.id)}</p>
          <h3 className="mt-1 text-xl font-black text-green-950">{formatCurrency(order.total)}</h3>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-green-700" />
          {formatOrderDate(order.createdAt || order.created_at)}
        </p>
        <p className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-green-700" />
          {itemsCount} producto{itemsCount === 1 ? '' : 's'}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-700" />
          {order.deliveryAddress || order.delivery_address || 'Direccion no registrada'}
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link to={`/customer/orders/${order.id}`}>
          <Button className="w-full">Ver detalle</Button>
        </Link>
        {canCustomerCancelOrder(order) ? (
          <Button variant="secondary" className="w-full text-rose-700" icon={Trash2} onClick={() => onCancel?.(order.id)}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </article>
  );
}
