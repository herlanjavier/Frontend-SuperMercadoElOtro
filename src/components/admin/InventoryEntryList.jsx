import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { getQuantityDifferenceClass, getQuantityDifferenceLabel } from '../../utils/inventoryHelpers.js';

export default function InventoryEntryList({ entries = [] }) {
  return (
    <section className="grid gap-3">
      {entries.map((entry) => {
        const product = entry.product || {};
        const supplier = entry.supplier || {};
        const registeredBy = entry.registeredBy || entry.registered_by || {};
        const diff = entry.quantityDifference ?? entry.quantity_difference;
        return (
          <article key={entry.id} className="soft-card rounded-[1.5rem] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-black text-green-950">{product.name || 'Producto'}</h3>
                <p className="text-sm text-slate-500">Proveedor: {supplier.name || 'Sin proveedor'}</p>
                <p className="text-sm text-slate-500">Registrado por: {[registeredBy.firstName || registeredBy.first_name, registeredBy.lastName || registeredBy.last_name].filter(Boolean).join(' ') || 'No disponible'}</p>
              </div>
              <p className="text-sm font-bold text-slate-500">{formatDate(entry.receivedAt || entry.received_at)}</p>
            </div>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-4">
              <p><span className="font-black text-green-950">Recibido:</span> {entry.quantityReceived ?? entry.quantity_received}</p>
              <p><span className="font-black text-green-950">Esperado:</span> {entry.expectedQuantity ?? entry.expected_quantity ?? '-'}</p>
              <p className={getQuantityDifferenceClass(diff)}><span className="font-black">Diferencia:</span> {getQuantityDifferenceLabel(diff)}</p>
              <p><span className="font-black text-green-950">Costo:</span> {formatCurrency(entry.totalCost ?? entry.total_cost)}</p>
            </div>
            {entry.notes ? <p className="mt-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600">{entry.notes}</p> : null}
          </article>
        );
      })}
    </section>
  );
}
