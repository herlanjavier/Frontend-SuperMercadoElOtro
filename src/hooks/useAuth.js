import { useAuthStore } from '../store/auth.store.js';

export const useAuth = () => {
  const {
    token,
    user,
    profile,
    login,
    registerCustomer,
    logout,
    setSession,
    setExternalSession,
    clearSession,
    loadSession,
    refreshMe,
    isLoading,
    isAuthenticated,
    error,
  } = useAuthStore();

  return {
    token,
    user,
    profile,
    isAuthenticated,
    isLoading,
    error,
    role: profile?.role,
    login,
    registerCustomer,
    logout,
    setSession,
    setExternalSession,
    clearSession,
    loadSession,
    refreshMe,
  };
};
