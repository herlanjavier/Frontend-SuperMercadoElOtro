import { Tags } from 'lucide-react';
import { cn } from '../../utils/helpers.js';

export default function CategoryChips({ categories, selectedId, onSelect, isLoading }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <div className="flex min-w-max gap-2">
        <button
          type="button"
          onClick={() => onSelect('')}
          className={cn(
            'inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-black ring-1',
            !selectedId ? 'bg-green-700 text-white ring-green-700' : 'bg-white text-slate-600 ring-green-900/10',
          )}
        >
          <Tags className="h-4 w-4" />
          Todos
        </button>
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-11 w-28 animate-pulse rounded-2xl bg-slate-100" />
            ))
          : categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelect(category.id)}
                className={cn(
                  'h-11 rounded-2xl px-4 text-sm font-black ring-1',
                  selectedId === category.id
                    ? 'bg-green-700 text-white ring-green-700'
                    : 'bg-white text-slate-600 ring-green-900/10 hover:bg-green-50 hover:text-green-700',
                )}
              >
                {category.name}
              </button>
            ))}
      </div>
    </div>
  );
}
