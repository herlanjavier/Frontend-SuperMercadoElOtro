import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Clock, ShoppingCart } from 'lucide-react';
import Button from '../common/Button.jsx';
import { ASSETS } from '../../utils/constants.js';

export default function HeroSection() {
  return (
    <section className="container-app grid min-h-[calc(100vh-5rem)] items-center gap-8 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-12">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-black text-green-800 ring-1 ring-green-900/10">
          <BadgeCheck className="h-4 w-4" />
          Compras confiables todos los días
        </div>
        <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-normal text-green-950 sm:text-5xl lg:text-6xl">
          Compra fácil, rápido y seguro desde donde estés
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Tu supermercado online cercano, moderno y listo para ayudarte a resolver la compra diaria con menos filas y
          más comodidad.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button icon={ShoppingCart} className="sm:min-w-48">
            Explorar productos
          </Button>
          <Link
            to="/register"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-sm font-black text-green-900 ring-1 ring-green-900/10 hover:bg-green-50"
          >
            Crear cuenta
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid max-w-md grid-cols-2 gap-3">
          <div className="soft-card rounded-3xl p-4">
            <p className="text-2xl font-black text-green-950">06:00</p>
            <p className="text-sm text-slate-600">Atención desde temprano</p>
          </div>
          <div className="soft-card rounded-3xl p-4">
            <Clock className="mb-2 h-6 w-6 text-yellow-500" />
            <p className="text-sm font-bold text-slate-700">Pedidos en minutos</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="relative"
      >
        <div className="image-fallback aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-green-950/20">
          <img
            src={ASSETS.PORTADA}
            alt="Portada del supermercado online"
            className="h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="glass-panel absolute -bottom-5 left-4 right-4 rounded-3xl p-4 sm:left-auto sm:w-72">
          <p className="text-sm font-black text-green-950">Compra inteligente</p>
          <p className="mt-1 text-sm leading-5 text-slate-600">Catálogo, pedidos, pagos QR y seguimiento en una app.</p>
        </div>
      </motion.div>
    </section>
  );
}
