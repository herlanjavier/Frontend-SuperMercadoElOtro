import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import { getDashboardPathByRole } from '../utils/roleRedirect.js';

export default function RoleRoute({ roles }) {
  const { profile, isLoading } = useAuth();
  const location = useLocation();
  const role = profile?.role;

  if (isLoading || !role) {
    return <LoadingScreen />;
  }

  if (!roles.includes(role)) {
    return (
      <Navigate
        to="/access-denied"
        replace
        state={{ from: location.pathname, dashboard: getDashboardPathByRole(role) }}
      />
    );
  }

  return <Outlet />;
}
