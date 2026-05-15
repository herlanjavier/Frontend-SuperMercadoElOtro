import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined));

export const adminUserService = {
  async getUsers(params = {}) {
    const { data } = await api.get('/users', { params: cleanParams(params) });
    return data.data;
  },

  async getUserById(id) {
    const { data } = await api.get(`/users/${id}`);
    return data.data;
  },

  async createSalesManager(payload) {
    const { data } = await api.post('/users/sales-managers', payload);
    return data.data;
  },

  async updateUser(id, payload) {
    const { data } = await api.patch(`/users/${id}`, payload);
    return data.data;
  },

  async deactivateUser(id) {
    const { data } = await api.patch(`/users/${id}/deactivate`);
    return data.data;
  },
};
