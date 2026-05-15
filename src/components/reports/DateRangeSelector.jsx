import Input from '../common/Input.jsx';

export default function DateRangeSelector({ filters, onChange }) {
  const setExact = (date) => onChange({ date, month: '', from: '', to: '' });
  const setMonth = (month) => onChange({ month, date: '', from: '', to: '' });
  const setRange = (field, value) => onChange({ [field]: value, date: '', month: '' });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {'date' in filters ? <Input label="Fecha exacta" type="date" value={filters.date} onChange={(e) => setExact(e.target.value)} /> : null}
      <Input label="Mes" type="month" value={filters.month || ''} onChange={(e) => setMonth(e.target.value)} />
      <Input label="Desde" type="date" value={filters.from || ''} onChange={(e) => setRange('from', e.target.value)} />
      <Input label="Hasta" type="date" value={filters.to || ''} onChange={(e) => setRange('to', e.target.value)} />
    </div>
  );
}
