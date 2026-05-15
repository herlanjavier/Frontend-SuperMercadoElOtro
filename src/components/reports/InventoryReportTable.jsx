import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { getStockStatusLabel, getStockStatusTone } from '../../utils/reportHelpers.js';

export function InventoryEntriesReportList({ entries = [] }) {
  return (
    <section className="grid gap-3">
      {entries.map((entry) => (
        <article key={entry.id} className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div>
              <p className="font-black text-green-950">{entry.product?.name || 'Producto'}</p>
              <p className="text-sm text-slate-500">Proveedor: {entry.supplier?.name || 'Sin proveedor'}</p>
            </div>
            <p className="text-sm font-bold text-slate-500">{formatDate(entry.receivedAt || entry.received_at)}</p>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-4">
            <p>Recibido: <b>{entry.quantityReceived ?? entry.quantity_received}</b></p>
            <p>Esperado: <b>{entry.expectedQuantity ?? entry.expected_quantity ?? '-'}</b></p>
            <p>Diferencia: <b>{entry.quantityDifference ?? entry.quantity_difference ?? 0}</b></p>
            <p>Costo: <b>{formatCurrency(entry.totalCost ?? entry.total_cost)}</b></p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default function InventoryReportTable({ products = [] }) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const status = product.stockStatus || product.stock_status;
        return (
          <article key={product.id} className="soft-card rounded-[1.5rem] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-green-950">{product.name}</h3>
                <p className="text-sm text-slate-500">{product.category?.name || 'Sin categoria'}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${getStockStatusTone(status)}`}>{getStockStatusLabel(status)}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-600">
              <p>Precio: <b>{formatCurrency(product.price)}</b></p>
              <p>Stock: <b>{product.stock}</b></p>
              <p>Minimo: <b>{product.minStock ?? product.min_stock}</b></p>
              <p>Critico: <b>{product.criticalStock ?? product.critical_stock}</b></p>
              <p className="col-span-2">Vence: <b>{formatDate(product.expirationDate || product.expiration_date)}</b></p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
