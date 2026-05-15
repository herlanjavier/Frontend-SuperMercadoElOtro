import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import InventoryEntryForm from '../../components/admin/InventoryEntryForm.jsx';
import { useAdminProducts } from '../../hooks/useAdminProducts.js';
import { useInventory } from '../../hooks/useInventory.js';
import { useSuppliers } from '../../hooks/useSuppliers.js';

export default function AdminInventoryEntryFormPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { products } = useAdminProducts();
  const { suppliers } = useSuppliers();
  const { isSaving, createEntry } = useInventory({ loadSummary: false, loadEntries: false });

  const submit = async (payload) => {
    await createEntry(payload);
    navigate('/admin/inventory/entries');
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Registrar entrada" subtitle="El backend actualizara el stock mediante el trigger configurado." />
      <InventoryEntryForm products={products} suppliers={suppliers} initialProductId={params.get('productId') || ''} isSaving={isSaving} onSubmit={submit} />
    </div>
  );
}
