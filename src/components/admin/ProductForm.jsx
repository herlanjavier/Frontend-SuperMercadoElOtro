import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import ProductImageUploader, { validateImage } from './ProductImageUploader.jsx';

const initialState = {
  name: '',
  description: '',
  categoryId: '',
  price: '0',
  stock: '0',
  minStock: '0',
  criticalStock: '0',
  expirationDate: '',
  isActive: true,
};

export default function ProductForm({ product, categories = [], isSaving, onSubmit, onDeleteImage }) {
  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.name || '',
      description: product.description || '',
      categoryId: product.categoryId || product.category_id || product.category?.id || '',
      price: String(product.price ?? 0),
      stock: String(product.stock ?? 0),
      minStock: String(product.minStock ?? product.min_stock ?? 0),
      criticalStock: String(product.criticalStock ?? product.critical_stock ?? 0),
      expirationDate: (product.expirationDate || product.expiration_date || '').slice(0, 10),
      isActive: product.isActive ?? product.is_active ?? true,
    });
  }, [product]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleImage = (file) => {
    const error = validateImage(file);
    setErrors((current) => ({ ...current, image: error }));
    if (!error) setImage(file);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'El nombre es requerido.';
    if (!form.categoryId) next.categoryId = 'La categoria es requerida.';
    ['price', 'stock', 'minStock', 'criticalStock'].forEach((field) => {
      if (Number(form[field]) < 0) next[field] = 'Debe ser mayor o igual a 0.';
    });
    if (Number(form.criticalStock) > Number(form.minStock)) next.criticalStock = 'Debe ser menor o igual al stock minimo.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) data.append(key, value);
    });
    if (image) data.append('image', image);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="soft-card grid gap-5 rounded-[2rem] p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Nombre" value={form.name} onChange={(e) => setField('name', e.target.value)} error={errors.name} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Categoria</span>
            <select value={form.categoryId} onChange={(e) => setField('categoryId', e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10">
              <option value="">Seleccionar categoria</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
            {errors.categoryId ? <span className="mt-1 block text-xs font-medium text-red-600">{errors.categoryId}</span> : null}
          </label>
          <Input label="Precio" type="number" step="0.01" value={form.price} onChange={(e) => setField('price', e.target.value)} error={errors.price} />
          <Input label="Stock" type="number" value={form.stock} onChange={(e) => setField('stock', e.target.value)} error={errors.stock} />
          <Input label="Stock minimo" type="number" value={form.minStock} onChange={(e) => setField('minStock', e.target.value)} error={errors.minStock} />
          <Input label="Stock critico" type="number" value={form.criticalStock} onChange={(e) => setField('criticalStock', e.target.value)} error={errors.criticalStock} />
          <Input label="Vencimiento" type="date" value={form.expirationDate} onChange={(e) => setField('expirationDate', e.target.value)} />
          {product ? (
            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setField('isActive', e.target.checked)} />
              Producto activo
            </label>
          ) : null}
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Descripcion</span>
            <textarea value={form.description} onChange={(e) => setField('description', e.target.value)} rows={4} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10" />
          </label>
        </div>
        <ProductImageUploader
          file={image}
          currentImageUrl={product?.imageUrl || product?.image_url}
          onChange={handleImage}
          onRemoveCurrent={onDeleteImage}
          error={errors.image}
        />
      </div>
      <Button type="submit" isLoading={isSaving} className="w-full sm:w-auto sm:justify-self-start">
        Guardar producto
      </Button>
    </form>
  );
}
