import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined));

export const customerOrderService = {
  async getMyOrders(params = {}) {
    const { data } = await api.get('/orders/my', { params: cleanParams(params) });
    return data.data;
  },

  async getOrderById(orderId) {
    const { data } = await api.get(`/orders/${orderId}`);
    return data.data;
  },

  async cancelOrder(orderId) {
    const { data } = await api.patch(`/orders/${orderId}/cancel`);
    return data.data;
  },

  async getOrderPaymentStatus(orderId) {
    const { data } = await api.get(`/payments/orders/${orderId}/status`);
    return data.data;
  },
};
