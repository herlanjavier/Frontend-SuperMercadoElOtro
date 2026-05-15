import { getRoleLabel } from '../../../utils/roleRedirect.js';

export function RoleBadge({ role }) {
  const styles = {
    admin: 'bg-purple-50 text-purple-700 ring-purple-200',
    sales_manager: 'bg-sky-50 text-sky-700 ring-sky-200',
    customer: 'bg-green-50 text-green-700 ring-green-200',
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${styles[role] || 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
      {getRoleLabel(role)}
    </span>
  );
}

export default function UserStatusBadge({ isActive }) {
  const active = isActive !== false;

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${active ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
      {active ? 'Activo' : 'Inactivo'}
    </span>
  );
}
