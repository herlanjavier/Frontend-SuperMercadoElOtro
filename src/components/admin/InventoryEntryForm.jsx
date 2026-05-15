import { useEffect, useState } from 'react';
import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

export default function InventoryEntryForm({ products = [], suppliers = [], initialProductId = '', isSaving, onSubmit }) {
  const [form, setForm] = useState({
    productId: initialProductId,
    supplierId: '',
    quantityReceived: '1',
    expectedQuantity: '',
    totalCost: '0',
    receivedAt: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialProductId) setForm((current) => ({ ...current, productId: initialProductId }));
  }, [initialProductId]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!form.productId) next.productId = 'El producto es requerido.';
    if (Number(form.quantityReceived) <= 0) next.quantityReceived = 'Debe ser mayor a 0.';
    if (form.expectedQuantity !== '' && Number(form.expectedQuantity) < 0) next.expectedQuantity = 'Debe ser mayor o igual a 0.';
    if (Number(form.totalCost) < 0) next.totalCost = 'Debe ser mayor o igual a 0.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({
      productId: form.productId,
      supplierId: form.supplierId || null,
      quantityReceived: Number(form.quantityReceived),
      expectedQuantity: form.expectedQuantity === '' ? null : Number(form.expectedQuantity),
      totalCost: Number(form.totalCost || 0),
      receivedAt: form.receivedAt || undefined,
      notes: form.notes,
    });
  };

  return (
    <form onSubmit={submit} className="soft-card grid gap-4 rounded-[2rem] p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Producto</span>
          <select value={form.productId} onChange={(e) => setField('productId', e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10">
            <option value="">Seleccionar producto</option>
            {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
          </select>
          {errors.productId ? <span className="mt-1 block text-xs font-medium text-red-600">{errors.productId}</span> : null}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Proveedor</span>
          <select value={form.supplierId} onChange={(e) => setField('supplierId', e.target.value)} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10">
            <option value="">Sin proveedor</option>
            {suppliers.map((supplier) => <option key={supplier.id} value={supplier.id}>{supplier.name}</option>)}
          </select>
        </label>
        <Input label="Cantidad recibida" type="number" value={form.quantityReceived} onChange={(e) => setField('quantityReceived', e.target.value)} error={errors.quantityReceived} />
        <Input label="Cantidad esperada" type="number" value={form.expectedQuantity} onChange={(e) => setField('expectedQuantity', e.target.value)} error={errors.expectedQuantity} />
        <Input label="Costo total" type="number" step="0.01" value={form.totalCost} onChange={(e) => setField('totalCost', e.target.value)} error={errors.totalCost} />
        <Input label="Fecha de recepcion" type="datetime-local" value={form.receivedAt} onChange={(e) => setField('receivedAt', e.target.value)} />
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Notas</span>
          <textarea value={form.notes} onChange={(e) => setField('notes', e.target.value)} rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10" />
        </label>
      </div>
      <Button type="submit" isLoading={isSaving} className="w-full sm:w-auto sm:justify-self-start">Registrar entrada</Button>
    </form>
  );
}
