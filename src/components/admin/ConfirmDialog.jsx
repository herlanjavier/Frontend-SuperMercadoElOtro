import { AlertTriangle } from 'lucide-react';
import Button from '../common/Button.jsx';

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmar', onConfirm, onClose, tone = 'rose' }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-green-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl">
        <div className={`mx-auto grid h-14 w-14 place-items-center rounded-2xl ${tone === 'green' ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'}`}>
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-center text-xl font-black text-green-950">{title}</h3>
        <p className="mt-2 text-center text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button className={tone === 'green' ? '' : 'bg-rose-600 hover:bg-rose-700'} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
