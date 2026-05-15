export const getActiveStatusLabel = (isActive) => (isActive === false ? 'Inactivo' : 'Activo');

export const getActiveStatusClass = (isActive) =>
  isActive === false ? 'bg-slate-100 text-slate-600 ring-slate-200' : 'bg-green-50 text-green-700 ring-green-200';

export const buildAdminBreadcrumbs = (...items) => items.filter(Boolean).join(' / ');

export { getRoleLabel } from './roleRedirect.js';
