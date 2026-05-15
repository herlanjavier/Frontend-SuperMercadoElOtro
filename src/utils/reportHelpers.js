import { formatCurrency } from './formatters.js';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const monthRegex = /^\d{4}-\d{2}$/;

export const normalizeReportFilters = (filters = {}) =>
  Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== '' && value !== null && value !== undefined && value !== false));

export const buildReportParams = normalizeReportFilters;

export const validateReportFilters = (filters = {}) => {
  if (filters.date && filters.month) return 'No puedes combinar fecha exacta con mes.';
  if (filters.date && (filters.from || filters.to)) return 'No puedes combinar fecha exacta con rango.';
  if (filters.month && !monthRegex.test(filters.month)) return 'El mes debe tener formato YYYY-MM.';
  if (filters.date && !dateRegex.test(filters.date)) return 'La fecha debe tener formato YYYY-MM-DD.';
  if (filters.from && filters.to && filters.from > filters.to) return 'La fecha desde no puede ser mayor que hasta.';
  return '';
};

export const getPeriodLabel = (filters = {}) => {
  if (filters.date) return `Fecha ${filters.date}`;
  if (filters.month) return `Mes ${filters.month}`;
  if (filters.from || filters.to) return `${filters.from || 'Inicio'} a ${filters.to || 'Hoy'}`;
  return 'Hoy';
};

export const formatReportDate = (date) => (date ? new Intl.DateTimeFormat('es-BO').format(new Date(date)) : 'Sin fecha');
export const formatReportMonth = (month) => month || 'Mes actual';

export const getStockStatusLabel = (status) => {
  const labels = { normal: 'Normal', low: 'Stock bajo', critical: 'Stock critico', out_of_stock: 'Sin stock' };
  return labels[status] || 'Normal';
};

export const getStockStatusTone = (status) => {
  const tones = {
    normal: 'bg-green-50 text-green-700 ring-green-200',
    low: 'bg-amber-50 text-amber-700 ring-amber-200',
    critical: 'bg-rose-50 text-rose-700 ring-rose-200',
    out_of_stock: 'bg-slate-100 text-slate-700 ring-slate-200',
  };
  return tones[status] || tones.normal;
};

export const calculateReportTotals = (items = [], field = 'totalRevenue') =>
  items.reduce((total, item) => total + Number(item[field] || item.revenue || item.total || 0), 0);

export const money = formatCurrency;
