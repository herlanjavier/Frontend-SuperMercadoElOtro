import { formatCurrency } from '../../utils/formatters.js';
import { formatOrderDate } from '../../utils/orderHelpers.js';
import { getReceiptTitle } from '../../utils/receiptHelpers.js';

export default function ReceiptCard({ receipt }) {
  const customer = receipt?.customer || {};
  const items = receipt?.items || receipt?.saleItems || receipt?.sale_items || [];

  return (
    <article className="rounded-[2rem] bg-white p-5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-100 sm:p-8">
      <div className="border-b border-dashed border-slate-200 pb-5 text-center">
        <p className="text-2xl font-black text-green-950">{receipt?.title || getReceiptTitle()}</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">{receipt?.note || 'No valido como factura'}</p>
        <p className="mt-4 text-sm font-black uppercase tracking-wide text-green-700">{receipt?.receiptNumber || receipt?.receipt_number}</p>
        <p className="text-sm text-slate-500">{formatOrderDate(receipt?.soldAt || receipt?.sold_at)}</p>
      </div>

      <div className="grid gap-2 border-b border-dashed border-slate-200 py-5 text-sm text-slate-600 sm:grid-cols-2">
        <p><span className="font-black text-green-950">Cliente:</span> {[customer.firstName || customer.first_name, customer.lastName || customer.last_name].filter(Boolean).join(' ') || 'Cliente'}</p>
        <p><span className="font-black text-green-950">CI:</span> {customer.ci || 'No registrado'}</p>
      </div>

      <div className="py-5">
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.id || item.productId || item.product_id} className="grid grid-cols-[1fr_auto] gap-3 rounded-2xl bg-slate-50 p-3">
              <div>
                <p className="font-black text-green-950">{item.productName || item.product_name || 'Producto'}</p>
                <p className="text-sm text-slate-500">
                  {item.quantity} x {formatCurrency(item.unitPrice || item.unit_price)}
                </p>
              </div>
              <p className="font-black text-green-900">{formatCurrency(item.subtotal)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-5">
        <span className="text-lg font-black text-green-950">Total</span>
        <span className="text-2xl font-black text-green-800">{formatCurrency(receipt?.total)}</span>
      </div>
    </article>
  );
}
