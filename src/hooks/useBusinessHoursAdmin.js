import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { businessHourService } from '../services/business-hour.service.js';

const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

const normalizeTime = (value, fallback) => {
  if (!value) return fallback;
  const match = String(value).trim().match(/^([01]\d|2[0-3]):([0-5]\d)/);
  return match ? `${match[1]}:${match[2]}` : value;
};

const normalizeHour = (hour) => ({
  dayOfWeek: Number(hour.dayOfWeek),
  opensAt: normalizeTime(hour.opensAt, '06:00'),
  closesAt: normalizeTime(hour.closesAt, '22:00'),
  isOpen: Boolean(hour.isOpen),
});

const validateHour = (dayOfWeek, payload) => {
  if (!Number.isInteger(Number(dayOfWeek)) || Number(dayOfWeek) < 0 || Number(dayOfWeek) > 6) {
    return 'El dia de la semana no es valido.';
  }

  if (payload.isOpen && !payload.opensAt) return 'La hora de apertura es requerida.';
  if (payload.isOpen && !payload.closesAt) return 'La hora de cierre es requerida.';
  if (payload.opensAt && !timePattern.test(payload.opensAt)) return 'La apertura debe tener formato HH:mm.';
  if (payload.closesAt && !timePattern.test(payload.closesAt)) return 'El cierre debe tener formato HH:mm.';
  if (payload.opensAt && payload.closesAt && payload.opensAt >= payload.closesAt) {
    return 'La hora de apertura debe ser menor que la hora de cierre.';
  }

  return null;
};

export const useBusinessHoursAdmin = () => {
  const [hours, setHours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savingDay, setSavingDay] = useState(null);
  const [error, setError] = useState(null);

  const fetchHours = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await businessHourService.getBusinessHours();
      setHours(Array.isArray(data) ? data.map(normalizeHour) : []);
      return data;
    } catch (err) {
      const message = err.userMessage || err.response?.data?.message || 'No se pudo cargar el horario de atencion.';
      setError(message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateHour = useCallback(async (dayOfWeek, payload) => {
    const normalizedPayload = {
      opensAt: normalizeTime(payload.opensAt, '06:00'),
      closesAt: normalizeTime(payload.closesAt, '22:00'),
      isOpen: Boolean(payload.isOpen),
    };
    const validation = validateHour(dayOfWeek, normalizedPayload);

    if (validation) {
      toast.error(validation);
      throw new Error(validation);
    }

    setIsSaving(true);
    setSavingDay(Number(dayOfWeek));

    try {
      const updated = normalizeHour(await businessHourService.updateBusinessHour(dayOfWeek, normalizedPayload));
      setHours((current) =>
        current.map((hour) => (hour.dayOfWeek === updated.dayOfWeek ? updated : hour)),
      );
      toast.success('Horario actualizado correctamente.');
      return updated;
    } catch (err) {
      const message = err.userMessage || err.response?.data?.message || 'No se pudo actualizar el horario.';
      toast.error(message);
      throw err;
    } finally {
      setIsSaving(false);
      setSavingDay(null);
    }
  }, []);

  useEffect(() => {
    fetchHours();
  }, [fetchHours]);

  return {
    hours,
    isLoading,
    isSaving,
    savingDay,
    error,
    fetchHours,
    updateHour,
    refetch: fetchHours,
  };
};
