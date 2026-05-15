import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import LowStockProductCard from '../../components/admin/LowStockProductCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useLowStock } from '../../hooks/useLowStock.js';

export default function AdminLowStockPage() {
  const { products, filters, setFilters, isLoading, error, fetchLowStock } = useLowStock();

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Stock bajo" subtitle="Productos que necesitan reposicion o atencion urgente." />
      <section className="soft-card rounded-[1.75rem] p-4">
        <div className="flex flex-wrap gap-3">
          <select value={filters.type} onChange={(e) => setFilters({ type: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
            <option value="">Todos</option>
            <option value="low">Stock bajo</option>
            <option value="critical">Stock critico</option>
          </select>
          <label className="flex h-12 items-center gap-2 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
            <input type="checkbox" checked={filters.includeOutOfStock} onChange={(e) => setFilters({ includeOutOfStock: e.target.checked })} />
            Incluir sin stock
          </label>
        </div>
      </section>
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudo cargar el stock bajo" description={error} actionLabel="Reintentar" onAction={fetchLowStock} /> : null}
      {!isLoading && !error && products.length === 0 ? <EmptyState title="Sin alertas de stock" description="No hay productos por debajo del minimo." /> : null}
      {!isLoading && !error && products.length > 0 ? (
        <section className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => <LowStockProductCard key={product.id} product={product} />)}
        </section>
      ) : null}
    </div>
  );
}
