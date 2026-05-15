import { Edit, RotateCcw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { getActiveStatusClass, getActiveStatusLabel } from '../../utils/adminHelpers.js';

export default function SupplierCard({ supplier, onDeactivate, onRestore }) {
  const active = supplier.isActive ?? supplier.is_active;
  const products = supplier.products || [];

  return (
    <article className="soft-card rounded-[1.75rem] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-green-950">{supplier.name}</h3>
          <p className="text-sm text-slate-500">{supplier.phone || 'Sin telefono'}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${getActiveStatusClass(active)}`}>{getActiveStatusLabel(active)}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{supplier.description || 'Sin descripcion'}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {products.slice(0, 4).map((product) => <span key={product.id} className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">{product.name}</span>)}
        {products.length > 4 ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">+{products.length - 4}</span> : null}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link to={`/admin/suppliers/${supplier.id}/edit`}><Button variant="secondary" icon={Edit} className="w-full">Editar</Button></Link>
        {active === false ? (
          <Button icon={RotateCcw} onClick={() => onRestore(supplier)}>Restaurar</Button>
        ) : (
          <Button variant="secondary" icon={Trash2} className="text-rose-700" onClick={() => onDeactivate(supplier)}>Desactivar</Button>
        )}
      </div>
    </article>
  );
}
