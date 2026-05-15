import { CheckCircle, Clock, PackageCheck, ShieldCheck, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart.js';

export default function CustomerQuickStats({ orders = [] }) {
  const { totalItems } = useCart();
  const pending = orders.filter((order) => order.status === 'pending_payment').length;
  const confirmed = orders.filter((order) => order.status === 'confirmed' || order.status === 'ready_for_pickup').length;
  const delivered = orders.filter((order) => order.status === 'delivered').length;

  const stats = [
    { label: 'Mis pedidos', value: orders.length, icon: PackageCheck },
    { label: 'Pendientes', value: pending, icon: Clock },
    { label: 'Confirmados', value: confirmed, icon: ShieldCheck },
    { label: 'Entregados', value: delivered, icon: CheckCircle },
    { label: 'En carrito', value: totalItems, icon: ShoppingCart },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map(({ label, value, icon: Icon }) => (
        <article key={label} className="soft-card rounded-3xl p-5">
          <Icon className="h-6 w-6 text-green-700" />
          <p className="mt-4 text-3xl font-black text-green-950">{value}</p>
          <p className="text-sm text-slate-600">{label}</p>
        </article>
      ))}
    </section>
  );
}
