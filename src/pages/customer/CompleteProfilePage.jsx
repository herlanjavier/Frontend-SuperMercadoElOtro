import { CheckCircle2, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ProfileForm from '../../components/customer/ProfileForm.jsx';
import { profileService } from '../../services/profile.service.js';
import { useAuth } from '../../hooks/useAuth.js';
import { safeText } from '../../utils/formatters.js';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const { user, profile, refreshMe } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const userId = user?.id || profile?.id || profile?.userId || profile?.user_id;

  useEffect(() => {
    if (profile?.profileCompleted === true) {
      navigate('/customer', { replace: true });
    }
  }, [navigate, profile?.profileCompleted]);

  const submit = async (payload) => {
    if (!userId) throw new Error('Usuario no disponible.');

    setIsSaving(true);
    try {
      await profileService.updateProfile(userId, payload);
      await refreshMe();
      toast.success('Perfil completado correctamente.');
      navigate('/customer', { replace: true });
    } catch (err) {
      toast.error(err.userMessage || 'No se pudo completar tu perfil.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6">
      <header className="rounded-[2rem] bg-green-900 p-6 text-white shadow-2xl shadow-green-950/15">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
            <UserRound className="h-7 w-7 text-yellow-300" />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-yellow-300">Completar perfil</p>
            <h2 className="mt-1 text-3xl font-black">Datos de cliente</h2>
            <p className="mt-1 text-green-50/80">{safeText(user?.email || profile?.email, 'Email no disponible')}</p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-800">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p>Completa tus datos para habilitar pedidos y seguimiento desde tu cuenta.</p>
        </div>
      </section>

      <ProfileForm profile={profile} isSaving={isSaving} onSubmit={submit} />
    </div>
  );
}
