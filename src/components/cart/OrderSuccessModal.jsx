import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function OrderSuccessModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/50 p-4 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-2xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-green-50 text-green-700">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <p className="mt-5 text-sm font-black uppercase tracking-wide text-green-700">Pendiente de pago</p>
        <h2 className="mt-2 text-3xl font-black text-green-950">Tu pedido fue registrado</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          El pedido será preparado cuando el pago QR sea confirmado por el supermercado.
        </p>
        <div className="mt-5 rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Total</p>
          <p className="text-2xl font-black text-green-800">{formatCurrency(order.total)}</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link to="/customer/orders">
            <Button className="w-full">Ver mis pedidos</Button>
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
