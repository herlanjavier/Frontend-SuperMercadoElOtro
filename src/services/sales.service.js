import api from './api.js';
import { buildReceiptFileName } from '../utils/receiptHelpers.js';

const cleanParams = (params = {}) =>
  Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined));

export const salesService = {
  async getSales(params = {}) {
    const { data } = await api.get('/sales', { params: cleanParams(params) });
    return data.data;
  },

  async getSaleById(id) {
    const { data } = await api.get(`/sales/${id}`);
    return data.data;
  },

  async getSaleByOrderId(orderId) {
    const { data } = await api.get(`/sales/order/${orderId}`);
    return data.data;
  },

  async getReceiptBySaleId(saleId) {
    const { data } = await api.get(`/sales/${saleId}/receipt`);
    return data.data;
  },

  async downloadReceiptPdf(saleId, receipt) {
    const response = await api.get(`/sales/${saleId}/receipt/pdf`, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = buildReceiptFileName(receipt || { id: saleId });
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
