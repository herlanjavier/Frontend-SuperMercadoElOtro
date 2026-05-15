import { CheckCircle, Clock, PackageCheck, Truck, XCircle } from 'lucide-react';
import { cn } from '../../utils/helpers.js';

const steps = [
  { key: 'created', label: 'Pedido creado', icon: Clock },
  { key: 'confirmed', label: 'Pago confirmado', icon: CheckCircle },
  { key: 'ready_for_pickup', label: 'Listo', icon: PackageCheck },
  { key: 'delivered', label: 'Entregado', icon: Truck },
];

const progressByStatus = {
  pending_payment: 0,
  confirmed: 1,
  ready_for_pickup: 2,
  delivered: 3,
};

const messages = {
  pending_payment: 'Tu pedido esta pendiente hasta que el supermercado confirme el pago QR.',
  confirmed: 'Pago confirmado. Estamos preparando tu pedido.',
  ready_for_pickup: 'Tu pedido esta listo para ser recogido o enviado.',
  delivered: 'Pedido entregado.',
  cancelled: 'Este pedido fue cancelado.',
};

export default function OrderTimeline({ status }) {
  if (status === 'cancelled') {
    return (
      <section className="rounded-[1.75rem] border border-rose-100 bg-rose-50 p-5 text-rose-800">
        <div className="flex items-center gap-3">
          <XCircle className="h-6 w-6" />
          <p className="font-black">Pedido cancelado</p>
        </div>
        <p className="mt-2 text-sm">{messages.cancelled}</p>
      </section>
    );
  }

  const progress = progressByStatus[status] ?? 0;

  return (
    <section className="soft-card rounded-[1.75rem] p-5">
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index <= progress;
          return (
            <div key={step.key} className="text-center">
              <div
                className={cn(
                  'mx-auto grid h-11 w-11 place-items-center rounded-2xl ring-1',
                  active ? 'bg-green-700 text-white ring-green-700' : 'bg-slate-100 text-slate-400 ring-slate-200',
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className={cn('mt-2 text-[11px] font-black', active ? 'text-green-900' : 'text-slate-400')}>{step.label}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-5 rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-800">
        {messages[status] || messages.pending_payment}
      </p>
    </section>
  );
}
