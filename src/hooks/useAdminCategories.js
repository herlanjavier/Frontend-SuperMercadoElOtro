import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { adminCategoryService } from '../services/admin-category.service.js';
import { useAuthStore } from '../store/auth.store.js';
import { useCategoryStore } from '../store/category.store.js';

export function useAdminCategories(params = { includeInactive: true }) {
  const includeInactive = Boolean(params.includeInactive);
  const options = useMemo(() => ({ includeInactive }), [includeInactive]);
  const { categories, isLoading, error, fetchCategories: fetchCategoriesFromStore, invalidateCategoriesCache } = useCategoryStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const token = useAuthStore((state) => state.token);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = useCallback(
    async (fetchOptions = {}) => {
      try {
        return await fetchCategoriesFromStore({ ...options, ...fetchOptions });
      } catch (err) {
        toast.error(err.userMessage || 'No se pudieron cargar las categorias.');
        return [];
      }
    },
    [fetchCategoriesFromStore, options],
  );

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !token) return;
    fetchCategories();
  }, [fetchCategories, isAuthLoading, isAuthenticated, token]);

  const runSaving = async (action, message) => {
    setIsSaving(true);
    try {
      const result = await action();
      toast.success(message);
      invalidateCategoriesCache();
      await fetchCategories({ force: true });
      return result;
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo guardar la categoria.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    categories,
    isLoading,
    isSaving,
    error,
    fetchCategories,
    createCategory: (payload) => runSaving(() => adminCategoryService.createCategory(payload), 'Categoria creada.'),
    updateCategory: (id, payload) => runSaving(() => adminCategoryService.updateCategory(id, payload), 'Categoria actualizada.'),
    deactivateCategory: (id) => runSaving(() => adminCategoryService.deactivateCategory(id), 'Categoria desactivada.'),
  };
}
