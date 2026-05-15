import { ArrowLeft, Power, RefreshCw, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import ConfirmDialog from '../../components/admin/ConfirmDialog.jsx';
import SalesManagerForm from '../../components/admin/users/SalesManagerForm.jsx';
import UserStatusBadge, { RoleBadge } from '../../components/admin/users/UserStatusBadge.jsx';
import Button from '../../components/common/Button.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import { useAdminUsers } from '../../hooks/useAdminUsers.js';
import { formatDate, safeText } from '../../utils/formatters.js';

const fullName = (user) => `${user?.firstName || user?.first_name || ''} ${user?.lastName || user?.last_name || ''}`.trim() || 'Usuario';
const isActive = (user) => user?.isActive ?? user?.is_active;

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const { selectedUser, isLoading, isSaving, error, fetchUserById, updateUser, deactivateUser } = useAdminUsers(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchUserById(id);
  }, [fetchUserById, id]);

  const submit = async (payload) => {
    await updateUser(id, payload);
    await fetchUserById(id);
  };

  const runDeactivate = async () => {
    await deactivateUser(id);
    setConfirmOpen(false);
    await fetchUserById(id);
  };

  if (isLoading && !selectedUser) {
    return <div className="soft-card h-96 animate-pulse rounded-[2rem]" />;
  }

  if (error && !selectedUser) {
    return <EmptyState title="No se pudo cargar el usuario" description={error} actionLabel="Reintentar" onAction={() => fetchUserById(id)} />;
  }

  if (!selectedUser) return null;

  const active = isActive(selectedUser);

  return (
    <div className="grid gap-6">
      <AdminPageHeader title={fullName(selectedUser)} subtitle="Detalle, estado y datos basicos del usuario." />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/admin/users">
          <Button variant="secondary" icon={ArrowLeft} className="w-full sm:w-auto">Volver</Button>
        </Link>
        <Button variant="secondary" icon={RefreshCw} onClick={() => fetchUserById(id)}>Actualizar</Button>
        <Button
          variant="secondary"
          icon={Power}
          className="text-rose-700"
          disabled={active === false}
          onClick={() => setConfirmOpen(true)}
        >
          Desactivar
        </Button>
      </div>

      <section className="soft-card rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-green-50 text-green-700">
              <UserRound className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-green-950">{fullName(selectedUser)}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">{safeText(selectedUser.email, 'Sin correo')}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <RoleBadge role={selectedUser.role} />
                <UserStatusBadge isActive={active} />
              </div>
            </div>
          </div>
          <p className="text-sm font-bold text-slate-500">Creado: {formatDate(selectedUser.createdAt || selectedUser.created_at)}</p>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs font-black uppercase tracking-wide text-slate-500">CI</dt>
            <dd className="mt-1 text-sm font-bold text-slate-800">{safeText(selectedUser.ci)}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs font-black uppercase tracking-wide text-slate-500">Telefono</dt>
            <dd className="mt-1 text-sm font-bold text-slate-800">{safeText(selectedUser.phone, 'Sin telefono')}</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
            <dt className="text-xs font-black uppercase tracking-wide text-slate-500">Direccion</dt>
            <dd className="mt-1 text-sm font-bold text-slate-800">{safeText(selectedUser.address, 'Sin direccion')}</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-3">
        <h3 className="text-lg font-black text-green-950">Editar datos basicos</h3>
        <SalesManagerForm mode="edit" user={selectedUser} isSaving={isSaving} onSubmit={submit} />
      </section>

      <ConfirmDialog
        open={confirmOpen}
        title="Desactivar usuario"
        message={`Confirma que deseas desactivar a ${fullName(selectedUser)}.`}
        confirmLabel="Desactivar"
        onClose={() => setConfirmOpen(false)}
        onConfirm={runDeactivate}
      />
    </div>
  );
}
