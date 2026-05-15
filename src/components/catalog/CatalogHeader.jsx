import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, ShoppingCart } from 'lucide-react';

export default function CatalogHeader() {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15 sm:p-8">
      <Link to="/customer" className="inline-flex items-center gap-2 text-sm font-black text-green-50/80 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Volver al panel
      </Link>
      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Catálogo</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Encuentra tus productos favoritos</h1>
          <p className="mt-3 max-w-2xl text-green-50/80">
            Busca, filtra por categoría y revisa disponibilidad antes de armar tu pedido.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <div className="rounded-3xl bg-white/10 p-4">
            <Clock className="mb-2 h-5 w-5 text-yellow-300" />
            <p className="text-xs font-bold text-green-50/80">Atención</p>
            <p className="font-black">06:00 - 22:00</p>
          </div>
          <button
            type="button"
            className="rounded-3xl bg-yellow-400 p-4 text-left text-green-950 shadow-lg shadow-yellow-500/20"
          >
            <ShoppingCart className="mb-2 h-5 w-5" />
            <p className="text-xs font-bold">Carrito</p>
            <p className="font-black">Próximo paso</p>
          </button>
        </div>
      </div>
    </section>
  );
}
