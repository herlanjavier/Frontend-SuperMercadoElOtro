import { Link } from 'react-router-dom';
import Button from '../common/Button.jsx';

export default function AdminPageHeader({ title, subtitle, actionLabel, actionTo, onAction, icon: Icon }) {
  const action = actionLabel ? (
    actionTo ? (
      <Link to={actionTo}>
        <Button icon={Icon} className="w-full sm:w-auto">{actionLabel}</Button>
      </Link>
    ) : (
      <Button icon={Icon} onClick={onAction} className="w-full sm:w-auto">{actionLabel}</Button>
    )
  ) : null;

  return (
    <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Administracion</p>
          <h2 className="mt-2 text-3xl font-black">{title}</h2>
          {subtitle ? <p className="mt-2 max-w-2xl text-green-50/80">{subtitle}</p> : null}
        </div>
        {action}
      </div>
    </header>
  );
}
