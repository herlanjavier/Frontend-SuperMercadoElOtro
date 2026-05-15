import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { customerOrderService } from '../services/customer-order.service.js';
import { receiptService } from '../services/receipt.service.js';
import { isOrderPaid } from '../utils/orderHelpers.js';

export function useOrderDetail(orderId) {
  const [order, setOrder] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [sale, setSale] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetail = useCallback(async () => {
    if (!orderId) return;
    setIsLoading(true);
    setError('');
    setSale(null);
    try {
      const [orderData, paymentData] = await Promise.all([
        customerOrderService.getOrderById(orderId),
        customerOrderService.getOrderPaymentStatus(orderId).catch(() => null),
      ]);
      setOrder(orderData);
      setPaymentStatus(paymentData);

      if (isOrderPaid(orderData?.status)) {
        try {
          const saleData = await receiptService.getSaleByOrderId(orderId);
          setSale(saleData?.sale || saleData);
        } catch (err) {
          if (err?.response?.status !== 404) throw err;
        }
      }
    } catch (err) {
      const message = err.userMessage || 'Pedido no encontrado.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const cancelOrder = async () => {
    try {
      const updated = await customerOrderService.cancelOrder(orderId);
      toast.success('Pedido cancelado correctamente.');
      setOrder(updated);
      await fetchDetail();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo cancelar el pedido.');
      throw err;
    }
  };

  return { order, paymentStatus, sale, isLoading, error, refetch: fetchDetail, cancelOrder };
}
