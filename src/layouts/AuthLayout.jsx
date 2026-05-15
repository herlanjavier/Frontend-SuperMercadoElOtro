import { Link, Outlet } from 'react-router-dom';
import Logo from '../components/common/Logo.jsx';
import { ASSETS } from '../utils/constants.js';

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen bg-[#fffdf5] lg:grid-cols-[1fr_0.9fr]">
      <section className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex">
            <Logo />
          </Link>
          <Outlet />
        </div>
      </section>
      <aside className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 image-fallback" />
        <img
          src={ASSETS.PORTADA}
          alt="Productos frescos del supermercado"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-950/25 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Compra segura</p>
          <h1 className="mt-3 text-4xl font-black leading-tight">
            Todo lo que necesitas, listo para pedir en minutos.
          </h1>
        </div>
      </aside>
    </div>
  );
}
