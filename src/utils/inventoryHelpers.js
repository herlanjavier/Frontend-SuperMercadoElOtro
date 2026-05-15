import { formatCurrency } from './formatters.js';

export const getStockStatusLabel = (status) => {
  const labels = {
    normal: 'Normal',
    low: 'Stock bajo',
    critical: 'Stock critico',
    out_of_stock: 'Sin stock',
  };
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

export const getStockStatusDescription = (status) => {
  const descriptions = {
    normal: 'Stock dentro de rango.',
    low: 'Conviene reponer pronto.',
    critical: 'Reposicion urgente.',
    out_of_stock: 'Producto sin unidades disponibles.',
  };
  return descriptions[status] || descriptions.normal;
};

export const formatInventoryValue = (value) => formatCurrency(value);

export const getQuantityDifferenceLabel = (value) => {
  const diff = Number(value || 0);
  if (diff === 0) return 'Sin diferencia';
  return diff > 0 ? `Sobran ${diff}` : `Faltan ${Math.abs(diff)}`;
};

export const getQuantityDifferenceClass = (value) => {
  const diff = Number(value || 0);
  if (diff === 0) return 'text-green-700';
  return diff > 0 ? 'text-blue-700' : 'text-rose-700';
};
