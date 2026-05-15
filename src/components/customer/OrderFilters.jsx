import Button from '../common/Button.jsx';
import Input from '../common/Input.jsx';

const statuses = [
  { value: '', label: 'Todos' },
  { value: 'pending_payment', label: 'Pendiente de pago' },
  { value: 'confirmed', label: 'Confirmado' },
  { value: 'ready_for_pickup', label: 'Listo para recoger' },
  { value: 'delivered', label: 'Entregado' },
  { value: 'cancelled', label: 'Cancelado' },
];

export default function OrderFilters({ filters, onChange, onClear }) {
  return (
    <section className="soft-card rounded-[1.75rem] p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Estado</span>
          <select
            value={filters.status}
            onChange={(event) => onChange({ status: event.target.value })}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
        <Input label="Desde" type="date" value={filters.from} onChange={(event) => onChange({ from: event.target.value })} />
        <Input label="Hasta" type="date" value={filters.to} onChange={(event) => onChange({ to: event.target.value })} />
        <Button variant="ghost" onClick={onClear}>
          Limpiar
        </Button>
      </div>
    </section>
  );
}
