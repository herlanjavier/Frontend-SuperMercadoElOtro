import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';
import SupplierProductSelector from './SupplierProductSelector.jsx';

export default function SupplierForm({ supplier, products, isSaving, onSubmit }) {
  const [form, setForm] = useState({ name: '', phone: '', description: '', productIds: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supplier) return;
    setForm({
      name: supplier.name || '',
      phone: supplier.phone || '',
      description: supplier.description || '',
      productIds: (supplier.products || []).map((product) => product.id),
    });
  }, [supplier]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError('El nombre es requerido.');
      return;
    }
    onSubmit({ ...form, name: form.name.trim() });
  };

  return (
    <form onSubmit={submit} className="soft-card grid gap-5 rounded-[2rem] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Nombre" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(''); }} error={error} />
        <Input label="Telefono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Descripcion</span>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10" />
        </label>
      </div>
      <SupplierProductSelector products={products} selectedIds={form.productIds} onChange={(productIds) => setForm({ ...form, productIds })} />
      <Button type="submit" isLoading={isSaving} className="w-full sm:w-auto sm:justify-self-start">Guardar proveedor</Button>
    </form>
  );
}
