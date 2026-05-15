import api from './api.js';

export const categoryService = {
  async getCategories(params = {}) {
    const { data } = await api.get('/categories', { params });
    return data.data;
  },
};

export const getCategories = categoryService.getCategories;
