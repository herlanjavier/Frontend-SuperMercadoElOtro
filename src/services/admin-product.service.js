import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined && value !== false));

export const adminProductService = {
  async getAdminProducts(params = {}) {
    const { data } = await api.get('/products', { params: cleanParams(params) });
    return data.data;
  },

  async getProductById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },

  async createProduct(formData) {
    const { data } = await api.post('/products', formData);
    return data.data;
  },

  async updateProduct(id, formData) {
    const { data } = await api.patch(`/products/${id}`, formData);
    return data.data;
  },

  async deactivateProduct(id) {
    const { data } = await api.delete(`/products/${id}`);
    return data.data;
  },

  async restoreProduct(id) {
    const { data } = await api.patch(`/products/${id}/restore`);
    return data.data;
  },

  async deleteProductImage(id) {
    const { data } = await api.delete(`/products/${id}/image`);
    return data.data;
  },
};
