import SectionTitle from '../common/SectionTitle.jsx';
import { features } from '../../data/homeContentData.js';

export default function FeatureSection() {
  return (
    <section id="como-funciona" className="container-app py-16">
      <SectionTitle
        eyebrow="Cómo funciona"
        title="Una experiencia simple para comprar mejor"
        description="Diseñada para que elegir, pedir y recibir sea claro en móvil y escritorio."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <article key={title} className="soft-card rounded-3xl p-5">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black text-green-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
