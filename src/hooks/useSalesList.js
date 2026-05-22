import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { salesService } from '../services/sales.service.js';
import { DEFAULT_PAGINATION, getItemsFromResponse, getPaginationFromResponse } from '../utils/apiResponseHelpers.js';

const defaultFilters = { search: '', from: '', to: '', customerId: '', soldBy: '', page: 1, limit: 20 };
const pendingRequests = new Map();
const responseCache = new Map();
const CACHE_TTL_MS = 2000;

const buildKey = (filters) => JSON.stringify(filters);

const getSalesOnce = async (filters) => {
  const key = buildKey(filters);
  const cached = responseCache.get(key);

  if (cached && Date.now() - cached.time < CACHE_TTL_MS) {
    return cached.data;
  }

  if (!pendingRequests.has(key)) {
    pendingRequests.set(
      key,
      salesService.getSales(filters).then((data) => {
        responseCache.set(key, { data, time: Date.now() });
        return data;
      }).finally(() => {
        pendingRequests.delete(key);
      }),
    );
  }

  return pendingRequests.get(key);
};

const useDebouncedValue = (value, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [delay, value]);

  return debouncedValue;
};

export function useSalesList(initialFilters = {}) {
  const initialState = useMemo(() => ({ ...defaultFilters, ...initialFilters }), [initialFilters]);
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [filters, setFiltersState] = useState(initialState);
  const filtersRef = useRef(initialState);
  const debouncedFilters = useDebouncedValue(filters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const fetchSales = useCallback(async (nextFilters = filtersRef.current) => {
    setIsLoading(true);
    setError('');
    try {
      const result = await getSalesOnce(nextFilters);
      setSales(getItemsFromResponse(result));
      setPagination(getPaginationFromResponse(result));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar las ventas.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales(debouncedFilters);
  }, [debouncedFilters, fetchSales]);

  return {
    sales,
    pagination,
    filters,
    isLoading,
    error,
    refetch: fetchSales,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next, page: next.page ?? 1 })),
    setPage: (page) => setFiltersState((current) => ({ ...current, page })),
    setLimit: (limit) => setFiltersState((current) => ({ ...current, limit, page: 1 })),
  };
}
