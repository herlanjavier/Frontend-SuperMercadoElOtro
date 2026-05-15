import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function BusinessHoursBanner({ isOpen, opensAt, closesAt, message, isLoading, error }) {
  if (isLoading) {
    return <div className="h-16 animate-pulse rounded-3xl bg-slate-100" />;
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-yellow-50 p-4 text-sm font-bold text-yellow-800 ring-1 ring-yellow-500/20">
        {error}
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-3xl p-4 ring-1 ${
        isOpen ? 'bg-green-50 text-green-800 ring-green-600/15' : 'bg-red-50 text-red-700 ring-red-500/15'
      }`}
    >
      {isOpen ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
      <div>
        <p className="font-black">{message || (isOpen ? 'Abierto para recibir pedidos.' : 'Cerrado para pedidos.')}</p>
        <p className="text-sm opacity-80">Horario: {opensAt || '06:00'} - {closesAt || '22:00'}</p>
      </div>
    </div>
  );
}
