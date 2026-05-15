import { RefreshCw } from 'lucide-react';
import EmptyState from '../../components/common/EmptyState.jsx';
import Input from '../../components/common/Input.jsx';
import SaleCard from '../../components/sales/SaleCard.jsx';
import SalesPageHeader from '../../components/sales/SalesPageHeader.jsx';
import { useSalesList } from '../../hooks/useSalesList.js';

export default function SalesListPage() {
  const { sales, filters, setFilters, isLoading, error, refetch } = useSalesList();

  return (
    <div className="grid gap-6">
      <SalesPageHeader title="Ventas" subtitle="Consulta ventas registradas y recibos." actionLabel="Actualizar" icon={RefreshCw} onAction={refetch} />
      <section className="soft-card grid gap-3 rounded-[1.75rem] p-4 sm:grid-cols-3">
        <Input label="Buscar" value={filters.search} onChange={(e) => setFilters({ search: e.target.value })} placeholder="Recibo, cliente, CI..." />
        <Input label="Desde" type="date" value={filters.from} onChange={(e) => setFilters({ from: e.target.value })} />
        <Input label="Hasta" type="date" value={filters.to} onChange={(e) => setFilters({ to: e.target.value })} />
      </section>
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar las ventas" description={error} actionLabel="Reintentar" onAction={refetch} /> : null}
      {!isLoading && !error && sales.length === 0 ? <EmptyState title="Sin ventas" description="No hay ventas registradas con los filtros actuales." /> : null}
      {!isLoading && !error && sales.length > 0 ? <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{sales.map((sale) => <SaleCard key={sale.id} sale={sale} />)}</section> : null}
    </div>
  );
}
