import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { profileService } from '../services/profile.service.js';
import { useAuth } from './useAuth.js';

export function useProfile() {
  const { user, profile, refreshMe } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const [currentProfile, setCurrentProfile] = useState(profile);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentUser(user);
    setCurrentProfile(profile);
  }, [user, profile]);

  const loadProfile = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await profileService.getMe();
      setCurrentUser(data.user);
      setCurrentProfile(data.profile);
    } catch (err) {
      const message = err.userMessage || 'No se pudo cargar tu perfil.';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (payload) => {
    const userId = currentUser?.id || currentProfile?.id;
    if (!userId) throw new Error('Usuario no disponible.');
    setIsSaving(true);
    try {
      const updated = await profileService.updateProfile(userId, payload);
      setCurrentProfile(updated?.profile || updated);
      await refreshMe();
      toast.success('Perfil actualizado correctamente.');
      return updated;
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo actualizar tu perfil.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return { user: currentUser, profile: currentProfile, isLoading, isSaving, error, loadProfile, updateProfile };
}
