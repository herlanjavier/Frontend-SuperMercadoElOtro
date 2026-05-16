import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import FakeQrPaymentCard from '../customer/FakeQrPaymentCard.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/50 p-4 backdrop-blur-sm">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-green-50 text-green-700">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <p className="mt-5 text-sm font-black uppercase tracking-wide text-green-700">Pendiente de pago</p>
        <h2 className="mt-2 text-3xl font-black text-green-950">Tu pedido fue registrado</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El pedido sera preparado cuando subas tu comprobante y el supermercado confirme el pago QR.
        </p>
        <div className="mt-5 rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-black text-green-800">{formatCurrency(order.total)}</p>
        </div>
        <div className="mt-5 text-left">
          <FakeQrPaymentCard order={order} compact />
        </div>
        <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm font-semibold leading-6 text-amber-800">
          Realiza el pago usando este QR y luego sube tu comprobante desde el detalle del pedido.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link to={`/customer/orders/${order.id}`}>
            <Button className="w-full">Subir comprobante</Button>
          </Link>
          <Link to="/customer/catalog" onClick={onClose}>
            <Button variant="secondary" className="w-full">
              Seguir comprando
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
