import { useState } from 'react';
import { AlertTriangle, BadgeCheck } from 'lucide-react';
import Button from '../common/Button.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { getCustomerName, getSalesOrderItemsCount, getShortOrderId } from '../../utils/salesHelpers.js';

export default function PaymentConfirmDialog({ open, order, isLoading, onClose, onConfirm }) {
  const [notes, setNotes] = useState('');
  if (!open || !order) return null;
  const hasProof = Boolean(order.paymentProofPath || order.payment_proof_path);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-700">
          <BadgeCheck className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-center text-xl font-black text-green-950">Confirmar pago QR</h3>
        <p className="mt-2 text-center text-sm leading-6 text-slate-600">
          Verifica fisicamente el comprobante antes de confirmar. Esta accion descuenta stock y registra la venta.
        </p>
        <div className="mt-5 rounded-2xl bg-green-50 p-4 text-sm text-green-900">
          <p><span className="font-black">Pedido:</span> {getShortOrderId(order.id)}</p>
          <p><span className="font-black">Cliente:</span> {getCustomerName(order)}</p>
          <p><span className="font-black">Productos:</span> {getSalesOrderItemsCount(order)}</p>
          <p><span className="font-black">Total:</span> {formatCurrency(order.total)}</p>
        </div>
        {!hasProof ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="font-semibold">No se puede confirmar el pago hasta que el cliente suba un comprobante.</p>
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700">
            Comprobante cargado. Verificalo antes de confirmar.
          </div>
        )}
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Notas opcionales</span>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10" />
        </label>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button variant="secondary" disabled={isLoading} onClick={onClose}>Cancelar</Button>
          <Button isLoading={isLoading} disabled={!hasProof} onClick={() => onConfirm(notes)}>Confirmar pago</Button>
        </div>
      </div>
    </div>
  );
}
