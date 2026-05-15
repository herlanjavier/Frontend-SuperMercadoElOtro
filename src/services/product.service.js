import api from './api.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined && value !== false),
  );

export const productService = {
  async getProducts(params = {}) {
    const { data } = await api.get('/products', { params: cleanParams(params) });
    return data.data;
  },

  async getProductById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data.data;
  },
};

export const getProducts = productService.getProducts;
export const getProductById = productService.getProductById;
