import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button.jsx';
import { DEFAULT_PAGINATION } from '../../utils/apiResponseHelpers.js';

const limits = [20, 50, 100];

export default function Pagination({ pagination = DEFAULT_PAGINATION, onPageChange, onLimitChange }) {
  const { page, limit, total, totalPages, hasNextPage, hasPreviousPage } = { ...DEFAULT_PAGINATION, ...pagination };

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <nav className="soft-card flex flex-col gap-3 rounded-[1.5rem] p-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Paginacion">
      <p className="text-center text-sm font-bold text-slate-600 sm:text-left">
        Pagina {page} de {totalPages} · {total} registros
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {onLimitChange ? (
          <select
            value={limit}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700"
            aria-label="Registros por pagina"
          >
            {limits.map((value) => (
              <option key={value} value={value}>
                {value} por pagina
              </option>
            ))}
          </select>
        ) : null}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" icon={ChevronLeft} disabled={!hasPreviousPage} onClick={() => onPageChange(page - 1)}>
            Anterior
          </Button>
          <Button variant="secondary" icon={ChevronRight} disabled={!hasNextPage} onClick={() => onPageChange(page + 1)}>
            Siguiente
          </Button>
        </div>
      </div>
    </nav>
  );
}
