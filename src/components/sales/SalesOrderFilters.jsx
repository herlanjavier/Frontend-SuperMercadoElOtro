import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

const statuses = [
  ['', 'Todos'],
  ['pending_payment', 'Pendiente de pago'],
  ['confirmed', 'Confirmado'],
  ['ready_for_pickup', 'Listo para recoger'],
  ['delivered', 'Entregado'],
  ['cancelled', 'Cancelado'],
];

export default function SalesOrderFilters({ filters, onChange, onClear, lockStatus = false }) {
  return (
    <section className="soft-card rounded-[1.75rem] p-4">
      <div className="grid gap-3 lg:grid-cols-[1fr_180px_160px_160px_auto] lg:items-end">
        <Input label="Buscar cliente" value={filters.search} onChange={(e) => onChange({ search: e.target.value })} placeholder="Nombre, CI o telefono" />
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Estado</span>
          <select disabled={lockStatus} value={filters.status} onChange={(e) => onChange({ status: e.target.value })} className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 disabled:opacity-60">
            {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <Input label="Desde" type="date" value={filters.from} onChange={(e) => onChange({ from: e.target.value })} />
        <Input label="Hasta" type="date" value={filters.to} onChange={(e) => onChange({ to: e.target.value })} />
        <Button variant="ghost" onClick={onClear}>Limpiar</Button>
      </div>
    </section>
  );
}
