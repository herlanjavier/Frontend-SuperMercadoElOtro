import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { formatCurrency } from '../../utils/formatters.js';

export default function CartSummary({ totalItems, totalAmount, onClear, onCheckout, checkoutPath = '/customer/checkout' }) {
  return (
    <section className="soft-card rounded-3xl p-5">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Productos</span>
        <span className="font-black text-green-950">{totalItems}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-black text-green-950">Total estimado</span>
        <span className="text-2xl font-black text-green-800">{formatCurrency(totalAmount)}</span>
      </div>
      <div className="mt-5 grid gap-2">
        <Link to={checkoutPath} onClick={onCheckout}>
          <Button className="w-full">Ir a pagar</Button>
        </Link>
        <Button variant="ghost" className="w-full" onClick={onClear}>
          Vaciar carrito
        </Button>
      </div>
    </section>
  );
}
