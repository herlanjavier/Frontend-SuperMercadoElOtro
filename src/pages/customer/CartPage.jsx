import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import CartItem from '../../components/cart/CartItem.jsx';
import CartSummary from '../../components/cart/CartSummary.jsx';
import { useCart } from '../../hooks/useCart.js';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        title="Tu carrito está vacío"
        description="Explora el catálogo y agrega productos disponibles para preparar tu pedido."
        actionLabel="Explorar catálogo"
        onAction={() => {
          window.location.href = '/customer/catalog';
        }}
      />
    );
  }

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to="/customer/catalog" className="inline-flex items-center gap-2 text-sm font-black text-green-700">
            <ArrowLeft className="h-4 w-4" />
            Continuar compra
          </Link>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black text-green-950">
            <ShoppingCart className="h-8 w-8 text-green-700" />
            Mi carrito
          </h1>
        </div>
        <Button variant="ghost" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:items-start">
        <section className="grid gap-3">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} onRemove={removeItem} onQuantityChange={updateQuantity} />
          ))}
        </section>
        <CartSummary totalItems={totalItems} totalAmount={totalAmount} onClear={clearCart} />
      </div>
    </div>
  );
}
