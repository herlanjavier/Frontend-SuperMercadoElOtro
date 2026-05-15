import { AlertTriangle, Boxes, ClipboardList, ClipboardPlus, FileBarChart, Package, Plus, RefreshCw, ShoppingCart, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminStatsCard from '../../components/admin/AdminStatsCard.jsx';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useDashboardSummary } from '../../hooks/useDashboardSummary.js';
import { formatCurrency } from '../../utils/formatters.js';
import { getProfileName } from '../../utils/helpers.js';

export default function AdminDashboardPage() {
  const { profile } = useAuth();
  const { summary, isLoading, refetch } = useDashboardSummary();
  const sales = summary?.sales || {};
  const orders = summary?.orders || {};
  const inventory = summary?.inventory || {};
  const users = summary?.users || {};

  const sections = [
    {
      title: 'Ventas',
      cards: [
        { title: 'Ventas hoy', value: sales.todaySalesCount || 0, icon: ShoppingCart, tone: 'green' },
        { title: 'Ingresos hoy', value: formatCurrency(sales.todayRevenue), icon: FileBarChart, tone: 'blue' },
        { title: 'Ventas mes', value: sales.monthSalesCount || 0, icon: ShoppingCart, tone: 'green' },
        { title: 'Ingresos mes', value: formatCurrency(sales.monthRevenue), icon: FileBarChart, tone: 'blue' },
      ],
    },
    {
      title: 'Pedidos',
      cards: [
        { title: 'Pendientes', value: orders.pendingPayment || 0, icon: ClipboardList, tone: 'amber' },
        { title: 'Confirmados', value: orders.confirmed || 0, icon: ClipboardList, tone: 'blue' },
        { title: 'Listos', value: orders.readyForPickup || 0, icon: ClipboardList, tone: 'green' },
        { title: 'Cancelados', value: orders.cancelled || 0, icon: AlertTriangle, tone: 'rose' },
      ],
    },
    {
      title: 'Inventario y usuarios',
      cards: [
        { title: 'Productos activos', value: inventory.activeProducts || 0, icon: Package, tone: 'green' },
        { title: 'Stock bajo', value: inventory.lowStockProducts || 0, icon: Boxes, tone: 'amber' },
        { title: 'Stock critico', value: inventory.criticalStockProducts || 0, icon: AlertTriangle, tone: 'rose' },
        { title: 'Clientes activos', value: users.activeCustomers || 0, icon: Users, tone: 'blue' },
      ],
    },
  ];

  const quickLinks = [
    { label: 'Reporte de ventas', to: '/admin/reports/sales', icon: FileBarChart },
    { label: 'Reporte inventario', to: '/admin/reports/inventory', icon: Boxes },
    { label: 'Registrar entrada', to: '/admin/inventory/new-entry', icon: ClipboardPlus },
    { label: 'Crear producto', to: '/admin/products/new', icon: Plus },
    { label: 'Gestionar usuarios', to: '/admin/users', icon: Users },
    { label: 'Pedidos pendientes', to: '/sales/orders/pending-payments', icon: Truck },
  ];

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Administrador</p>
            <h2 className="mt-2 text-3xl font-black">Hola, {getProfileName(profile)}</h2>
            <p className="mt-2 text-green-50/80">Resumen final de ventas, pedidos, inventario y clientes.</p>
          </div>
          <Button variant="warm" icon={RefreshCw} onClick={refetch}>Actualizar</Button>
        </div>
      </section>

      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : sections.map((section) => (
        <section key={section.title} className="grid gap-4">
          <h3 className="text-lg font-black text-green-950">{section.title}</h3>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {section.cards.map((card) => <AdminStatsCard key={card.title} {...card} />)}
          </div>
        </section>
      ))}

      <section className="soft-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-wide text-green-700">Accesos rapidos</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {quickLinks.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to}>
              <Button variant="secondary" icon={Icon} className="w-full justify-start">{label}</Button>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
