export const formatCurrency = (value) => `Bs ${Number(value || 0).toFixed(2)}`;

export const formatDate = (value) => {
  if (!value) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-BO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value));
};

export const safeText = (value, fallback = 'No disponible') => {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
};
