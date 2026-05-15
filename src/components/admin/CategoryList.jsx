import { Edit, Trash2 } from 'lucide-react';
import Button from '../common/Button.jsx';
import { getActiveStatusClass, getActiveStatusLabel } from '../../utils/adminHelpers.js';

export default function CategoryList({ categories, onEdit, onDeactivate }) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => {
        const active = category.isActive ?? category.is_active;
        return (
          <article key={category.id} className="soft-card rounded-[1.5rem] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-green-950">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{category.description || 'Sin descripcion'}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${getActiveStatusClass(active)}`}>{getActiveStatusLabel(active)}</span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button variant="secondary" icon={Edit} onClick={() => onEdit(category)}>Editar</Button>
              <Button variant="ghost" icon={Trash2} className="text-rose-700" onClick={() => onDeactivate(category)}>Desactivar</Button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
