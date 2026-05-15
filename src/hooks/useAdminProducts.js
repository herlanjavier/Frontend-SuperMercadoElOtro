import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminProductService } from '../services/admin-product.service.js';

const defaultFilters = { search: '', categoryId: '', includeInactive: true, onlyAvailable: false, lowStock: false, criticalStock: false };

export function useAdminProducts(autoLoad = true) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setProducts(await adminProductService.getAdminProducts(filters));
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
    isLoading,
    isSaving,
    error,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })),
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
