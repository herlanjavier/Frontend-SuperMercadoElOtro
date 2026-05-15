import api from './api.js';

export const authService = {
  async loginUser(credentials) {
    const { data } = await api.post('/auth/login', credentials);
    return data.data;
  },

  async registerCustomer(payload) {
    const { data } = await api.post('/auth/register-customer', payload);
    return data.data;
  },

  async getCurrentUser() {
    const { data } = await api.get('/auth/me');
    return data.data;
  },

  async logoutUser() {
    await api.post('/auth/logout').catch(() => null);
  },
};

authService.login = authService.loginUser;
authService.me = authService.getCurrentUser;
authService.logout = authService.logoutUser;
