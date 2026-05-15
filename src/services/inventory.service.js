import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined && value !== false));

export const inventoryService = {
  async getInventoryEntries(params = {}) {
    const { data } = await api.get('/inventory/entries', { params: cleanParams(params) });
    return data.data;
  },

  async getInventoryEntryById(id) {
    const { data } = await api.get(`/inventory/entries/${id}`);
    return data.data;
  },

  async createInventoryEntry(payload) {
    const { data } = await api.post('/inventory/entries', payload);
    return data.data;
  },

  async getInventorySummary() {
    const { data } = await api.get('/inventory/summary');
    return data.data;
  },

  async getLowStockProducts(params = {}) {
    const { data } = await api.get('/inventory/low-stock', { params: cleanParams(params) });
    return data.data;
  },

  async getInventoryNotifications(params = {}) {
    const { data } = await api.get('/inventory/notifications', { params: cleanParams(params) });
    return data.data;
  },

  async markNotificationAsRead(id) {
    const { data } = await api.patch(`/inventory/notifications/${id}/read`);
    return data.data;
  },

  async markAllNotificationsAsRead() {
    const { data } = await api.patch('/inventory/notifications/read-all');
    return data.data;
  },
};
