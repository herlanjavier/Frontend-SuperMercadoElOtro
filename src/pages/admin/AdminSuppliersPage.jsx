import { useState } from 'react';
import { Plus } from 'lucide-react';
import AdminFilters from '../../components/admin/AdminFilters.jsx';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import SupplierCard from '../../components/admin/SupplierCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useSuppliers } from '../../hooks/useSuppliers.js';

export default function AdminSuppliersPage() {
  const { suppliers, filters, setFilters, isLoading, error, refetch, deactivateSupplier, restoreSupplier } = useSuppliers();
  const [confirm, setConfirm] = useState(null);

  const runConfirm = async () => {
    if (confirm.type === 'deactivate') await deactivateSupplier(confirm.supplier.id);
    if (confirm.type === 'restore') await restoreSupplier(confirm.supplier.id);
    setConfirm(null);
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Proveedores" subtitle="Gestiona proveedores y productos asociados." actionLabel="Nuevo proveedor" actionTo="/admin/suppliers/new" icon={Plus} />
      <AdminFilters search={filters.search} onSearch={(search) => setFilters({ search })}>
        <label className="flex h-12 items-center gap-2 rounded-2xl bg-slate-50 px-4 text-sm font-bold text-slate-700">
          <input type="checkbox" checked={filters.includeInactive} onChange={(e) => setFilters({ includeInactive: e.target.checked })} />
          Incluir inactivos
        </label>
      </AdminFilters>
      {isLoading ? <div className="soft-card h-64 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar los proveedores" description={error} actionLabel="Reintentar" onAction={refetch} /> : null}
      {!isLoading && !error && suppliers.length === 0 ? <EmptyState title="No hay proveedores" description="Crea proveedores para asociarlos al inventario." /> : null}
      {!isLoading && !error && suppliers.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} onDeactivate={(s) => setConfirm({ type: 'deactivate', supplier: s })} onRestore={(s) => setConfirm({ type: 'restore', supplier: s })} />
          ))}
        </section>
      ) : null}
      <ConfirmDialog
        open={Boolean(confirm)}
        title={confirm?.type === 'restore' ? 'Restaurar proveedor' : 'Desactivar proveedor'}
        message="Confirma esta accion para continuar."
        tone={confirm?.type === 'restore' ? 'green' : 'rose'}
        onClose={() => setConfirm(null)}
        onConfirm={runConfirm}
      />
    </div>
  );
}
