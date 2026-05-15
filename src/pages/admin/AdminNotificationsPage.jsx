import { CheckCheck } from 'lucide-react';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import NotificationCard from '../../components/admin/NotificationCard.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useInventoryNotifications } from '../../hooks/useInventoryNotifications.js';

export default function AdminNotificationsPage() {
  const { notifications, filters, setFilters, isLoading, error, fetchNotifications, markAsRead, markAllAsRead } = useInventoryNotifications();

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Notificaciones" subtitle="Alertas de stock bajo y critico." actionLabel="Marcar todas como leidas" onAction={markAllAsRead} icon={CheckCheck} />
      <section className="soft-card rounded-[1.75rem] p-4">
        <div className="flex flex-wrap gap-3">
          <select value={filters.isRead} onChange={(e) => setFilters({ isRead: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
            <option value="">Todas</option>
            <option value="false">No leidas</option>
            <option value="true">Leidas</option>
          </select>
          <select value={filters.type} onChange={(e) => setFilters({ type: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
            <option value="">Todos los tipos</option>
            <option value="low">Low</option>
            <option value="critical">Critical</option>
          </select>
          <Button variant="secondary" onClick={fetchNotifications}>Actualizar</Button>
        </div>
      </section>
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar las notificaciones" description={error} actionLabel="Reintentar" onAction={fetchNotifications} /> : null}
      {!isLoading && !error && notifications.length === 0 ? <EmptyState title="Sin notificaciones" description="No hay alertas con los filtros actuales." /> : null}
      {!isLoading && !error && notifications.length > 0 ? (
        <section className="grid gap-3">
          {notifications.map((notification) => <NotificationCard key={notification.id} notification={notification} onRead={markAsRead} />)}
        </section>
      ) : null}
    </div>
  );
}
