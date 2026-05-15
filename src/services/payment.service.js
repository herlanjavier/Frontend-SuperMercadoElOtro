import api from './api.js';

export const paymentService = {
  async confirmQrPayment(orderId, payload = {}) {
    const { data } = await api.patch(`/payments/orders/${orderId}/confirm-qr`, payload);
    return data.data;
  },

  async getPaymentStatus(orderId) {
    const { data } = await api.get(`/payments/orders/${orderId}/status`);
    return data.data;
  },
};
