import { Package, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { getStockStatusLabel, getStockStatusTone, getStockStatusDescription } from '../../utils/inventoryHelpers.js';

export default function LowStockProductCard({ product }) {
  const image = product.imageUrl || product.image_url;
  const status = product.stockStatus || product.stock_status;
  const minStock = product.minStock ?? product.min_stock;
  const criticalStock = product.criticalStock ?? product.critical_stock;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-sm shadow-green-950/5">
      <div className="relative h-40 flex-none overflow-hidden bg-slate-50 p-3 sm:h-44">
        <span className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-black ring-1 ${getStockStatusTone(status)}`}>
          {getStockStatusLabel(status)}
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
              <Package className="mx-auto h-11 w-11" />
              <span className="text-xs font-black uppercase tracking-wide">Sin imagen</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid flex-1 gap-4 p-5">
        <div className="min-h-[64px]">
          <p className="text-xs font-black uppercase tracking-wide text-green-700">{product.category?.name || 'Sin categoria'}</p>
          <h3 className="mt-1 break-words text-lg font-black leading-tight text-green-950">{product.name}</h3>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-2xl bg-slate-50 p-3">
            <span className="text-xs font-bold text-slate-500">Stock</span>
            <p className="mt-1 font-black text-slate-950">{product.stock ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3">
            <span className="text-xs font-bold text-amber-700">Min.</span>
            <p className="mt-1 font-black text-amber-950">{minStock ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-rose-50 p-3">
            <span className="text-xs font-bold text-rose-700">Crit.</span>
            <p className="mt-1 font-black text-rose-950">{criticalStock ?? 0}</p>
          </div>
        </div>

        <p className="text-sm leading-6 text-slate-600">{getStockStatusDescription(status)}</p>
      </div>

      <div className="border-t border-slate-100 bg-slate-50/80 p-4">
        <Link to={`/admin/inventory/new-entry?productId=${product.id}`} className="block">
          <Button icon={Plus} className="w-full">
            Registrar entrada
          </Button>
        </Link>
      </div>
    </article>
  );
}
