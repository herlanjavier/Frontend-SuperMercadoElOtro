import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminCategoryService } from '../services/admin-category.service.js';

export function useAdminCategories(params = { includeInactive: true }) {
  const paramsKey = JSON.stringify(params);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setCategories(await adminCategoryService.getCategories(JSON.parse(paramsKey)));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar las categorias.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [paramsKey]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const runSaving = async (action, message) => {
    setIsSaving(true);
    try {
      const result = await action();
      toast.success(message);
      await fetchCategories();
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
