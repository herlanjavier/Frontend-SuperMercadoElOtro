import { Bell, CheckCircle } from 'lucide-react';
import Button from '../common/Button.jsx';
import { formatDate } from '../../utils/formatters.js';

export default function NotificationCard({ notification, onRead }) {
  const read = notification.isRead ?? notification.is_read;
  const type = notification.type || notification.alertType || notification.alert_type;
  const product = notification.product || {};

  return (
    <article className={`rounded-[1.5rem] p-5 shadow-sm ring-1 ${read ? 'bg-white ring-slate-100' : 'bg-amber-50 ring-amber-200'}`}>
      <div className="flex items-start gap-3">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${type === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
          <Bell className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-black text-green-950">{product.name || 'Producto'}</p>
            <span className="text-xs font-bold text-slate-500">{formatDate(notification.createdAt || notification.created_at)}</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">{notification.message}</p>
          <p className="mt-2 text-xs font-black uppercase tracking-wide text-slate-500">
            Tipo: {type || 'low'} | Stock alerta: {notification.stockAtAlert ?? notification.stock_at_alert ?? '-'}
          </p>
        </div>
      </div>
      {!read ? (
        <Button variant="secondary" icon={CheckCircle} className="mt-4 w-full sm:w-auto" onClick={() => onRead(notification.id)}>
          Marcar como leida
        </Button>
      ) : null}
    </article>
  );
}
