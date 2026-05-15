import { useCallback, useEffect, useMemo, useState } from 'react';
import { productService } from '../services/product.service.js';

const initialFilters = {
  search: '',
  categoryId: '',
  onlyAvailable: false,
  lowStock: false,
  criticalStock: false,
};

export const useProducts = (initial = {}) => {
  const [products, setProducts] = useState([]);
  const [filters, setFiltersState] = useState({ ...initialFilters, ...initial });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setFilters = useCallback((next) => {
    setFiltersState((current) => ({
      ...current,
      ...(typeof next === 'function' ? next(current) : next),
    }));
  }, []);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(filters);
      setProducts(data);
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
    () => ({ products, isLoading, error, filters, setFilters, refetch: fetchProducts }),
    [products, isLoading, error, filters, setFilters, fetchProducts],
  );
};
