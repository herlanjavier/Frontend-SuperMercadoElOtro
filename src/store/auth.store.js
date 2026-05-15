import { create } from 'zustand';
import { authService } from '../services/auth.service.js';
import { supabase } from '../services/supabaseAuth.service.js';
import { storage } from '../utils/storage.js';
import { useCartStore } from './cart.store.js';

const normalizeProfile = (profile) => {
  if (!profile) return null;

  return {
    ...profile,
    firstName: profile.firstName ?? profile.first_name,
    lastName: profile.lastName ?? profile.last_name,
    isActive: profile.isActive ?? profile.is_active ?? true,
    profileCompleted: profile.profileCompleted ?? profile.profile_completed,
  };
};

const normalizeSession = (data) => ({
  token: data.access_token || data.token || data.session?.access_token || null,
  refreshToken: data.refresh_token || data.refreshToken || data.session?.refresh_token || null,
  user: data.user || null,
  profile: normalizeProfile(data.profile),
});

let refreshMePromise = null;
let loadSessionPromise = null;

export const useAuthStore = create((set, get) => ({
  token: null,
  refreshToken: null,
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setSession(data) {
    const session = normalizeSession(data);

    if (session.profile?.isActive === false) {
      get().clearSession();
      throw new Error('Tu cuenta está desactivada.');
    }

    storage.setAuth(session);
    set({
      ...session,
      isAuthenticated: Boolean(session.token),
      error: null,
    });
  },

  setExternalSession({ accessToken, refreshToken }) {
    const session = {
      token: accessToken,
      refreshToken,
      user: null,
      profile: null,
    };

    storage.clearAuth();
    storage.setAuth(session);
    set({
      ...session,
      isAuthenticated: Boolean(accessToken),
      error: null,
    });
  },

  clearSession() {
    storage.clearAuth();
    localStorage.removeItem('el_otro_cart');
    useCartStore.getState().clearCart();
    set({
      token: null,
      refreshToken: null,
      user: null,
      profile: null,
      isAuthenticated: false,
      error: null,
    });
  },

  async login(email, password) {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.loginUser({ email, password });
      get().setSession(data);
      return normalizeSession(data);
    } catch (error) {
      const message = error.userMessage || error.message || 'No pudimos iniciar sesión.';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  async registerCustomer(formData) {
    set({ isLoading: true, error: null });
    try {
      return await authService.registerCustomer(formData);
    } catch (error) {
      const message = error.userMessage || 'No pudimos crear tu cuenta.';
      set({ error: message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  async refreshMe() {
    const { token } = get();
    if (!token) return null;
    if (refreshMePromise) return refreshMePromise;

    refreshMePromise = (async () => {
      const data = await authService.getCurrentUser();
      const profile = normalizeProfile(data.profile);

      if (profile?.isActive === false) {
        get().clearSession();
        return null;
      }

      const session = { token, refreshToken: get().refreshToken, user: data.user, profile };
      storage.setAuth(session);
      set({ ...session, isAuthenticated: true, error: null });
      return session;
    })();

    try {
      return await refreshMePromise;
    } catch {
      get().clearSession();
      return null;
    } finally {
      refreshMePromise = null;
    }
  },

  async loadSession() {
    if (loadSessionPromise) return loadSessionPromise;

    loadSessionPromise = (async () => {
      set({ isLoading: true });
      const saved = storage.getAuth();

      if (!saved?.token) {
        set({ isLoading: false, isAuthenticated: false });
        return null;
      }

      set({
        token: saved.token,
        refreshToken: saved.refreshToken,
        user: saved.user,
        profile: normalizeProfile(saved.profile),
        isAuthenticated: true,
      });

      await get().refreshMe();
      set({ isLoading: false });
      return get();
    })();

    try {
      return await loadSessionPromise;
    } finally {
      loadSessionPromise = null;
    }
  },

  async logout() {
    set({ isLoading: true });
    try {
      await authService.logoutUser();
      await supabase.auth.signOut().catch(() => null);
    } finally {
      get().clearSession();
      set({ isLoading: false });
    }
  },
}));
