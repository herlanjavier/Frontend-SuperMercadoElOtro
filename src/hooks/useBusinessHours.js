import { useCallback, useEffect, useState } from 'react';
import { businessHourService } from '../services/business-hour.service.js';

export const useBusinessHours = () => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await businessHourService.getCurrentBusinessStatus();
      setStatus(data);
    } catch (err) {
      setError(err.userMessage || err.response?.data?.message || 'No se pudo consultar el horario de atención.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ...status,
    status,
    isLoading,
    error,
    refetch,
  };
};
