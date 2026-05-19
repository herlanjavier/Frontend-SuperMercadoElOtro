import { useEffect, useState } from 'react';
import { Clock, RefreshCw, Save } from 'lucide-react';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useBusinessHoursAdmin } from '../../hooks/useBusinessHoursAdmin.js';
import { cn } from '../../utils/helpers.js';

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const emptyRows = days.map((_, dayOfWeek) => ({
  dayOfWeek,
  opensAt: '06:00',
  closesAt: '22:00',
  isOpen: true,
}));

const sortByDay = (items) => [...items].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

export default function AdminBusinessHoursPage() {
  const { hours, isLoading, isSaving, savingDay, error, refetch, updateHour } = useBusinessHoursAdmin();
  const [rows, setRows] = useState(emptyRows);

  useEffect(() => {
    if (hours.length > 0) {
      setRows(sortByDay(hours));
    }
  }, [hours]);

  const updateRow = (dayOfWeek, field, value) => {
    setRows((current) =>
      current.map((row) => (row.dayOfWeek === dayOfWeek ? { ...row, [field]: value } : row)),
    );
  };

  const saveRow = async (row) => {
    try {
      await updateHour(row.dayOfWeek, {
        opensAt: row.opensAt,
        closesAt: row.closesAt,
        isOpen: row.isOpen,
      });
    } catch {
      return null;
    }

    return null;
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Horario de atención"
        subtitle="Configura los días y horas en los que los clientes pueden realizar pedidos"
        actionLabel="Recargar"
        onAction={refetch}
        icon={RefreshCw}
      />

      {error ? (
        <EmptyState title="No se pudo cargar el horario" description={error} actionLabel="Reintentar" onAction={refetch} />
      ) : null}

      <section className="grid gap-4">
        {isLoading ? (
          [0, 1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-40 animate-pulse rounded-[2rem] bg-slate-100" />
          ))
        ) : (
          rows.map((row) => {
            const isOpen = Boolean(row.isOpen);
            const savingThisDay = isSaving && savingDay === row.dayOfWeek;

            return (
              <article
                key={row.dayOfWeek}
                className={cn(
                  'soft-card rounded-[2rem] p-5 ring-1',
                  isOpen ? 'ring-green-600/15' : 'ring-red-500/15',
                )}
              >
                <div className="grid gap-5 lg:grid-cols-[220px_1fr_auto] lg:items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'grid h-12 w-12 place-items-center rounded-2xl',
                        isOpen ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500',
                      )}
                    >
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-green-950">{days[row.dayOfWeek]}</h3>
                      <span
                        className={cn(
                          'mt-1 inline-flex rounded-full px-3 py-1 text-xs font-black ring-1',
                          isOpen
                            ? 'bg-green-50 text-green-700 ring-green-600/15'
                            : 'bg-red-50 text-red-700 ring-red-500/15',
                        )}
                      >
                        {isOpen ? 'Abierto' : 'Cerrado'}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[auto_1fr_1fr] sm:items-end">
                    <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isOpen}
                        onChange={(event) => updateRow(row.dayOfWeek, 'isOpen', event.target.checked)}
                        className="h-5 w-5 rounded border-slate-300 text-green-700 focus:ring-green-600"
                      />
                      <span className="text-sm font-black text-slate-700">{isOpen ? 'Abierto' : 'Cerrado'}</span>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">Apertura</span>
                      <input
                        type="time"
                        value={row.opensAt}
                        onChange={(event) => updateRow(row.dayOfWeek, 'opensAt', event.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm font-bold text-slate-900 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-sm font-semibold text-slate-700">Cierre</span>
                      <input
                        type="time"
                        value={row.closesAt}
                        onChange={(event) => updateRow(row.dayOfWeek, 'closesAt', event.target.value)}
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm font-bold text-slate-900 outline-none focus:border-green-600 focus:ring-4 focus:ring-green-700/10"
                      />
                    </label>
                  </div>

                  <Button
                    icon={Save}
                    isLoading={savingThisDay}
                    disabled={isSaving && !savingThisDay}
                    onClick={() => saveRow(row)}
                    className="w-full lg:w-auto"
                  >
                    Guardar
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}
