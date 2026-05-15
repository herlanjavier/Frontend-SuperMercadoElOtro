import { useMemo, useState } from 'react';
import Input from '../common/Input.jsx';

export default function SupplierProductSelector({ products = [], selectedIds = [], onChange }) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => products.filter((product) => product.name?.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );
  const selectedProducts = useMemo(
    () => products.filter((product) => selectedIds.includes(product.id)),
    [products, selectedIds],
  );

  const toggle = (id) => {
    const exists = selectedIds.includes(id);
    onChange(exists ? selectedIds.filter((item) => item !== id) : [...selectedIds, id]);
  };

  return (
    <section className="grid gap-3">
      <Input label="Buscar productos asociados" value={search} onChange={(e) => setSearch(e.target.value)} />
      {selectedProducts.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedProducts.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => toggle(product.id)}
              className="rounded-full bg-green-50 px-3 py-1 text-xs font-black text-green-700 ring-1 ring-green-200"
              title="Quitar producto"
            >
              {product.name} x
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
          Selecciona productos para asociarlos al proveedor.
        </p>
      )}
      <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-2">
        {filtered.map((product) => (
          <label key={product.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-green-50">
            <input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => toggle(product.id)} />
            {product.name}
          </label>
        ))}
      </div>
    </section>
  );
}
