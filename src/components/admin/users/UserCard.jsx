import { Edit, Power } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button.jsx';
import { formatDate, safeText } from '../../../utils/formatters.js';
import UserStatusBadge, { RoleBadge } from './UserStatusBadge.jsx';

const fullName = (user) => `${user.firstName || user.first_name || ''} ${user.lastName || user.last_name || ''}`.trim() || 'Sin nombre';
const isActive = (user) => user.isActive ?? user.is_active;

export default function UserCard({ user, onDeactivate }) {
  const active = isActive(user);

  return (
    <article className="soft-card rounded-[1.75rem] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black text-green-950">{fullName(user)}</h3>
          <p className="truncate text-sm text-slate-500">{safeText(user.email, 'Sin correo')}</p>
        </div>
        <UserStatusBadge isActive={active} />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <p><span className="font-black text-slate-700">CI:</span> {safeText(user.ci)}</p>
        <p><span className="font-black text-slate-700">Telefono:</span> {safeText(user.phone, 'Sin telefono')}</p>
        <p><span className="font-black text-slate-700">Creado:</span> {formatDate(user.createdAt || user.created_at)}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <RoleBadge role={user.role} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <Link to={`/admin/users/${user.id}`}>
          <Button variant="secondary" icon={Edit} className="w-full">Ver / editar</Button>
        </Link>
        <Button
          variant="secondary"
          icon={Power}
          className="w-full text-rose-700"
          disabled={active === false}
          onClick={() => onDeactivate(user)}
        >
          Desactivar
        </Button>
      </div>
    </article>
  );
}
