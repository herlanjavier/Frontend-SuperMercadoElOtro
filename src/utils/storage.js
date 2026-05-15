const STORAGE_KEY = 'el_otro_auth';
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth_user';
const PROFILE_KEY = 'auth_profile';

export const storage = {
  getAuth() {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const user = JSON.parse(localStorage.getItem(USER_KEY)) || null;
      const profile = JSON.parse(localStorage.getItem(PROFILE_KEY)) || null;
      const legacy = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;

      return {
        token: token || legacy?.token || legacy?.state?.token || null,
        refreshToken: refreshToken || legacy?.refreshToken || legacy?.state?.refreshToken || null,
        user: user || legacy?.user || legacy?.state?.user || null,
        profile: profile || legacy?.profile || legacy?.state?.profile || null,
      };
    } catch {
      return null;
    }
  },
  setAuth(value) {
    if (value.token) localStorage.setItem(ACCESS_TOKEN_KEY, value.token);
    if (value.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, value.refreshToken);
    if (value.user) localStorage.setItem(USER_KEY, JSON.stringify(value.user));
    if (value.profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(value.profile));
  },
  clearAuth() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PROFILE_KEY);
  },
};

export { STORAGE_KEY };
