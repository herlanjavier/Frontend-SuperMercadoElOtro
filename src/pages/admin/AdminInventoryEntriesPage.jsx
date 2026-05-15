import { Plus } from 'lucide-react';
import AdminFilters from '../../components/admin/AdminFilters.jsx';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import InventoryEntryList from '../../components/admin/InventoryEntryList.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useAdminProducts } from '../../hooks/useAdminProducts.js';
import { useInventory } from '../../hooks/useInventory.js';
import { useSuppliers } from '../../hooks/useSuppliers.js';

export default function AdminInventoryEntriesPage() {
  const { entries, filters, setFilters, isLoading, error, refetch } = useInventory({ loadSummary: false, loadEntries: true });
  const { products } = useAdminProducts();
  const { suppliers } = useSuppliers();

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Entradas de inventario" subtitle="Historial de productos recibidos." actionLabel="Registrar entrada" actionTo="/admin/inventory/new-entry" icon={Plus} />
      <AdminFilters search={filters.search} onSearch={(search) => setFilters({ search })}>
        <select value={filters.productId} onChange={(e) => setFilters({ productId: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
          <option value="">Producto</option>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
        </select>
        <select value={filters.supplierId} onChange={(e) => setFilters({ supplierId: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
          <option value="">Proveedor</option>
          {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
        </select>
        <input type="date" value={filters.date} onChange={(e) => setFilters({ date: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm" />
        <input type="date" value={filters.from} onChange={(e) => setFilters({ from: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm" title="Desde" />
        <input type="date" value={filters.to} onChange={(e) => setFilters({ to: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm" title="Hasta" />
      </AdminFilters>
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar las entradas" description={error} actionLabel="Reintentar" onAction={refetch} /> : null}
      {!isLoading && !error && entries.length === 0 ? <EmptyState title="No hay entradas" description="Registra entradas para actualizar el inventario." /> : null}
      {!isLoading && !error && entries.length > 0 ? <InventoryEntryList entries={entries} /> : null}
    </div>
  );
}
