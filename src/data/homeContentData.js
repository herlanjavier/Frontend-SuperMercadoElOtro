import { Apple, CupSoda, Home, PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export const features = [
  {
    icon: PackageCheck,
    title: 'Elige tus productos facilmente',
    description: 'Un catalogo claro para encontrar lo que necesitas sin vueltas.',
  },
  {
    icon: ShieldCheck,
    title: 'Pedidos rapidos y seguros',
    description: 'Tu compra queda registrada y preparada para seguimiento.',
  },
  {
    icon: Sparkles,
    title: 'Productos frescos y confiables',
    description: 'Seleccion pensada para compras diarias y familiares.',
  },
  {
    icon: Truck,
    title: 'Entrega practica a tu puerta',
    description: 'Coordina tu destino y referencia desde el pedido.',
  },
];

export const categories = [
  { name: 'Alimentos', icon: Apple, tone: 'bg-green-50 text-green-700', description: 'Despensa, granos y basicos.' },
  { name: 'Limpieza', icon: Sparkles, tone: 'bg-sky-50 text-sky-700', description: 'Todo para un hogar impecable.' },
  { name: 'Basicos del hogar', icon: Home, tone: 'bg-yellow-50 text-yellow-700', description: 'Lo util de cada dia.' },
  { name: 'Bebidas', icon: CupSoda, tone: 'bg-orange-50 text-orange-700', description: 'Jugos, gaseosas y mas.' },
];
