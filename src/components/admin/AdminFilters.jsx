import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import Input from '../common/Input.jsx';

export default function AdminFilters({ search, onSearch, children }) {
  const [searchValue, setSearchValue] = useState(search || '');

  useEffect(() => {
    setSearchValue(search || '');
  }, [search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (searchValue !== (search || '')) {
        onSearch?.(searchValue);
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [onSearch, search, searchValue]);

  return (
    <section className="soft-card rounded-[1.75rem] p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_auto] lg:items-end">
        <Input
          label="Buscar"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Buscar por nombre, descripcion..."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:flex">{children}</div>
      </div>
    </section>
  );
}
