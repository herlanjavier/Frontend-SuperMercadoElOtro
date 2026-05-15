import api from './api.js';

export const adminCategoryService = {
  async getCategories(params = {}) {
    const { data } = await api.get('/categories', { params });
    return data.data;
  },

  async createCategory(payload) {
    const { data } = await api.post('/categories', payload);
    return data.data;
  },

  async updateCategory(id, payload) {
    const { data } = await api.patch(`/categories/${id}`, payload);
    return data.data;
  },

  async deactivateCategory(id) {
    const { data } = await api.delete(`/categories/${id}`);
    return data.data;
  },
};
