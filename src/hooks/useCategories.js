import { useCallback, useEffect, useMemo } from 'react';
import { useAuthStore } from '../store/auth.store.js';
import { useCategoryStore } from '../store/category.store.js';

export const useCategories = (params = {}) => {
  const includeInactive = Boolean(params.includeInactive);
  const options = useMemo(() => ({ includeInactive }), [includeInactive]);
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const token = useAuthStore((state) => state.token);

  const refetch = useCallback(
    (fetchOptions = {}) => fetchCategories({ ...options, ...fetchOptions }),
    [fetchCategories, options],
  );

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !token) return;
    refetch();
  }, [isAuthLoading, isAuthenticated, refetch, token]);

  return { categories, isLoading, error, refetch };
};
