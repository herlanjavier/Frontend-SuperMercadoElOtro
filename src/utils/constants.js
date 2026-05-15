import logoUrl from '../assets/logo.png';
import portadaUrl from '../assets/portada.png';

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Supermercado Online El Otro';

export const ROLES = {
  ADMIN: 'admin',
  SALES_MANAGER: 'sales_manager',
  CUSTOMER: 'customer',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CUSTOMER: '/customer',
  ADMIN: '/admin',
  SALES: '/sales',
};

export const ASSETS = {
  LOGO: logoUrl,
  PORTADA: portadaUrl,
};
