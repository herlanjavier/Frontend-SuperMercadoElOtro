import { useState } from 'react';
import toast from 'react-hot-toast';
import { paymentService } from '../services/payment.service.js';

export function usePaymentActions() {
  const [isConfirming, setIsConfirming] = useState(false);

  const confirmPayment = async (orderId, notes = '') => {
    setIsConfirming(true);
    try {
      const result = await paymentService.confirmQrPayment(orderId, notes ? { notes } : {});
      toast.success('Pago confirmado correctamente.');
      return result;
    } catch (err) {
      toast.error(err.userMessage || err.response?.data?.message || 'No se pudo confirmar el pago.');
      throw err;
    } finally {
      setIsConfirming(false);
    }
  };

  return { isConfirming, confirmPayment };
}
