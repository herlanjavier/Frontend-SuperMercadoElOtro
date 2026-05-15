import { Edit, Package, RotateCcw, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { getActiveStatusClass, getActiveStatusLabel } from '../../utils/adminHelpers.js';
import { getStockStatusLabel, getStockStatusTone } from '../../utils/inventoryHelpers.js';

export default function ProductAdminCard({ product, onDeactivate, onRestore, onDeleteImage }) {
  const active = product.isActive ?? product.is_active;
  const image = product.imageUrl || product.image_url;
  const stockStatus = product.stockStatus || product.stock_status;
  const expirationDate = product.expirationDate || product.expiration_date;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm shadow-green-950/5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-950/10">
      <div className="relative h-48 flex-none overflow-hidden bg-slate-50 p-3 sm:h-56">
        <span className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-black ring-1 backdrop-blur ${getActiveStatusClass(active)}`}>
          {getActiveStatusLabel(active)}
        </span>
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100">
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="block rounded-2xl"
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <div className="grid place-items-center gap-2 text-center text-green-800">
              <Package className="mx-auto h-12 w-12" />
              <span className="text-xs font-black uppercase tracking-wide">Sin imagen</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="grid flex-1 gap-3 p-4">
          <div className="min-h-[58px]">
            <p className="text-xs font-black uppercase tracking-wide text-green-700">{product.category?.name || 'Sin categoria'}</p>
            <h3 className="mt-1 break-words text-base font-black leading-tight text-green-950">{product.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-2xl bg-green-50 p-2.5">
              <p className="text-xs font-bold text-green-700">Precio</p>
              <p className="mt-1 font-black text-green-950">{formatCurrency(product.price)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-2.5">
              <p className="text-xs font-bold text-slate-500">Stock</p>
              <p className="mt-1 font-black text-slate-950">{product.stock ?? 0}</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-slate-50 p-2.5">
              <p className="text-xs font-bold text-slate-500">Vencimiento</p>
              <p className="mt-1 font-black text-slate-950">{formatDate(expirationDate)}</p>
            </div>
          </div>

          <span className={`w-fit rounded-full px-3 py-1 text-xs font-black ring-1 ${getStockStatusTone(stockStatus)}`}>
            {getStockStatusLabel(stockStatus)}
          </span>
        </div>

        <div className="grid gap-2 border-t border-slate-100 bg-slate-50/80 p-3 sm:grid-cols-2">
          <Link to={`/admin/products/${product.id}/edit`} className="block">
            <Button variant="secondary" icon={Edit} className="min-h-10 w-full px-3 py-2">
              Editar
            </Button>
          </Link>
          {active === false ? (
            <Button icon={RotateCcw} className="min-h-10 w-full px-3 py-2" onClick={() => onRestore(product)}>
              Restaurar
            </Button>
          ) : (
            <Button variant="secondary" icon={Trash2} className="min-h-10 w-full px-3 py-2 text-rose-700 hover:bg-rose-50" onClick={() => onDeactivate(product)}>
              Desactivar
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
