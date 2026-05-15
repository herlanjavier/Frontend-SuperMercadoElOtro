export const getDashboardPathByRole = (role) => {
  if (role === 'admin') return '/admin';
  if (role === 'sales_manager') return '/sales';
  if (role === 'customer') return '/customer';
  return '/';
};

export const getRoleLabel = (role) => {
  if (role === 'admin') return 'Administrador';
  if (role === 'sales_manager') return 'Encargado de ventas';
  if (role === 'customer') return 'Cliente';
  return 'Usuario';
};
