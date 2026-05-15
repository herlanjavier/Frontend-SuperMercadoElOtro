import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { supplierService } from '../services/supplier.service.js';

const defaultFilters = { search: '', includeInactive: true };

export function useSuppliers(autoLoad = true) {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setSuppliers(await supplierService.getSuppliers(filters));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar los proveedores.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (autoLoad) fetchSuppliers();
  }, [autoLoad, fetchSuppliers]);

  const fetchSupplierById = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const supplier = await supplierService.getSupplierById(id);
      setSelectedSupplier(supplier);
      return supplier;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runSaving = async (action, message, refetch = true) => {
    setIsSaving(true);
    try {
      const result = await action();
      toast.success(message);
      if (refetch) await fetchSuppliers();
      return result;
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo guardar el proveedor.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    suppliers,
    selectedSupplier,
    filters,
    isLoading,
    isSaving,
    error,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })),
    fetchSuppliers,
    fetchSupplierById,
    refetch: fetchSuppliers,
    createSupplier: (payload) => runSaving(() => supplierService.createSupplier(payload), 'Proveedor creado.', false),
    updateSupplier: (id, payload) => runSaving(() => supplierService.updateSupplier(id, payload), 'Proveedor actualizado.', false),
    deactivateSupplier: (id) => runSaving(() => supplierService.deactivateSupplier(id), 'Proveedor desactivado.'),
    restoreSupplier: (id) => runSaving(() => supplierService.restoreSupplier(id), 'Proveedor restaurado.'),
    addProducts: (id, productIds) => runSaving(() => supplierService.addSupplierProducts(id, productIds), 'Productos asociados.'),
    removeProduct: (id, productId) => runSaving(() => supplierService.removeSupplierProduct(id, productId), 'Producto quitado.'),
  };
}
