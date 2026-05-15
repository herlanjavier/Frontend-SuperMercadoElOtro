import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';

export default function SalesQuickActions({ actions }) {
  return (
    <section className="soft-card rounded-[2rem] p-6">
      <p className="text-sm font-black uppercase tracking-wide text-green-700">Accesos rapidos</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ label, to, icon: Icon, variant = 'secondary' }) => (
          <Link key={label} to={to}><Button variant={variant} icon={Icon} className="w-full justify-start">{label}</Button></Link>
        ))}
      </div>
    </section>
  );
}
