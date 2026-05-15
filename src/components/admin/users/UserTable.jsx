import { Edit, Power } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button.jsx';
import { formatDate, safeText } from '../../../utils/formatters.js';
import UserCard from './UserCard.jsx';
import UserStatusBadge, { RoleBadge } from './UserStatusBadge.jsx';

const fullName = (user) => `${user.firstName || user.first_name || ''} ${user.lastName || user.last_name || ''}`.trim() || 'Sin nombre';
const isActive = (user) => user.isActive ?? user.is_active;

export default function UserTable({ users, onDeactivate }) {
  return (
    <>
      <section className="grid gap-4 lg:hidden">
        {users.map((user) => <UserCard key={user.id} user={user} onDeactivate={onDeactivate} />)}
      </section>

      <section className="soft-card hidden overflow-hidden rounded-[1.75rem] lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-green-50 text-xs font-black uppercase tracking-wide text-green-800">
            <tr>
              <th className="px-5 py-4">Usuario</th>
              <th className="px-5 py-4">CI</th>
              <th className="px-5 py-4">Telefono</th>
              <th className="px-5 py-4">Rol</th>
              <th className="px-5 py-4">Estado</th>
              <th className="px-5 py-4">Creado</th>
              <th className="px-5 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const active = isActive(user);

              return (
                <tr key={user.id} className="bg-white/80">
                  <td className="px-5 py-4">
                    <p className="font-black text-green-950">{fullName(user)}</p>
                    <p className="text-xs font-semibold text-slate-500">{safeText(user.email, 'Sin correo')}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{safeText(user.ci)}</td>
                  <td className="px-5 py-4 text-slate-600">{safeText(user.phone, 'Sin telefono')}</td>
                  <td className="px-5 py-4"><RoleBadge role={user.role} /></td>
                  <td className="px-5 py-4"><UserStatusBadge isActive={active} /></td>
                  <td className="px-5 py-4 text-slate-600">{formatDate(user.createdAt || user.created_at)}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link to={`/admin/users/${user.id}`}>
                        <Button variant="secondary" icon={Edit}>Editar</Button>
                      </Link>
                      <Button
                        variant="secondary"
                        icon={Power}
                        className="text-rose-700"
                        disabled={active === false}
                        onClick={() => onDeactivate(user)}
                      >
                        Desactivar
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
