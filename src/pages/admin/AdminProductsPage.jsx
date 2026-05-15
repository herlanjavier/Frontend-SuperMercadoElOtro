import { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminFilters from '../../components/admin/AdminFilters.jsx';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import ProductAdminTable from '../../components/admin/ProductAdminTable.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useAdminCategories } from '../../hooks/useAdminCategories.js';
import { useAdminProducts } from '../../hooks/useAdminProducts.js';

export default function AdminProductsPage() {
  const { products, filters, setFilters, isLoading, error, refetch, deactivateProduct, restoreProduct, deleteImage } = useAdminProducts();
  const { categories } = useAdminCategories({ includeInactive: true });
  const [confirm, setConfirm] = useState(null);

  const runConfirm = async () => {
    if (!confirm) return;
    if (confirm.type === 'deactivate') await deactivateProduct(confirm.product.id);
    if (confirm.type === 'restore') await restoreProduct(confirm.product.id);
    if (confirm.type === 'image') await deleteImage(confirm.product.id);
    setConfirm(null);
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Productos" subtitle="Gestiona el catalogo del supermercado" actionLabel="Nuevo producto" actionTo="/admin/products/new" icon={Plus} />
      <AdminFilters search={filters.search} onSearch={(search) => setFilters({ search })}>
        <select value={filters.categoryId} onChange={(e) => setFilters({ categoryId: e.target.value })} className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm">
          <option value="">Todas las categorias</option>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        {[
          ['includeInactive', 'Mostrar inactivos'],
          ['onlyAvailable', 'Solo disponibles'],
          ['lowStock', 'Stock bajo'],
          ['criticalStock', 'Stock critico'],
        ].map(([key, label]) => (
          <label key={key} className="flex h-12 items-center gap-2 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
            <input type="checkbox" checked={Boolean(filters[key])} onChange={(e) => setFilters({ [key]: e.target.checked })} />
            {label}
          </label>
        ))}
      </AdminFilters>
      {isLoading ? <div className="soft-card h-72 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar los productos" description={error} actionLabel="Reintentar" onAction={refetch} /> : null}
      {!isLoading && !error && products.length === 0 ? <EmptyState title="No hay productos" description="Crea el primer producto del catalogo." /> : null}
      {!isLoading && !error && products.length > 0 ? (
        <ProductAdminTable
          products={products}
          onDeactivate={(product) => setConfirm({ type: 'deactivate', product })}
          onRestore={(product) => setConfirm({ type: 'restore', product })}
          onDeleteImage={(product) => setConfirm({ type: 'image', product })}
        />
      ) : null}
      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.type === 'restore' ? 'Restaurar producto' : confirm?.type === 'image' ? 'Eliminar imagen' : 'Desactivar producto'}
        message="Confirma esta accion para continuar."
        confirmLabel={confirm?.type === 'restore' ? 'Restaurar' : 'Confirmar'}
        tone={confirm?.type === 'restore' ? 'green' : 'rose'}
        onClose={() => setConfirm(null)}
        onConfirm={runConfirm}
      />
    </div>
  );
}
