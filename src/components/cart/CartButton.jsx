import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth.js';
import { ROLES } from '../../utils/constants.js';

export default function CartButton({ className = '' }) {
  const { totalItems, toggleCart } = useCart();
  const { profile } = useAuth();

  if (profile?.role !== ROLES.CUSTOMER) return null;

  return (
    <button
      type="button"
      onClick={toggleCart}
      className={`relative grid h-11 w-11 place-items-center rounded-2xl bg-yellow-400 text-green-950 shadow-lg shadow-yellow-500/20 ${className}`}
      aria-label="Abrir carrito"
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-green-800 px-1 text-[11px] font-black text-white">
          {totalItems}
        </span>
      ) : null}
    </button>
  );
}
