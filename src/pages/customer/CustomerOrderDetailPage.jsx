import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, CheckCircle, CreditCard, MapPin, PackageCheck, Phone, Truck, XCircle } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import FakeQrPaymentCard from '../../components/customer/FakeQrPaymentCard.jsx';
import OrderDetailHeader from '../../components/customer/OrderDetailHeader.jsx';
import OrderItemsList from '../../components/customer/OrderItemsList.jsx';
import OrderTimeline from '../../components/customer/OrderTimeline.jsx';
import PaymentProofUploader from '../../components/customer/PaymentProofUploader.jsx';
import { useOrderDetail } from '../../hooks/useOrderDetail.js';
import { formatCurrency } from '../../utils/formatters.js';
import { getDeliveryPersonFromOrder } from '../../utils/deliveryHelpers.js';
import { canCustomerCancelOrder, formatOrderDate, isOrderPaid } from '../../utils/orderHelpers.js';

export default function CustomerOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { order, sale, isLoading, error, refetch, cancelOrder } = useOrderDetail(id);

  if (isLoading) {
    return <div className="soft-card h-96 animate-pulse rounded-[2rem]" />;
  }

  if (error || !order) {
    return <EmptyState title="Pedido no encontrado" description={error} actionLabel="Volver a pedidos" onAction={() => navigate('/customer/orders')} />;
  }

  const delivery = getDeliveryPersonFromOrder(order);
  const deliveryName = [delivery.firstName, delivery.lastName].filter(Boolean).join(' ');

  const handleCancel = async () => {
    await cancelOrder();
    setShowCancelConfirm(false);
    await refetch();
  };

  const goToReceipt = () => {
    if (!sale?.id) return;
    navigate(`/customer/receipts/${sale.id}`);
  };

  return (
    <div className="grid gap-6">
      <OrderDetailHeader order={order} />
      <OrderTimeline status={order.status} />

      {order.status === 'pending_payment' ? (
        <>
          <FakeQrPaymentCard order={order} />
          <PaymentProofUploader order={order} onUploaded={refetch} />
        </>
      ) : null}

      <section className="soft-card rounded-[1.75rem] p-5">
        <h3 className="text-lg font-black text-green-950">Datos del pedido</h3>
        <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-green-700" /> Creado: {formatOrderDate(order.createdAt || order.created_at)}</p>
          <p className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-700" /> Confirmado: {formatOrderDate(order.confirmedAt || order.confirmed_at)}</p>
          <p className="flex items-center gap-2"><PackageCheck className="h-4 w-4 text-green-700" /> Entregado: {formatOrderDate(order.deliveredAt || order.delivered_at)}</p>
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-green-700" /> {order.deliveryAddress || order.delivery_address || 'Sin direccion'}</p>
          <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-green-700" /> Repartidor: {deliveryName || 'Aun no asignado'}</p>
          {delivery.phone ? (
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-700" /> {delivery.phone}</p>
          ) : null}
          {(delivery.vehicleType || delivery.plate) ? (
            <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-green-700" /> {[delivery.vehicleType, delivery.plate].filter(Boolean).join(' - ')}</p>
          ) : null}
        </div>
        <div className="mt-5 rounded-2xl bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-800">Referencia: {order.deliveryReference || order.delivery_reference || 'Sin referencia'}</p>
          <p className="mt-2 text-2xl font-black text-green-950">Total: {formatCurrency(order.total)}</p>
        </div>
      </section>

      <OrderItemsList items={order.items || order.orderItems || order.order_items || []} />

      <section className="grid gap-3 sm:grid-cols-2">
        {canCustomerCancelOrder(order) ? (
          <Button variant="secondary" icon={XCircle} className="w-full text-rose-700" onClick={() => setShowCancelConfirm(true)}>
            Cancelar pedido
          </Button>
        ) : null}
        {isOrderPaid(order.status) ? (
          sale?.id ? (
            <Button icon={CreditCard} className="w-full" onClick={goToReceipt}>
              Ver recibo
            </Button>
          ) : (
            <div className="rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-600">El recibo aun no esta disponible.</div>
          )
        ) : null}
        <Link to="/customer/orders">
          <Button variant="ghost" className="w-full">Volver a pedidos</Button>
        </Link>
      </section>

      {showCancelConfirm ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-700">
              <XCircle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-center text-xl font-black text-green-950">Cancelar pedido</h3>
            <p className="mt-2 text-center text-sm leading-6 text-slate-600">
              Esta accion cancelara el pedido pendiente de pago. Podras crear uno nuevo desde el catalogo.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <Button variant="secondary" onClick={() => setShowCancelConfirm(false)}>
                Mantener pedido
              </Button>
              <Button className="bg-rose-600 hover:bg-rose-700" onClick={handleCancel}>
                Si, cancelar
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
