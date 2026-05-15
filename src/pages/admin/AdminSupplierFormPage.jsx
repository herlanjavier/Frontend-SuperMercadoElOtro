import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import SupplierForm from '../../components/admin/SupplierForm.jsx';
import { useAdminProducts } from '../../hooks/useAdminProducts.js';
import { useSuppliers } from '../../hooks/useSuppliers.js';

export default function AdminSupplierFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const { products } = useAdminProducts();
  const { selectedSupplier, isLoading, isSaving, fetchSupplierById, createSupplier, updateSupplier } = useSuppliers(false);

  useEffect(() => {
    if (editing) fetchSupplierById(id);
  }, [editing, fetchSupplierById, id]);

  const submit = async (payload) => {
    if (editing) await updateSupplier(id, payload);
    else await createSupplier(payload);
    navigate('/admin/suppliers');
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader title={editing ? 'Editar proveedor' : 'Nuevo proveedor'} subtitle="Asocia proveedores con productos disponibles." />
      {editing && isLoading ? <div className="soft-card h-80 animate-pulse rounded-[2rem]" /> : (
        <SupplierForm supplier={editing ? selectedSupplier : null} products={products} isSaving={isSaving} onSubmit={submit} />
      )}
    </div>
  );
}
