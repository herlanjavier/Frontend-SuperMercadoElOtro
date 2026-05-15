import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import router from './router/index.jsx';
import { useAuthStore } from './store/auth.store.js';
import AppErrorBoundary from './components/common/AppErrorBoundary.jsx';

export default function App() {
  const loadSession = useAuthStore((state) => state.loadSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    loadSession();
    window.addEventListener('auth:unauthorized', clearSession);
    return () => window.removeEventListener('auth:unauthorized', clearSession);
  }, [clearSession, loadSession]);

  return (
    <AppErrorBoundary>
      <RouterProvider router={router} />
    </AppErrorBoundary>
  );
}
