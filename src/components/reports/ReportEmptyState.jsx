import EmptyState from '../common/EmptyState.jsx';

export default function ReportEmptyState({ title = 'Reporte sin datos', description = 'No se encontraron datos para los filtros seleccionados.', onRetry }) {
  return <EmptyState title={title} description={description} actionLabel={onRetry ? 'Reintentar' : undefined} onAction={onRetry} />;
}
