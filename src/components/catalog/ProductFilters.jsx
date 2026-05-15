import { CheckCircle, Filter } from 'lucide-react';
import { cn } from '../../utils/helpers.js';

export default function ProductFilters({ onlyAvailable, onOnlyAvailableChange }) {
  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-600 ring-1 ring-green-900/10 sm:flex">
        <Filter className="h-4 w-4" />
        Filtros
      </div>
      <button
        type="button"
        onClick={() => onOnlyAvailableChange(!onlyAvailable)}
        className={cn(
          'inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-black ring-1',
          onlyAvailable
            ? 'bg-green-700 text-white ring-green-700'
            : 'bg-white text-slate-600 ring-green-900/10 hover:bg-green-50',
        )}
      >
        <CheckCircle className="h-4 w-4" />
        Disponibles
      </button>
    </div>
  );
}
