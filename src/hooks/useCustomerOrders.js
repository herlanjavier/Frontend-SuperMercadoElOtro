import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { customerOrderService } from '../services/customer-order.service.js';

const defaultFilters = { status: '', from: '', to: '' };

export function useCustomerOrders(initialFilters = defaultFilters) {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await customerOrderService.getMyOrders(filters);
      setOrders(Array.isArray(data) ? data : []);
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

  const updateFilters = (next) => setFilters((current) => ({ ...current, ...next }));
  const clearFilters = () => setFilters(defaultFilters);

  return { orders, isLoading, error, filters, setFilters: updateFilters, clearFilters, refetch: fetchOrders, cancelOrderById };
}
