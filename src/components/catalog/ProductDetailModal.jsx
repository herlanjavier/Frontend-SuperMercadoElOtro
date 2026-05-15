import { X } from 'lucide-react';
import Button from '../common/Button.jsx';
import ProductImage from './ProductImage.jsx';
import ProductPrice from './ProductPrice.jsx';
import ProductStockBadge from './ProductStockBadge.jsx';

export default function ProductDetailModal({ product, onClose, onAdd }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-green-950/40 p-3 backdrop-blur-sm sm:place-items-center">
      <article className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <h3 className="font-black text-green-950">Detalle del producto</h3>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <ProductImage product={product} className="aspect-square rounded-3xl" />
          <div>
            <ProductStockBadge status={product.stockStatus} stock={product.stock} />
            <h2 className="mt-4 text-2xl font-black text-green-950">{product.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
            <ProductPrice value={product.price} className="mt-4 text-2xl" />
            <Button className="mt-5 w-full" onClick={() => onAdd?.(product)}>
              Agregar
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
