import { Link } from 'react-router-dom';
import { ClipboardList, ShoppingBag, ShoppingCart, UserRound } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import CustomerQuickStats from '../../components/customer/CustomerQuickStats.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import { useCustomerOrders } from '../../hooks/useCustomerOrders.js';
import { getProfileName } from '../../utils/helpers.js';
import { formatCurrency } from '../../utils/formatters.js';

export default function CustomerDashboardPage() {
  const { profile } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const { orders, isLoading } = useCustomerOrders();

  const quickLinks = [
    { label: 'Explorar catalogo', to: '/customer/catalog', icon: ShoppingBag, variant: 'warm' },
    { label: 'Mi carrito', to: '/customer/cart', icon: ShoppingCart, variant: 'secondary' },
    { label: 'Mis pedidos', to: '/customer/orders', icon: ClipboardList, variant: 'secondary' },
    { label: 'Mi perfil', to: '/customer/profile', icon: UserRound, variant: 'secondary' },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15 sm:p-8">
        <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Cliente</p>
        <h2 className="mt-2 text-3xl font-black">Hola, {getProfileName(profile)}</h2>
        <p className="mt-2 max-w-2xl text-green-50/80">
          Tu compra esta lista para comenzar. Revisa catalogo, carrito, pedidos y datos de entrega desde aqui.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map(({ label, to, icon: Icon, variant }) => (
            <Link key={label} to={to}>
              <Button variant={variant} icon={Icon} className="w-full">
                {label}
              </Button>
            </Link>
          ))}
        </div>
      </section>

      {isLoading ? <div className="soft-card h-32 animate-pulse rounded-3xl" /> : <CustomerQuickStats orders={orders} />}

      <section className="soft-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-wide text-green-700">Carrito actual</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-3xl font-black text-green-950">{totalItems} productos</p>
            <p className="text-sm text-slate-600">Total estimado: {formatCurrency(totalAmount)}</p>
          </div>
          <Link to={totalItems > 0 ? '/customer/checkout' : '/customer/catalog'}>
            <Button className="w-full sm:w-auto">{totalItems > 0 ? 'Ir a pagar' : 'Explorar catalogo'}</Button>
          </Link>
        </div>
      </section>

      <section className="soft-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-wide text-green-700">Perfil basico</p>
        <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
          <p><span className="font-black text-green-950">Email:</span> {profile?.email || 'Sin email'}</p>
          <p><span className="font-black text-green-950">Telefono:</span> {profile?.phone || 'No registrado'}</p>
          <p><span className="font-black text-green-950">Direccion:</span> {profile?.address || 'No registrada'}</p>
        </div>
      </section>
    </div>
  );
}
