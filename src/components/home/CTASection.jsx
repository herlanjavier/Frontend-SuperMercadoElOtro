import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="container-app py-16">
      <div className="overflow-hidden rounded-[2rem] bg-green-900 p-8 text-white shadow-2xl shadow-green-950/20 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Empieza hoy</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Tu próxima compra puede ser más sencilla.</h2>
            <p className="mt-3 max-w-2xl text-green-50/80">
              Crea tu cuenta, guarda tus datos de entrega y prepara pedidos desde el catálogo cuando quieras.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-6 text-sm font-black text-green-950 hover:bg-yellow-300"
          >
            Crear cuenta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
