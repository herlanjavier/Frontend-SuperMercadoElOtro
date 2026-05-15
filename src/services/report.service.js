import api from './api.js';
import { buildPdfFileName, downloadBlob, parseBlobError } from '../utils/downloadHelpers.js';
import { buildReportParams } from '../utils/reportHelpers.js';

const downloadPdf = async (url, params, filename) => {
  try {
    const response = await api.get(url, { params: buildReportParams(params), responseType: 'blob' });
    downloadBlob(new Blob([response.data], { type: 'application/pdf' }), filename);
  } catch (error) {
    error.userMessage = await parseBlobError(error);
    throw error;
  }
};

export const reportService = {
  async getSalesReport(params = {}) {
    const { data } = await api.get('/reports/sales', { params: buildReportParams(params) });
    return data.data;
  },

  downloadSalesReportPdf(params = {}) {
    return downloadPdf('/reports/sales/pdf', params, buildPdfFileName('reporte-ventas', params));
  },

  async getInventoryReport(params = {}) {
    const { data } = await api.get('/reports/inventory', { params: buildReportParams(params) });
    return data.data;
  },

  downloadInventoryReportPdf(params = {}) {
    return downloadPdf('/reports/inventory/pdf', params, buildPdfFileName('reporte-inventario', params));
  },

  async getDashboardSummary() {
    const { data } = await api.get('/reports/dashboard-summary');
    return data.data;
  },

  async getTopProductsReport(params = {}) {
    const { data } = await api.get('/reports/top-products', { params: buildReportParams(params) });
    return data.data;
  },

  async getSalesByDayReport(params = {}) {
    const { data } = await api.get('/reports/sales-by-day', { params: buildReportParams(params) });
    return data.data;
  },
};
