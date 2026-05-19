import api from './api.js';

export const businessHourService = {
  async getBusinessHours() {
    const { data } = await api.get('/orders/business-hours');
    return data.data;
  },

  async getCurrentBusinessStatus() {
    const { data } = await api.get('/orders/business-hours/current-status');
    return data.data;
  },

  async updateBusinessHour(dayOfWeek, payload) {
    const { data } = await api.patch(`/orders/business-hours/${dayOfWeek}`, payload);
    return data.data;
  },
};

export const getBusinessHours = businessHourService.getBusinessHours;
export const getCurrentBusinessStatus = businessHourService.getCurrentBusinessStatus;
export const updateBusinessHour = businessHourService.updateBusinessHour;
