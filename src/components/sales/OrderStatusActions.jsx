import { useState } from 'react';
import toast from 'react-hot-toast';
import { BadgeCheck, CheckCircle, PackageCheck, Receipt, Truck, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button.jsx';
import ConfirmDialog from '../admin/ConfirmDialog.jsx';
import PaymentConfirmDialog from './PaymentConfirmDialog.jsx';
import DeliveryPersonForm from './DeliveryPersonForm.jsx';
import { usePaymentActions } from '../../hooks/usePaymentActions.js';
import { salesOrderService } from '../../services/sales-order.service.js';
import { canConfirmPayment, canMarkDelivered, canMarkReady, canRegisterDeliveryPerson } from '../../utils/salesHelpers.js';

export default function OrderStatusActions({ order, sale, onChanged }) {
  const navigate = useNavigate();
  const { isConfirming, confirmPayment } = usePaymentActions();
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateStatus = async () => {
    if (!confirmStatus) return;
    setIsSaving(true);
    try {
      await salesOrderService.updateOrderStatus(order.id, confirmStatus);
      toast.success('Estado actualizado correctamente.');
      setConfirmStatus(null);
      onChanged?.();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo cambiar el estado.');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelOrder = async () => {
    setIsSaving(true);
    try {
      await salesOrderService.cancelOrder(order.id);
      toast.success('Pedido cancelado.');
      setConfirmStatus(null);
      onChanged?.();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo cancelar el pedido.');
    } finally {
      setIsSaving(false);
    }
  };

  const saveDelivery = async (payload) => {
    setIsSaving(true);
    try {
      await salesOrderService.updateDeliveryPerson(order.id, payload);
      toast.success('Repartidor registrado correctamente.');
      setDeliveryOpen(false);
      onChanged?.();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo registrar el repartidor.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmQr = async (notes) => {
    await confirmPayment(order.id, notes);
    setPaymentOpen(false);
    onChanged?.();
  };

  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        {canConfirmPayment(order) ? <Button icon={BadgeCheck} onClick={() => setPaymentOpen(true)}>Confirmar pago QR</Button> : null}
        {canConfirmPayment(order) ? <Button variant="secondary" icon={XCircle} className="text-rose-700" onClick={() => setConfirmStatus('cancel')}>Cancelar pedido</Button> : null}
        {canRegisterDeliveryPerson(order) ? <Button variant="secondary" icon={Truck} onClick={() => setDeliveryOpen(true)}>Registrar repartidor</Button> : null}
        {canMarkReady(order) ? <Button icon={PackageCheck} onClick={() => setConfirmStatus('ready_for_pickup')}>Marcar como listo</Button> : null}
        {canMarkDelivered(order) ? <Button icon={CheckCircle} onClick={() => setConfirmStatus('delivered')}>Marcar como entregado</Button> : null}
        {sale?.id ? <Button variant="warm" icon={Receipt} onClick={() => navigate(`/sales/receipts/${sale.id}`)}>Ver recibo</Button> : null}
      </div>

      <PaymentConfirmDialog open={paymentOpen} order={order} isLoading={isConfirming} onClose={() => setPaymentOpen(false)} onConfirm={confirmQr} />
      <DeliveryPersonForm open={deliveryOpen} order={order} isSaving={isSaving} onClose={() => setDeliveryOpen(false)} onSubmit={saveDelivery} />
      <ConfirmDialog
        open={Boolean(confirmStatus)}
        title={confirmStatus === 'cancel' ? 'Cancelar pedido' : 'Cambiar estado'}
        message={confirmStatus === 'cancel' ? 'Confirma la cancelacion del pedido.' : 'Confirma el cambio de estado del pedido.'}
        confirmLabel={confirmStatus === 'cancel' ? 'Cancelar pedido' : 'Cambiar estado'}
        tone={confirmStatus === 'cancel' ? 'rose' : 'green'}
        onClose={() => setConfirmStatus(null)}
        onConfirm={confirmStatus === 'cancel' ? cancelOrder : updateStatus}
      />
    </>
  );
}
