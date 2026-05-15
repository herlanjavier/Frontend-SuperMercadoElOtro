import api from './api.js';
import { buildReceiptFileName } from '../utils/receiptHelpers.js';

export const receiptService = {
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
