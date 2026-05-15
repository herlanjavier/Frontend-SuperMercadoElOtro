import EmptyState from './EmptyState.jsx';

export default function ErrorState({ title = 'Algo salio mal', description = 'Intenta nuevamente.', onRetry }) {
  return <EmptyState title={title} description={description} actionLabel={onRetry ? 'Reintentar' : undefined} onAction={onRetry} />;
}
