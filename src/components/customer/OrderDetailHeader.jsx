import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import OrderStatusBadge from './OrderStatusBadge.jsx';
import { getOrderShortId } from '../../utils/orderHelpers.js';

export default function OrderDetailHeader({ order }) {
  return (
    <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
      <Link to="/customer/orders">
        <Button variant="ghost" className="mb-5 bg-white/10 text-white hover:bg-white/15" icon={ArrowLeft}>
          Volver
        </Button>
      </Link>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Detalle del pedido</p>
          <h2 className="mt-2 text-3xl font-black">{getOrderShortId(order?.id)}</h2>
        </div>
        <OrderStatusBadge status={order?.status} />
      </div>
    </header>
  );
}
