import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { inventoryService } from '../services/inventory.service.js';

const defaultFilters = { productId: '', supplierId: '', date: '', from: '', to: '', search: '' };

export function useInventory({ loadSummary = true, loadEntries = false } = {}) {
  const [summary, setSummary] = useState(null);
  const [entries, setEntries] = useState([]);
  const [filters, setFiltersState] = useState(defaultFilters);
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
      setEntries(await inventoryService.getInventoryEntries(filters));
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
    filters,
    isLoading,
    isSaving,
    error,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })),
    fetchSummary,
    fetchEntries,
    createEntry,
    refetch,
  };
}
