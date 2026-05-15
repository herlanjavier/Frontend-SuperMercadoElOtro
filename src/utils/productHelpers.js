import { Package } from 'lucide-react';

export const getStockStatusLabel = (status, forCustomer = true) => {
  if (forCustomer && ['low', 'critical'].includes(status)) return 'Ultimas unidades';
  const labels = {
    normal: 'Disponible',
    low: 'Stock bajo',
    critical: 'Stock critico',
    out_of_stock: 'Sin stock',
  };
  return labels[status] || 'Disponible';
};

export const getStockStatusClass = (status) => {
  const classes = {
    normal: 'bg-green-50 text-green-700 ring-green-600/15',
    low: 'bg-yellow-50 text-yellow-700 ring-yellow-500/20',
    critical: 'bg-orange-50 text-orange-700 ring-orange-500/20',
    out_of_stock: 'bg-slate-100 text-slate-500 ring-slate-300',
  };
  return classes[status] || classes.normal;
};

export const isProductAvailable = (product) => product?.isActive !== false && Number(product?.stock || 0) > 0;

export const getProductImage = (product) => product?.imageUrl || product?.image_url || '';

export const ProductPlaceholderIcon = Package;
