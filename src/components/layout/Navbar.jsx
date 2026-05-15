import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import Logo from '../common/Logo.jsx';
import { useUiStore } from '../../store/ui.store.js';
import { useAuth } from '../../hooks/useAuth.js';
import { cn, getProfileName } from '../../utils/helpers.js';
import { getDashboardPathByRole } from '../../utils/roleRedirect.js';

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Categorías', href: '/#categorias' },
  { label: 'Destacados', href: '/#destacados' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
];

export default function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUiStore();
  const { isAuthenticated, profile, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardPath = getDashboardPathByRole(profile?.role);

  const handleLogout = async () => {
    await logout();
    closeMobileMenu();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-green-900/10 bg-white/80 backdrop-blur-xl">
      <nav className="container-app flex h-20 items-center justify-between">
        <Link to="/" onClick={closeMobileMenu}>
          <Logo />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-bold text-slate-600 hover:text-green-700">
              {link.label}
            </a>
          ))}
        </div>

        {isAuthenticated ? (
          <div className="hidden items-center gap-3 lg:flex">
            <p className="max-w-40 truncate text-sm font-bold text-slate-700">{getProfileName(profile)}</p>
            <Link
              to={dashboardPath}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-green-700 px-4 text-sm font-black text-white shadow-lg shadow-green-900/20 hover:bg-green-800"
            >
              <LayoutDashboard className="h-4 w-4" />
              Mi panel
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 text-sm font-black text-slate-700 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login" className="text-sm font-bold text-green-900 hover:text-green-700">
              Ingresar
            </Link>
            <Link
              to="/register"
              className="inline-flex min-h-10 items-center justify-center rounded-2xl bg-green-700 px-4 text-sm font-black text-white shadow-lg shadow-green-900/20 hover:bg-green-800"
            >
              Registrarse
            </Link>
          </div>
        )}

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-green-50 text-green-900 lg:hidden"
          onClick={toggleMobileMenu}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          'container-app grid overflow-hidden transition-all duration-300 lg:hidden',
          isMobileMenuOpen ? 'max-h-96 pb-5' : 'max-h-0',
        )}
      >
        <div className="glass-panel grid gap-2 rounded-3xl p-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMobileMenu}
              className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-green-50 hover:text-green-700"
            >
              {link.label}
            </a>
          ))}

          {isAuthenticated ? (
            <div className="grid gap-2 pt-2">
              <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-950">
                {getProfileName(profile)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={dashboardPath}
                  onClick={closeMobileMenu}
                  className="rounded-2xl bg-green-700 px-4 py-3 text-center text-sm font-black text-white"
                >
                  Mi panel
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-black text-slate-700"
                >
                  Salir
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="rounded-2xl bg-green-50 px-4 py-3 text-center text-sm font-black text-green-900"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="rounded-2xl bg-green-700 px-4 py-3 text-center text-sm font-black text-white"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
