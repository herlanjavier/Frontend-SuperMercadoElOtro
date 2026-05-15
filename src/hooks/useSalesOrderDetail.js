import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { paymentService } from '../services/payment.service.js';
import { salesOrderService } from '../services/sales-order.service.js';
import { salesService } from '../services/sales.service.js';
import { isPaidStatus } from '../utils/salesHelpers.js';

export function useSalesOrderDetail(orderId) {
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
        salesOrderService.getOrderById(orderId),
        paymentService.getPaymentStatus(orderId).catch(() => null),
      ]);
      setOrder(orderData);
      setPaymentStatus(paymentData);
      if (isPaidStatus(orderData?.status)) {
        try {
          const saleData = await salesService.getSaleByOrderId(orderId);
          setSale(saleData?.sale || saleData);
        } catch (err) {
          if (err?.response?.status !== 404) throw err;
        }
      }
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar el pedido.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { order, paymentStatus, sale, isLoading, error, refetch: fetchDetail };
}
