import api from './api.js';

export const paymentProofService = {
  async uploadPaymentProof(orderId, file) {
    const formData = new FormData();
    formData.append('proof', file);

    const { data } = await api.post(`/orders/${orderId}/payment-proof`, formData);
    return data.data;
  },

  async getPaymentProof(orderId) {
    const { data } = await api.get(`/orders/${orderId}/payment-proof`);
    return data.data;
  },
};
