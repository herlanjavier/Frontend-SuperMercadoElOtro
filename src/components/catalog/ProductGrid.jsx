import EmptyState from '../common/EmptyState.jsx';
import ProductCard from './ProductCard.jsx';

const SkeletonCard = () => (
  <div className="soft-card overflow-hidden rounded-3xl">
    <div className="aspect-[4/3] animate-pulse bg-slate-100" />
    <div className="grid gap-3 p-4">
      <div className="h-5 w-24 animate-pulse rounded-full bg-slate-100" />
      <div className="h-5 w-4/5 animate-pulse rounded-full bg-slate-100" />
      <div className="h-4 w-full animate-pulse rounded-full bg-slate-100" />
      <div className="flex justify-between">
        <div className="h-7 w-20 animate-pulse rounded-full bg-slate-100" />
        <div className="h-10 w-24 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    </div>
  </div>
);

export default function ProductGrid({ products, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div className="grid gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="No se pudo cargar el catálogo"
        description={error}
        actionLabel="Reintentar"
        onAction={onRetry}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No encontramos productos"
        description="Prueba con otra búsqueda, cambia la categoría o desactiva filtros."
        actionLabel="Limpiar filtros"
        onAction={onRetry}
      />
    );
  }

  return (
    <div className="grid gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
