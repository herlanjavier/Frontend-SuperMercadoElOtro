import { useEffect, useMemo } from 'react';
import { PackageOpen, RefreshCw } from 'lucide-react';
import Button from '../common/Button.jsx';
import SectionTitle from '../common/SectionTitle.jsx';
import { useCategoryStore } from '../../store/category.store.js';

const tones = [
  'bg-green-50 text-green-700',
  'bg-sky-50 text-sky-700',
  'bg-yellow-50 text-yellow-700',
  'bg-orange-50 text-orange-700',
  'bg-rose-50 text-rose-700',
  'bg-emerald-50 text-emerald-700',
];

export default function CategoriesPreview() {
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  const visibleCategories = useMemo(() => categories.filter((category) => category.isActive !== false).slice(0, 6), [categories]);

  useEffect(() => {
    fetchCategories({ includeInactive: false }).catch(() => null);
  }, [fetchCategories]);

  return (
    <section id="categorias" className="bg-white/70 py-16">
      <div className="container-app">
        <SectionTitle
          eyebrow="Categorias"
          title="Encuentra rapido lo que hace falta en casa"
          description="Explora categorias activas del supermercado antes de iniciar tu compra."
        />

        {isLoading && visibleCategories.length === 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-36 animate-pulse rounded-3xl bg-slate-100" />
            ))}
          </div>
        ) : error && visibleCategories.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-rose-100 bg-rose-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-bold text-rose-700">{error}</p>
              <Button variant="secondary" icon={RefreshCw} onClick={() => fetchCategories({ force: true })}>
                Reintentar
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCategories.map((category, index) => (
              <article key={category.id} className="group soft-card rounded-3xl p-5 hover:-translate-y-1">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${tones[index % tones.length]}`}>
                  <PackageOpen className="h-7 w-7" />
                </div>
                <h3 className="font-black text-green-950">{category.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {category.description || 'Productos seleccionados para tus compras diarias.'}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
