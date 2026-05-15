import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined && value !== false));

export const supplierService = {
  async getSuppliers(params = {}) {
    const { data } = await api.get('/suppliers', { params: cleanParams(params) });
    return data.data;
  },

  async getSupplierById(id) {
    const { data } = await api.get(`/suppliers/${id}`);
    return data.data;
  },

  async createSupplier(payload) {
    const { data } = await api.post('/suppliers', payload);
    return data.data;
  },

  async updateSupplier(id, payload) {
    const { data } = await api.patch(`/suppliers/${id}`, payload);
    return data.data;
  },

  async deactivateSupplier(id) {
    const { data } = await api.delete(`/suppliers/${id}`);
    return data.data;
  },

  async restoreSupplier(id) {
    const { data } = await api.patch(`/suppliers/${id}/restore`);
    return data.data;
  },

  async addSupplierProducts(id, productIds) {
    const { data } = await api.post(`/suppliers/${id}/products`, { productIds });
    return data.data;
  },

  async removeSupplierProduct(id, productId) {
    const { data } = await api.delete(`/suppliers/${id}/products/${productId}`);
    return data.data;
  },
};
