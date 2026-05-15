import api from './api.js';

export const profileService = {
  async getMe() {
    const { data } = await api.get('/auth/me');
    return data.data;
  },

  async updateProfile(userId, payload) {
    const { data } = await api.patch(`/users/${userId}`, payload);
    return data.data;
  },
};
