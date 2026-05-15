import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import ProductForm from '../../components/admin/ProductForm.jsx';
import { useAdminCategories } from '../../hooks/useAdminCategories.js';
import { useAdminProducts } from '../../hooks/useAdminProducts.js';

export default function AdminProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const { categories } = useAdminCategories({ includeInactive: false });
  const { selectedProduct, isLoading, isSaving, fetchProductById, createProduct, updateProduct, deleteImage } = useAdminProducts(false);
  const [confirmImage, setConfirmImage] = useState(false);

  useEffect(() => {
    if (editing) fetchProductById(id);
  }, [editing, fetchProductById, id]);

  const submit = async (formData) => {
    if (editing) await updateProduct(id, formData);
    else await createProduct(formData);
    navigate('/admin/products');
  };

  const removeImage = async () => {
    await deleteImage(id);
    setConfirmImage(false);
    await fetchProductById(id);
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader title={editing ? 'Editar producto' : 'Nuevo producto'} subtitle="Completa los datos del producto y su imagen." />
      {editing && isLoading ? <div className="soft-card h-96 animate-pulse rounded-[2rem]" /> : (
        <ProductForm
          product={editing ? selectedProduct : null}
          categories={categories}
          isSaving={isSaving}
          onSubmit={submit}
          onDeleteImage={() => setConfirmImage(true)}
        />
      )}
      <ConfirmDialog open={confirmImage} title="Eliminar imagen" message="La imagen actual sera quitada del producto." onClose={() => setConfirmImage(false)} onConfirm={removeImage} />
    </div>
  );
}
