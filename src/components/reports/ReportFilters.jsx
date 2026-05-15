import Button from '../common/Button.jsx';
import DateRangeSelector from './DateRangeSelector.jsx';

export default function ReportFilters({ filters, onChange, onApply, onClear, children, error }) {
  return (
    <section className="soft-card rounded-[1.75rem] p-4">
      <div className="grid gap-4">
        <DateRangeSelector filters={filters} onChange={onChange} />
        {children ? <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div> : null}
        {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{error}</p> : null}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={onApply}>Aplicar filtros</Button>
          <Button variant="ghost" onClick={onClear}>Limpiar</Button>
        </div>
      </div>
    </section>
  );
}
