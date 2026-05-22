import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { customerOrderService } from '../services/customer-order.service.js';
import { DEFAULT_PAGINATION, getItemsFromResponse, getPaginationFromResponse } from '../utils/apiResponseHelpers.js';

const defaultFilters = { status: '', from: '', to: '', page: 1, limit: 20 };

export function useCustomerOrders(initialFilters = defaultFilters) {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ ...defaultFilters, ...initialFilters });
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await customerOrderService.getMyOrders(filters);
      setOrders(getItemsFromResponse(data));
      setPagination(getPaginationFromResponse(data));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar tus pedidos.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const cancelOrderById = async (orderId) => {
    try {
      await customerOrderService.cancelOrder(orderId);
      toast.success('Pedido cancelado correctamente.');
      await fetchOrders();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo cancelar el pedido.');
      throw err;
    }
  };

  const updateFilters = (next) => setFilters((current) => ({ ...current, ...next, page: next.page ?? 1 }));
  const clearFilters = () => setFilters(defaultFilters);

  return {
    orders,
    pagination,
    isLoading,
    error,
    filters,
    setFilters: updateFilters,
    setPage: (page) => setFilters((current) => ({ ...current, page })),
    setLimit: (limit) => setFilters((current) => ({ ...current, limit, page: 1 })),
    clearFilters,
    refetch: fetchOrders,
    cancelOrderById,
  };
}
