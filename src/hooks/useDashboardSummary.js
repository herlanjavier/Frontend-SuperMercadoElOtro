import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { reportService } from '../services/report.service.js';

export function useDashboardSummary() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      setSummary(await reportService.getDashboardSummary());
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar el resumen del dashboard.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { summary, isLoading, error, refetch: fetchSummary };
}
