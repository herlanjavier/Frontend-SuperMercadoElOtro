import { Plus, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import UserFilters from '../../components/admin/users/UserFilters.jsx';
import UserTable from '../../components/admin/users/UserTable.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useAdminUsers } from '../../hooks/useAdminUsers.js';

const userName = (user) => `${user?.firstName || user?.first_name || ''} ${user?.lastName || user?.last_name || ''}`.trim() || 'este usuario';

export default function AdminUsersPage() {
  const { users, filters, setFilters, isLoading, error, refetch, deactivateUser } = useAdminUsers();
  const [confirmUser, setConfirmUser] = useState(null);

  const runDeactivate = async () => {
    await deactivateUser(confirmUser.id);
    setConfirmUser(null);
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Usuarios"
        subtitle="Consulta clientes, administradores y encargados de ventas."
        actionLabel="Nuevo encargado"
        actionTo="/admin/users/new-sales-manager"
        icon={Plus}
      />

      <UserFilters filters={filters} onChange={setFilters} />

      {isLoading ? <div className="soft-card h-64 animate-pulse rounded-[2rem]" /> : null}
      {!isLoading && error ? (
        <EmptyState title="No se pudieron cargar los usuarios" description={error} actionLabel="Reintentar" onAction={refetch} />
      ) : null}
      {!isLoading && !error && users.length === 0 ? (
        <EmptyState title="No hay usuarios" description="Ajusta los filtros o crea un encargado de ventas." />
      ) : null}
      {!isLoading && !error && users.length > 0 ? <UserTable users={users} onDeactivate={setConfirmUser} /> : null}

      <div className="justify-self-start">
        <Button variant="secondary" icon={RefreshCw} onClick={refetch}>Actualizar listado</Button>
      </div>

      <ConfirmDialog
        open={Boolean(confirmUser)}
        title="Desactivar usuario"
        message={`Confirma que deseas desactivar a ${userName(confirmUser)}. No podra iniciar sesion mientras este inactivo.`}
        confirmLabel="Desactivar"
        onClose={() => setConfirmUser(null)}
        onConfirm={runDeactivate}
      />
    </div>
  );
}
