import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { salesOrderService } from '../services/sales-order.service.js';

const defaultFilters = { status: '', search: '', from: '', to: '' };
const pendingRequests = new Map();
const responseCache = new Map();
const CACHE_TTL_MS = 2000;

const buildKey = (filters) => JSON.stringify(filters);

const getOrdersOnce = async (filters) => {
  const key = buildKey(filters);
  const cached = responseCache.get(key);

  if (cached && Date.now() - cached.time < CACHE_TTL_MS) {
    return cached.data;
  }

  if (!pendingRequests.has(key)) {
    pendingRequests.set(
      key,
      salesOrderService.getOrders(filters).then((data) => {
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

export function useSalesOrders(initialFilters = {}) {
  const initialState = useMemo(() => ({ ...defaultFilters, ...initialFilters }), [initialFilters]);
  const [orders, setOrders] = useState([]);
  const [filters, setFiltersState] = useState(initialState);
  const filtersRef = useRef(initialState);
  const debouncedFilters = useDebouncedValue(filters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const fetchOrders = useCallback(async (nextFilters = filtersRef.current) => {
    setIsLoading(true);
    setError('');
    try {
      setOrders(await getOrdersOnce(nextFilters));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar los pedidos.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(debouncedFilters);
  }, [debouncedFilters, fetchOrders]);

  return {
    orders,
    filters,
    isLoading,
    error,
    refetch: fetchOrders,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })),
  };
}
