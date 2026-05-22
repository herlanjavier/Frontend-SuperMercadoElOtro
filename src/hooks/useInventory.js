import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { inventoryService } from '../services/inventory.service.js';
import { DEFAULT_PAGINATION, getItemsFromResponse, getPaginationFromResponse } from '../utils/apiResponseHelpers.js';

const defaultFilters = { productId: '', supplierId: '', date: '', from: '', to: '', search: '', page: 1, limit: 20 };

export function useInventory({ loadSummary = true, loadEntries = false } = {}) {
  const [summary, setSummary] = useState(null);
  const [entries, setEntries] = useState([]);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchSummary = useCallback(async () => {
    setError('');
    try {
      setSummary(await inventoryService.getInventorySummary());
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar el inventario.';
      setError(message);
      toast.error(message);
    }
  }, []);

  const fetchEntries = useCallback(async () => {
    setError('');
    try {
      const result = await inventoryService.getInventoryEntries(filters);
      setEntries(getItemsFromResponse(result));
      setPagination(getPaginationFromResponse(result));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar las entradas.';
      setError(message);
      toast.error(message);
    }
  }, [filters]);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      await Promise.all([loadSummary ? fetchSummary() : Promise.resolve(), loadEntries ? fetchEntries() : Promise.resolve()]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchEntries, fetchSummary, loadEntries, loadSummary]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createEntry = async (payload) => {
    setIsSaving(true);
    try {
      const result = await inventoryService.createInventoryEntry(payload);
      toast.success('Entrada registrada. El stock fue actualizado.');
      return result;
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo registrar la entrada.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    summary,
    entries,
    pagination,
    filters,
    isLoading,
    isSaving,
    error,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next, page: next.page ?? 1 })),
    setPage: (page) => setFiltersState((current) => ({ ...current, page })),
    setLimit: (limit) => setFiltersState((current) => ({ ...current, limit, page: 1 })),
    fetchSummary,
    fetchEntries,
    createEntry,
    refetch,
  };
}
