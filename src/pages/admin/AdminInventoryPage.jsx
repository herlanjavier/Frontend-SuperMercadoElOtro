import { Bell, ClipboardList, Plus, TrendingDown } from 'lucide-react';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import InventorySummaryCards from '../../components/admin/InventorySummaryCards.jsx';
import Button from '../../components/common/Button.jsx';
import { useInventory } from '../../hooks/useInventory.js';
import { Link } from 'react-router-dom';

export default function AdminInventoryPage() {
  const { summary, isLoading } = useInventory({ loadSummary: true, loadEntries: false });
  const links = [
    { label: 'Registrar entrada', to: '/admin/inventory/new-entry', icon: Plus },
    { label: 'Ver entradas', to: '/admin/inventory/entries', icon: ClipboardList },
    { label: 'Stock bajo', to: '/admin/inventory/low-stock', icon: TrendingDown },
    { label: 'Notificaciones', to: '/admin/notifications', icon: Bell },
  ];

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Inventario" subtitle="Resumen actual de productos, stock y valor aproximado." />
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : <InventorySummaryCards summary={summary || {}} />}
      <section className="soft-card rounded-[2rem] p-6">
        <p className="text-sm font-black uppercase tracking-wide text-green-700">Accesos de inventario</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {links.map(({ label, to, icon: Icon }) => (
            <Link key={label} to={to}><Button variant="secondary" icon={Icon} className="w-full justify-start">{label}</Button></Link>
          ))}
        </div>
      </section>
    </div>
  );
}
