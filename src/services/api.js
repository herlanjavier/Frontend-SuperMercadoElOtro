import axios from 'axios';
import toast from 'react-hot-toast';
import { storage } from '../utils/storage.js';

let lastRateLimitToastAt = 0;

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error('Missing VITE_API_URL environment variable');
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const auth = storage.getAuth();

  const token = auth?.token || auth?.state?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
    delete config.headers['content-type'];
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.userMessage = 'No se pudo conectar con el servidor.';
    } else if (error.response.status === 429) {
      error.userMessage = error.response.data?.message || 'Demasiadas peticiones. Espera unos segundos e intenta nuevamente.';

      const now = Date.now();
      if (now - lastRateLimitToastAt > 4000) {
        toast.error(error.userMessage);
        lastRateLimitToastAt = now;
      }
    } else if (error.response.status === 403) {
      error.userMessage = error.response.data?.message || 'No tienes permiso para realizar esta accion.';
    } else {
      error.userMessage = error.response.data?.message || 'Ocurrio un error inesperado.';
    }

    if (error.response?.status === 401) {
      storage.clearAuth();
      window.dispatchEvent(new Event('auth:unauthorized'));

      if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/auth/callback')) {
        window.history.replaceState(null, '', '/login');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }

    return Promise.reject(error);
  },
);

export default api;
