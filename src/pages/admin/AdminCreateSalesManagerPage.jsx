import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../../components/admin/AdminPageHeader.jsx';
import SalesManagerForm from '../../components/admin/users/SalesManagerForm.jsx';
import { useAdminUsers } from '../../hooks/useAdminUsers.js';

export default function AdminCreateSalesManagerPage() {
  const navigate = useNavigate();
  const { isSaving, createSalesManager } = useAdminUsers(false);

  const submit = async (payload) => {
    await createSalesManager(payload);
    navigate('/admin/users');
  };

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Nuevo encargado de ventas"
        subtitle="Crea credenciales para un empleado operativo. El rol se asigna automaticamente."
      />
      <SalesManagerForm isSaving={isSaving} onSubmit={submit} />
    </div>
  );
}
