import api from './api.js';

export const orderService = {
  async createOrder(payload) {
    const { data } = await api.post('/orders', payload);
    return data.data;
  },

  async getBusinessHoursStatus() {
    const { data } = await api.get('/orders/business-hours/current-status');
    return data.data;
  },
};
