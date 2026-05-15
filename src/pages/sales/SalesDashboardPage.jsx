import { BadgeCheck, ClipboardList, CreditCard, Receipt, Truck } from 'lucide-react';
import SalesPageHeader from '../../components/sales/SalesPageHeader.jsx';
import SalesQuickActions from '../../components/sales/SalesQuickActions.jsx';
import SalesStatsCard from '../../components/sales/SalesStatsCard.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useSalesList } from '../../hooks/useSalesList.js';
import { useSalesOrders } from '../../hooks/useSalesOrders.js';
import { getProfileName } from '../../utils/helpers.js';

export default function SalesDashboardPage() {
  const { profile } = useAuth();
  const { orders, isLoading } = useSalesOrders();
  const today = new Date().toISOString().slice(0, 10);
  const { sales } = useSalesList({ from: today, to: today });

  const pending = orders.filter((order) => order.status === 'pending_payment').length;
  const confirmed = orders.filter((order) => order.status === 'confirmed').length;
  const ready = orders.filter((order) => order.status === 'ready_for_pickup').length;
  const deliveredToday = orders.filter((order) => order.status === 'delivered' && String(order.deliveredAt || order.delivered_at || '').startsWith(today)).length;

  const stats = [
    { label: 'Pendientes de pago', value: pending, icon: CreditCard, tone: 'amber' },
    { label: 'Confirmados', value: confirmed, icon: BadgeCheck, tone: 'blue' },
    { label: 'Listos', value: ready, icon: Truck, tone: 'green' },
    { label: 'Entregados hoy', value: deliveredToday, icon: ClipboardList, tone: 'green' },
    { label: 'Ventas hoy', value: sales.length, icon: Receipt, tone: 'blue' },
  ];

  const actions = [
    { label: 'Pagos pendientes', to: '/sales/orders/pending-payments', icon: CreditCard, variant: 'warm' },
    { label: 'Pedidos confirmados', to: '/sales/orders/confirmed', icon: BadgeCheck },
    { label: 'Pedidos listos', to: '/sales/orders/ready', icon: Truck },
    { label: 'Ventas', to: '/sales/sales', icon: Receipt },
  ];

  return (
    <div className="grid gap-6">
      <SalesPageHeader title={`Hola, ${getProfileName(profile)}`} subtitle="Panel operativo para confirmar pagos QR, preparar pedidos y revisar ventas." />
      {isLoading ? <div className="soft-card h-36 animate-pulse rounded-[2rem]" /> : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => <SalesStatsCard key={stat.label} {...stat} />)}
        </section>
      )}
      <SalesQuickActions actions={actions} />
    </div>
  );
}
