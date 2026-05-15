import { Link, NavLink } from 'react-router-dom';
import { BadgeCheck, BarChart3, Bell, Boxes, ClipboardList, CreditCard, FileBarChart, Home, LogOut, Package, PackageCheck, Receipt, ShoppingBag, ShoppingCart, Tags, TrendingDown, Truck, UserRound, Users } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { ROLES } from '../../utils/constants.js';
import { cn } from '../../utils/helpers.js';
import { getRoleLabel } from '../../utils/roleRedirect.js';

const navByRole = {
  [ROLES.CUSTOMER]: [
    { label: 'Inicio', to: '/customer', icon: Home },
    { label: 'Catalogo', to: '/customer/catalog', icon: ShoppingBag },
    { label: 'Carrito', to: '/customer/cart', icon: ShoppingCart },
    { label: 'Mis pedidos', to: '/customer/orders', icon: ClipboardList },
    { label: 'Perfil', to: '/customer/profile', icon: UserRound },
  ],
  [ROLES.ADMIN]: [
    { label: 'Dashboard', to: '/admin', icon: BarChart3 },
    { label: 'Productos', to: '/admin/products', icon: Package },
    { label: 'Categorias', to: '/admin/categories', icon: Tags },
    { label: 'Proveedores', to: '/admin/suppliers', icon: Truck },
    { label: 'Inventario', to: '/admin/inventory', icon: Boxes },
    { label: 'Stock bajo', to: '/admin/inventory/low-stock', icon: TrendingDown },
    { label: 'Notificaciones', to: '/admin/notifications', icon: Bell },
    { label: 'Usuarios', to: '/admin/users', icon: Users },
    { label: 'Reportes', to: '/admin/reports', icon: FileBarChart },
  ],
  [ROLES.SALES_MANAGER]: [
    { label: 'Dashboard', to: '/sales', icon: BarChart3 },
    { label: 'Pedidos', to: '/sales', icon: ClipboardList },
    { label: 'Pagos pendientes', to: '/sales/orders/pending-payments', icon: CreditCard },
    { label: 'Confirmados', to: '/sales/orders/confirmed', icon: BadgeCheck },
    { label: 'Listos / entregas', to: '/sales/orders/ready', icon: PackageCheck },
    { label: 'Ventas', to: '/sales/sales', icon: Receipt },
    { label: 'Perfil', to: '/sales', icon: UserRound },
  ],
};

export default function Sidebar() {
  const { profile, logout } = useAuth();
  const links = navByRole[profile?.role] || [];

  return (
    <aside className="sticky top-0 hidden h-screen w-72 overflow-y-auto border-r border-green-900/10 bg-white/80 p-5 backdrop-blur-xl lg:block">
      <Link to="/">
        <Logo />
      </Link>
      <div className="mt-6 rounded-3xl bg-green-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-green-700">{getRoleLabel(profile?.role)}</p>
        <p className="mt-1 truncate text-sm font-bold text-green-950">
          {profile?.firstName || profile?.first_name || 'Usuario'}
        </p>
      </div>
      <div className="mt-8 grid gap-2 pb-24">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/admin' || to === '/customer' || to === '/sales'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 hover:bg-green-50 hover:text-green-800',
                isActive && 'bg-green-700 text-white hover:bg-green-700 hover:text-white',
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </div>
      <button
        type="button"
        onClick={logout}
        className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-red-50 hover:text-red-700"
      >
        <LogOut className="h-5 w-5" />
        Cerrar sesion
      </button>
    </aside>
  );
}
