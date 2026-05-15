import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { inventoryService } from '../services/inventory.service.js';

const defaultFilters = { type: '', includeOutOfStock: true };

export function useLowStock() {
  const [products, setProducts] = useState([]);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLowStock = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setProducts(await inventoryService.getLowStockProducts(filters));
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar el stock bajo.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchLowStock();
  }, [fetchLowStock]);

  return { products, filters, isLoading, error, fetchLowStock, setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })) };
}
