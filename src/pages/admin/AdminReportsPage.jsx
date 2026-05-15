import { BarChart3, Boxes, CalendarDays, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import Button from '../../components/common/Button.jsx';

const reports = [
  { title: 'Reporte de ventas', description: 'Consulta ventas por fecha, rango o mes.', to: '/admin/reports/sales', icon: BarChart3 },
  { title: 'Reporte de inventario', description: 'Controla stock actual, productos bajos y entradas.', to: '/admin/reports/inventory', icon: Boxes },
  { title: 'Productos mas vendidos', description: 'Identifica los productos con mayor movimiento.', to: '/admin/reports/top-products', icon: Trophy },
  { title: 'Ventas por dia', description: 'Visualiza el comportamiento diario de ventas.', to: '/admin/reports/sales-by-day', icon: CalendarDays },
];

export default function AdminReportsPage() {
  return (
    <div className="grid gap-6">
      <AdminPageHeader title="Reportes" subtitle="Analiza ventas, inventario y comportamiento del supermercado." />
      <section className="grid gap-4 md:grid-cols-2">
        {reports.map(({ title, description, to, icon: Icon }) => (
          <article key={title} className="soft-card rounded-[2rem] p-6 transition hover:-translate-y-0.5 hover:shadow-xl">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-700">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-xl font-black text-green-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            <Link to={to}><Button className="mt-5 w-full sm:w-auto">Ver reporte</Button></Link>
          </article>
        ))}
      </section>
    </div>
  );
}
