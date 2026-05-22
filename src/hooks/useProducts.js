import { useCallback, useEffect, useMemo, useState } from 'react';
import { productService } from '../services/product.service.js';
import { DEFAULT_PAGINATION, getItemsFromResponse, getPaginationFromResponse } from '../utils/apiResponseHelpers.js';

const initialFilters = {
  search: '',
  categoryId: '',
  onlyAvailable: false,
  lowStock: false,
  criticalStock: false,
  page: 1,
  limit: 20,
};

export const useProducts = (initial = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [filters, setFiltersState] = useState({ ...initialFilters, ...initial });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setFilters = useCallback((next) => {
    setFiltersState((current) => ({
      ...current,
      ...(typeof next === 'function' ? next(current) : next),
      page: typeof next === 'function' ? current.page : next.page ?? 1,
    }));
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(filters);
      setProducts(getItemsFromResponse(data));
      setPagination(getPaginationFromResponse(data));
    } catch (err) {
      setError(err.userMessage || err.response?.data?.message || 'No se pudo cargar el catálogo.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return useMemo(
    () => ({
      products,
      pagination,
      isLoading,
      error,
      filters,
      setFilters,
      setPage: (page) => setFilters({ page }),
      setLimit: (limit) => setFilters({ limit, page: 1 }),
      refetch: fetchProducts,
    }),
    [products, pagination, isLoading, error, filters, setFilters, fetchProducts],
  );
};
