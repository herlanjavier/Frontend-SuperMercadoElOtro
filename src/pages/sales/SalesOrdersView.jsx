import { RefreshCw } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState.jsx';
import SalesOrderFilters from '../../components/sales/SalesOrderFilters.jsx';
import SalesOrderTable from '../../components/sales/SalesOrderTable.jsx';
import SalesPageHeader from '../../components/sales/SalesPageHeader.jsx';
import { useSalesOrders } from '../../hooks/useSalesOrders.js';

export default function SalesOrdersView({ title = 'Pedidos', subtitle = 'Gestiona los pedidos del supermercado', initialStatus = '' }) {
  const { orders, filters, setFilters, isLoading, error, refetch } = useSalesOrders({ status: initialStatus });

  const clearFilters = () => setFilters({ search: '', from: '', to: '', status: initialStatus });

  return (
    <div className="grid gap-6">
      <SalesPageHeader title={title} subtitle={subtitle} actionLabel="Actualizar" icon={RefreshCw} onAction={refetch} />
      <SalesOrderFilters filters={filters} onChange={setFilters} onClear={clearFilters} lockStatus={Boolean(initialStatus)} />
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar los pedidos" description={error} actionLabel="Reintentar" onAction={refetch} /> : null}
      {!isLoading && !error && orders.length === 0 ? <EmptyState title="Sin pedidos" description="No hay pedidos con los filtros actuales." /> : null}
      {!isLoading && !error && orders.length > 0 ? <SalesOrderTable orders={orders} onChanged={refetch} /> : null}
    </div>
  );
}
