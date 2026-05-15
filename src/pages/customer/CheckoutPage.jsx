import { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ArrowLeft, CreditCard } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import CartItem from '../../components/cart/CartItem.jsx';
import CheckoutForm from '../../components/cart/CheckoutForm.jsx';
import BusinessHoursBanner from '../../components/cart/BusinessHoursBanner.jsx';
import OrderSuccessModal from '../../components/cart/OrderSuccessModal.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useBusinessHours } from '../../hooks/useBusinessHours.js';
import { useCart } from '../../hooks/useCart.js';
import { orderService } from '../../services/order.service.js';
import { validateCartBeforeCheckout } from '../../utils/cartHelpers.js';
import { formatCurrency } from '../../utils/formatters.js';

export default function CheckoutPage() {
  const { profile } = useAuth();
  const { items, totalAmount, removeItem, updateQuantity, clearCart, setLastOrder } = useCart();
  const businessHours = useBusinessHours();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    deliveryAddress: profile?.address || '',
    deliveryReference: profile?.addressReference || profile?.address_reference || '',
  });

  const validation = useMemo(() => validateCartBeforeCheckout(items), [items]);

  if (items.length === 0 && !createdOrder) {
    return <Navigate to="/customer/catalog" replace />;
  }

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!validation.ok) {
      toast.error(validation.message);
      return;
    }
    if (!form.deliveryAddress.trim()) nextErrors.deliveryAddress = 'Ingresa una dirección de entrega.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (businessHours.isOpen === false) {
      toast.error('El supermercado está cerrado para recibir pedidos.');
      return;
    }

    setIsSubmitting(true);
    try {
      const order = await orderService.createOrder({
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        deliveryAddress: form.deliveryAddress,
        deliveryReference: form.deliveryReference,
      });
      setLastOrder(order);
      setCreatedOrder(order);
      clearCart();
      toast.success('Pedido creado correctamente.');
    } catch (error) {
      toast.error(error.userMessage || error.response?.data?.message || 'No se pudo crear el pedido.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6">
      <header>
        <Link to="/customer/cart" className="inline-flex items-center gap-2 text-sm font-black text-green-700">
          <ArrowLeft className="h-4 w-4" />
          Volver al carrito
        </Link>
        <h1 className="mt-2 text-3xl font-black text-green-950">Finalizar pedido</h1>
        <p className="mt-1 text-sm text-slate-600">Tu pedido quedará pendiente hasta confirmar el pago QR.</p>
      </header>

      <BusinessHoursBanner {...businessHours} />

      <form className="grid gap-5 lg:grid-cols-[1fr_380px] lg:items-start" onSubmit={submit}>
        <div className="grid gap-5">
          <CheckoutForm form={form} errors={errors} onChange={updateForm} />
          <section className="grid gap-3">
            {items.map((item) => (
              <CartItem key={item.productId} item={item} onRemove={removeItem} onQuantityChange={updateQuantity} />
            ))}
          </section>
        </div>

        <aside className="soft-card sticky top-6 rounded-[2rem] p-5">
          <p className="text-sm font-black uppercase tracking-wide text-green-700">Resumen</p>
          <div className="mt-5 flex items-center justify-between">
            <span className="font-bold text-slate-600">Total estimado</span>
            <span className="text-3xl font-black text-green-800">{formatCurrency(totalAmount)}</span>
          </div>
          <Button
            type="submit"
            icon={CreditCard}
            isLoading={isSubmitting}
            disabled={businessHours.isOpen === false || !validation.ok}
            className="mt-5 w-full"
          >
            Realizar pedido
          </Button>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            El backend recalculará precios y validará stock antes de registrar el pedido.
          </p>
        </aside>
      </form>

      <OrderSuccessModal order={createdOrder} onClose={() => setCreatedOrder(null)} />
    </div>
  );
}
