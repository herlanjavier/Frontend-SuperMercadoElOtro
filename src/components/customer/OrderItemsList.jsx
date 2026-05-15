import { Package } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

export default function OrderItemsList({ items = [] }) {
  return (
    <section className="soft-card rounded-[1.75rem] p-5">
      <h3 className="text-lg font-black text-green-950">Productos</h3>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <article key={item.id || item.productId} className="flex gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
            <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-green-50 text-green-700">
              {item.product?.imageUrl || item.product?.image_url || item.imageUrl || item.image_url ? (
                <img
                  src={item.product?.imageUrl || item.product?.image_url || item.imageUrl || item.image_url}
                  alt={item.productName || item.product_name || item.product?.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Package className="h-6 w-6" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-black text-green-950">{item.productName || item.product_name || item.product?.name || 'Producto'}</p>
              <p className="text-sm text-slate-500">
                {item.quantity} x {formatCurrency(item.unitPrice || item.unit_price)}
              </p>
            </div>
            <p className="font-black text-green-900">{formatCurrency(item.subtotal)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
