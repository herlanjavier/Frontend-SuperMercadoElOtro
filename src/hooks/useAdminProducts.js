import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminProductService } from '../services/admin-product.service.js';
import { DEFAULT_PAGINATION, getItemsFromResponse, getPaginationFromResponse } from '../utils/apiResponseHelpers.js';

const defaultFilters = { search: '', categoryId: '', includeInactive: true, onlyAvailable: false, lowStock: false, criticalStock: false, page: 1, limit: 20 };

export function useAdminProducts(autoLoad = true) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await adminProductService.getAdminProducts(filters);
      setProducts(getItemsFromResponse(result));
      setPagination(getPaginationFromResponse(result));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar los productos.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (autoLoad) fetchProducts();
  }, [autoLoad, fetchProducts]);

  const fetchProductById = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const product = await adminProductService.getProductById(id);
      setSelectedProduct(product);
      return product;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runSaving = async (action, successMessage) => {
    setIsSaving(true);
    try {
      const result = await action();
      toast.success(successMessage);
      return result;
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo guardar el producto.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    products,
    selectedProduct,
    filters,
    pagination,
    isLoading,
    isSaving,
    error,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next, page: next.page ?? 1 })),
    setPage: (page) => setFiltersState((current) => ({ ...current, page })),
    setLimit: (limit) => setFiltersState((current) => ({ ...current, limit, page: 1 })),
    refetch: fetchProducts,
    fetchProducts,
    fetchProductById,
    createProduct: (formData) => runSaving(() => adminProductService.createProduct(formData), 'Producto creado correctamente.'),
    updateProduct: (id, formData) => runSaving(() => adminProductService.updateProduct(id, formData), 'Producto actualizado correctamente.'),
    deactivateProduct: (id) => runSaving(() => adminProductService.deactivateProduct(id), 'Producto desactivado.').then(fetchProducts),
    restoreProduct: (id) => runSaving(() => adminProductService.restoreProduct(id), 'Producto restaurado.').then(fetchProducts),
    deleteImage: (id) => runSaving(() => adminProductService.deleteProductImage(id), 'Imagen eliminada.').then(fetchProducts),
  };
}
