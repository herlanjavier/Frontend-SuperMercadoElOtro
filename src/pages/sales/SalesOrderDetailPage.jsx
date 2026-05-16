import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, MapPin, Phone, User } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import PaymentProofViewer from '../../components/common/PaymentProofViewer.jsx';
import OrderStatusBadge from '../../components/customer/OrderStatusBadge.jsx';
import OrderStatusActions from '../../components/sales/OrderStatusActions.jsx';
import SalesOrderItemsList from '../../components/sales/SalesOrderItemsList.jsx';
import SalesOrderTimeline from '../../components/sales/SalesOrderTimeline.jsx';
import { useSalesOrderDetail } from '../../hooks/useSalesOrderDetail.js';
import { formatCurrency } from '../../utils/formatters.js';
import { formatOrderDate, getOrderShortId } from '../../utils/orderHelpers.js';
import { getDeliveryPersonFromOrder, hasDeliveryPerson } from '../../utils/deliveryHelpers.js';
import { getCustomerName, getCustomerPhone, getPaymentLabel } from '../../utils/salesHelpers.js';

export default function SalesOrderDetailPage() {
  const { id } = useParams();
  const { order, paymentStatus, sale, isLoading, error, refetch } = useSalesOrderDetail(id);

  if (isLoading) return <div className="soft-card h-96 animate-pulse rounded-[2rem]" />;
  if (error || !order) return <EmptyState title="Pedido no encontrado" description={error} />;

  const delivery = getDeliveryPersonFromOrder(order);
  const items = order.items || order.orderItems || order.order_items || [];

  return (
    <div className="grid gap-6">
      <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
        <Link to="/sales/orders"><Button variant="ghost" icon={ArrowLeft} className="mb-5 bg-white/10 text-white hover:bg-white/15">Volver</Button></Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Detalle del pedido</p>
            <h2 className="mt-2 text-3xl font-black">{getOrderShortId(order.id)}</h2>
            <p className="mt-1 text-green-50/80">{formatOrderDate(order.createdAt || order.created_at)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </header>

      <SalesOrderTimeline status={order.status} />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="soft-card rounded-[1.75rem] p-5">
          <h3 className="text-lg font-black text-green-950">Cliente y entrega</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <p className="flex items-center gap-2"><User className="h-4 w-4 text-green-700" /> {getCustomerName(order)}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-700" /> {getCustomerPhone(order)}</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-green-700" /> {order.deliveryAddress || order.delivery_address || 'Sin direccion'}</p>
            <p><span className="font-black text-green-950">Referencia:</span> {order.deliveryReference || order.delivery_reference || 'Sin referencia'}</p>
            <p className="text-2xl font-black text-green-950">Total: {formatCurrency(order.total)}</p>
          </div>
        </article>

        <article className="soft-card rounded-[1.75rem] p-5">
          <h3 className="text-lg font-black text-green-950">Pago y venta</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-600">
            <p className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-green-700" /> Estado: {getPaymentLabel(order.status)}</p>
            <p><span className="font-black text-green-950">Confirmado:</span> {formatOrderDate(order.confirmedAt || order.confirmed_at)}</p>
            <p><span className="font-black text-green-950">Venta:</span> {sale?.receiptNumber || sale?.receipt_number || paymentStatus?.sale?.receiptNumber || 'No disponible'}</p>
          </div>
        </article>
      </section>

      <PaymentProofViewer order={order} />

      <section className="soft-card rounded-[1.75rem] p-5">
        <h3 className="text-lg font-black text-green-950">Repartidor</h3>
        {hasDeliveryPerson(order) ? (
          <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <p><span className="font-black text-green-950">Nombre:</span> {[delivery.firstName, delivery.lastName].filter(Boolean).join(' ')}</p>
            <p><span className="font-black text-green-950">Telefono:</span> {delivery.phone || 'Sin telefono'}</p>
            <p><span className="font-black text-green-950">Vehiculo:</span> {delivery.vehicleType || 'Sin vehiculo'}</p>
            <p><span className="font-black text-green-950">Placa:</span> {delivery.plate || 'Sin placa'}</p>
          </div>
        ) : <p className="mt-2 text-sm text-slate-600">Aun no hay repartidor registrado.</p>}
      </section>

      <SalesOrderItemsList items={items} />

      <section className="soft-card rounded-[1.75rem] p-5">
        <h3 className="mb-4 text-lg font-black text-green-950">Acciones</h3>
        <OrderStatusActions order={order} sale={sale} onChanged={refetch} />
      </section>
    </div>
  );
}
