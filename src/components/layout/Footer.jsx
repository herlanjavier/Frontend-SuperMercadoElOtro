import { Link } from 'react-router-dom';
import Logo from '../common/Logo.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-green-900/10 bg-white/70 py-10">
      <div className="container-app grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Compras rápidas, productos confiables y una experiencia pensada para tu día a día.
          </p>
        </div>
        <div>
          <h4 className="font-black text-green-950">Accesos</h4>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <Link to="/login" className="hover:text-green-700">
              Ingresar
            </Link>
            <Link to="/register" className="hover:text-green-700">
              Registrarse
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-black text-green-950">Contacto</h4>
          <p className="mt-3 text-sm text-slate-600">Atención: 06:00 a 22:00</p>
          <p className="text-sm text-slate-600">WhatsApp: 70000000</p>
        </div>
      </div>
    </footer>
  );
}
