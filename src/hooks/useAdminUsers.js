import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminUserService } from '../services/admin-user.service.js';

const defaultFilters = { search: '', role: '', isActive: '' };

const normalizeUsers = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

export function useAdminUsers(autoLoad = true) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(autoLoad);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await adminUserService.getUsers(filters);
      setUsers(normalizeUsers(result));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar los usuarios.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (autoLoad) fetchUsers();
  }, [autoLoad, fetchUsers]);

  const fetchUserById = useCallback(async (id) => {
    setIsLoading(true);
    setError('');
    try {
      const user = await adminUserService.getUserById(id);
      setSelectedUser(user);
      return user;
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar el usuario.';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const runSaving = async (action, successMessage, refetch = false) => {
    setIsSaving(true);
    try {
      const result = await action();
      toast.success(successMessage);
      if (refetch) await fetchUsers();
      return result;
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo guardar el usuario.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    users,
    selectedUser,
    filters,
    isLoading,
    isSaving,
    error,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })),
    refetch: fetchUsers,
    fetchUsers,
    fetchUserById,
    createSalesManager: (payload) =>
      runSaving(
        () => adminUserService.createSalesManager(payload),
        'Encargado creado correctamente. Entrega el correo y contraseña al empleado.',
      ),
    updateUser: (id, payload) => runSaving(() => adminUserService.updateUser(id, payload), 'Usuario actualizado correctamente.'),
    deactivateUser: (id) => runSaving(() => adminUserService.deactivateUser(id), 'Usuario desactivado correctamente.', true),
  };
}
