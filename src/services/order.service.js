import api from './api.js';
import { businessHourService } from './business-hour.service.js';

export const orderService = {
  async createOrder(payload) {
    const { data } = await api.post('/orders', payload);
    return data.data;
  },

  async getBusinessHoursStatus() {
    return businessHourService.getCurrentBusinessStatus();
  },
};
