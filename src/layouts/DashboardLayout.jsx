import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar.jsx';
import MobileBottomNav from '../components/layout/MobileBottomNav.jsx';
import CartButton from '../components/cart/CartButton.jsx';
import CartDrawer from '../components/cart/CartDrawer.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { getProfileName } from '../utils/helpers.js';
import { getRoleLabel } from '../utils/roleRedirect.js';
import { ROLES } from '../utils/constants.js';

export default function DashboardLayout() {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1 pb-24 lg:pb-0">
        <header className="flex items-center justify-between gap-4 border-b border-green-900/10 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-green-700">Panel de trabajo</p>
            <h1 className="mt-1 text-2xl font-black text-green-950">Hola, {getProfileName(profile)}</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500">{getRoleLabel(profile?.role)}</p>
          </div>
          {profile?.role === ROLES.CUSTOMER ? <CartButton /> : null}
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
      <CartDrawer />
    </div>
  );
}
