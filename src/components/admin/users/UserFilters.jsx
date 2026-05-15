import Input from '../../common/Input.jsx';
import { ROLES } from '../../../utils/constants.js';

export default function UserFilters({ filters, onChange }) {
  return (
    <section className="soft-card rounded-[1.75rem] p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_180px_180px] lg:items-end">
        <Input
          label="Buscar"
          value={filters.search || ''}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Nombre, apellido, CI, correo..."
        />
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Rol</span>
          <select
            value={filters.role || ''}
            onChange={(event) => onChange({ role: event.target.value })}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10"
          >
            <option value="">Todos</option>
            <option value={ROLES.ADMIN}>Administrador</option>
            <option value={ROLES.SALES_MANAGER}>Encargado de ventas</option>
            <option value={ROLES.CUSTOMER}>Cliente</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Estado</span>
          <select
            value={filters.isActive}
            onChange={(event) => onChange({ isActive: event.target.value })}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-900 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10"
          >
            <option value="">Todos</option>
            <option value="true">Activos</option>
            <option value="false">Inactivos</option>
          </select>
        </label>
      </div>
    </section>
  );
}
