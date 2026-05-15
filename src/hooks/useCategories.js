import { useCallback, useEffect, useState } from 'react';
import { categoryService } from '../services/category.service.js';

export const useCategories = (params = {}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories(params);
      setCategories(data);
    } catch (err) {
      setError(err.userMessage || err.response?.data?.message || 'No se pudieron cargar las categorías.');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { categories, isLoading, error, refetch };
};
