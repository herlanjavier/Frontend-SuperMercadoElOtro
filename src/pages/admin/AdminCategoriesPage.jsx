import { useState } from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import CategoryForm from '../../components/admin/CategoryForm.jsx';
import CategoryList from '../../components/admin/CategoryList.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useAdminCategories } from '../../hooks/useAdminCategories.js';

export default function AdminCategoriesPage() {
  const { categories, isLoading, isSaving, error, createCategory, updateCategory, deactivateCategory } = useAdminCategories({ includeInactive: true });
  const [editing, setEditing] = useState(null);
  const [toDeactivate, setToDeactivate] = useState(null);

  const submit = async (payload) => {
    if (editing) {
      await updateCategory(editing.id, payload);
      setEditing(null);
    } else {
      await createCategory(payload);
    }
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Categorias" subtitle="Organiza los productos del catalogo." />
      <CategoryForm category={editing} isSaving={isSaving} onSubmit={submit} onCancel={editing ? () => setEditing(null) : null} />
      {isLoading ? <div className="soft-card h-48 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? <EmptyState title="No se pudieron cargar las categorias" description={error} /> : null}
      {!isLoading && !error ? <CategoryList categories={categories} onEdit={setEditing} onDeactivate={setToDeactivate} /> : null}
      <ConfirmDialog
        open={Boolean(toDeactivate)}
        title="Desactivar categoria"
        message="La categoria no se borrara fisicamente, solo quedara inactiva."
        onClose={() => setToDeactivate(null)}
        onConfirm={async () => { await deactivateCategory(toDeactivate.id); setToDeactivate(null); }}
      />
    </div>
  );
}
