import { NavLink } from 'react-router-dom';
import { Boxes, ClipboardList, CreditCard, Home, LogOut, Package, Receipt, ShoppingBag, ShoppingCart, Truck, UserRound, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.js';
import { ROLES } from '../../utils/constants.js';
import { cn } from '../../utils/helpers.js';

export default function MobileBottomNav() {
  const { profile, logout } = useAuth();
  const isCustomer = profile?.role === ROLES.CUSTOMER;
  const isAdmin = profile?.role === ROLES.ADMIN;
  const isSales = profile?.role === ROLES.SALES_MANAGER;

  const links = isCustomer
    ? [
        { label: 'Inicio', to: '/customer', icon: Home },
        { label: 'Catalogo', to: '/customer/catalog', icon: ShoppingBag },
        { label: 'Carrito', to: '/customer/cart', icon: ShoppingCart },
        { label: 'Pedidos', to: '/customer/orders', icon: ClipboardList },
        { label: 'Perfil', to: '/customer/profile', icon: UserRound },
      ]
    : isAdmin
      ? [
          { label: 'Panel', to: '/admin', icon: Home },
          { label: 'Productos', to: '/admin/products', icon: Package },
          { label: 'Prov.', to: '/admin/suppliers', icon: Truck },
          { label: 'Inv.', to: '/admin/inventory', icon: Boxes },
          { label: 'Usuarios', to: '/admin/users', icon: Users },
        ]
      : isSales
        ? [
            { label: 'Panel', to: '/sales', icon: Home },
            { label: 'Pedidos', to: '/sales/orders', icon: ClipboardList },
            { label: 'Pagos', to: '/sales/orders/pending-payments', icon: CreditCard },
            { label: 'Listos', to: '/sales/orders/ready', icon: Truck },
            { label: 'Ventas', to: '/sales/sales', icon: Receipt },
          ]
        : [
            { label: 'Inicio', to: '/sales', icon: Home },
            { label: 'Pedidos', to: '/sales', icon: ClipboardList },
            { label: 'Panel', to: '/sales', icon: ShoppingBag },
          ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 rounded-3xl border border-green-900/10 bg-white/90 p-2 shadow-2xl shadow-slate-900/15 backdrop-blur-xl lg:hidden">
      <div className={cn('grid gap-1', isCustomer || isAdmin || isSales ? 'grid-cols-6' : 'grid-cols-4')}>
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/admin' || to === '/customer' || to === '/sales'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[9px] font-black text-slate-500',
                isActive && 'bg-green-50 text-green-700',
              )
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={logout}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[9px] font-black text-slate-500"
        >
          <LogOut className="h-5 w-5" />
          Salir
        </button>
      </div>
    </nav>
  );
}
