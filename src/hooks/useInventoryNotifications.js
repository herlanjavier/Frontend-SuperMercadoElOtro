import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { inventoryService } from '../services/inventory.service.js';

const defaultFilters = { isRead: '', type: '' };

export function useInventoryNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filters, setFiltersState] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setNotifications(await inventoryService.getInventoryNotifications(filters));
    } catch (err) {
      const message = err.userMessage || 'No se pudieron cargar las notificaciones.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      await inventoryService.markNotificationAsRead(id);
      toast.success('Notificacion marcada como leida.');
      await fetchNotifications();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo actualizar la notificacion.');
    }
  };

  const markAllAsRead = async () => {
    try {
      await inventoryService.markAllNotificationsAsRead();
      toast.success('Notificaciones marcadas como leidas.');
      await fetchNotifications();
    } catch (err) {
      toast.error(err.userMessage || 'No se pudieron actualizar las notificaciones.');
    }
  };

  return {
    notifications,
    filters,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    setFilters: (next) => setFiltersState((current) => ({ ...current, ...next })),
  };
}
