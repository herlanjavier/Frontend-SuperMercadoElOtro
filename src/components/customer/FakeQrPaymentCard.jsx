import { QrCode } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

function QrPlaceholder() {
  return (
    <div className="grid aspect-square w-full place-items-center rounded-2xl bg-white ring-1 ring-slate-200">
      <div className="grid h-24 w-24 place-items-center rounded-2xl bg-slate-100 text-green-800">
        <QrCode className="h-12 w-12" />
      </div>
    </div>
  );
}

export default function FakeQrPaymentCard({ order, compact = false }) {
  const qrImage = order?.paymentQrImageUrl || order?.payment_qr_image_url;
  const qrCode = order?.paymentQrCode || order?.payment_qr_code || 'QR-DEMO';

  return (
    <section className="rounded-[1.75rem] border border-green-100 bg-green-50 p-5">
      <div className={compact ? 'grid gap-4 sm:grid-cols-[140px_1fr]' : 'grid gap-5 md:grid-cols-[220px_1fr]'}>
        <div className="rounded-3xl bg-white p-3 shadow-sm">
          {qrImage ? (
            <img
              src={qrImage}
              alt="QR simulado de pago"
              className="aspect-square w-full rounded-2xl object-contain bg-white"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                event.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={qrImage ? 'hidden' : ''}>
            <QrPlaceholder />
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-wide text-green-700">Pago QR</p>
          <h3 className="mt-1 text-2xl font-black text-green-950">QR simulado</h3>
          <div className="mt-4 grid gap-2 text-sm text-green-900">
            <p><span className="font-black">Codigo:</span> {qrCode}</p>
            {order?.total !== undefined ? <p><span className="font-black">Total:</span> {formatCurrency(order.total)}</p> : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-green-900/80">
            Realiza el pago usando este QR y luego sube tu comprobante desde el detalle del pedido.
          </p>
          <p className="mt-2 text-xs font-bold text-green-800/70">QR simulado/no funcional para demostracion.</p>
        </div>
      </div>
    </section>
  );
}
