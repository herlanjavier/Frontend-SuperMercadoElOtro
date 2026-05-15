import { Search } from 'lucide-react';

export default function ProductSearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar arroz, limpieza, bebidas..."
        className="h-13 w-full rounded-3xl border border-green-900/10 bg-white px-12 text-sm font-semibold text-slate-800 outline-none shadow-sm placeholder:text-slate-400 focus:border-green-600 focus:ring-4 focus:ring-green-700/10"
      />
    </div>
  );
}
