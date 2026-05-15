import SectionTitle from '../common/SectionTitle.jsx';
import { categories } from '../../data/homeContentData.js';

export default function CategoriesPreview() {
  return (
    <section id="categorias" className="bg-white/70 py-16">
      <div className="container-app">
        <SectionTitle
          eyebrow="Categorías"
          title="Encuentra rápido lo que hace falta en casa"
          description="Una vista inicial para preparar el catálogo real conectado al backend."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon, tone, description }) => (
            <article key={name} className="group soft-card rounded-3xl p-5 hover:-translate-y-1">
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${tone}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3 className="font-black text-green-950">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
