import { Trash2 } from 'lucide-react';
import ProductImage from '../catalog/ProductImage.jsx';
import QuantitySelector from './QuantitySelector.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { calculateItemSubtotal } from '../../utils/cartHelpers.js';

export default function CartItem({ item, onIncrease, onDecrease, onRemove, onQuantityChange }) {
  const productLike = { name: item.name, imageUrl: item.imageUrl };

  return (
    <article className="grid grid-cols-[74px_1fr] gap-3 rounded-3xl bg-white p-3 ring-1 ring-green-900/10">
      <ProductImage product={productLike} className="h-[74px] rounded-2xl" />
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="line-clamp-1 font-black text-green-950">{item.name}</h3>
            <p className="text-xs font-bold text-slate-500">{item.categoryName}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item.productId)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <QuantitySelector
            value={item.quantity}
            max={item.stock}
            onChange={(quantity) => onQuantityChange(item.productId, quantity)}
          />
          <div className="text-right">
            <p className="text-xs text-slate-500">{formatCurrency(item.price)} c/u</p>
            <p className="font-black text-green-800">{formatCurrency(calculateItemSubtotal(item))}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
