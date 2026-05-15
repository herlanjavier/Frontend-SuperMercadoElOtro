import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined));

export const salesOrderService = {
  async getOrders(params = {}) {
    const { data } = await api.get('/orders', { params: cleanParams(params) });
    return data.data;
  },

  async getOrderById(orderId) {
    const { data } = await api.get(`/orders/${orderId}`);
    return data.data;
  },

  async updateOrderStatus(orderId, status) {
    const { data } = await api.patch(`/orders/${orderId}/status`, { status });
    return data.data;
  },

  async updateDeliveryPerson(orderId, payload) {
    const { data } = await api.patch(`/orders/${orderId}/delivery-person`, payload);
    return data.data;
  },

  async cancelOrder(orderId) {
    const { data } = await api.patch(`/orders/${orderId}/cancel`);
    return data.data;
  },
};
