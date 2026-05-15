import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import EmptyState from '../common/EmptyState.jsx';
import Button from '../common/Button.jsx';
import CartItem from './CartItem.jsx';
import CartSummary from './CartSummary.jsx';
import { useCart } from '../../hooks/useCart.js';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    clearCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalAmount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-green-950/40 backdrop-blur-sm" onClick={closeCart}>
      <aside
        className="absolute bottom-0 right-0 flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-slate-50 shadow-2xl sm:top-0 sm:h-full sm:max-h-none sm:w-[430px] sm:rounded-l-[2rem] sm:rounded-tr-none"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-green-900/10 bg-white px-5 py-4">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-green-700">Tu carrito</p>
            <h2 className="text-2xl font-black text-green-950">{totalItems} productos</h2>
          </div>
          <button type="button" onClick={closeCart} className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <EmptyState
              title="Tu carrito esta vacio"
              description="Agrega productos desde el catalogo para preparar tu pedido."
              actionLabel="Explorar catalogo"
              onAction={closeCart}
            />
          ) : (
            <div className="grid gap-3">
              {items.map((item) => (
                <CartItem
                  key={item.productId}
                  item={item}
                  onRemove={removeItem}
                  onQuantityChange={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-green-900/10 bg-white p-4">
            <CartSummary totalItems={totalItems} totalAmount={totalAmount} onClear={clearCart} onCheckout={closeCart} />
          </div>
        ) : (
          <div className="border-t border-green-900/10 bg-white p-4">
            <Link to="/customer/catalog" onClick={closeCart}>
              <Button className="w-full">Explorar catalogo</Button>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
