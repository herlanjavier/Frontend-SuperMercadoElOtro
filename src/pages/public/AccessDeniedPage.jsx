import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { getDashboardPathByRole } from '../../utils/roleRedirect.js';

export default function AccessDeniedPage() {
  const location = useLocation();
  const { profile } = useAuth();
  const dashboard = location.state?.dashboard || getDashboardPathByRole(profile?.role);

  return (
    <main className="container-app grid min-h-[calc(100vh-5rem)] place-items-center py-10">
      <section className="soft-card max-w-lg rounded-[2rem] p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-red-50 text-red-600">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <p className="mt-6 text-sm font-black uppercase tracking-wide text-green-700">Acceso restringido</p>
        <h1 className="mt-2 text-3xl font-black text-green-950">No tienes permiso para acceder a esta sección</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Tu cuenta está activa, pero tu rol no tiene autorización para abrir esta ruta.
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link to={dashboard}>
            <Button className="w-full">Ir a mi panel</Button>
          </Link>
          <Link to="/">
            <Button variant="secondary" className="w-full">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
